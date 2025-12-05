// file: src/app/features/admin/admin-dashboard.component.ts
import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { HotToastService } from '@ngneat/hot-toast';
import { Sighting } from '../../shared/models/sighting.model';
import { SightingService } from '../../core/services/sighting.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  private sightingService = inject(SightingService);
  private toast = inject(HotToastService);

  pendingSightings = signal<Sighting[]>([]);
  approvedSightings = signal<Sighting[]>([]);

  ngOnInit(): void {
    this.sightingService.getPendingSightings().subscribe(s => this.pendingSightings.set(s));
    this.sightingService.getApprovedSightings().subscribe(s => this.approvedSightings.set(s));
  }

  approveSighting(id: string): void {
    this.sightingService.approveSighting(id);
    this.toast.success('Sighting approved!');
  }

  rejectSighting(id: string): void {
    this.sightingService.rejectSighting(id);
    this.toast.info('Sighting rejected');
  }
}