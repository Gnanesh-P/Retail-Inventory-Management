import { NgModule } from '@angular/core';
import { StockRoutingModule } from './stock-routing.module';
import { StockIndexComponent } from './stock-index.component';
import { CoreModuleModule } from 'src/app/core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { CommonModule } from '@angular/common';
import { StockComponent } from './stock/stock.component';
import { StockDrawerComponent } from './stock/stock-drawer/stock-drawer.component';

@NgModule({
  imports: [
    CoreModuleModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzRadioModule,
    NzDrawerModule,
    NzButtonModule,
    StockRoutingModule
  ],
  declarations: [
    StockIndexComponent,
    StockComponent,
    StockDrawerComponent
  ]
})
export class StockModule { }
