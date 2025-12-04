import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  template: `
    <header class="fixed top-0 left-0 right-0 bg-gradient-to-r from-blue-900 to-blue-700 text-white shadow-lg z-40">
      <div class="max-w-6xl mx-auto px-6 py-5">
        <h1 class="text-3xl font-black">Where Is Gavin Newsom?</h1>
      </div>
    </header>
  `
})
export class HeaderComponent {}
