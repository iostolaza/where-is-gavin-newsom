// file: src/app/features/submit-sighting/submit-sighting.component.ts
import { Component, signal, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { NgIf } from '@angular/common'; 
import { LocalDataService } from '../../core/services/local-data.service';
import { AuthService } from '../../core/services/auth.service';
import { SightingService } from '../../core/services/sighting.service';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-submit-sighting',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf], 
  templateUrl: './submit-sighting.component.html', 
  styleUrls: ['./submit-sighting.component.scss'],
})
export class SubmitSightingComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private sightingService = inject(SightingService);
  private localDataService = inject(LocalDataService);
  private router = inject(Router);
  private toast = inject(HotToastService);

  loading = signal(false);
  positionError = signal<string | null>(null);

  form = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(10)]],
    description: ['', [Validators.required, Validators.minLength(20)]],
    imageUrl: ['', Validators.required], 
    lat: [0, Validators.required],
    lng: [0, Validators.required],
    locationName: [''],
  });

  ngOnInit() {
    this.getCurrentLocation();
  }
  
  private getCurrentLocation() {
    if (!window.navigator.geolocation) {
      this.positionError.set('Geolocation not supported');
      return;
    }
    window.navigator.geolocation.getCurrentPosition(
      (pos) => {
        this.form.patchValue({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        this.reverseGeocode(pos.coords.latitude, pos.coords.longitude);
      },
      () => this.positionError.set('Unable to retrieve location'),
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
  }

  private async reverseGeocode(lat: number, lng: number) {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
    );
    const data = await res.json();
    this.form.patchValue({ locationName: data.display_name });
  }
  
  async submit() {
    if (this.form.invalid) return;

    if (!this.auth.isLoggedIn()) {
      this.toast.info('Sign in required');
      this.router.navigate(['/auth/sign-in']);
      return;
    }

    this.loading.set(true);
        const newSighting = {
      ...this.form.getRawValue(),
      userId: this.auth.user()!.id,
      sightedAt: new Date(),
      createdAt: new Date(),
      isApproved: false,
      isLocal: false,
      imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=1600',
    } as any; 

    try {
      await this.sightingService.createPendingSighting(newSighting);
      this.toast.success('Sighting submitted for review!');
      this.router.navigate(['/']);
    } catch (e) {
      this.toast.error('Cloud submission failed – saved locally');
      
      const localSighting = { ...newSighting, isLocal: true };
      await this.localDataService.saveSighting(localSighting);
      
    } finally {
      this.loading.set(false);
    }
  }
}