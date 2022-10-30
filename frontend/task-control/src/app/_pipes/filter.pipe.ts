import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any[], filterString: string, property: string = 'status'): any[] {
    if (value.length === 0 || !filterString) return value;

    let filteredElements: any[] = [];
    for(let element of value) {
      if (element[property].toLowerCase().includes(filterString.toLowerCase())) {
        filteredElements.push(element);
      }
    }

    return filteredElements;
  }

}
