import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Drawer } from 'projects/inventory-core/src/lib/drawer';
import { Menu } from 'projects/inventory-core/src/lib/models';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {
  isCollapsed = false;
  constructor(private route: ActivatedRoute, public language: LanguageService) { }
  ngOnInit() { }
  notificationDrawer: Drawer
  profileDrawer: Drawer
  sideMenu: Menu[] = [
    new Menu(this.language, 'admin_dashboard', '/dashboard/admin-dashboard', 'bar_chart_4_bars'),
    new Menu(this.language, 'sales_dashboard', '/dashboard/sales-dashboard', 'bar_chart_4_bars'),
    new Menu(this.language, 'inventory', '/inventory', 'inventory', [
      new Menu(this.language, 'product', '/inventory/products'),
      new Menu(this.language, 'create_product', '/inventory/create-products'),
      new Menu(this.language, 'categories', '/inventory/categories'),
      new Menu(this.language, 'brands', '/inventory/brands'),
    ]),
    new Menu(this.language, 'warehouses', '/warehouse', 'warehouse'),
    new Menu(this.language, 'stock', '/stock', 'stacks', [
      new Menu(this.language, 'stock', '/stock/stocks'),
      new Menu(this.language, 'create_stock', '/categories'),
      new Menu(this.language, 'stock_category', '/suppliers'),
    ]),
    new Menu(this.language, 'sales', '/inventory', 'real_estate_agent', [
      new Menu(this.language, 'sales_orders', '/products'),
      new Menu(this.language, 'sales_return', '/categories'),
      new Menu(this.language, 'sales_invoice', '/suppliers'),
      new Menu(this.language, 'sales_payment', '/customers')
    ]),
    new Menu(this.language, 'purchase', '/inventory', 'shopping_bag_speed', [
      new Menu(this.language, 'purchase', '/products'),
      new Menu(this.language, 'purchase_order', '/categories'),
      new Menu(this.language, 'purchase_return', '/suppliers'),
    ]),
    new Menu(this.language, 'people', '/inventory', 'group', [
      new Menu(this.language, 'customers', '/products'),
      new Menu(this.language, 'suppliers', '/categories'),
      new Menu(this.language, 'stores', '/suppliers'),
      new Menu(this.language, 'warehouses', '/suppliers'),
    ]),
    new Menu(this.language, 'reports', '/inventory', 'lab_profile', [
      new Menu(this.language, 'sales_report', '/products'),
      new Menu(this.language, 'purchase_report', '/categories'),
      new Menu(this.language, 'supplier_report', '/suppliers'),
      new Menu(this.language, 'customer_report', '/suppliers'),
    ]),
    new Menu(this.language, 'settings', '/inventory', 'tune', [
      new Menu(this.language, 'profile', '/products'),
    ])
  ]

  logout() {
    localStorage.removeItem("token");
    location.pathname = "";
  }

  toggleMenu(liTag: HTMLAnchorElement) {
    if (liTag.parentElement.nodeName !== "LI")
      return

    (liTag.parentElement as HTMLLIElement).childNodes.forEach(x => {
      if (x.nodeName == "UL") {
        if ((x as HTMLUListElement).classList.contains("hidden"))
          liTag.querySelector("a>span").textContent = "keyboard_arrow_up"
        else
          liTag.querySelector("a>span").textContent = "keyboard_arrow_down";
        (x as HTMLUListElement).classList.toggle("hidden")
      }
    })
  }

  ngAfterViewInit() {
    console.log(location.pathname.split("/").filter(x => x));
    if (location.pathname.split("/").filter(x => x).length <= 2)
      return;
    var parentMenu = location.pathname.split("/").filter(x => x)[2];
    var item = this.sideMenu.find(y => y.tagId == ("menu-" + ("/" + parentMenu).split("/").join("_")));
    if (item) {
      this.toggleMenu(document.getElementById(item.tagId) as HTMLAnchorElement);
    }
  }
}
