// file: src/app/core/services/sighting.service.ts
import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData, doc, addDoc, updateDoc, deleteDoc, query, where } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { Sighting } from '../../shared/models/sighting.model';

@Injectable({ providedIn: 'root' })
export class SightingService {
  private firestore = inject(Firestore);
  private col = collection(this.firestore, 'sightings');

  getApprovedSightings(): Observable<Sighting[]> {
    return collectionData(
      query(this.col, where('isApproved', '==', true)),
      { idField: 'id' }
    ) as Observable<Sighting[]>;
  }

  getPendingSightings(): Observable<Sighting[]> {
    return collectionData(
      query(this.col, where('isApproved', '==', false)),
      { idField: 'id' }
    ) as Observable<Sighting[]>;
  }

  async createPendingSighting(sighting: Partial<Sighting>): Promise<void> {
    await addDoc(this.col, {
      ...sighting,
      isApproved: false,
      createdAt: new Date(),
      sightedAt: new Date()
    });
  }

  async approveSighting(id: string): Promise<void> {
    await updateDoc(doc(this.firestore, 'sightings', id), { isApproved: true });
  }

  async rejectSighting(id: string): Promise<void> {
    await deleteDoc(doc(this.firestore, 'sightings', id));
  }
}