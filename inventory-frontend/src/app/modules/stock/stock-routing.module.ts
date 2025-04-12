import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StockIndexComponent } from './stock-index.component';
import { StockComponent } from './stock/stock.component';

const routes: Routes = [
  {
    path: '', component: StockIndexComponent, children: [
      { path: 'stocks', component: StockComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StockRoutingModule { }
