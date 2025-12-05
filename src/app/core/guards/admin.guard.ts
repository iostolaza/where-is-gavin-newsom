// file: src/app/core/guards/admin.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { HotToastService } from '@ngneat/hot-toast';
import { doc, getDoc } from '@angular/fire/firestore';
import { Firestore } from '@angular/fire/firestore';

export const adminGuard: CanActivateFn = async (route, state) => {
  const auth = inject(AuthService);
  const firestore = inject(Firestore);
  const router = inject(Router);
  const toast = inject(HotToastService);

  if (!auth.isLoggedIn()) {
    router.navigate(['/auth/sign-in']);
    return false;
  }

  const userDoc = await getDoc(doc(firestore, 'users', auth.user()!.id));
  if (userDoc.exists() && userDoc.data()?.['isAdmin']) {
    return true;
  }

  toast.error('Admin access only');
  router.navigate(['/']);
  return false;
};