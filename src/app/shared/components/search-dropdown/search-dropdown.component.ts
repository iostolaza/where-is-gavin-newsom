import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-search-dropdown',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="relative">
      <!-- TITLE = SEARCH TRIGGER -->
      <button 
        (click)="toggle()"
        class="text-left">
        <h1 class="text-3xl font-black text-blue-900 tracking-tight hover:text-blue-800 transition">
          Where Is Gavin Newsom?
        </h1>
      </button>

      <!-- DROPDOWN PANEL -->
      <div 
        [@openClose]="isOpen() ? 'open' : 'closed'"
        class="absolute top-full left-0 mt-4 w-96 bg-white rounded-3xl shadow-2xl border border-gray-200 z-50 overflow-hidden">
        <div class="p-8">
          <!-- Search Input -->
          <div class="relative mb-10">
            <input 
              type="text" 
              placeholder="Search city, venue, or address..."
              class="w-full px-6 py-6 pl-16 rounded-3xl border-2 border-gray-300 focus:border-blue-600 focus:outline-none text-xl shadow-inner">
            <svg class="absolute left-7 top-7 w-9 h-9 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
          </div>

        <!-- POST SIGHTING — TEXT LEFT, GREEN + RIGHT, SAME ROW -->
          <div class="flex items-center justify-between">
            <span class="text-2xl font-black text-gray-900">
              POST SIGHTING
            </span>
            <a routerLink="/submit"
               class="w-12 h-12 bg-green-600 hover:bg-green-700 rounded-full shadow-2xl 
                      flex items-center justify-center transition-all duration-300
                      hover:scale-110">
              <span class="text-white text-4xl font-black leading-none">+</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  `,
  animations: [
    trigger('openClose', [
      state('open', style({ opacity: 1, transform: 'translateY(0)' })),
      state('closed', style({ opacity: 0, transform: 'translateY(-20px)' })),
      transition('open => closed', animate('200ms ease-out')),
      transition('closed => open', animate('300ms ease-in')),
    ])
  ]
})
export class SearchDropdownComponent {
  isOpen = signal(false);
  toggle() { this.isOpen.update(v => !v); }
}
