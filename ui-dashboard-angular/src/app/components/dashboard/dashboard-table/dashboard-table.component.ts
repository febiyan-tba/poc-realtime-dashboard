import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-dashboard-table',
  templateUrl: './dashboard-table.component.html',
  styleUrls: ['./dashboard-table.component.css']
})
export class DashboardTableComponent implements OnInit {

  // MaterialTable
  displayedColumns: Array<string>;
  dataSource: MatTableDataSource<Element>;

  // NgxCharts chart data
  chartData: Element[] = [
      {
      name: 'Jakarta',
      value: 100
    }, {
      name: 'Copenhagen',
      value: 101
    }, {
      name: 'Istanbul',
      value: 70
    }
  ];

  constructor() {
    this.displayedColumns = ['name', 'value'];
    this.dataSource = new MatTableDataSource(this.chartData);
  }

  ngOnInit() {
  }
}

// Cluttered.
export interface Element {
  name: string;
  value: number;
}
