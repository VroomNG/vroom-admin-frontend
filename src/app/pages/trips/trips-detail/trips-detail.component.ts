import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { driverInfo } from '../../../model/driverInfo';
import{passengerService} from '../../../service/passenger.service';
import { BrowserModule,SafeHtml,DomSanitizer } from '@angular/platform-browser';
import { LoginService } from '../../../service/login.service';
@Component({
  selector: 'app-trips-detail',
  templateUrl: './trips-detail.component.html',
  styleUrls: ['./trips-detail.component.css']
})
export class TripsDetailComponent implements OnInit {
  token: any;
  tripsList = [];
  tripList = [];
  tripsId: any;
  data: SafeHtml;
  res: string;
  maproute:any = "";
  appCancel = "";
  declines = "";
  decline_drivers = [];
  //decline_reasons = [];
  number_of_declining_drivers = 0;
  estimated_trip_time:any;
  constructor(
    private formBuilder: FormBuilder,   
    private route: Router,
    private router: ActivatedRoute,
    private service: passengerService,
    private sanitizer: DomSanitizer,
    private loginService:LoginService
  ) {
    this.route.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    if (localStorage.token != "" || localStorage.token != undefined) {
      this.token = localStorage.token;
      //this.flag_admin = localStorage.flag_admin;
    
    }
    else
      this.route.navigate(['/login']);
debugger;
      this.router.params.subscribe((response: any) => { 
        // this.ridersDetails = new driverInfo();
        this.tripsId = response.id == undefined ? 0 : Number(response.id);
       
      });
   }

   ngOnInit() {
    // this.createForm();
    if(this.tripsId != 0){
    this.getTripsDetails();
    }
    this.loginService.addInteraction(sessionStorage.getItem('email'),"Viewed details of trip ").subscribe((result:any) => {});
  }
  getTripsDetails() {
    debugger;
    this.service.getSingleTrips(this.tripsId).subscribe((result: any) => {
      debugger;
      this.tripsList = [];
      if(result){
        if(result.data.length){
          console.log("RESULT ==>",result.data);
          this.tripList = result.data;
          //this.estimated_trip_time = this.tripList.copy_travel_time + " mins";
          this.tripsList = this.tripList.slice(0,1);
          if(this.tripsList[0].user_canceled_reason == undefined && this.tripsList[0].driver_canceled_reason == undefined && this.tripsList[0].driverName == undefined)
            this.appCancel = "Search timeout";
          if(this.tripsList[0].user_canceled_reason == undefined && this.tripsList[0].driver_canceled_reason == '' && this.tripsList[0].driverName == undefined)
            this.tripsList[0].user_canceled_reason = "Cancelled before trip acceptance"
          this.tripList.map(item => {
            if(item.reason != undefined){
              this.number_of_declining_drivers++;
             var decline_data = {"serial":this.number_of_declining_drivers,
                                "driver":item.declining_driver,
                                "reason":item.reason};
            this.decline_drivers.push(decline_data);

            }
          });
          //var decline_data = {"driver":"Ikenna",
           //                   "reason":"ETA too long"}
          //var decline_data2 = {"driver":"Ben",
           //                   "reason":"Other"}
          //this.decline_drivers.push(decline_data);
          //this.decline_drivers.push(decline_data2);
          //this.decline_drivers.push("nnamdi");

          this.maproute="https://www.google.com/maps?q="+result.data[0].from_lat+","+result.data[0].from_long+"&z=15&output=embed"
          // <iframe src='"+this.maproute+"' width='100%' height='300' frameborder='0' style='border:0;' allowfullscreen='' aria-hidden='false' tabindex='0'></iframe></div>
          this.res=`
<iframe
            src="${this.maproute}"
            width="100%" height="300" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false"
            tabindex="0"></iframe>`;
            this.data = this.sanitizer.bypassSecurityTrustHtml(this.res);
        }
      }
    })
  }
  tripStatus(status){
    debugger;
    var tripSts='';
    if(status == '0')
    tripSts="Schedule";
    else if(status == '1')
    tripSts="Accepted";
    else if(status == '2')
    tripSts="Completed";
    else if(status == '3')
    tripSts="Canceled";
    else if(status == '4')
    tripSts="Started";
    return tripSts;
  }
}
