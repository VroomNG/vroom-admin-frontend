import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { driverService } from '../../../service/driver.service';
import { exportService } from '../../../service/export.service';
import { LoginService } from '../../../service/login.service';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-driver-settlement',
  templateUrl: './driver-settlement.component.html',
  styleUrls: ['./driver-settlement.component.css']
})
export class DriverSettlementComponent implements OnInit {
  token: any;
  FilterName = '';
  driverList = [];
  driverStatus: any;
  selectedArrayBts: any;
  pageOfItems!: Array<any>;
  errorMessage: any;
  closeResult = '';
  settlementList=[];
  settingdays=[];
  thresholdAmt:any = 0;
  constructor(
    private formBuilder: FormBuilder,
    // private toastr: ToastrService,    
    private route: Router,
    private router: ActivatedRoute,
    private service: driverService,
    private service1: exportService,
    private location: Location,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private loginService: LoginService
  ) {
    if (localStorage['token'] != "" || localStorage['token'] != undefined) {
      this.token = localStorage['token'];
    }
    else
      this.route.navigate(['/login']);
      for(var j=1;j<=30;j++){
        // this.settingdays.push({"id":j, "value":j})
      }
  }

  ngOnInit() {
    this.getThresholdDetail();
    this.getDriverPayments();
    this.loginService.addInteraction(sessionStorage.getItem('email'),"Viewed Driver Settlement ").subscribe((result:any) => {});
  }
  getDriverPayments() {

    debugger; this.driverList = [];

    const inputRequest = {
      token: this.token
    };

    // this.service.getDriverPayments(inputRequest).subscribe((result: any) => {
      this.service.getDriverPayableList(inputRequest).subscribe((result: any) => {
      debugger;
      this.driverList = [];
      if (result) {
        console.log("result ==>", result)
        if (result.data.length) {
          this.driverList = result.data;
          console.log("driver list=> ", this.driverList);
        }
      }
    })
  }

  // viewDriverPayments(id, amount, fname, lname, sts, cash) {
  //   debugger;
  //   var name = fname + " " + lname;
  //   if (id != undefined && id != 0) {
  //     if (sts == 1)
  //       this.route.navigate(['settlements/driver-settlement/transaction-details-driver/' + id], { queryParams: { amount: amount, name: name } });
  //     else if (sts == 2)
  //       this.route.navigate(['settlements/driver-settlement/driver-wallet-details/' + id], { queryParams: { amount: amount, name: name, cash: cash } });
  //   }
  // }
  viewDriverPayments(id: string | number | undefined,amount: any) {
    debugger;    
    if (id != undefined && id != 0) {     
        this.route.navigate(['settlements/driver-settlement/transaction-details-driver/' + id], { queryParams: { amount: amount} });
    }
  }

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }
  exportRiderReview() {
    if (this.FilterName != '')
      this.service1.exportExcel(this.driverList.filter((item: any) => item.firstname.toLowerCase().includes(this.FilterName.toLowerCase()) || item.lastname.toLowerCase().includes(this.FilterName.toLowerCase()) || item.user_id === this.FilterName || item.amount === this.FilterName.toLowerCase() || item.email.toLowerCase().includes(this.FilterName.toLowerCase()) || item.phone_no.includes(this.FilterName)), 'driverSettlement');
    else
      this.service1.exportExcel(this.driverList, 'driverSettlement');

  }
  selectDriverPaid() {
    var btnAdminPaid = (<HTMLInputElement>document.getElementById("btnAdminPaid"));
    btnAdminPaid.hidden = false;

  }
  paidAdmin() {
    debugger;
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
    var paidStatusUpdt = document.getElementsByClassName("paidStatusUpdt");
    if (txtTransactionID.value == "") {
      this.errorMessage = "Transaction ID is Required";
      return;
    }
    else {
      this.selectedArrayBts = Array.from(paidStatusUpdt);
      let tmparry: any[] = [];
      this.selectedArrayBts.forEach((element: { checked: boolean; id: any; }) => {
        if (element.checked == true) {
          const fomValue = element.id;
          tmparry.push(fomValue);
        }
      });
      const inputRequest = {
        user_id: tmparry,
        admin_transactionid: txtTransactionID.value
      }
      this.service.updateDriverPayments(inputRequest).subscribe((result: any) => {
        if (result) {
          console.log("result", result);
          this.toastr.success("Successfully paid");
          closeBtn.click();
          this.getDriverPayments();
          // this.location.back();
        }
      });
    }
  }
 
  openSettings(content: any) {
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
   this.getThresholdDetail();
  }
  getThresholdDetail(){
    const inputToken = {
      token: this.token
    }
    this.service.getSettings(inputToken).subscribe((result: any) => {
      if (result) {
        this.settlementList = result.data;
        this.thresholdAmt = result.data.threshold_amount;
        console.log("Result Settlement", result);
      }
    });
  }
  popupSettings() {
    debugger;
    var settings = (<HTMLInputElement>document.getElementById("btnModelPopupSettings"));
    settings.click();
  }
  saveSettings(event: { target: any; }) {    
    debugger;
    var target = event.target;
    var id = target.id.split('_')[1];
    var closeBtn = (<HTMLInputElement>document.getElementById("closeBtnSett"));
    var txtThresholdAmount = (<HTMLInputElement>document.getElementById("txtThresholdAmount"));
    var txtmaxdays = (<HTMLInputElement>document.getElementById("selmaxdays"));
    if (txtThresholdAmount.value == "") {
      this.errorMessage = "Threshold Amount is Required";
      return;
    }
    else {

      const inputRequest = {
        threshold_amount: txtThresholdAmount.value,
        max_days: txtmaxdays.value
      }
      const inputToken = {
        token: this.token
      }
      this.service.updateSettings(inputRequest, inputToken, id).subscribe((result: any) => {
        if (result) {
          console.log("result", result);
          this.toastr.success("Successfully Update the Settings");
          closeBtn.click();
          this.getThresholdDetail();
          this.getDriverPayments();
          // this.location.back();
        }
      });
    }
  }

  viewCashSettHistory(id: string | number | undefined,amount: any) {
    debugger;    
    if (id != undefined && id != 0) {     
        this.route.navigate(['settlements/driver-settlement/settlement-list-edit/' + id], { queryParams: { amount: amount} });
    }
  }
}
