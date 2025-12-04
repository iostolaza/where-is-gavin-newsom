import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin',
  standalone: true,
  template: `
    <div class="max-w-4xl mx-auto py-20">
      <h1 class="text-4xl font-black mb-10">Admin – Pending Sightings</h1>
      <div class="bg-white rounded-2xl shadow-lg p-4 p-8">
        <p class="text-xl text-gray-600">No pending sightings right now. Check back later!</p>
      </div>
    </div>
  `
})
export class AdminDashboardComponent {}
