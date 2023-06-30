import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
// import { driverInfo } from '../../model/driverInfo';
import { passengerService } from '../../service/passenger.service';
import { exportService } from '../../service/export.service';
// import {DateFilterPipe} from '../../pipe_filter/date-filter.pipe';
import { chartOptions, parseOptions } from "../../variables/charts";
import Chart from 'chart.js';
import { chartService } from '../../service/chart.service';
import {DatePipe} from '@angular/common';
@Component({
  selector: 'app-report-trips',
  templateUrl: './report-trips.component.html',
  styleUrls: ['./report-trips.component.css']
})
export class ReportTripsComponent implements OnInit {
  currentDate = new Date();
  dateFormat = 'MM/dd/yyyy';

  endDate;
  startDate;
  selectedMembers: any;
  getAlldata: any;
  show: boolean = true;
  hide: boolean = false;
  pagePath: any;

  FilterName = '';
  token: any;
  tripsList = [];
  tripStatusId: any;
  pageOfItems: Array<any>;
  // chart
  SecondaryObject: any; SecondaryObject1: any; SecondaryObject2: any;
  arrayValue2: any = [];  arrayValue2can: any = []; arrayrevenue: any = [];
  arrayKeys2: any; arrayKeys2can: any;
  tempArray2: any;
  arrayValue3: any;
  arrayKeys3: any;
  public pieChart2;
  backgroundColor: any;
  currentYear: number = new Date().getFullYear();
  constructor(
    private formBuilder: FormBuilder,
    private route: Router,
    private router: ActivatedRoute,
    private service: passengerService,
    private service1: exportService,
    private reportService: chartService,
    // public datepipe: DatePipe
    
  ) { 
    if (localStorage.token != "" || localStorage.token != undefined) {
      this.token = localStorage.token;
    }
    else
      this.route.navigate(['/login']);

    this.router.params.subscribe((response: any) => {
      // this.ridersDetails = new driverInfo();
      this.tripStatusId = 1; //response.id == undefined ? 0 : Number(response.id);

    });
  }

  ngOnInit(): void {
    this.getTripsView('','',this.currentYear,'');
    this.pagePath = this.route.url.split('/');
    this.pagePath = 1; //this.pagePath[this.pagePath.length - 1];
    this.tripReports(this.currentYear,'');
  }
  getTripsView(fromDate,toDate,year,filter) {
    debugger; this.tripsList = [];

    const inputRequest = {
      token: this.token,
      fromDate: fromDate,
      toDate: toDate,
      year:year,
      filter:(filter != undefined && filter != '0' ? filter:'')
    };
    this.service.getTripsListReport(inputRequest).subscribe((result: any) => {
      debugger;
      this.tripsList = [];
      if (result) {
        if (result.data.length) {
          console.log("RESULT ==>", result.data);
          // this.selectedMembers = result.data;
          this.getAlldata = result.data;

          if (result.data != undefined) {
            var tripType = '';
            for (let i = 0; i < result.data.length; i++) {
              tripType = '';
              if (result.data[i].trip_type == '1')
                tripType = 'Individual';
              else if (result.data[i].trip_type == '2')
                tripType = 'Share';
              else if (result.data[i].trip_type == '3')
                tripType = 'Split-Fare';

              this.tripsList.push({
                "id": result.data[i].id,
                "driverName": result.data[i].driverName,
                "trip_amount": result.data[i].trip_amount,
                "riderName": result.data[i].riderName,
                "trip_date": result.data[i].trip_date,
                "trip_status": (result.data[i].trip_status == '0' ? 'Schedule' : (result.data[i].trip_status) == '1' ? 'Accepted' : result.data[i].trip_status == '2' ? 'Completed' : result.data[i].trip_status == '3' ? 'Cancelled' : result.data[i].trip_status == '4' ? 'Started' : result.data[i].trip_status == '5' ? 'Completed' : result.data[i].trip_status == '6' ? 'Completed' : ''),
                "trip_time": result.data[i].trip_time,
                "trip_type": tripType,
                "payment_type": result.data[i].payment_type,
                "user_id": result.data[i].user_id,
                "vehicle_type": result.data[i].vehicle_type,
              })
            }
          }
          // this.tripsList = result.data;
        }
      }

    });

  }
  onChangePage(items: Array<any>) {
    // update current page of items
    this.selectedMembers = items;
  }
  exportTrips() {    
    if(this.FilterName != '' && this.FilterName != undefined)
    this.service1.exportExcel(this.tripsList.filter((item:any) => item.trip_type.toLowerCase().includes(this.FilterName.toLowerCase()) || ( item.driverName != null ? item.driverName.toLowerCase().includes(this.FilterName.toLowerCase()):'') || item.id === this.FilterName || (item.riderName != null ? item.riderName.toLowerCase().includes(this.FilterName.toLowerCase()):'') || (item.vehicle_type != null ? item.vehicle_type.toLowerCase().includes(this.FilterName.toLowerCase()):'') || (item.payment_type != null ? item.payment_type.toLowerCase().includes(this.FilterName.toLowerCase()):'') || item.trip_amount === this.FilterName), 'tripsDetails');
   else
   this.service1.exportExcel(this.tripsList, 'tripsDetails');
  }

