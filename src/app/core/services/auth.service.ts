// file: src/app/core/services/auth.service.ts

import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Auth, GoogleAuthProvider, OAuthProvider, signInWithPopup, signOut, onAuthStateChanged, User } from '@angular/fire/auth'; // Using Firebase Auth for now

// Define a simple user signal for Angular's reactivity
interface AppUser {
  id: string;
  email: string;
  isLoggedIn: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  // Use a WritableSignal for user state
  readonly user = signal<AppUser | null>(null);

  constructor(
    private afAuth: Auth, // Firebase Auth instance
    private router: Router,
    private toast: HotToastService
  ) {
    // Firebase listener to update the user signal
    onAuthStateChanged(this.afAuth, user => {
      if (user) {
        const appUser: AppUser = {
          id: user.uid,
          email: user.email!,
          isLoggedIn: true
        };
        this.user.set(appUser);
      } else {
        this.user.set(null);
      }
    });
  }

  isLoggedIn(): boolean {
    // Check if the signal holds a non-null user object
    return this.user() !== null;
  }

  getUser(): User | null {
    // Return the underlying Firebase User object if available
    return this.afAuth.currentUser;
  }
  
async googleLogin() {
  try {
    await signInWithPopup(this.afAuth, new GoogleAuthProvider());
    this.toast.success('Signed in with Google!');

  } catch (error) {
    this.toast.error('Google Sign-In failed.');
    console.error('Google Login Error:', error);
  }
}

async appleLogin() {
  try {
    const provider = new OAuthProvider('apple.com');
    provider.addScope('email');
    provider.addScope('name');
    await signInWithPopup(this.afAuth, provider);
    this.toast.success('Signed in with Apple!');

  } catch (error) {
    this.toast.error('Apple Sign-In failed.');
    console.error('Apple Login Error:', error);
  }
}

  async logout() {
    await signOut(this.afAuth);
    this.toast.info('Logged out');
    this.router.navigate(['/']);
  }
}