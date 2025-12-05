// src/app/shared/models/sighting.model.ts

export interface Sighting {
  id?: string;
  userId: string;
  imageUrl: string; 
  title: string;
  description: string;
  locationName: string; 
  lat: number;
  lng: number;
  sightedAt: Date; 
  createdAt: Date; 
  isApproved: boolean; 
  isLocal?: boolean; 
}