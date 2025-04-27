import { Pipe, PipeTransform } from '@angular/core';
import { enumToNormalWord } from 'projects/inventory-core/src/lib/models';
import { LanguageService } from 'src/app/services/language.service';


@Pipe({
  name: 'language'
})
export class LanguagePipe implements PipeTransform {
  constructor(private language: LanguageService) { }
  transform(input: string): string {
    return this.language.transform(input)
  }
}
