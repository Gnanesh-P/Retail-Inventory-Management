import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Drawer } from 'projects/inventory-core/src/lib/drawer';
import { Product } from 'projects/inventory-core/src/lib/inventory-models';
import { hasValues, markAsDirty } from 'projects/inventory-core/src/lib/models';
import { filter } from 'rxjs';
import { AlertService } from 'src/app/services/alert.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-product-drawer',
  templateUrl: './product-drawer.component.html',
  styleUrls: ['./product-drawer.component.scss'],
})
export class ProductDrawerComponent implements OnInit {
  constructor(private api: ApiService, private fb: FormBuilder, private alert: AlertService) { }
  ngOnInit() {
    this.drawer.emit(this.productDrawer);
    this.productDrawer.width = 500;

    this.productDrawer.events.pipe(filter(x => x == "OPEN")).subscribe(res => {
      if (hasValues(this.productDrawer.data)) {
        this.form.patchValue({
          name: this.productDrawer.data.name,
        })
      } else {
        this.form.reset();
      }
    })
  }

  @Output() drawer: EventEmitter<Drawer> = new EventEmitter();
  form = this.fb.group({
    name: [null, [Validators.required]],
  })

  productDrawer = new Drawer();
  insertUpdateProduct() {
    markAsDirty(this.form)
    if (this.form.invalid) {
      this.alert.warning({ msg: "Please fill the form" })
      return;
    }

    this.productDrawer.loading = true;
    const temp = this.form.getRawValue();
    let parameter: any = {
      name: temp.name,
    }
    if (hasValues(this.productDrawer.data) && hasValues(this.productDrawer.data.id)) {
      parameter.id = this.productDrawer.data.id
      this.api.updateProduct(parameter).subscribe({
        next: res => {
          this.productDrawer.loading = false;
          this.productDrawer.close()
          this.alert.success({ msg: parameter.name + " updated successfully" })
        },
        error: (err: HttpErrorResponse) => {
          this.productDrawer.loading = false;
          this.alert.error({ msg: err.error.message })
        }
      })
    } else {
      this.api.createProduct(parameter).subscribe({
        next: res => {
          this.productDrawer.loading = false;
          this.productDrawer.close()
          this.alert.success({ msg: parameter.name + " created successfully" })
        },
        error: (err: HttpErrorResponse) => {
          this.productDrawer.loading = false;
          this.alert.error({ msg: err.error.message })
        }
      })
    }
  }
}
