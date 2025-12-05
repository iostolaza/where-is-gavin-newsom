// file: src/app/core/guards/auth.guard.ts

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; 
import { HotToastService } from '@ngneat/hot-toast';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const toast = inject(HotToastService);

  // Check the signal for authentication status
  if (authService.isLoggedIn()) { 
    return true;
  } else {
    // Optional: Save the attempted URL for redirection after login
    const returnUrl = state.url; 
    toast.info('You must be signed in to submit a sighting.');
    // Route to a new sign-in page (we'll define this next)
    router.navigate(['/auth/sign-in'], { queryParams: { returnUrl } }); 
    return false;
  }
};