import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { hasValues } from 'projects/inventory-core/src/lib/models';

@Component({
  selector: 'app-auth',
  template: `<router-outlet></router-outlet>`,
})
export class AuthComponent implements OnInit {
  constructor(private router: Router) { }
  ngOnInit() {
    let token = localStorage.getItem("token")
    if (!hasValues(token)) {
      this.router.navigate(["home"])
    }
  }
}
