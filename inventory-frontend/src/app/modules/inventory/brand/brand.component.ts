import { Component, OnInit } from '@angular/core';
import { Drawer } from 'projects/inventory-core/src/lib/drawer';
import { Brand, Product } from 'projects/inventory-core/src/lib/inventory-models';
import { ApiData, CoreGridColumn, DATA_TYPE, DataQuery, hasValues } from 'projects/inventory-core/src/lib/models';
import { CoreLazyGridInstance } from 'src/app/core/components/lazy-grid/lazy-grid';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss'],
})
export class BrandComponent implements OnInit {
  constructor(private api: ApiService) { }
  drawer: Drawer = null
  ngOnInit() {
    this.grid.setData({
      data: [
        {
          "id": "785c404d-f7c0-4def-8f0c-7c95979e330d",
          "name": "Apple",
        }
      ] as any, total: 10
    })

    // this.grid.onQueryChange.subscribe(res => {
    //   this.loadProducts(res);
    // })
  }


  loadProducts(query: DataQuery) {
    if (!hasValues(query)) query = new DataQuery();
    this.grid.loading = true;
    this.api.getAllProduct(query.getQueryUrl()).subscribe({
      next: (res: ApiData<Product[]>) => {
        this.grid.setData({ data: res.data, total: res.totalCount })
        this.grid.loading = false;
      }
    })
  }

  grid = new CoreLazyGridInstance<Product>({
    title: "Brands",
    checkBox: true,
    columns: [
      new CoreGridColumn({ name: "name", displayName: "Brand", dataType: DATA_TYPE.STRING }),
    ],
    topIconAction: [
      { icon: "add_circle", toolTip: "Add New", callBack: () => { this.drawer.open("Add New Brand") }, isButton: true },
      { icon: "delete_forever", toolTip: "Delete", callBack: this.onDelete.bind(this) as any, isButton: true }
    ],
    rowIconAction: [
      { icon: "edit", name: "Edit", callBack: (item: Brand) => { this.drawer.open("Edit Brand", item) } },
      { icon: "delete_forever", name: "Delete", callBack: this.onDelete.bind(this) },
    ]
  })

  onDelete() { }
  onEdit() { alert("dsf") }
}
