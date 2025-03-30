import { NgModule } from '@angular/core';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { CoreModuleModule } from 'src/app/core/core.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { SalesDashboardComponent } from './sales-dashboard/sales-dashboard.component';

@NgModule({
  imports: [
    CoreModuleModule,
    DashboardRoutingModule
  ],
  declarations: [
    DashboardComponent,
    AdminDashboardComponent,
    SalesDashboardComponent
  ]
})
export class DashboardModule { }
