import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAgo',
  standalone: true
})
export class TimeAgoPipe implements PipeTransform {
  transform(value: Date | string | number): string {
    if (!value) return 'just now';
    const seconds = Math.floor((+new Date() - +new Date(value)) / 1000);

    if (seconds < 60) return 'just now';

    const intervals: { [key: string]: number } = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60
    };

    for (const [unit, secs] of Object.entries(intervals)) {
      const counter = Math.floor(seconds / secs);
      if (counter > 0) {
        return counter === 1 ? `1 ${unit} ago` : `${counter} ${unit}s ago`;
      }
    }
    return 'just now';
  }
}
