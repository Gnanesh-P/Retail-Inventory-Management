import { Component, OnInit } from '@angular/core';
import { Drawer } from 'projects/inventory-core/src/lib/drawer';
import { Brand, Product } from 'projects/inventory-core/src/lib/inventory-models';
import { ApiData, CoreGridColumn, DATA_TYPE, DataQuery, hasValues } from 'projects/inventory-core/src/lib/models';
import { CoreLazyGridInstance } from 'src/app/core/components/lazy-grid/lazy-grid';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss'],
})
export class StockComponent implements OnInit {
  constructor(private api: ApiService) { }
  drawer: Drawer = null
  ngOnInit() {
    this.grid.setData({
      data: [
        {
          "id": "785c404d-f7c0-4def-8f0c-7c95979e330d",
          "product": "Apple",
          "productCode": "ADS231",
          "category": "Fruits",
          "supplier": "Supplier A",
          "purchasePrice": 1.2,
          "sellingPrice": 1.5,
          "quantity": 100,
          "unit": "kg",
        },
        {
          "id": "785c404d-f7c0-4def-8f0c-7c95979e330d",
          "product": "Mango",
          "productCode": "ADS231",
          "category": "Fruits",
          "supplier": "Supplier A",
          "purchasePrice": 1.2,
          "sellingPrice": 1.5,
          "quantity": 100,
          "unit": "kg",
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
    title: "Stocks",
    checkBox: true,
    columns: [
      new CoreGridColumn({ name: "product", displayName: "Product", dataType: DATA_TYPE.STRING }),
      new CoreGridColumn({ name: "productCode", displayName: "Product Code", dataType: DATA_TYPE.STRING }),
      new CoreGridColumn({ name: "category", displayName: "Category", dataType: DATA_TYPE.STRING }),
      new CoreGridColumn({ name: "supplier", displayName: "Supplier", dataType: DATA_TYPE.STRING }),
      new CoreGridColumn({ name: "purchasePrice", displayName: "Purchase Price", dataType: DATA_TYPE.STRING }),
      new CoreGridColumn({ name: "sellingPrice", displayName: "Selling Price", dataType: DATA_TYPE.STRING }),
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
