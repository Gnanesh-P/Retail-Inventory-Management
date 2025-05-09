import { NgModule } from '@angular/core';
import { NZ_ICONS, NzIconModule } from 'ng-zorro-antd/icon';

import {
  MenuFoldOutline,
  MenuUnfoldOutline,
  FormOutline,
  DashboardOutline,
  AppstoreAddOutline,
  GoldOutline,
  LineChartOutline,
  MoneyCollectOutline,
  UsergroupAddOutline,
  AreaChartOutline,
  SettingOutline
} from '@ant-design/icons-angular/icons';

const icons = [MenuFoldOutline,
  MenuUnfoldOutline, DashboardOutline,
  FormOutline, AppstoreAddOutline,
  GoldOutline, LineChartOutline, MoneyCollectOutline, UsergroupAddOutline, AreaChartOutline, SettingOutline];

@NgModule({
  imports: [NzIconModule],
  exports: [NzIconModule],
  providers: [
    { provide: NZ_ICONS, useValue: icons }
  ]
})
export class IconsProviderModule {
}
