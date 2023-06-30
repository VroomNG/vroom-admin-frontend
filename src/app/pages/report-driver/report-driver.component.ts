import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
// import { driverInfo } from '../../model/driverInfo';
import { driverService } from '../../service/driver.service';
import { exportService } from '../../service/export.service';
// import { passengerService } from '../../service/passenger.service';
// import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { chartOptions, parseOptions } from "../../variables/charts";
import Chart from 'chart.js';
import { chartService } from '../../service/chart.service';
@Component({
  selector: 'app-report-driver',
  templateUrl: './report-driver.component.html',
  styleUrls: ['./report-driver.component.css']
})
export class ReportDriverComponent implements OnInit {
  public ascNumberSort = true;
  booleanValue: any = true;
  column: string = 'CategoryName';
  token: any;
  isFormReady: boolean = false;
  PermissionEnable: any;
  pagePath: any;
  FilterName: any;
  driverList = [];
  driverStatus: any;
  driverFil = [{ "id": 0, "value": "All" }, { "id": 1, "value": "Active" }, { "id": 2, "value": "InActive" }];
  driverOnline = [{ "id": 2, "value": "All" }, { "id": 0, "value": "Offline" }, { "id": 1, "value": "Online" }];
  dayDisable: boolean = false;
  closeResult = '';
  errorMessage: any;
  // items = [];  // chart
  SecondaryObject: any; SecondaryObject1: any;
  arrayValue2: any = []; arrayValue2can: any = [];
  arrayKeys2: any; arrayKeys2can: any;
  tempArray2: any;
  arrayValue3: any;
  arrayKeys3: any;
  pageOfItems: Array<any>;
  public pieChart;
  backgroundColor: any;
  currentYear: number = new Date().getFullYear();
  constructor(
    private formBuilder: FormBuilder,
    private route: Router,
    private router: ActivatedRoute,
    private service: driverService,
    // private service123: passengerService,
    // private modalService: NgbModal,
    private service1: exportService,
    private reportService: chartService
  ) {
    debugger;
    if (localStorage.token != "" || localStorage.token != undefined) {
      this.token = localStorage.token;
    }
    else
      this.route.navigate(['/login']);

    this.router.params.subscribe((response: any) => {
      console.log('params data ==>', response)
      this.driverStatus = 1; //response.id == undefined ? 0 : Number(response.id);
      localStorage.setItem('driverStatus', this.driverStatus);
    });
  }

