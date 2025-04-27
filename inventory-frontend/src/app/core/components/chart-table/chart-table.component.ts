import { Component, Input, OnInit } from '@angular/core';
@Component({
  selector: 'core-chart-table',
  templateUrl: './chart-table.component.html',
  styleUrls: ['./chart-table.component.scss']
})
export class ChartTableComponent implements OnInit {
  constructor() { }
  ngOnInit() { }
  @Input() title: string = ''
  @Input() columns: { name: string, cssStyles: string, display: string }[] = []
  @Input() data: any[] = []
  @Input() showActions: boolean = false
  @Input() colSpan!: string;
}
