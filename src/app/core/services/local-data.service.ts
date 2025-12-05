// src/app/core/services/local-data.service.ts
import { Injectable } from '@angular/core';
import { Sighting } from '../../shared/models/sighting.model';

@Injectable({
  providedIn: 'root'
})
export class LocalDataService {
  private readonly KEY = 'local_gavin_sightings';

  async getAllLocalSightings(): Promise<Sighting[]> {
    try {
      const raw = localStorage.getItem(this.KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  async saveSighting(sighting: Sighting): Promise<void> {
    const sightings = await this.getAllLocalSightings();
    sighting.id = sighting.id || Date.now().toString();
    sightings.push(sighting);
    localStorage.setItem(this.KEY, JSON.stringify(sightings));
  }

  async removeLocalSighting(id: string): Promise<void> {
    const sightings = await this.getAllLocalSightings();
    const filtered = sightings.filter((s: Sighting) => s.id !== id);
    localStorage.setItem(this.KEY, JSON.stringify(filtered));
  }
}