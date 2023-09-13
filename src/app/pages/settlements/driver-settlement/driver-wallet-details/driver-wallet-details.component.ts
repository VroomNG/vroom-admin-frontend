import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { driverInfo } from '../../../../model/driverInfo';
import { passengerService } from '../../../../service/passenger.service';
import { LoginService } from '../../../../service/login.service';


@Component({
  selector: 'app-driver-wallet-details',
  templateUrl: './driver-wallet-details.component.html',
  styleUrls: ['./driver-wallet-details.component.css']
})
export class DriverWalletDetailsComponent implements OnInit {
  driverDetails!: driverInfo;
  token: any;
  paramsval: any;
  paramsName: any; paramsCash:any;
  driverPaymentList: any;
  tripId: any;
  TotalDriverPay: any;
  pageOfItems!: Array<any>;
  constructor(
    private service: passengerService,
    private route: Router,
    private router: ActivatedRoute,
    private loginService: LoginService
  ) {
    this.route.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.router.queryParams.subscribe(params => {
      this.paramsval = params['amount'];
      // this.paramsName = params['name'];
      // this.paramsCash = params['cash'];
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
      this.getWithdrawHistory();
    }
    this.loginService.addInteraction(sessionStorage.getItem('email'),"Viewed driver wallet details ").subscribe((result:any) => {});
  }
  getWithdrawHistory() {
    const inputToken = {
      token: this.token
    }
    this.service.getWithdrawHistorySingle(this.driverDetails.id, inputToken).subscribe((response: any) => {
      debugger;
      if (response) {
        this.driverPaymentList = response.data;
        console.log("Payment=>", this.driverPaymentList);
        // var totalPayment = this.driverPaymentList.map((item) => item.payment_status === 0 ? item.amount : 0)
        // // console.log('total payments', totalPayment);
        // this.TotalDriverPay = eval(totalPayment.join('+'));
        // console.log(this.TotalDriverPay, "totalValue")
      }
    }, error => {
      console.log('Document get exception: ' + error.message);
    });
  }

  UpdatePaidOrPennding(i:any) {
    this.tripId = i.target.value;
    console.log("payment details --->", this.tripId);
    debugger;
    const inputRequest = {
      payment_status: 1,
    }
    this.service.updateDriverSettlements(this.tripId, inputRequest).subscribe((result) => {
      console.log('updated payments', result);
      if (result) {
        this.getWithdrawHistory();
      }
    })

  }


  onChangePage(pageOfItems: Array<any>) {
    // update current page of items

    this.pageOfItems = pageOfItems;
  }

  // btnPaidCalculate(){
  //   debugger;
  //   const inputRequest = {
  //     admin_status : 1
  //   }
  //   this.service.updateAdminpaid(inputRequest).subscribe((result) => {
  //     if (result) {
  //       console.log('admin payments', result);
  //     }
  //   });
  // }

  backscreen(){
    this.route.navigate(['settlements/driver-settlement/driver-bank-transaction/']);
  }
}
