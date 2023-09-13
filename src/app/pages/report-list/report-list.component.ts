import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
// import { driverInfo } from '../../model/driverInfo';
import { driverService } from '../../service/driver.service';
import { exportService } from '../../service/export.service';
// import { passengerService } from '../../service/passenger.service';
// import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { chartService } from '../../service/chart.service';
// import { chartOptions, parseOptions } from "../../variables/charts";
import {DatePipe} from '@angular/common';
// import Chart from 'chart.js';
@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.css']
})
export class ReportListComponent implements OnInit {
  public ascNumberSort = true;
  booleanValue: any = true;
  column: string = 'CategoryName';
  token: any;
  isFormReady: boolean = false;
  // PermissionEnable: any;
  pagePath: any;
  FilterName: any;
  driverList = [];
  driverStatus: any;
  driverFil = [{ "id": 2, "value": "All" }, { "id": 0, "value": "Active" }, { "id": 1, "value": "InActive" }];
  driverOnline = [{ "id": 2, "value": "All" }, { "id": 0, "value": "Offline" }, { "id": 1, "value": "Online" }];
  dayDisable: boolean = false;
  closeResult = '';
  errorMessage: any;
  arrayValue: any = []; arrayValue1: any = [];
  arrayKeys: any; arrayKeys1: any;
  backgroundColor: any;
  tempArray: any;
  primaryObject: any; primaryObject1: any;
  public pieChart1:any;
  // items = [];
  pageOfItems!: Array<any>;
  currentYear: number = new Date().getFullYear();
  constructor(
    private formBuilder: FormBuilder,
    // private toastr: ToastrService,    
    private route: Router,
    private router: ActivatedRoute,
    private service: driverService,
    // private service123: passengerService,
    // private modalService: NgbModal,
    private service1: exportService,
    private reportService: chartService
  ) {
    debugger;
    if (localStorage['token'] != "" || localStorage['token'] != undefined) {
      this.token = localStorage['token'];
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
    
    this.getDriverView(0, '', '', '', this.currentYear);
    this.driverReports(this.currentYear, '',);
    // this.items = Array(150).fill(0).map((x, i) => ({ id: (i + 1), name: `Item ${i + 1}`}));
    this.pagePath = this.route.url.split('/');
    this.pagePath = "1"; //this.pagePath[this.pagePath.length - 1];
    // // console.log("Path name", this.pagePath)
  }
  getDriverView(filt: any, days: string, isOnline: string, fil: string, year: string | number) {
    var inputRequest;
    debugger; this.driverList = [];

    inputRequest = {
      token: this.token,
      isonline: isOnline,
      fil: fil,
      year: year
    };
    // console.log("driverStatus ==> ", this.driverStatus);
    if (this.driverStatus == 1) {
      // inputRequest.days = days;

      this.service.getDriverreportFilter(inputRequest, filt).subscribe((result: any) => {
        debugger;
        this.driverList = [];
        if (result) {
          if (result.data.length) {
            console.log("report list RESULT ==>", result.data);
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

  viewDriverDetails(id:any) {
    debugger;
    if (id != undefined && id != 0)
      this.route.navigate(['driver/add-driver/' + id], { queryParams: { status: this.driverStatus } });
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
      this.service1.exportExcel(this.driverList.filter((item: any) => (item.firstname != null && item.firstname != undefined ? item.firstname.toLowerCase().includes(this.FilterName.toLowerCase()) : '') || (item.lastname != null && item.lastname != undefined ? item.lastname.toLowerCase().includes(this.FilterName.toLowerCase()) : '') || item.id === this.FilterName || (item.city != null && item.city != undefined ? item.city.toLowerCase().includes(this.FilterName.toLowerCase()) : '') || (item.email != null && item.email != undefined ? item.email.toLowerCase().includes(this.FilterName.toLowerCase()) : '') || (item.phone_no != null && item.phone_no != undefined ? item.phone_no.includes(this.FilterName) : '')), 'driverDetails');
    else
      this.service1.exportExcel(this.driverList, 'driverDetails');

  }

  driverFilter(event:any) {
    debugger;
    debugger; var txtDays = (<HTMLInputElement>document.getElementById("txtDays"));
    var selOnlineFilter = (<HTMLInputElement>document.getElementById("selOnlineFilter"));
    var selYear = (<HTMLInputElement>document.getElementById("selYear"));
    var selUser = (<HTMLInputElement>document.getElementById("selUser"));
    var target = event.target.value;
    if (target == '1' || target == '0')
      this.dayDisable = true;
    else { txtDays.value = ""; this.dayDisable = false; }
    this.driverReports(selUser.value, selYear.value, );
    this.getDriverView(0, txtDays.value, target != 2 ? target : '', (selYear.value != '0' ? selYear.value : ""), selUser.value);
  }
  filterDays(event:any) {
    debugger;
    var target = event.target;
    var selDriverFilter = (<HTMLInputElement>document.getElementById("selDriverFilter"));
    var selOnlineFilter = (<HTMLInputElement>document.getElementById("selOnlineFilter"));
    var selYear = (<HTMLInputElement>document.getElementById("selYear"));
    var selUser = (<HTMLInputElement>document.getElementById("selUser"));
    // this.getDriverView(selDriverFilter.value, target.value,'',(selYear.value != '0'? selYear.value:""),selUser.value);
    this.getDriverView(1, target.value, selDriverFilter.value, (selYear.value != '0' ? selYear.value : ""), selUser.value);
  }

  clearError() {
    this.errorMessage = "";
  }
  sortNumberColumn(event:any, boolean:any) {
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
  OnlineFilter(event:any) {
    var target = event.target;
    var selDriverFilter = (<HTMLInputElement>document.getElementById("selDriverFilter"));
    var txtDays = (<HTMLInputElement>document.getElementById("txtDays"));
    var selYear = (<HTMLInputElement>document.getElementById("selYear"));
    var selUser = (<HTMLInputElement>document.getElementById("selUser"));
    this.getDriverView(selDriverFilter.value, txtDays.value, target.value, (selYear.value != '0' ? selYear.value : ""), selUser.value);
  }

  driverReports(year:any, filt:any, ) {
    debugger;
    const inputRequest = {
      token: this.token,
      year: year,
      filter: (filt != undefined && filt != 0 && filt != '0' ? filt : ""),
      status: (status != '2' ? status : '')
    };

    this.arrayValue = []; this.arrayValue1 = [];
    this.arrayKeys = []; this.backgroundColor = []; this.tempArray = [];
    this.reportService.getDriverReportDetails(inputRequest).subscribe((result: any) => {
      debugger;
      if (result) {

        this.primaryObject = result.data.driver;
        this.primaryObject1 = result.data.rider;
        var yearlbl = result.data.year;
        // this.arrayValue = Object.values(this.primaryObject[0]).filter((i: any) => i);
        if (filt == "7" || filt == "30") {
          this.arrayValue = this.primaryObject;
          this.arrayValue1 = this.primaryObject1;
        }
        else {
          Object.entries(this.primaryObject[0]).forEach(([key, value]) => {
            this.arrayValue.push(value);
          });
          Object.entries(this.primaryObject1[0]).forEach(([key, value]) => {
            this.arrayValue1.push(value);
          });
        }
        this.arrayKeys = Object.keys(this.primaryObject[0]);
        this.arrayKeys1 = Object.keys(this.primaryObject1[0]);
        this.backgroundColor = [
          { color: '#5e72e4' }, { color: '#5603ad' }, { color: '#8965e0' }, { color: '#f3a4b5' }, { color: '#f5365c' }, { color: '#fb6340' }, { color: '#ffd600' }, { color: '#2dce89' }, { color: '#11cdef' }, { color: '#2bffc6' }, { color: '#32325d' }, { color: '#94685e' }
        ];
        this.tempArray = this.arrayKeys.map((item: any, i: any) => {
          return { name: item, color: this.backgroundColor[i].color, data: this.arrayValue[i] != null ? this.arrayValue[i] : 0 }
        })

        if (this.pieChart1) {
          this.pieChart1.destroy();
        }

        // parseOptions(Chart, chartOptions());

        var chartSales = document.getElementById('chart-pielist');
        // this.pieChart1 = new Chart(chartSales, {
        //   type: 'bar',
        //   options: {
        //     scales: {
        //       xAxes: [{
        //         barThickness: 30,
        //         maxBarThickness: 20,
        //       }],
        //       // yAxes: [
        //       //   {
        //       //     ticks: {
        //       //       callback: function (value) {
        //       //         if (!(value % 1)) {
        //       //           //return '$' + value + 'k'
        //       //           return value;
        //       //         }
        //       //       }
        //       //     }
        //       //   }
        //       // ]
        //     }
        //   },
        //   data: {
        //     labels: yearlbl, //this.arrayKeys,
        //     datasets: [
        //       {
        //         label: "Driver",
        //         data: this.arrayValue,
        //         borderColor: 'rgb(243, 164, 181)',
        //         backgroundColor: 'rgba(255,0,0,0.3)',
        //         radius: 5
        //         // backgroundColor: ['#5e72e4', '#5603ad', '#8965e0', '#f3a4b5', '#f5365c', '#fb6340', '#ffd600', '#2dce89', '#11cdef', '#2bffc6', '#32325d', '#94685e']
        //       },
        //       {
        //         label: "Rider",
        //         data: this.arrayValue1,
        //         borderColor: 'rgb(94, 114, 228)',
        //         backgroundColor: 'rgb(17, 205, 239)',
        //         radius: 5
        //         // backgroundColor: ['#5e72e4', '#5603ad', '#8965e0', '#f3a4b5', '#f5365c', '#fb6340', '#fb6340', '#2dce89', '#11cdef', '#2bffc6', '#32325d', '#94685e']
        //       }
        //     ]
        //   }
        // });

      }
    })

  }
  selectedDropdown(i: { target: { value: string | number; }; }) {
    debugger;
    var selYear = (<HTMLInputElement>document.getElementById("selYear"));
    var selDriverFilter = (<HTMLInputElement>document.getElementById("selDriverFilter"));
    var txtDays = (<HTMLInputElement>document.getElementById("txtDays"));

    var area = i.target.value;
    console.log('area of data', area)
    this.driverReports(i.target.value, selYear.value, );
    // if(i.target.value === '2'){
    //   this.driverReports();
    // }
    // else{
    //   this.riderReports();
    // }
    this.getDriverView(0, txtDays.value, selDriverFilter.value, (selYear.value != '0' ? selYear.value : ""), i.target.value);
  }
  selectedDropdownYear(i:any) {
    // debugger;    
    var selUser = (<HTMLInputElement>document.getElementById("selUser"));
    var selDriverFilter = (<HTMLInputElement>document.getElementById("selDriverFilter"));
    var txtDays = (<HTMLInputElement>document.getElementById("txtDays"));

    var area = i.target.value;
    console.log('area of data', area)
    this.driverReports(selUser.value, (i.target.value != "0" ? i.target.value : ""));
    this.getDriverView(0, txtDays.value, selDriverFilter.value, (i.target.value != "0" ? i.target.value : ""), selUser.value);
  }

}
