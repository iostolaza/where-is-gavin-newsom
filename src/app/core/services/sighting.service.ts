// file: src/app/core/services/sighting.service.ts
import { Injectable } from '@angular/core';
import { collection, collectionData, Firestore, addDoc } from '@angular/fire/firestore'; 
import { Observable, of } from 'rxjs';
import { Sighting } from '../../shared/models/sighting.model';

@Injectable({ providedIn: 'root' })
export class SightingService {
  
  constructor(private firestore: Firestore) {}

  getApprovedSightings(): Observable<Sighting[]> {
    // Replace with real query later
    return collectionData(collection(this.firestore, 'sightings'), { idField: 'id' }) as Observable<Sighting[]>;
  }

  getPendingSightings(): Observable<Sighting[]> {
    return of([]); 
  }

  async createPendingSighting(sighting: Sighting): Promise<void> {

     console.log('API: Creating cloud sighting:', sighting);
     return;
  }
  

}