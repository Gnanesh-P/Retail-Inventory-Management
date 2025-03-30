import { Pipe, PipeTransform } from '@angular/core';
import { enumToNormalWord } from 'projects/inventory-core/src/lib/models';


@Pipe({
  name: 'enumDisplay'
})
export class EnumDisplayPipe implements PipeTransform {
  transform(input: string): string {
    return enumToNormalWord(input);
  }
}
