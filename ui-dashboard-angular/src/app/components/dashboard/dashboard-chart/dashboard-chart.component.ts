import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketService } from '../../../services/socket.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-dashboard-chart',
  templateUrl: './dashboard-chart.component.html',
  styleUrls: ['./dashboard-chart.component.css']
})
export class DashboardChartComponent implements OnInit, OnDestroy {
  // NgxCharts
  // Pie Chart
  showLabels= true;
  explodeSlices= false;
  doughnut= false;
  showLegend= true;
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  // Line Chart
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showXAxisLabel = true;
  xAxisLabel = 'Window Start';
  showYAxisLabel = true;
  yAxisLabel = 'Sales';

  // NgxCharts chart data
  pieChartData = [];
  lineChartData = [];

  // Socket.io
  private connection;
  constructor(private socketService: SocketService) { }

  ngOnInit() {
    this.connection = this.socketService.getTransactionSummary().subscribe(transaction => {
      console.log(transaction);
      this.updatePieChart(transaction);
      this.updateLineChart(transaction);
    });
  }

  ngOnDestroy() {
    this.connection.unsubscribe();
  }

  updatePieChart(transaction) {
    const categoryIndex = _.findIndex(this.pieChartData, { 'name' : transaction.category });
    if (categoryIndex !== -1) {
      this.pieChartData[categoryIndex].value += transaction.sum_sales;
    } else {
      this.pieChartData.push({
        'name': transaction.category,
        'value': + transaction.sum_sales
      });
    }
    this.pieChartData = [...this.pieChartData];
  }

  updateLineChart(transaction) {
    // The category index will be the start
    const categoryIndex = _.findIndex(this.lineChartData, { 'name' : transaction['category'] });
    if (categoryIndex !== -1) {
      const seriesIndex = _.findIndex(this.lineChartData['series'], { 'name' : transaction['window']['start'] });
      if (seriesIndex !== -1) {
        this.lineChartData[categoryIndex]['series'][seriesIndex]['value'] = transaction['sum_sales'];
      } else {
        this.lineChartData[categoryIndex]['series'].push({
          'name': transaction['window']['start'],
          'value': +transaction['sum_sales']
        });
      }
    } else {
      this.lineChartData.push({
        'name': transaction['category'],
        'series': [{
          'name': transaction['window']['start'],
          'value': +transaction['sum_sales']
        }]
      });
    }
    this.lineChartData = [...this.lineChartData];
  }
}

