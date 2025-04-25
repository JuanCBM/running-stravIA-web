import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'distance',
  standalone: true
})
export class DistancePipe implements PipeTransform {
  transform(meters: number, format: 'km' | 'mi' = 'km'): string {
    if (meters === null || meters === undefined) {
      return '';
    }

    if (format === 'km') {
      const kilometers = meters / 1000;
      return `${kilometers.toFixed(2)} km`;
    } else {
      const miles = meters / 1609.34;
      return `${miles.toFixed(2)} mi`;
    }
  }
}
