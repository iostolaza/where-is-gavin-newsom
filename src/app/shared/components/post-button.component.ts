import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-post-button',
  standalone: true,
  template: `
    <button (click)="go()" 
      class="fixed bottom-8 right-8 z-50 bg-red-600 hover:bg-red-700 text-white rounded-full w-20 h-20 shadow-2xl flex items-center justify-center text-4xl font-bold">
      +
    </button>
  `
})
export class PostButtonComponent {
  constructor(private router: Router, private auth: AuthService) {}

  go() {
    this.router.navigate(['/submit']);
  }
}
