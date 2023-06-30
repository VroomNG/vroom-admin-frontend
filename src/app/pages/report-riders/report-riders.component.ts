import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
// import { driverInfo } from '../../model/driverInfo';
import { passengerService } from '../../service/passenger.service';
import { exportService } from '../../service/export.service';
// import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { chartOptions, parseOptions } from "../../variables/charts";
import { chartService } from '../../service/chart.service';
import Chart from 'chart.js';
@Component({
  selector: 'app-report-riders',
  templateUrl: './report-riders.component.html',
  styleUrls: ['./report-riders.component.css']
})
export class ReportRidersComponent implements OnInit {
  FilterName: any = '';
  token: any;
  ridersList = [];
  pageOfItems: Array<any>;
  riderFil = [{ "id": 0, "value": "All" }, { "id": 1, "value": "Active" }, { "id": 2, "value": "InActive" }]
  dayDisable: boolean = false;
  closeResult = '';
  // errorMessage: any;
  // modalOption: NgbModalOptions = {};
  SecondaryObject: any; SecondaryObject1: any;
  arrayValue2: any = [];  arrayValue2can: any = [];
  arrayKeys2: any; arrayKeys2can: any;
  tempArray2: any;
  arrayValue3: any;
  arrayKeys3: any;
  public pieChart4;  
  backgroundColor: any;
  currentYear: number = new Date().getFullYear();
  constructor(
    private formBuilder: FormBuilder,
    private route: Router,
    private router: ActivatedRoute,
    private service: passengerService,
    private service1: exportService,
    // private modalService: NgbModal,
    private reportService: chartService,
  ) {  if (localStorage.token != "" || localStorage.token != undefined) {
    this.token = localStorage.token;
  }
  else
    this.route.navigate(['/login']);}

