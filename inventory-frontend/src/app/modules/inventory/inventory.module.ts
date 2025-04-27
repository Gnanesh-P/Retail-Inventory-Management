import { NgModule } from '@angular/core';
import { InventoryRoutingModule } from './inventory-routing.module';
import { InventoryComponent } from './inventory.component';
import { CoreModuleModule } from 'src/app/core/core.module';
import { ProductComponent } from './product/product.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { BrandComponent } from './brand/brand.component';
import { CategoryComponent } from './category/category.component';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { BrandDrawerComponent } from './brand/brand-drawer/brand-drawer.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { CommonModule } from '@angular/common';
import { CategoryDrawerComponent } from './category/category-drawer/category-drawer.component';
import { ProductDrawerComponent } from './product/product-drawer/product-drawer.component';
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
    InventoryRoutingModule
  ],
  declarations: [
    InventoryComponent,
    ProductComponent,
    BrandComponent,
    CategoryComponent,
    BrandDrawerComponent,
    CategoryDrawerComponent,
    ProductDrawerComponent,
    CreateProductComponent
  ]
})
export class InventoryModule { }
