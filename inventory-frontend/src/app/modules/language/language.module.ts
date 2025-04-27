import { NgModule } from '@angular/core';
import { LanguageRoutingModule } from './language-routing.module';
import { LanguageComponent } from './language.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    LanguageRoutingModule
  ],
  declarations: [
    LanguageComponent
  ]
})
export class LanguageModule { }
