import { Component, OnInit } from '@angular/core';
import { Drawer } from 'projects/inventory-core/src/lib/drawer';
import { Product } from 'projects/inventory-core/src/lib/inventory-models';
import { ApiData, CoreGridColumn, DATA_TYPE, DataQuery, hasValues, Language } from 'projects/inventory-core/src/lib/models';
import { CoreLazyGridInstance } from 'src/app/core/components/lazy-grid/lazy-grid';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  constructor(private api: ApiService) { }
  ngOnInit() {

    this.grid.setData({
      data: [
        {
          "id": "785c404d-f7c0-4def-8f0c-7c95979e330d",
          "name": "IPhone 13MAx",
          "barCode": "123456789",
          "sku": "SKU001",
          "perUnitPrice": 100.5,
          "brand": {
            "id": "d2d0267c-4ae6-4cbc-b2cd-db3a21114090",
            "name": "Apple",
          },
          "category": {
            "id": "e580dfcd-bd1c-42f1-aad1-fb8c61e307d3",
            "name": "Electronics",
          },
          "images": null,
          "tax": {
            "type": "STATE",
            "percentage": 10
          },
          "pieceCount": 20,

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

  drawer: Drawer = null
  grid = new CoreLazyGridInstance<Product>({
    title: "products",
    checkBox: true,
    columns: [
      new CoreGridColumn({ name: "name", displayName: "product", dataType: DATA_TYPE.STRING }),
      new CoreGridColumn({ name: "sku", displayName: "SKU", dataType: DATA_TYPE.STRING }),
      new CoreGridColumn({ name: "pieceCount", displayName: "item_count", dataType: DATA_TYPE.NUMBER }),
      new CoreGridColumn({ name: "perUnitPrice", displayName: "unit_price", dataType: DATA_TYPE.NUMBER }),
      new CoreGridColumn({ name: "brand.name", displayName: "brand", dataType: DATA_TYPE.STRING }),
      new CoreGridColumn({ name: "category.name", displayName: "category", dataType: DATA_TYPE.STRING }),
      new CoreGridColumn({ name: "tax.percentage", displayName: "tax_percentage", dataType: DATA_TYPE.NUMBER }),
    ],
    topIconAction: [
      { icon: "add_circle", toolTip: "add_new", callBack: () => { this.drawer.open("add_new_product"); this.drawer.width = "calc(100vw - 15px)" }, isButton: true },
      { icon: "delete_forever", toolTip: "delete", callBack: this.onDelete.bind(this) as any, isButton: true }
    ],
    rowIconAction: [
      { icon: "edit", name: "edit", callBack: (item: Product) => { this.drawer.open("edit_product", item) } },
      { icon: "delete_forever", name: "delete", callBack: this.onDelete.bind(this) },
    ]
  })

  openInsUpdPopup() { }
  onDelete() { }
  onEdit() { }
}