  ngOnInit(): void {
    this.getRidersView(0, '',this.currentYear,'');
    this.getActiveRider(this.currentYear,'');
  }
  getRidersView(filt, days,year,filter) {
    debugger; this.ridersList = [];

    //var searchkey = (<HTMLInputElement>document.getElementById("search"));

    const inputRequest = {
      token: this.token,
      days: days,
      year:year,
      filter:(filter != undefined && filter != '0'?filter:'')
    };
    this.service.getPassengerReportList(inputRequest, filt).subscribe((result: any) => {
      debugger;
      this.ridersList = [];
      if (result) {
        if (result.data.length) {
          console.log("list of riders  ==>", result.data);
          this.ridersList = result.data;
        }
      }
    })
  }
  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }
  exportRiders() {
    // this.service1.exportExcel(this.FilterName, 'ridersDetails');
    if(this.FilterName != '' && this.FilterName != undefined)
    this.service1.exportExcel(this.ridersList.filter((item:any) => item.firstname.toLowerCase().includes(this.FilterName.toLowerCase()) || (item.lastname != null && item.lastname != undefined ? item.lastname.toLowerCase().includes(this.FilterName.toLowerCase()):'') || item.email.toLowerCase().includes(this.FilterName.toLowerCase()) || item.phone_no.includes(this.FilterName)), 'ridersDetails');
    else
      this.service1.exportExcel(this.ridersList, 'driverDetails');
  }
  riderFilter(event) {
    debugger;
    var txtDays = (<HTMLInputElement>document.getElementById("txtDays"));
    var riderRevenue = (<HTMLInputElement>document.getElementById("riderRevenue"));
    var RiderRevFilter = (<HTMLInputElement>document.getElementById("RiderRevFilter"));
    var target = event.target.value;
    if (target == '1' || target == '2')
      this.dayDisable = true;
    else { txtDays.value = ""; this.dayDisable = false; }
    this.getRidersView(target, txtDays.value,riderRevenue.value,RiderRevFilter.value);
  }
  filterDays(event) {
    debugger;
    var target = event.target;
    var selRiderFilter = (<HTMLInputElement>document.getElementById("selRiderFilter"));
    var riderRevenue = (<HTMLInputElement>document.getElementById("riderRevenue"));
    var RiderRevFilter = (<HTMLInputElement>document.getElementById("RiderRevFilter"));
    this.getRidersView(selRiderFilter.value, target.value,riderRevenue.value,RiderRevFilter.value);
  }
  selectedDropdownActiveRider(i) {   
    // debugger;
    var RiderRevFilter = (<HTMLInputElement>document.getElementById("RiderRevFilter"));
    var area = i.target.value;   
    this.getActiveRider(i.target.value,RiderRevFilter.value);
    this.getRidersView(0, '',i.target.value,RiderRevFilter.value);
  }
  selectedDropdownRiderFilter(i){
    debugger;
    var riderRevenue = (<HTMLInputElement>document.getElementById("riderRevenue"));
    var area = i.target.value;
    console.log('area of data', area)
    this.getActiveRider(riderRevenue.value,(i.target.value != "0"? i.target.value:""));
    this.getRidersView(0, '',riderRevenue.value,(i.target.value != "0"? i.target.value:""));
  }
  getActiveRider(year,filter){
    debugger;
    const inputRequest = {
      token: this.token,     
      year:year,
      filter:(filter != undefined && filter != '0' ? filter : "")
    };
    this.SecondaryObject = [];this.arrayValue2=[];this.arrayKeys2=[];this.arrayValue2can=[];this.arrayKeys2can=[];this.SecondaryObject1=[];
    this.reportService.getActiveRiderReport(inputRequest).subscribe((result: any) => {
      debugger;
      if (result) {        
        this.SecondaryObject = result.ActiveRider;
        this.SecondaryObject1 = result.InActiveRider;
        // this.arrayValue2 = Object.values(this.SecondaryObject[0]).filter((i: any) => i);       

       Object.entries(this.SecondaryObject[0]).forEach(([key, value]) => {
        this.arrayValue2.push(value);      
      });
      Object.entries(this.SecondaryObject1[0]).forEach(([key, value]) => {
        this.arrayValue2can.push(value);      
      });
    
        // console.log(this.arrayValue2, 'filtered value')
        this.arrayKeys2 = Object.keys(this.SecondaryObject[0]);
        this.arrayKeys2can = Object.keys(this.SecondaryObject1[0]);

        this.backgroundColor = [
          { color: '#5e72e4' }, { color: '#5603ad' }, { color: '#8965e0' }, { color: '#f3a4b5' }, { color: '#f5365c' }, { color: '#fb6340' }, { color: '#ffd600' }, { color: '#2dce89' }, { color: '#11cdef' }, { color: '#2bffc6' }, { color: '#32325d' }, { color: '#94685e' }
        ];
        this.tempArray2 = this.arrayKeys2.map((item: any, i: any) => {
          return { name: item, color: this.backgroundColor[i].color, data: this.arrayValue2[i] != null ? this.arrayValue2[i] : 0 }
        })
     
        if(this.pieChart4) {
          this.pieChart4.destroy();
        } 
        parseOptions(Chart, chartOptions());

        var chartSales1 = document.getElementById('Bar-ChartRiderreport');
        this.pieChart4 = new Chart(chartSales1, {
          type: 'line',
          options: {
            onClick: (event, legendItem) => {
              debugger;
              console.log("This is working!");
            }
          },
          data: Chart.chartData = {
          // chartData: Chart.ChartData[] =[{
            labels: this.arrayKeys2,
            datasets: [
              {
                 label: "Active Rider",
                data: this.arrayValue2,
                // backgroundColor: ['#5e72e4', '#5603ad', '#8965e0', '#f3a4b5', '#f5365c', '#fb6340', '#ffd600', '#2dce89', '#11cdef', '#2bffc6', '#32325d', '#94685e']
                // backgroundColor: ['#5e72e4', '#5603ad', '#8965e0', '#f3a4b5', '#f5365c', '#fb6340', '#ffd600', '#2dce89', '#11cdef', '#2bffc6', '#32325d', '#94685e']
                borderColor: 'rgb(243, 164, 181)',
                backgroundColor: 'rgba(255,0,0,0.3)',              
               radius:5
              },
              {
                label: "Block Rider",
               data: this.arrayValue2can,
               // backgroundColor: ['#5e72e4', '#5603ad', '#8965e0', '#f3a4b5', '#f5365c', '#fb6340', '#ffd600', '#2dce89', '#11cdef', '#2bffc6', '#32325d', '#94685e']
               // backgroundColor: ['#5e72e4', '#5603ad', '#8965e0', '#f3a4b5', '#f5365c', '#fb6340', '#ffd600', '#2dce89', '#11cdef', '#2bffc6', '#32325d', '#94685e']
               borderColor: 'rgb(94, 114, 228)',
               backgroundColor: 'rgb(17, 205, 239)',             
              radius:5
             }
            ]
          }
       
        });

      }
    })
  }
}
