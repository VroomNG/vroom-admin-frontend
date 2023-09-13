import { Component, OnInit,ViewChild,TemplateRef } from '@angular/core';
// import Chart from 'chart.js';
// import { chartService } from '../../service/chart.service';
import { Router, ActivatedRoute } from '@angular/router';
import { driverService } from '../../service/driver.service';
// core components
// import { chartOptions, parseOptions } from "../../variables/charts";
import { LocationStrategy } from '@angular/common';
import { LoginService } from '../../service/login.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  dashboardList: any;
  public data: any;
  token: any;
  
  allTabs: any;
  // name = '!!!';
  viewMode = 'tab1';
  currentYear: number = new Date().getFullYear();
  constructor(
    // private reportService: chartService,
    private location: LocationStrategy,
    private route: Router,
    private router: ActivatedRoute,
    private service: driverService,
    private loginService: LoginService
  ) {


    history.pushState(null, window.location.href);
    this.location.onPopState(() => {
      history.pushState(null, window.location.href);
    });

    if (localStorage['token'] != "" || localStorage['token'] != undefined) {
      this.token = localStorage['token'];
    }
    else {
      this.route.navigate(['/login']);
    }

  }

  ngOnInit() {
    this.getDashboard();
    this.loginService.addInteraction(sessionStorage.getItem('email'),"Viewed Report ").subscribe((result:any) => {});        
    // this.getDRevenue(2021);       
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

  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }
}


