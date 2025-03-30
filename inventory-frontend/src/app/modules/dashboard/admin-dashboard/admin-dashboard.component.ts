import { Component, OnInit } from '@angular/core';
import { CoreModuleModule } from "../../../core/core.module";
declare var echarts: any;


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent implements OnInit {
  constructor() { }
  ngOnInit() {

  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.salesPurchaseTrendsChart();
      this.salesPurchaseComparisonChart();
    }, 0);
  }

  salesPurchaseTrendsChart() {
    var lineChart = echarts.init(document.getElementById('salesPurchaseTrends'));
    var lineOption = {
      tooltip: { trigger: 'axis' },
      legend: { data: ['Sales', 'Purchase'] },
      xAxis: { type: 'category', data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'] },
      yAxis: { type: 'value' },
      series: [
        { name: 'Sales', type: 'line', data: [120, 200, 150, 80, 70, 110], color: '#4CAF50' },
        { name: 'Purchase', type: 'line', data: [90, 140, 180, 130, 60, 100], color: '#FF9800' }
      ]
    };
    lineChart.setOption(lineOption);
  }

  salesPurchaseComparisonChart() {
    var barChart = echarts.init(document.getElementById('salesPurchaseComparison'));
    var barOption = {
      tooltip: { trigger: 'axis' },
      legend: { data: ['Sales', 'Purchase'] },
      xAxis: { type: 'category', data: ['Q1', 'Q2', 'Q3', 'Q4'] },
      yAxis: { type: 'value' },
      series: [
        { name: 'Sales', type: 'bar', data: [400, 500, 600, 700], color: '#3B82F6' },
        { name: 'Purchase', type: 'bar', data: [300, 400, 500, 600], color: '#F87171' }
      ]
    };
    barChart.setOption(barOption);
  }
}
