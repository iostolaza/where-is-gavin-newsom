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
}
