import { Component, OnInit } from '@angular/core';
// import Chart from 'chart.js';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { driverService } from '../../service/driver.service';
import { chartService } from '../../service/chart.service';

import { LocationStrategy } from '@angular/common';


// core components
// import {
//   chartOptions,
//   parseOptions,
//   chartExample1,
//   //chartExample2
// } from "../../variables/charts";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

  // bar chart start
  chartExample2 = {
    options: {
      scales: {
        xAxes: [{
          barThickness: 100,
          maxBarThickness: 20,
        }],
        yAxes: [
          {
            ticks: {
              callback: function (value:any) {
                if (!(value % 1)) {
                  //return '$' + value + 'k'
                  return value;
                }
              }
            }
          }
        ]
      },
      tooltips: {
        callbacks: {
          label: function (item:any, data:any) {
            var label = data.datasets[item.datasetIndex].label || "";
            var yLabel = item.yLabel;
            var content = "";
            if (data.datasets.length > 1) {
              content += label;
            }
            content += yLabel;
            return content;
          }
        }
      }
    },
    data: {
      labels: [],
      datasets: [
        {
          label: "Registered User",
          data: [],
        }
      ]
    }
  }
  // bar chart start


  token: any;
  dashboardList: any;
  chartView: any;

  sortedData!: any[];

  public datasets: any;
  public data: any;
  public salesChart:any;
  public clicked: boolean = true;
  public clicked1: boolean = false;
  user_type:any;


  // bar chart
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels!: string[];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;

  public barChartData: any[] = [
    { data: [], label: 'Volume Sales' },
    // { data: [], label: 'Value Sales' }
  ];

  constructor(
    private formBuilder: FormBuilder,
    private route: Router,
    private router: ActivatedRoute,
    private service: driverService,
    private chartViewService: chartService,
    private location: LocationStrategy,
  ) {

    history.pushState(null,  window.location.href);
    this.location.onPopState(() => {
      history.pushState(null, window.location.href);
    });


    if (localStorage['token'] != "" || localStorage['token'] != undefined) {
      this.token = localStorage['token'];
    }
    else{
      this.route.navigate(['/login']);
    }
    this.user_type = (localStorage['user_type'] != undefined ? localStorage['user_type'] : '')

  }

  ngOnInit() {

    this.datasets = [
      [0, 20, 10, 30, 15, 40, 20, 60, 60],
      [0, 20, 5, 25, 10, 30, 15, 40, 40]
    ];
    this.data = this.datasets[0];
    // parseOptions(Chart, chartOptions());
    // var chartSales = document.getElementById('chart-sales');
    // // debugger;
    // this.salesChart = new Chart(chartSales, {
    //   type: 'line',
    //   options: chartExample1.options,
    //   data: chartExample1.data,
    // });

    this.getDashboard();
    this.getCharts();
  }

  public updateOptions() {
    this.salesChart.data.datasets[0].data = this.data;
    this.salesChart.update();
  }

  getDashboard() {
    // debugger;
    this.dashboardList = [];
    const inputRequest = {
      token: this.token
    };
    this.service.getDashboardList(inputRequest).subscribe((result: any) => {
      // debugger;
      this.dashboardList = [];
      if (result) {
        if (result.data) {
          // console.log("Dashboard RESULT ==>",result.data);
          this.dashboardList = result.data;
        }
      }
    });
  }

  exportAdmin(){

  }
  editAdmin(){

  }


  getCharts() {
    debugger;
    this.chartView = [];
    const inputRequest = {
      token: this.token
    };

    this.chartViewService.getChartList(inputRequest).subscribe((result: any) => {
      debugger;
      this.chartView = [];
      if (result) {
        if (result.data) {
          this.chartView = result.data;
          // console.log('chart view ==>', this.chartView);
          var x = Object.keys(this.chartView[0]);
          // var y = Object.values(this.chartView[0]);
          var y = Object.keys(this.chartView[0]).map((item) => this.chartView[0][item]);
          // this.chartExample2.data.labels = x;
          // this.chartExample2.data.datasets[0].data = y;
          // console.log('data-x', y);
          // console.log('data-y', this.chartExample2.data.datasets[0].data);
          var chartOrders = document.getElementById('chart-orders');
          // var ordersChart = new Chart(chartOrders, {
          //   type: 'bar',
          //   options: this.chartExample2.options,
          //   data: this.chartExample2.data,
          // });

        }
      }
    });
  }




}
