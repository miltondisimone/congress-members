import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'chambers'
})
export class ChambersPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    if ( value === 'house') {
      return 'House';
    } else {
      return 'Senate';
    }
  }

}
