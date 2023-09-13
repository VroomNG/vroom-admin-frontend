import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { driverInfo } from '../../../../model/driverInfo';
import { passengerService } from '../../../../service/passenger.service';
import { LoginService } from '../../../../service/login.service';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-driver-bank-transaction-detail',
  templateUrl: './driver-bank-transaction-detail.component.html',
  styleUrls: ['./driver-bank-transaction-detail.component.css']
})
export class DriverBankTransactionDetailComponent implements OnInit {
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
  constructor(  private service: passengerService,
    private route: Router,
    private router: ActivatedRoute,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private location: Location,private loginService: LoginService) { 
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
      this.startDate = new Date().toISOString().split('T')[0];
    }

  ngOnInit(): void {
    if (this.driverDetails.id != 0) {
      this.getWithdrawList();
    }
    this.loginService.addInteraction(sessionStorage.getItem('email'),"Viewed Driver bank transaction ").subscribe((result:any) => {});
  }
  getWithdrawList() {
    const inputToken = {
      token: this.token
    }
    this.service.getWithdrawReqtSing(this.driverDetails.id, inputToken).subscribe((response: any) => {
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
    // update current page of items

    this.pageOfItems = pageOfItems;
  }
  tripType(val: number) {
    var ret = "";
    if (val == 1)
      ret = "Private";
    else if (val == 2)
      ret = "Share";
    else if (val == 3)
      ret = "Split";
    return ret;
  }
  paidWithdrawRq(){
    var btnModelPopup = (<HTMLInputElement>document.getElementById("btnModelPopup"));
    btnModelPopup.click();
  }
  open(content: any) {
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
    debugger;
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
      this.service.updateWithdrawRqPaid(this.driverDetails.id,inputRequest,inputToken).subscribe((result: any) => {
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
    this.route.navigate(['settlements/driver-settlement/driver-bank-transaction/']);
  }
}
