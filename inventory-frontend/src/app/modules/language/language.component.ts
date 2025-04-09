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
    console.log('Language component initialized');
    this.route.params.subscribe(params => {
      this.language.country = params['country'] || 'in';
      this.language.language = params['lang'] || 'en';
      this.language.getAllLanguage().subscribe((res) => {
        this.isLanguageLoaded = true;
      })
    })
  }
}
