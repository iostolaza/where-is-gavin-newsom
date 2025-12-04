import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  template: `
    <header class="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 shadow-sm z-50">
      <div class="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 class="text-3xl font-black text-blue-900 tracking-tight">
          Where Is Gavin Newsom?
        </h1>
        <div class="text-lg font-medium text-gray-700">
          Citizen-Powered Tracker
        </div>
      </div>
    </header>
  `
})
export class HeaderComponent {}
