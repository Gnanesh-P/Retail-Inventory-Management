import { Component, OnInit } from '@angular/core';
import { Menu } from 'projects/inventory-core/src/lib/models';

@Component({
  selector: 'app-side-menu',
  template: `
<nz-layout class="app-layout">
  <nz-sider class="menu-sidebar" nzCollapsible nzWidth="256px" nzBreakpoint="md" [(nzCollapsed)]="isCollapsed" [nzTrigger]="null">
    <div class="sidebar-logo">
      <a href="https://ng.ant.design/" target="_blank">
        <img src="https://ng.ant.design/assets/img/logo.svg" alt="logo">
        <h1>Inventory Management</h1>
      </a>
    </div>
    <ul nz-menu nzTheme="dark" nzMode="inline" [nzInlineCollapsed]="isCollapsed">
      <ng-container *ngFor="let item of menu">
        <ng-container *ngIf="item.children && item.children.length > 0">
          <li nz-submenu [nzTitle]="item.name" [nzIcon]="item.icon || ''">
            <ul>
              <li nz-menu-item nzMatchRouter *ngFor="let child of item.children">
                <a [routerLink]="child.path">{{child.name}}</a>
              </li>
            </ul>
          </li>
        </ng-container>
        <ng-container *ngIf="!item.children">
          <li nz-menu-item nzMatchRouter>
            <a>{{item.name}}</a>
          </li>
        </ng-container>
      </ng-container>
    </ul>

    <div class="text-gray-400 flex w-full hover:text-gray-100 justify-start items-center p-5 cursor-pointer" (click)="logout()">
      <span class="material-symbols-rounded">logout</span>
      <span class="ml-1">Logout</span>
    </div>
    
  </nz-sider>
  <nz-layout>
    <nz-header>
      <div class="app-header">
        <span class="header-trigger flex justify-between items-center">
          <div class="flex items-center justify-start">
            <span class="top-icon mr-3">
              <span class="trigger" nz-icon [nzType]="isCollapsed ? 'menu-unfold' : 'menu-fold'" (click)="isCollapsed = !isCollapsed"></span>
            </span>
            <nz-input-group [nzPrefix]="prefixTemplateUser" class="top-search-input">
              <input type="text" class="rounded-3xl" nz-input placeholder="Search" />
            </nz-input-group>
            <ng-template #prefixTemplateUser>
              <span class="material-symbols-rounded">search</span>
            </ng-template>
          </div>
          <div class="flex items-center justify-end">

            <nz-select ngModel="lucy" nzPlaceHolder="Select Store" [nzCustomTemplate]="defaultTemplate" nzSize="large" nz-icon="appstore-add" class="store-select">
              <nz-option nzValue="jack" nzLabel="Thamparam Inv Store"></nz-option>
              <nz-option nzValue="lucy" nzLabel="TirnelVeli Inv Store"></nz-option>
            </nz-select>

            <ng-template #defaultTemplate let-selected>
              <div class="flex justify-start items-center">
                <img src="assets/img/store.png" alt="Store" width="24" height="24" class="mr-2 rounded-full">
                <span>{{ selected.nzLabel }}</span>
              </div>
            </ng-template>
            <span class="top-icon mr-3">
              <span class="material-symbols-rounded">notifications_active</span>
            </span>
            <span class="top-icon mr-3">
              <span class="material-symbols-rounded">person</span>
            </span>
          </div>
        </span>

      </div>
    </nz-header>
    <nz-content>
      <div class="inner-content">
        <router-outlet></router-outlet>
      </div>
    </nz-content>
  </nz-layout>
</nz-layout>
  `,
  styles: [`
:host {
  display: flex;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.app-layout {
  height: 100vh;
}

.menu-sidebar {
  position: relative;
  z-index: 10;
  min-height: 100vh;
  box-shadow: 2px 0 6px rgba(0, 21, 41, .35);
  overflow: auto;
}

.header-trigger {
  height: 64px;
  padding: 20px 24px;
  font-size: 20px;
  cursor: pointer;
  transition: all .3s, padding 0s;
}

.trigger:hover {
  color: #1890ff;
}

.sidebar-logo {
  position: relative;
  height: 64px;
  padding-left: 24px;
  overflow: hidden;
  line-height: 64px;
  background: #001529;
  transition: all .3s;
}

.sidebar-logo img {
  display: inline-block;
  height: 32px;
  width: 32px;
  vertical-align: middle;
}

.sidebar-logo h1 {
  display: inline-block;
  margin: 0 0 0 20px;
  color: #fff;
  font-weight: 600;
  font-size: 14px;
  font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
  vertical-align: middle;
}

nz-header {
  padding: 0;
  width: 100%;
  z-index: 2;
}

.app-header {
  position: relative;
  height: 64px;
  padding: 0;
  background: #f0f2f5;
}

nz-content {
  margin: 10px;
}

.inner-content {
  height: 100%;
}


.top-icon {
  background: #ffffff;
  padding: 10px;
  border: 1px solid #e0e0e0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
}

.top-search-input {
  border-radius: 9px;
  padding: 7px;
  margin-top: 3px;
  width: 450px;
}
    `]
})
export class SideMenuComponent implements OnInit {
  isCollapsed = false;

  constructor() { }
  ngOnInit() { }

  menu: Menu[] = [
    new Menu('Dashboard', '/dashboard', 'dashboard', [
      new Menu('Admin Dashboard', '/dashboard/admin-dashboard'),
      new Menu('Sales Dashboard', '/dashboard/sales-dashboard')
    ]),
    new Menu('Inventory', '/inventory', 'appstore-add', [
      new Menu('Products', '/inventory/products'),
      new Menu('Create Product', '/inventory/create-products'),
      new Menu('Category', '/inventory/categories'),
      new Menu('Brands', '/inventory/brands'),
    ]),
    new Menu('Stack', '/stack', 'gold', [
      new Menu('Stack', '/products'),
      new Menu('Create Stack', '/categories'),
      new Menu('Stack Category', '/suppliers'),
    ]),
    new Menu('Sales', '/inventory', 'line-chart', [
      new Menu('Sales Orders', '/products'),
      new Menu('Sales Return', '/categories'),
      new Menu('Sales Invoice', '/suppliers'),
      new Menu('Sales Payment', '/customers')
    ]),
    new Menu('Purchases', '/inventory', 'money-collect', [
      new Menu('Purchase', '/products'),
      new Menu('Purchase Order', '/categories'),
      new Menu('Purchase Return', '/suppliers'),
    ]),
    new Menu('People', '/inventory', 'usergroup-add', [
      new Menu('Customer', '/products'),
      new Menu('Supplier', '/categories'),
      new Menu('Stores', '/suppliers'),
      new Menu('Warehouses', '/suppliers'),
    ]),
    new Menu('Reports', '/inventory', 'area-chart', [
      new Menu('Sales Report', '/products'),
      new Menu('Purchase Report', '/categories'),
      new Menu('Supplier Report', '/suppliers'),
      new Menu('Customer Report', '/suppliers'),
    ]),
    new Menu('Settings', '/inventory', 'setting', [
      new Menu('Profile', '/products'),
    ])
  ]


  logout() {
    localStorage.removeItem("token");
    location.pathname = "";
  }
}
