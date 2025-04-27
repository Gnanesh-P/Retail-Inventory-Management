import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Drawer } from 'projects/inventory-core/src/lib/drawer';
import { Brand } from 'projects/inventory-core/src/lib/inventory-models';
import { hasValues, markAsDirty } from 'projects/inventory-core/src/lib/models';
import { filter } from 'rxjs';
import { AlertService } from 'src/app/services/alert.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-brand-drawer',
  templateUrl: './brand-drawer.component.html',
  styleUrls: ['./brand-drawer.component.scss'],
})
export class BrandDrawerComponent implements OnInit {
  constructor(private api: ApiService, private fb: FormBuilder, private alert: AlertService) { }
  ngOnInit() {
    this.drawer.emit(this.brandDrawer);
    this.brandDrawer.width = 500;

    this.brandDrawer.events.pipe(filter(x => x == "OPEN")).subscribe(res => {
      if (hasValues(this.brandDrawer.data)) {
        this.form.patchValue({
          name: this.brandDrawer.data.name,
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

  brandDrawer = new Drawer();
  insertUpdateBrand() {
    markAsDirty(this.form)
    if (this.form.invalid) {
      this.alert.warning({ msg: "Please fill the form" })
      return;
    }

    this.brandDrawer.loading = true;
    const temp = this.form.getRawValue();
    let parameter: Brand = {
      name: temp.name,
    }
    if (hasValues(this.brandDrawer.data) && hasValues(this.brandDrawer.data.id)) {
      parameter.id = this.brandDrawer.data.id
      this.api.updateBrand(parameter).subscribe({
        next: res => {
          this.brandDrawer.loading = false;
          this.brandDrawer.close()
          this.alert.success({ msg: parameter.name + " updated successfully" })
        },
        error: (err: HttpErrorResponse) => {
          this.brandDrawer.loading = false;
          this.alert.error({ msg: err.error.message })
        }
      })
    } else {
      this.api.createBrand(parameter).subscribe({
        next: res => {
          this.brandDrawer.loading = false;
          this.brandDrawer.close()
          this.alert.success({ msg: parameter.name + " created successfully" })
        },
        error: (err: HttpErrorResponse) => {
          this.brandDrawer.loading = false;
          this.alert.error({ msg: err.error.message })
        }
      })
    }
  }
}
