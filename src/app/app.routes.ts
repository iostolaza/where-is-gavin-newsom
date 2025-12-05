// file: src/app/app.routes.ts
import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent) },
  { 
    path: 'submit', 
    loadComponent: () => import('./features/submit-sighting/submit-sighting.component').then(m => m.SubmitSightingComponent),
    canActivate: [authGuard]
  },
  { 
    path: 'admin', 
    loadComponent: () => import('./features/admin/admin-dashboard.component').then(m => m.AdminDashboardComponent),
  },
  { 
    path: 'auth/sign-in', 
    loadComponent: () => import('./features/auth/sign-in.component').then(m => m.SignInComponent) 
  },
  { path: '**', redirectTo: '' }
];