  ngOnInit(): void {
    debugger;    
    this.getDriverView(0, '', '', this.currentYear, '');
    // this.items = Array(150).fill(0).map((x, i) => ({ id: (i + 1), name: `Item ${i + 1}`}));   
    this.pagePath = '1'; //this.pagePath[this.pagePath.length - 1];
    this.getActiveDriver(this.currentYear, '', '','');
  }
  getDriverView(filt, days, isOnline, year, filter) {
    debugger;
    var inputRequest;
    debugger; this.driverList = [];

    inputRequest = {
      token: this.token,
      isonline: (isOnline != '2'?isOnline:''),
      year: year,
      filter: (filter != undefined && filter != '0' ? filter : '')
    };
    // console.log("driverStatus ==> ", this.driverStatus);
    if (this.driverStatus == 1) {
      inputRequest.days = days;

      this.service.getDriverListReport(inputRequest, filt).subscribe((result: any) => {
        debugger;
        this.driverList = [];
        if (result) {
          if (result.data.length) {
            console.log("RESULT ==>", result.data);
            this.driverList = result.data;

          }
        }
      })
    }
    else {
      this.service.getDriverList(inputRequest, this.driverStatus).subscribe((result: any) => {
        this.driverList = [];
        if (result) {
          if (result.data.length) {
            this.driverList = result.data;
          }
        }
      })
    }
  }
  onChangePage(pageOfItems: Array<any>) {
    debugger;
    // update current page of items
    this.pageOfItems = pageOfItems;
    // // console.log("page names", this.pageOfItems)
    // this.PermissionEnable = this.pageOfItems.filter((item: any) => item.is_active === '1');

  }
  exportDriver() {
    debugger;
    if (this.FilterName != '' && this.FilterName != undefined)
      this.service1.exportExcel(this.driverList.filter((item: any) => item.firstname.toLowerCase().includes(this.FilterName.toLowerCase()) || item.lastname.toLowerCase().includes(this.FilterName.toLowerCase()) || item.id === this.FilterName || (item.city != null ? item.city.toLowerCase().includes(this.FilterName.toLowerCase()) : '') || (item.vehicle_type != null ? item.vehicle_type.toLowerCase().includes(this.FilterName.toLowerCase()) : '') || item.email.toLowerCase().includes(this.FilterName.toLowerCase()) || item.phone_no.includes(this.FilterName)), 'driverDetails');
    else
      this.service1.exportExcel(this.driverList, 'driverDetails');
  }
  driverFilter(event) {
    debugger; var txtDays = (<HTMLInputElement>document.getElementById("txtDays"));
    var selOnlineFilter = (<HTMLInputElement>document.getElementById("selOnlineFilter"));
    var target = event.target.value;
    if (target == '1' || target == '2')
      this.dayDisable = true;
    else { txtDays.value = ""; this.dayDisable = false; }
    this.getDriverView(target, txtDays.value, selOnlineFilter.value, this.currentYear, '');
    this.getActiveDriver(this.currentYear, '', target,selOnlineFilter.value);
  }
  filterDays(event) {
    debugger;
    var target = event.target;
    var selDriverFilter = (<HTMLInputElement>document.getElementById("selDriverFilter"));
    var selOnlineFilter = (<HTMLInputElement>document.getElementById("selOnlineFilter"));
    this.getDriverView(selDriverFilter.value, target.value, selOnlineFilter.value, this.currentYear, '');
    this.getActiveDriver(this.currentYear, '', '0','');
  }
  sortNumberColumn(event, boolean) {
    debugger;
    var target = event.currentTarget,
      colName = target.id,
      classList = target.classList;

    if (classList.contains('fa-chevron-up')) {
      classList.remove('fa-chevron-up');
      classList.add('fa-chevron-down');
    } else {
      classList.add('fa-chevron-up');
      classList.remove('fa-chevron-down');
    }

    // this.driverList = this.driverList.sort((a, b) => a[colName] > b[colName] ? 1 : a[colName] < b[colName] ? -1 : 0)

    if (boolean == true) {
      this.driverList = this.driverList.sort((a, b) => a[colName] < b[colName] ? 1 : a[colName] > b[colName] ? -1 : 0)
      this.booleanValue = !this.booleanValue
    }
    else {
      this.driverList = this.driverList.sort((a, b) => a[colName] > b[colName] ? 1 : a[colName] < b[colName] ? -1 : 0)
      this.booleanValue = !this.booleanValue
    }
    this.onChangePage(this.driverList.slice(0, 10))
    // return this.pageOfItems = this.driverList;

  }
  OnlineFilter(event) {
    var target = event.target;
    var selDriverFilter = (<HTMLInputElement>document.getElementById("selDriverFilter"));
    var txtDays = (<HTMLInputElement>document.getElementById("txtDays"));
    
    this.getDriverView(selDriverFilter.value, txtDays.value, target.value, this.currentYear, '');
    this.getActiveDriver(this.currentYear, '', '0',target.value);
  }
  selectedDropdownActiveDriver(i) {
    debugger;
    var DriverRevFilter = (<HTMLInputElement>document.getElementById("DriverRevFilter"));
    var selDriverFilter = (<HTMLInputElement>document.getElementById("selDriverFilter"));
    var selOnlineFilter = (<HTMLInputElement>document.getElementById("selOnlineFilter"));
    var area = i.target.value;
    this.getActiveDriver(i.target.value, DriverRevFilter.value, selDriverFilter.value,selOnlineFilter.value);
    this.getDriverView(0, '', '', i.target.value, DriverRevFilter.value);
  }
  selectedDropdownDriverFilter(i) {
    // debugger;    
    var tripRevenue = (<HTMLInputElement>document.getElementById("tripRevenue"));
    var selDriverFilter = (<HTMLInputElement>document.getElementById("selDriverFilter"));
    var selOnlineFilter = (<HTMLInputElement>document.getElementById("selOnlineFilter"));
    var area = i.target.value;
    console.log('area of data', area)
    this.getActiveDriver(tripRevenue.value, (i.target.value != "0" ? i.target.value : ""), selDriverFilter.value,selOnlineFilter.value);
    this.getDriverView(0, '', '', tripRevenue.value, (i.target.value != "0" ? i.target.value : ""));
  }
  getActiveDriver(year, filter, isactive,isonline) {
    debugger;
    const inputRequest = {
      token: this.token,
      year: year,
      filter: (filter != undefined && filter != '0' ? filter : ""),
      isactive: '',
      isonline:(isonline != undefined && isonline != '2'?isonline:'')
    };
    this.SecondaryObject = []; this.SecondaryObject1 = []; this.arrayValue2 = []; this.arrayKeys2 = []; this.arrayKeys2can = []; this.arrayValue2can = [];
    this.reportService.getActiveDriverReport(inputRequest).subscribe((result: any) => {
      debugger;
      if (result) {
        this.SecondaryObject = result.data.ActiveDriver;
        this.SecondaryObject1 = result.data.InActiveDriver;
        var yearlbl = result.data.year;
      
        // this.arrayValue2 = Object.values(this.SecondaryObject[0]).filter((i: any) => i);       
        if (filter == "7" || filter == "30") {
          this.arrayValue2 = this.SecondaryObject;
          this.arrayValue2can = this.SecondaryObject1;
        }
        else{
          Object.entries(this.SecondaryObject[0]).forEach(([key, value]) => {
            this.arrayValue2.push(value);
          });
     
          Object.entries(this.SecondaryObject1[0]).forEach(([key, value]) => {
            this.arrayValue2can.push(value);
          });
        }
        // console.log(this.arrayValue2, 'filtered value')
        this.arrayKeys2 = Object.keys(this.SecondaryObject[0]);
        this.arrayKeys2can = Object.keys(this.SecondaryObject1[0]);

        this.backgroundColor = [
          { color: '#5e72e4' }, { color: '#5603ad' }, { color: '#8965e0' }, { color: '#f3a4b5' }, { color: '#f5365c' }, { color: '#fb6340' }, { color: '#ffd600' }, { color: '#2dce89' }, { color: '#11cdef' }, { color: '#2bffc6' }, { color: '#32325d' }, { color: '#94685e' }
        ];
        this.tempArray2 = this.arrayKeys2.map((item: any, i: any) => {
          return { name: item, color: this.backgroundColor[i].color, data: this.arrayValue2[i] != null ? this.arrayValue2[i] : 0 }
        })

        if(this.pieChart) {
          this.pieChart.destroy();
        } 
        parseOptions(Chart, chartOptions());

       

        var chartSales1 = document.getElementById('Bar-Chartreport');
        this.pieChart = new Chart(chartSales1, {
          type: 'line',
          options: {
            
          },
          data: {
            labels: yearlbl, //this.arrayKeys,
            datasets: [
              {
                label: "Active Driver",
                data: this.arrayValue2,
                borderColor: 'rgb(243, 164, 181)',
                backgroundColor: 'rgba(255,0,0,0.3)',
                radius: 5
                // backgroundColor: ['#5e72e4', '#5603ad', '#8965e0', '#f3a4b5', '#f5365c', '#fb6340', '#ffd600', '#2dce89', '#11cdef', '#2bffc6', '#32325d', '#94685e']
              },
              {
                label: "InActive Driver",
                data: this.arrayValue2can,
                borderColor: 'rgb(94, 114, 228)',
                backgroundColor: 'rgb(17, 205, 239)',
                radius: 5
                // backgroundColor: ['#5e72e4', '#5603ad', '#8965e0', '#f3a4b5', '#f5365c', '#fb6340', '#fb6340', '#2dce89', '#11cdef', '#2bffc6', '#32325d', '#94685e']
              }
            ]
          }


        });

      }
    })
  }
}
