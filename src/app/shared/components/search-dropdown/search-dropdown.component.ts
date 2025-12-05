// file: src/app/shared/components/search-dropdown/search-dropdown.component.ts
import { Component, signal } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-search-dropdown',
  standalone: true,
  imports: [RouterLink],  // Now recognized
  templateUrl: './search-dropdown.component.html',
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
  toggle() {
    this.isOpen.update(v => !v);
  }
}