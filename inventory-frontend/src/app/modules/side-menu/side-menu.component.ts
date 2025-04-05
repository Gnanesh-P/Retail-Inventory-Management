import { Component, OnInit } from '@angular/core';
import { Menu } from 'projects/inventory-core/src/lib/models';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {
  isCollapsed = false;

  constructor() { }
  ngOnInit() {

  }

  menu: Menu[] = [
    new Menu('Admin Dashboard', '/dashboard/admin-dashboard', 'bar_chart_4_bars'),
    new Menu('Sales Dashboard', '/dashboard/sales-dashboard', 'bar_chart_4_bars'),
    new Menu('Inventory', '/inventory', 'inventory', [
      new Menu('Products', '/inventory/products'),
      new Menu('Create Product', '/inventory/create-products'),
      new Menu('Category', '/inventory/categories'),
      new Menu('Brands', '/inventory/brands'),
    ]),
    new Menu('Warehouses', '/warehouse', 'warehouse'),
    new Menu('Stack', '/stack', 'stacks', [
      new Menu('Stack', '/products'),
      new Menu('Create Stack', '/categories'),
      new Menu('Stack Category', '/suppliers'),
    ]),
    new Menu('Sales', '/inventory', 'real_estate_agent', [
      new Menu('Sales Orders', '/products'),
      new Menu('Sales Return', '/categories'),
      new Menu('Sales Invoice', '/suppliers'),
      new Menu('Sales Payment', '/customers')
    ]),
    new Menu('Purchases', '/inventory', 'shopping_bag_speed', [
      new Menu('Purchase', '/products'),
      new Menu('Purchase Order', '/categories'),
      new Menu('Purchase Return', '/suppliers'),
    ]),
    new Menu('People', '/inventory', 'group', [
      new Menu('Customer', '/products'),
      new Menu('Supplier', '/categories'),
      new Menu('Stores', '/suppliers'),
      new Menu('Warehouses', '/suppliers'),
    ]),
    new Menu('Reports', '/inventory', 'lab_profile', [
      new Menu('Sales Report', '/products'),
      new Menu('Purchase Report', '/categories'),
      new Menu('Supplier Report', '/suppliers'),
      new Menu('Customer Report', '/suppliers'),
    ]),
    new Menu('Settings', '/inventory', 'tune', [
      new Menu('Profile', '/products'),
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
    if (location.pathname.split("/").filter(x => x).length <= 1)
      return;
    var parentMenu = location.pathname.split("/").filter(x => x)[0];
    var item = this.menu.find(y => y.tagId == ("menu-" + ("/" + parentMenu).split("/").join("_")));
    if (item) {
      this.toggleMenu(document.getElementById(item.tagId) as HTMLAnchorElement);
    }
  }
}
