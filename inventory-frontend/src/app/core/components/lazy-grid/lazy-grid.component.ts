import { Component, Input } from '@angular/core';
import { CoreLazyGridInstance } from './lazy-grid';
import { NzContextMenuService, NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';
import { CoreGridColumn, DATA_TYPE } from 'projects/inventory-core/src/lib/models';

@Component({
  selector: 'core-lazy-grid',
  templateUrl: './lazy-grid.component.html',
  styleUrls: ['./lazy-grid.component.scss']
})
export class GridLazyComponent {

  constructor(private nzContextMenuService: NzContextMenuService) { }
  @Input() instance!: CoreLazyGridInstance

  getStyle(col: CoreGridColumn, row: any) {
    if (col.style && col.style(row) != null) {
      return col.style(row) || {}
    } else return {}
  }

  get colSpan() {
    return this.instance.columns.filter(x => !x.hidden).length + (this.instance.checkBox ? 1 : 0) + (this.instance.rowIconAction.length > 0 ? 1 : 0)
  }

  DATA_TYPE = DATA_TYPE
  getImageUrl(data: any) {
    if (typeof data === 'object' && Array.isArray(data) && data.length > 0)
      return data[0].thumbUrl;
    else return data;
  }

  onRightClick($event: MouseEvent, menu: NzDropdownMenuComponent, row: any, index: number) {
    this.instance.selectedRowIndex = index
    this.instance.rightClickSelectedRow = row;
    this.nzContextMenuService.create($event, menu)
  }

  onClickRow(row: any, index: number) {
    this.instance.selectedRowIndex = index
    this.instance.rightClickSelectedRow = row;
  }
}
