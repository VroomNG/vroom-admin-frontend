import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { driverInfo } from '../../../model/driverInfo';
import { passengerService } from '../../../service/passenger.service';
import { exportService } from '../../../service/export.service';
import {DateFilterPipe} from '../../../pipe_filter/date-filter.pipe';

@Component({
  selector: 'app-view-schedule',
  templateUrl: './view_schedule.component.html',
  styleUrls: ['./view_schedule.component.css']
})
export class ViewScheduleComponent implements OnInit {
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
  constructor(
    private formBuilder: FormBuilder,
    private route: Router,
    private router: ActivatedRoute,
    private service: passengerService,
    private service1: exportService,
    //public dateFilter:DateFilterPipe
  ) {
    if (localStorage.token != "" || localStorage.token != undefined) {
      this.token = localStorage.token;
    }
    else
      this.route.navigate(['/login']);

    this.router.params.subscribe((response: any) => {
      // this.ridersDetails = new driverInfo();
      this.tripStatusId = response.id == undefined ? 0 : Number(response.id);

    });
  }

  ngOnInit() {
    this.getTripsView('','');
    this.pagePath = this.route.url.split('/');
    this.pagePath = this.pagePath[this.pagePath.length - 1];
    
  }
  getTripsView(fromDate,toDate) {
    debugger; 
    this.tripsList = [];
    const inputRequest = {
      token: this.token,
      fromDate: fromDate,
      toDate: toDate
    };
    this.service.getSchedules().subscribe((result: any) => {
      debugger;
      this.tripsList = [];
      if (result) {
        if (result.data.length) {
          console.log("RESULT ==>", result.data);
          // this.selectedMembers = result.data;
          this.getAlldata = result.data;

          if (result.data != undefined) {
            var tripType = '';
            var target = '';
            for (let i = 0; i < result.data.length; i++) {
              /*tripType = '';
              if (result.data[i].trip_type == '1')
                tripType = 'Individual';
              else if (result.data[i].trip_type == '2')
                tripType = 'Share';
              else if (result.data[i].trip_type == '3')
                tripType = 'Split-Fare';*/
              if (result.data[i].riders == 1)
                target = "Riders";
              else if (result.data[i].drivers == 1)
                target = "Approved Drivers";
                else if (result.data[i].udrivers == 1)
                  target = "Unapproved Drivers";
              this.tripsList.push({
                "id":result.data[i].id,
                "title": result.data[i].title,
                "description": result.data[i].description,
                "schedule_date": result.data[i].sendDate,
                "target": target
              })
            }
          }
          // this.tripsList = result.data;
        }
      }

    });

  }

  editTrips(id) {
    debugger;
    if (id != undefined && id != 0)
      this.route.navigate(['trips/trips-detail/' + id]);
  }
  onChangePage(items: Array<any>) {
    // update current page of items
    this.selectedMembers = items;
  }

  exportTrips() {    
    if(this.FilterName != '')
    this.service1.exportExcel(this.tripsList.filter((item:any) =>(item.firstname != null ? item.firstname.toLowerCase().includes(this.FilterName.toLowerCase()):'') || item.userid === this.FilterName || (item.lastname != null ? item.lastname.toLowerCase().includes(this.FilterName.toLowerCase()):'') || (item.referee != null ? item.referee.toLowerCase().includes(this.FilterName.toLowerCase()):'')), 'Schedule_Details');
   else
   this.service1.exportExcel(this.tripsList, 'Schedule_Details');
  }

  dateFilter() {
    debugger;
    var tripdate=[]; this.tripsList=[];
    tripdate = this.getAlldata.filter((m) => m.trip_date > this.startDate && m.trip_date < this.endDate);
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
    this.getTripsView('','');

  }
  viewPartnerDetails(id) {
    debugger;
    if (id != undefined && id != 0)
      this.route.navigate(['partner/add-partner/' + id]);
  }


}
