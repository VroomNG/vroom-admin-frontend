import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { driverInfo } from '../../../../model/driverInfo';
import { passengerService } from '../../../../service/passenger.service';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

@Component({
  selector: 'app-settlement-list-edit',
  templateUrl: './settlement-list-edit.component.html',
  styleUrls: ['./settlement-list-edit.component.css']
})
export class SettlementListEditComponent implements OnInit {
  driverDetails!: driverInfo;
  token: any;
  paramsval: any;
  paramsName: any;
  driverPaymentList: any;
  tripId: any;
  TotalDriverPay: any;
  pageOfItems!: Array<any>;
  errorMessage : any;
  closeResult = '';
  startDate:any;
  drivername:any;
  constructor( private service: passengerService,
    private route: Router,
    private router: ActivatedRoute,    
    private toastr: ToastrService,
    private location: Location,) {
    this.route.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.router.queryParams.subscribe(params => {
      this.paramsval = params['amount'];
     // this.paramsName = params['name'];
    });
    console.log("this.paramsval==>", this.paramsval);
    if (localStorage['token'] != "" || localStorage['token'] != undefined) {
      this.token = localStorage['token'];
    }
    else
      this.route.navigate(['/login']);
    this.router.params.subscribe((response: any) => {
      this.driverDetails = new driverInfo();
      this.driverDetails.id = response.id == undefined ? 0 : Number(response.id);
    });
    
   }

  ngOnInit(): void {
    if (this.driverDetails.id != 0) {
      this.getPaymentList();
    }
  }
  getPaymentList() {
    const inputToken = {
      token: this.token
    }
    this.service.getCashSettHistory(this.driverDetails.id, inputToken).subscribe((response: any) => {
      if (response) {
        this.driverPaymentList = response.data;
        console.log("Payment=>", this.driverPaymentList);
        this.drivername = this.driverPaymentList[0].driver_name;
      }
    }, error => {
      console.log('Document get exception: ' + error.message);
    });
    
  }
  onChangePage(pageOfItems: Array<any>) {   
    this.pageOfItems = pageOfItems;
  }
  backscreen(){
    this.route.navigate(['settlements/driver-settlement/']);
  }
}
