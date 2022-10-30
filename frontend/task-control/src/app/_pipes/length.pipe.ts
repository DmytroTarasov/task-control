import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'length',
})
export class LengthPipe implements PipeTransform {
  transform(value: any[]): number {
    return value.length;
  }
}
