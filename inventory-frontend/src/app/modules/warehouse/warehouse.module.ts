import { NgModule } from '@angular/core';
import { WarehouseComponent } from './warehouse.component';
import { WarehouseRoutingModule } from './warehouse-routing.module';
import { CoreModuleModule } from 'src/app/core/core.module';
import { WarehouseDrawerComponent } from './warehouse-drawer/warehouse-drawer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { CommonModule } from '@angular/common';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzButtonModule } from 'ng-zorro-antd/button';

@NgModule({
  imports: [
    CoreModuleModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzDrawerModule,
    NzButtonModule,
    WarehouseRoutingModule
  ],
  declarations: [
    WarehouseComponent,
    WarehouseDrawerComponent
  ]
})
export class WarehouseModule { }
