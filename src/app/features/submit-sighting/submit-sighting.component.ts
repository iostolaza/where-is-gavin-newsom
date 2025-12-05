// file: src/app/features/submit-sighting/submit-sighting.component.ts
import { Component, signal, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgIf } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { SightingService } from '../../core/services/sighting.service';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Sighting } from '../../shared/models/sighting.model';

@Component({
    selector: 'app-submit-sighting',
    imports: [ReactiveFormsModule, NgIf],
    templateUrl: './submit-sighting.component.html',
    styleUrls: ['./submit-sighting.component.scss']
})
export class SubmitSightingComponent implements OnInit {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private sightingService = inject(SightingService);
  private router = inject(Router);
  private toast = inject(HotToastService);

  loading = signal(false);
  positionError = signal<string | null>(null);

  form: FormGroup = this.fb.group({
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

    const rawValue = this.form.getRawValue();
    const newSighting: Partial<Sighting> = {
      title: rawValue.title || undefined,
      description: rawValue.description || undefined,
      lat: rawValue.lat || undefined,
      lng: rawValue.lng || undefined,
      locationName: rawValue.locationName || undefined,
      imageUrl: rawValue.imageUrl || undefined,
      userId: this.auth.user()!.id,
      sightedAt: new Date(),
      createdAt: new Date(),
      isApproved: false
    };

    try {
      await this.sightingService.createPendingSighting(newSighting);
      this.toast.success('Sighting submitted for review!');
      this.router.navigate(['/']);
    } catch (e) {
      this.toast.error('Submission failed — please try again');
      console.error(e);
    } finally {
      this.loading.set(false);
    }
  }
}