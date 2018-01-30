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

  // NgxCharts chart data
  pieChartData = [];
  lineChartData = [];

  // Socket.io
  private connection;
  constructor(private socketService: SocketService) { }

  ngOnInit() {
    this.connection = this.socketService.getTransactionSummary().subscribe(transaction => {
      this.updatePieChart(transaction);
      this.updateLineChart(transaction);
    });
  }

  ngOnDestroy() {
    this.connection.unsubscribe();
  }

  updatePieChart(transaction) {
    const categoryIndex = _.findIndex(this.pieChartData, { 'name' : transaction['category'] });
    if (categoryIndex !== -1) {
      this.pieChartData[categoryIndex].value += transaction['sales'];
    } else {
      this.pieChartData.push({
        'name': transaction['category'],
        'value': +transaction['sales']
      });
    }
    this.pieChartData = [...this.pieChartData];
  }

  updateLineChart(transaction) {
    const date = new Date();
    const timeString = date.getMinutes().toString().padStart(2, '0') + date.getSeconds().toString().padStart(2, '0');
    const categoryIndex = _.findIndex(this.lineChartData, { 'name' : transaction['category'] });
    if (categoryIndex !== -1) {
      const seriesIndex = _.findIndex(this.lineChartData['series'], { 'name' : timeString });
      if (seriesIndex !== -1) {
        this.lineChartData[categoryIndex]['series'][seriesIndex]['value'] += transaction['sales'];
      } else {
        this.lineChartData[categoryIndex]['series'].push({
          'name': timeString,
          'value': +transaction['sales']
        });
      }
    } else {
      this.lineChartData.push({
        'name': transaction['category'],
        'series': [{
          'name': timeString,
          'value': +transaction['sales']
        }]
      });
    }
    this.lineChartData = [...this.lineChartData];
  }
}

