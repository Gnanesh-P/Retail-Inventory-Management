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
    SideMenuRoutingModule
  ],
  declarations: [SideMenuComponent]
})
export class SideMenuModule { }
