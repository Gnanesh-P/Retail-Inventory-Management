import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-language',
  template: `<router-outlet *ngIf="isLanguageLoaded" ></router-outlet>`,
})
export class LanguageComponent implements OnInit {
  constructor(private route: ActivatedRoute, private language: LanguageService) { }
  isLanguageLoaded = false;
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.language.selectedCountry = params['country'] || 'in';
      this.language.selectedLanguage = params['lang'] || 'en';
      this.language.loadLanguage().subscribe((res) => {
        this.isLanguageLoaded = true;
      })
    })
  }
}
