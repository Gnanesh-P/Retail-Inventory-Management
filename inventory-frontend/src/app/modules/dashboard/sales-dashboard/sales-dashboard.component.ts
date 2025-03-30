import { Component, OnInit } from '@angular/core';
import { CoreModuleModule } from "../../../core/core.module";
declare var echarts: any;


@Component({
  selector: 'app-sales-dashboard',
  templateUrl: './sales-dashboard.component.html',
  styleUrls: ['./sales-dashboard.component.scss'],
})
export class SalesDashboardComponent implements OnInit {
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
    var chartDom = document.getElementById('salesChart');
    var myChart = echarts.init(chartDom);

    // Chart options
    var option = {
      title: {
        text: 'Sales by Country',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: 'Sales',
          type: 'pie',
          radius: '50%',
          data: [
            { value: 1048, name: 'USA' },
            { value: 735, name: 'China' },
            { value: 580, name: 'India' },
            { value: 484, name: 'Germany' },
            { value: 300, name: 'UK' }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };

    // Set the options to the chart
    myChart.setOption(option);
  }
}
