// file: src/app/shared/components/post-button.component.ts
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-post-button',
  standalone: true,
  imports: [],
  templateUrl: './post-button.component.html'
})
export class PostButtonComponent {
  private router = inject(Router);
  private auth = inject(AuthService);
  private toast = inject(HotToastService);

  handleClick(): void {
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['/submit']);
    } else {
      this.toast.info('Sign in required to submit a sighting', { duration: 5000 });
      this.router.navigate(['/auth/sign-in'], { queryParams: { returnUrl: '/submit' } });
    }
  }
}