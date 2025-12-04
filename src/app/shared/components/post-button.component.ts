import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-post-button',
  standalone: true,
  imports: [RouterLink],
  template: `
    <a routerLink="/submit"
       class="fixed bottom-8 right-8 z-50 bg-red-600 hover:bg-red-700 text-white 
              rounded-full w-16 h-16 shadow-2xl flex items-center justify-center
              text-4xl font-black transition transform hover:scale-110">
      +
    </a>
  `
})
export class PostButtonComponent {}
