import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LanguageComponent } from './language.component';

const routes: Routes = [
  {
    path: '', component: LanguageComponent, children: [
      { path: '', loadChildren: () => import('../side-menu/side-menu.module').then(m => m.SideMenuModule) },
      { path: 'home', loadChildren: () => import('../auth/auth.module').then(m => m.AuthModule) },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LanguageRoutingModule { }
