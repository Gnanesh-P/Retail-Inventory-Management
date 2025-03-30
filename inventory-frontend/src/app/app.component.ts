import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { hasValues, Menu } from 'projects/inventory-core/src/lib/models';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`
})
export class AppComponent {
  constructor(private router: Router) { }
  ngOnInit() {
    let token = localStorage.getItem("token")
    if (!hasValues(token)) {
      this.router.navigate(["home"])
    }
  }
}
