import { Component } from '@angular/core';
import { PostButtonComponent } from './shared/components/post-button.component';
import { HeaderComponent } from './shared/components/header.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PostButtonComponent, HeaderComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {}
