// file: src/app/core/services/auth.service.ts
import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Auth, GoogleAuthProvider, OAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from '@angular/fire/auth';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';

interface AppUser {
  id: string;
  email: string;
  isLoggedIn: boolean;
  isAdmin?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private afAuth = inject(Auth);
  private firestore = inject(Firestore);
  private router = inject(Router);
  private toast = inject(HotToastService);

  readonly user = signal<AppUser | null>(null);

  constructor() {
    onAuthStateChanged(this.afAuth, async (fbUser) => {
      if (fbUser) {
        const snap = await getDoc(doc(this.firestore, 'users', fbUser.uid));
        const isAdmin = snap.exists() && snap.data()?.['isAdmin'] === true;

        this.user.set({
          id: fbUser.uid,
          email: fbUser.email!,
          isLoggedIn: true,
          isAdmin
        });
      } else {
        this.user.set(null);
      }
    });
  }

  isLoggedIn(): boolean { return this.user() !== null; }
  isAdmin(): boolean { return this.user()?.isAdmin === true; }

  async googleLogin() {
    try {
      await signInWithPopup(this.afAuth, new GoogleAuthProvider());
      this.toast.success('Signed in with Google!');
    } catch {
      this.toast.error('Google sign-in failed');
    }
  }

  async appleLogin() {
    try {
      const provider = new OAuthProvider('apple.com');
      provider.addScope('email');
      provider.addScope('name');
      await signInWithPopup(this.afAuth, provider);
      this.toast.success('Signed in with Apple!');
    } catch {
      this.toast.error('Apple sign-in failed');
    }
  }

  async logout() {
    await signOut(this.afAuth);
    this.toast.info('Logged out');
    this.router.navigate(['/']);
  }
}