  dateFilter() {
    debugger;
    var tripdate=[]; this.tripsList=[];
    // tripdate = this.getAlldata.filter((m) => this.datepipe.transform(m.trip_date, 'MM/dd/yyyy') >= this.startDate && this.datepipe.transform(m.trip_date, 'MM/dd/yyyy') <= this.endDate);
    tripdate = this.getAlldata.filter((m) => m.trip_date >= (this.startDate+'T59:59:59.000Z') && m.trip_date <= (this.endDate+'T59:59:59.000Z'));
    if (tripdate != undefined) {
      var tripType = '';
      for (let i = 0; i < tripdate.length; i++) {
        tripType = '';
        if (tripdate[i].trip_type == '1')
          tripType = 'Individual';
        else if (tripdate[i].trip_type == '2')
          tripType = 'Share';
        else if (tripdate[i].trip_type == '3')
          tripType = 'Split-Fare';

        this.tripsList.push({
          "id": tripdate[i].id,
          "driverName": tripdate[i].driverName,
          "trip_amount": tripdate[i].trip_amount,
          "riderName": tripdate[i].riderName,
          "trip_date": tripdate[i].trip_date,
          "trip_status": (tripdate[i].trip_status == '0' ? 'Schedule' : (tripdate[i].trip_status) == '1' ? 'Accepted' : tripdate[i].trip_status == '2' ? 'Completed' : tripdate[i].trip_status == '3' ? 'Cancelled' : tripdate[i].trip_status == '4' ? 'Started' : tripdate[i].trip_status == '5' ? 'Completed' : tripdate[i].trip_status == '6' ? 'Completed' : ''),
          "trip_time": tripdate[i].trip_time,
          "trip_type": tripType,
          "payment_type": tripdate[i].payment_type,
          "user_id": tripdate[i].user_id,
          "vehicle_type": tripdate[i].vehicle_type,
        })
      }
    }

    console.log("date filter", this.selectedMembers);
    this.show = false;
    this.hide = true;
  }

  CanceldateFilter() {
    this.hide = false;
    this.show = true;
    this.startDate = '';
    this.endDate = '';
    this.getTripsView('','',this.currentYear,'');

  }

   //  rider reports
   tripReports(year,filter) {
    debugger;
    const inputRequest = {
      token: this.token,     
      year:year,
      filter:(filter != undefined && filter != '0'? filter : "")
    };
    this.SecondaryObject = [];this.arrayValue2=[];this.arrayKeys2=[];this.SecondaryObject1=[];this.arrayValue2can = [];this.arrayKeys2can=[];
    this.reportService.getRiderReportDetails(inputRequest).subscribe((result: any) => {
      debugger;
      if (result) {        
        this.SecondaryObject = result.data.completed;
        this.SecondaryObject1 = result.data.cancelled;
        this.SecondaryObject2 = result.data.revenue;
        var yearlbl = result.data.year;
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
      Object.entries(this.SecondaryObject2[0]).forEach(([key, value]) => {
        this.arrayrevenue.push(value);      
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
     
        if(this.pieChart2) {
          this.pieChart2.destroy();
        } 
        parseOptions(Chart, chartOptions());

        var chartSales1 = document.getElementById('chart-pie2report');
        this.pieChart2 = new Chart(chartSales1, {
          type: 'line',
          options: {
            onClick: (event, legendItem) => {
              debugger;
              console.log("This is working!");
            },
            tooltips: {
              callbacks: {
                  // label: function(tooltipItem, data) {
                  //   console.log("tooltipItem inchart",tooltipItem);
                  //   console.log("tooltipItem data",data);
                  //     var dataset = data.datasets[tooltipItem.datasetIndex];
                  //     var index = tooltipItem.index;
                  //     return dataset.labels[index] + ': ' + dataset.data[index];
                  //     // console.log("arrayrevenue",this.arrayrevenue[1]);
                  //     // return this.arrayrevenue[index];
                  // }
                  
              }
              
          }
          },
          data: Chart.chartData = {
          // chartData: Chart.ChartData[] =[{
            labels: yearlbl,  //this.arrayKeys2,
          
            datasets: [
              {
                 label: "Completed",
                data: this.arrayValue2,
                // backgroundColor: ['#5e72e4', '#5603ad', '#8965e0', '#f3a4b5', '#f5365c', '#fb6340', '#ffd600', '#2dce89', '#11cdef', '#2bffc6', '#32325d', '#94685e']
                // backgroundColor: ['#5e72e4', '#5603ad', '#8965e0', '#f3a4b5', '#f5365c', '#fb6340', '#ffd600', '#2dce89', '#11cdef', '#2bffc6', '#32325d', '#94685e']
                borderColor: 'rgb(243, 164, 181)',
                backgroundColor: 'rgba(255,0,0,0.3)',              
               radius:5              
              },
              {
                label: "Cancelled",
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
console.log("Chart.chartData",Chart.chartData);
      }
    })
  }
  selectedDropdownTrip(i) {
    // debugger;    
    var tripFilter = (<HTMLInputElement>document.getElementById("tripFilter"));
    var area = i.target.value;    
    this.tripReports(i.target.value,tripFilter.value);
    this.getTripsView('','',i.target.value,(tripFilter.value != '0'?tripFilter.value:''));
  }
  selectedDropdownTripYear(i){
    // debugger;    
    var tripStatus = (<HTMLInputElement>document.getElementById("tripStatus"));

    var area = i.target.value;
    console.log('area of data', area)
    this.tripReports(tripStatus.value,(i.target.value != "0"? i.target.value:""));
    this.getTripsView('','',tripStatus.value,(i.target.value != "0"? i.target.value:""));
  }
}
