import { Injectable } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Sighting } from '../../shared/models/sighting.model';

@Injectable({ providedIn: 'root' })
export class SightingService {
  constructor(private firestore: Firestore) {}

  getApprovedSightings(): Observable<Sighting[]> {
    // Replace with real query later
    return collectionData(collection(this.firestore, 'sightings')) as Observable<Sighting[]>;
  }
}
