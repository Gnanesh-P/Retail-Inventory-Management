import { NgModule } from '@angular/core';
import { ChartTableComponent } from './components/chart-table/chart-table.component';
import { CommonModule } from '@angular/common';
import { GridLazyComponent } from './components/lazy-grid/lazy-grid.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from './components/button/button.component';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzListModule } from 'ng-zorro-antd/list';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { EnumDisplayPipe } from './pipes/enum-display.pipe';
import { AddNewLabelComponent } from './components/add-new-label.component';

@NgModule({
  imports: [
    CommonModule,
    NzTableModule,
    NzAvatarModule,
    NzDropDownModule,
    NzIconModule,
    NzSelectModule,
    FormsModule,
    ReactiveFormsModule,
    NzToolTipModule,
    NzListModule,
    NzButtonModule,
    NzSpaceModule,
    NzDescriptionsModule,
    NzSkeletonModule,
    NzPaginationModule,
    NzInputModule,
    NzPageHeaderModule
  ],
  declarations: [
    ChartTableComponent,
    GridLazyComponent,
    ButtonComponent,
    EnumDisplayPipe,
    AddNewLabelComponent
  ],
  exports: [
    ChartTableComponent,
    EnumDisplayPipe,
    GridLazyComponent,
    ButtonComponent,
    AddNewLabelComponent
  ]
})
export class CoreModuleModule { }
