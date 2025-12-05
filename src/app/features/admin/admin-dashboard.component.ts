// src/app/features/admin/admin-dashboard.component.ts
import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { HotToastService } from '@ngneat/hot-toast';

import { Sighting } from '../../shared/models/sighting.model';
import { SightingService } from '../../core/services/sighting.service';
import { LocalDataService } from '../../core/services/local-data.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  private sightingService = inject(SightingService);
  private localDataService = inject(LocalDataService);
  private toast = inject(HotToastService);

  pendingSightings = signal<Sighting[]>([]);
  approvedSightings = signal<Sighting[]>([]);
  localSightings = signal<Sighting[]>([]);

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    this.sightingService.getPendingSightings().subscribe(sightings => {
      this.pendingSightings.set(sightings);
    });

    this.sightingService.getApprovedSightings().subscribe(sightings => {
      this.approvedSightings.set(sightings);
    });

    this.localDataService.getAllLocalSightings()
      .then(sightings => this.localSightings.set(sightings))
      .catch((error: any) => { 
        console.error('Failed to load local sightings:', error);
        this.toast.error('Could not load offline sightings');
      });
  }

  approveSighting(id: string): void {
    this.toast.success(`Sighting ${id.slice(-8)} approved!`);
  }

  rejectSighting(id: string): void {
    this.toast.info(`Sighting ${id.slice(-8)} rejected.`);
  }

  async uploadSighting(sighting: Sighting): Promise<void> {
    try {
      await this.sightingService.createPendingSighting(sighting);
      await this.localDataService.removeLocalSighting(sighting.id!);
      this.toast.success(`Uploaded ${sighting.id!.slice(-8)}`);
      this.loadData();
    } catch (err) {
      this.toast.error('Upload failed');
    }
  }
}