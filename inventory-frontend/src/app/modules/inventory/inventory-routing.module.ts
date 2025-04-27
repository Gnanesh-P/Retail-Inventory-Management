import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InventoryComponent } from './inventory.component';
import { ProductComponent } from './product/product.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { BrandComponent } from './brand/brand.component';
import { CategoryComponent } from './category/category.component';

const routes: Routes = [
  {
    path: '', component: InventoryComponent, children: [
      { path: 'products', component: ProductComponent },
      { path: 'create-products', component: CreateProductComponent },
      { path: 'brands', component: BrandComponent },
      { path: 'categories', component: CategoryComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule { }
