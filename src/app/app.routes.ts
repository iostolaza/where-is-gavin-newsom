import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent) },
  { path: 'submit', loadComponent: () => import('./features/submit-sighting/submit-sighting.component').then(m => m.SubmitSightingComponent) },
  { path: 'admin', loadComponent: () => import('./features/admin/admin-dashboard.component').then(m => m.AdminDashboardComponent) },
  { path: '**', redirectTo: '' }
];
