// file: src/app/features/auth/sign-in.component.ts
import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
    selector: 'app-sign-in',
    imports: [],
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  private auth = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private toast = inject(HotToastService);

  returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';

  async signInWithGoogle() {
    await this.auth.googleLogin();
    this.router.navigate([this.returnUrl]);
  }

  async signInWithApple() {
    await this.auth.appleLogin();
    this.router.navigate([this.returnUrl]);
  }
}