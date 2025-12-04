import { Injectable } from '@angular/core';
import { Auth, GoogleAuthProvider, OAuthProvider, signInWithPopup, signOut, onAuthStateChanged, User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';

@Injectable({ providedIn: 'root' })
export class AuthService {
  user: User | null = null;

  constructor(private auth: Auth, private router: Router, private toast: HotToastService) {
    onAuthStateChanged(this.auth, user => this.user = user);
  }

  async googleLogin() {
    await signInWithPopup(this.auth, new GoogleAuthProvider());
    this.toast.success('Signed in with Google!');
  }

  async appleLogin() {
    const provider = new OAuthProvider('apple.com');
    provider.addScope('email');
    provider.addScope('name');
    await signInWithPopup(this.auth, provider);
    this.toast.success('Signed in with Apple!');
  }

  async logout() {
    await signOut(this.auth);
    this.toast.info('Logged out');
    this.router.navigate(['/']);
  }

  isLoggedIn(): boolean {
    return !!this.auth.currentUser;
  }

  getUser(): User | null {
    return this.auth.currentUser;
  }
}
