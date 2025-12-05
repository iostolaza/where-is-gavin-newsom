// file: src/app/core/guards/auth.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { HotToastService } from '@ngneat/hot-toast';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const toast = inject(HotToastService);

  if (authService.isLoggedIn()) {
    return true;
  } else {
    const returnUrl = state.url;
    toast.info('You must be signed in to submit a sighting.');
    router.navigate(['/auth/sign-in'], { queryParams: { returnUrl } });
    return false;
  }
};