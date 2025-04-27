import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Drawer } from 'projects/inventory-core/src/lib/drawer';
import { Brand, Category } from 'projects/inventory-core/src/lib/inventory-models';
import { hasValues, markAsDirty } from 'projects/inventory-core/src/lib/models';
import { filter } from 'rxjs';
import { AlertService } from 'src/app/services/alert.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-category-drawer',
  templateUrl: './category-drawer.component.html',
  styleUrls: ['./category-drawer.component.scss'],
})
export class CategoryDrawerComponent implements OnInit {
  constructor(private api: ApiService, private fb: FormBuilder, private alert: AlertService) { }
  ngOnInit() {
    this.drawer.emit(this.categoryDrawer);
    this.categoryDrawer.width = 500;

    this.categoryDrawer.events.pipe(filter(x => x == "OPEN")).subscribe(res => {
      if (hasValues(this.categoryDrawer.data)) {
        this.form.patchValue({
          name: this.categoryDrawer.data.name,
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

  categoryDrawer = new Drawer();
  insertUpdateCategory() {
    markAsDirty(this.form)
    if (this.form.invalid) {
      this.alert.warning({ msg: "Please fill the form" })
      return;
    }

    this.categoryDrawer.loading = true;
    const temp = this.form.getRawValue();
    let parameter: Category = {
      name: temp.name,
    }
    if (hasValues(this.categoryDrawer.data) && hasValues(this.categoryDrawer.data.id)) {
      parameter.id = this.categoryDrawer.data.id
      this.api.updateCategory(parameter).subscribe({
        next: res => {
          this.categoryDrawer.loading = false;
          this.categoryDrawer.close()
          this.alert.success({ msg: parameter.name + " updated successfully" })
        },
        error: (err: HttpErrorResponse) => {
          this.categoryDrawer.loading = false;
          this.alert.error({ msg: err.error.message })
        }
      })
    } else {
      this.api.createCategory(parameter).subscribe({
        next: res => {
          this.categoryDrawer.loading = false;
          this.categoryDrawer.close()
          this.alert.success({ msg: parameter.name + " created successfully" })
        },
        error: (err: HttpErrorResponse) => {
          this.categoryDrawer.loading = false;
          this.alert.error({ msg: err.error.message })
        }
      })
    }
  }
}
