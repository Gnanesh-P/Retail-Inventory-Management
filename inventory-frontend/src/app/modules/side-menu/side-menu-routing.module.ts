import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SideMenuComponent } from './side-menu.component';

const routes: Routes = [
  {
    path: '', component: SideMenuComponent, children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      { path: 'dashboard', loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardModule) },
      { path: 'inventory', loadChildren: () => import('../inventory/inventory.module').then(m => m.InventoryModule) },
      { path: 'warehouse', loadChildren: () => import('../warehouse/warehouse.module').then(m => m.WarehouseModule) },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SideMenuRoutingModule { }
