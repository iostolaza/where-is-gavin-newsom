// file: src/app/features/home/home.component.ts
import { SearchDropdownComponent } from "../../shared/components/search-dropdown/search-dropdown.component";
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { Observable, of } from 'rxjs';
import { Sighting } from '../../shared/models/sighting.model';
import { TimeAgoPipe } from '../../shared/pipes/time-ago.pipe';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, SearchDropdownComponent, GoogleMap, MapInfoWindow, MapMarker, TimeAgoPipe],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  mapCenter: google.maps.LatLngLiteral = { lat: 36.7783, lng: -119.4179 };
  mapOptions: google.maps.MapOptions = {
    zoom: 6,
    mapTypeId: 'roadmap',
    styles: [
      { featureType: "poi", elementType: "labels.text", stylers: [{ visibility: "off" }] },
      { featureType: "transit", elementType: "labels.icon", stylers: [{ visibility: "off" }] }
    ]
  };

  latest$: Observable<Sighting | null> = of(null);
  sightings$: Observable<Sighting[]> = of([]);
  selectedSighting: Sighting | null = null;

  ngOnInit() {
    this.loadTestData();
  }

  private loadTestData() {
    const now = Date.now();
    const testData: Sighting[] = [
      { id: '1', userId: 'u1', imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=1600', title: 'Keynote at Tech Summit', description: 'Governor Newsom delivered keynote on AI regulation and climate tech investment.', locationName: 'Moscone Center, San Francisco', lat: 37.7840, lng: -122.4015, sightedAt: new Date(now - 1*60*60*1000), createdAt: new Date(), isApproved: true },
      { id: '2', userId: 'u2', imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1600', title: 'Meeting with Silicon Valley CEOs', description: 'Closed-door lunch with Tim Cook, Sundar Pichai, and Satya Nadella.', locationName: 'Apple Park, Cupertino', lat: 37.3346, lng: -122.0089, sightedAt: new Date(now - 3*60*60*1000), createdAt: new Date(), isApproved: true },
      { id: '3', userId: 'u3', imageUrl: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=1600', title: 'Bill Signing Ceremony', description: 'Signed major water conservation and wildfire prevention legislation.', locationName: 'State Capitol, Sacramento', lat: 38.5760, lng: -121.4934, sightedAt: new Date(now - 20*60*60*1000), createdAt: new Date(), isApproved: true },
      { id: '4', userId: 'u4', imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600', title: 'Fundraiser Dinner', description: 'Private dinner with donors at exclusive LA restaurant.', locationName: 'Spago, Beverly Hills', lat: 34.0736, lng: -118.3995, sightedAt: new Date(now - 48*60*60*1000), createdAt: new Date(), isApproved: true },
      { id: '5', userId: 'u5', imageUrl: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=1600', title: 'French Laundry (again)', description: 'Spotted dining indoors with lobbyists despite his own COVID rules.', locationName: 'The French Laundry, Yountville', lat: 38.4039, lng: -122.3622, sightedAt: new Date(now - 72*60*60*1000), createdAt: new Date(), isApproved: true }
    ];

    this.latest$ = of(testData[0]);
    this.sightings$ = of(testData);
  }

  openInfoWindow(marker: MapMarker, sighting: Sighting) {
    this.selectedSighting = sighting;
  }
}