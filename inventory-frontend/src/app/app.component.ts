import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { hasValues, Menu } from 'projects/inventory-core/src/lib/models';
import { LanguageService } from './services/language.service';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`
})
export class AppComponent {
  constructor(private router: Router, private language: LanguageService) { }
  ngOnInit() {
    console.log(location.pathname)
    let token = localStorage.getItem("token")
    if (!hasValues(token)) {
      if (location.pathname == "/") {
        let lang = this.language.getCurrentLanguage()
        this.router.navigate([`${lang.country}/${lang.language}/home`])
      }
    } else {
      if (location.pathname == "/") {
        let lang = this.language.getCurrentLanguage()
        this.router.navigate([`${lang.country}/${lang.language}/dashboard`])
      }
    }
  }
}
