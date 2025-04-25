import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'duration',
  standalone: true
})
export class DurationPipe implements PipeTransform {
  transform(seconds: number): string {
    if (seconds === null || seconds === undefined) {
      return '';
    }

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    let result = '';

    if (hours > 0) {
      result += `${hours}h `;
    }

    if (minutes > 0 || hours > 0) {
      result += `${minutes}m `;
    }

    result += `${remainingSeconds}s`;

    return result.trim();
  }
}
