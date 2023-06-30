import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { driverInfo } from '../../../../model/driverInfo';
import { passengerService } from '../../../../service/passenger.service';
import { LoginService } from '../../../../service/login.service';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-transaction-details-driver',
  templateUrl: './transaction-details-driver.component.html',
  styleUrls: ['./transaction-details-driver.component.css']
})
export class TransactionDetailsDriverComponent implements OnInit {
  driverDetails: driverInfo;
  token: any;
  paramsval: any;
  paramsName: any;
  driverPaymentList: any;
  tripId: any;
  TotalDriverPay: any;
  pageOfItems: Array<any>;
  errorMessage : any;
  closeResult = '';
  startDate:any;
  drivername:any;
  driverSettlementList: any;
  constructor(
    private service: passengerService,
    private route: Router,
    private router: ActivatedRoute,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private location: Location,
    private loginService: LoginService
  ) {
    this.route.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.router.queryParams.subscribe(params => {
      this.paramsval = params['amount'];
     // this.paramsName = params['name'];
    });
    console.log("this.paramsval==>", this.paramsval);
    if (localStorage.token != "" || localStorage.token != undefined) {
      this.token = localStorage.token;
    }
    else
      this.route.navigate(['/login']);
    this.router.params.subscribe((response: any) => {
      this.driverDetails = new driverInfo();
      this.driverDetails.id = response.id == undefined ? 0 : Number(response.id);
    });
    this.startDate = new Date().toISOString().split('T')[0];
  }

  ngOnInit() {
    if (this.driverDetails.id != 0) {
      this.getPaymentList();
    }
    this.loginService.addInteraction(sessionStorage.getItem('email'),"Viewed trip transaction details ").subscribe((result:any) => {});
  }
  getPaymentList() {
    const inputToken = {
      token: this.token
    }
    this.service.getCashSettlementDet(this.driverDetails.id, inputToken).subscribe((response: any) => {
      if (response) {
        this.driverPaymentList = response.data;
        console.log("Payment=>", this.driverPaymentList);
        this.drivername = this.driverPaymentList[0].driver_name;
      }
    }, error => {
      console.log('Document get exception: ' + error.message);
    });
    // this.service.getDriverPaymentAdmin(this.driverDetails.id, inputToken).subscribe((response: any) => {
    //   if (response) {
    //     this.driverPaymentList = response.data;
    //     console.log("Payment=>", this.driverPaymentList);
    //     var totalPayment = this.driverPaymentList.map((item) => item.payment_status === 0 ? item.amount : 0)
    //     // console.log('total payments', totalPayment);
    //     this.TotalDriverPay = eval(totalPayment.join('+'));
    //     console.log(this.TotalDriverPay, "totalValue")
    //   }
    // }, error => {
    //   console.log('Document get exception: ' + error.message);
    // });
      
       this.service.getDriverSettlement(inputToken).subscribe((response: any) => {
      if (response) {
        this.driverSettlementList = "CAS"+('000000'+response.data[0].cnt).slice(-6);
        console.log("Payment=>", this.driverSettlementList);
       
        // this.TotalDriverPay = eval(totalPayment.join('+'));
        // console.log(this.TotalDriverPay, "totalValue")
      }
    }, error => {
      console.log('Document get exception: ' + error.message);
    });
  }

  UpdatePaidOrPennding(i) {
    this.tripId = i.target.value;
    console.log("payment details --->", this.tripId);
    // debugger;
    const inputRequest = {
      payment_status: 1,
    }
    this.service.updateDriverSettlements(this.tripId, inputRequest).subscribe((result) => {
      console.log('updated payments', result);
      if (result) {
        this.getPaymentList();
      }
    })

  }

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items

    this.pageOfItems = pageOfItems;
  }
  tripType(val) {
    var ret = "";
    if (val == 1)
      ret = "Private";
    else if (val == 2)
      ret = "Share";
    else if (val == 3)
      ret = "Split";
    return ret;
  }

  paidCashSettlement(){
    var btnModelPopup = (<HTMLInputElement>document.getElementById("btnModelPopup"));
    btnModelPopup.click();
  }
  open(content) {
    this.errorMessage = "";
    let ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false
    };
    this.modalService.open(content, ngbModalOptions).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  saveTransaction() {
    // debugger;
    var closeBtn = (<HTMLInputElement>document.getElementById("closeBtn"));
    var txtTransactionID = (<HTMLInputElement>document.getElementById("txtTransactionID"));
    var date = (<HTMLInputElement>document.getElementById("date"));
    var txtTransactionAmt = (<HTMLInputElement>document.getElementById("txtTransactionAmt"));
    if (txtTransactionAmt.value == "") {
      this.errorMessage = "Transaction Amount is Required";
      return;
    }
    else {     
      const inputToken={
        token: this.token
      }
      const inputRequest = {
        transaction_id: txtTransactionID.value,
        transaction_date: date.value,
        amount:txtTransactionAmt.value
      }
      this.service.updateCashPaid(this.driverDetails.id,inputRequest,inputToken).subscribe((result: any) => {
        if (result) {
          console.log("result", result);
          this.toastr.success("Successfully paid");
          closeBtn.click();
         // this.getDriverPayments();
           this.location.back();
        }
        else
        this.toastr.success(result.message);
      });
    }
  }
  backscreen(){
    this.route.navigate(['settlements/driver-settlement/']);
  }
}
