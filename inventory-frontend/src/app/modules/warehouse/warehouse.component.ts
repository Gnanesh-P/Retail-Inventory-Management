import { Component, OnInit } from '@angular/core';
import { Drawer } from 'projects/inventory-core/src/lib/drawer';
import { Warehouse } from 'projects/inventory-core/src/lib/inventory-models';
import { DataQuery, hasValues, ApiData, CoreGridColumn, DATA_TYPE } from 'projects/inventory-core/src/lib/models';
import { CoreLazyGridInstance } from 'src/app/core/components/lazy-grid/lazy-grid';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.scss']
})
export class WarehouseComponent implements OnInit {
  constructor(private api: ApiService) { }
  ngOnInit() {

    this.grid.setData({
      data: [
        {
          "id": "785c404d-f7c0-4def-8f0c-7c95979e330d",
          "name": "Electronics",
          "address": "New York",
        }
      ] as any, total: 10
    })

    // this.grid.onQueryChange.subscribe(res => {
    //   this.loadWarehouses(res);
    // })
  }


  loadWarehouses(query: DataQuery) {
    if (!hasValues(query)) query = new DataQuery();
    this.grid.loading = true;
    this.api.getAllWarehouse(query.getQueryUrl()).subscribe({
      next: (res: ApiData<Warehouse[]>) => {
        this.grid.setData({ data: res.data, total: res.totalCount })
        this.grid.loading = false;
      }
    })
  }

  drawer: Drawer = null
  grid = new CoreLazyGridInstance<Warehouse>({
    title: "Warehouses",
    checkBox: true,
    columns: [
      new CoreGridColumn({ name: "name", displayName: "Warehouse Name", dataType: DATA_TYPE.STRING }),
      new CoreGridColumn({ name: "address", displayName: "Location", dataType: DATA_TYPE.STRING }),
    ],
    topIconAction: [
      { icon: "add_circle", toolTip: "Add New", callBack: () => { this.drawer.open("Add New Warehouse") }, isButton: true },
      { icon: "delete_forever", toolTip: "Delete", callBack: this.onDelete.bind(this) as any, isButton: true }
    ],
    rowIconAction: [
      { icon: "edit", name: "Edit", callBack: (item: Warehouse) => { this.drawer.open("Edit Warehouse", item) } },
      { icon: "delete_forever", name: "Delete", callBack: this.onDelete.bind(this) },
    ]
  })

  onDelete() { }
}
