import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: ':country/:lang',
    children: [
      { path: '', loadChildren: () => import('./modules/language/language.module').then(m => m.LanguageModule) },
    ]
  },
  { path: '', redirectTo: 'in/en', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
