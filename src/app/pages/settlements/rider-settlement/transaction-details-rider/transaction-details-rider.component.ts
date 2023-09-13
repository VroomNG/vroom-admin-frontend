import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { driverInfo } from '../../../../model/driverInfo';
import { passengerService } from '../../../../service/passenger.service';
import { LoginService } from '../../../../service/login.service';

@Component({
  selector: 'app-transaction-details-rider',
  templateUrl: './transaction-details-rider.component.html',
  styleUrls: ['./transaction-details-rider.component.css']
})
export class TransactionDetailsRiderComponent implements OnInit {
  driverDetails!: driverInfo;
  token: any;
  paramsval: any;
  paramsName: any;
  riderPaymentList: any;
  pageOfItems!: Array<any>;

  constructor(
    private service: passengerService,
    private route: Router,
    private router: ActivatedRoute,
    private loginService: LoginService) {
    this.route.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.router.queryParams.subscribe(params => {
      this.paramsval = params['amount'];
      this.paramsName = params['name'];
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

  ngOnInit() {
    if (this.driverDetails.id != 0) {
      this.getPaymentList();
    }
    this.loginService.addInteraction(sessionStorage.getItem('email'),"Viewed rider transaction details ").subscribe((result:any) => {});
  }
  getPaymentList() {
    const inputToken = {
      token: this.token
    }
    this.service.getRiderPaymentSingle(this.driverDetails.id, inputToken).subscribe((response: any) => {
      if (response) {
        this.riderPaymentList = response.data;
        console.log("Payment=>", this.riderPaymentList);
      }
    }, error => {
      console.log('Document get exception: ' + error.message);
    });
  }
  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }

}
