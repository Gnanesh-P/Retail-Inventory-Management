import { NgModule } from '@angular/core';
import { SideMenuRoutingModule } from './side-menu-routing.module';
import { CoreModuleModule } from 'src/app/core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { SideMenuComponent } from './side-menu.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NotificationDrawerComponent } from './notification-drawer/notification-drawer.component';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { ProfileDrawerComponent } from './profile-drawer/profile-drawer.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    CoreModuleModule,
    FormsModule,
    ReactiveFormsModule,
    NzInputModule,
    NzSelectModule,
    NzLayoutModule,
    NzMenuModule,
    NzIconModule,
    NzCollapseModule,
    NzDrawerModule,
    NzFormModule,
    NzDropDownModule,
    SideMenuRoutingModule
  ],
  declarations: [
    SideMenuComponent,
    NotificationDrawerComponent,
    ProfileDrawerComponent
  ]
})
export class SideMenuModule { }
