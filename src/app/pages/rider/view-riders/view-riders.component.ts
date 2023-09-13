import { Component, OnInit,ElementRef,ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { driverInfo } from '../../../model/driverInfo';
import { passengerService } from '../../../service/passenger.service';
import { exportService } from '../../../service/export.service';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../../../service/login.service';
// import { customScrollBar } from 'floating-scrollbar-for-angular';
//import $ from 'jquery';

declare var $:any;
@Component({
  selector: 'app-view-riders',
  templateUrl: './view-riders.component.html',
  styleUrls: ['./view-riders.component.css','./floating_scroll.css']
})
export class ViewRidersComponent implements OnInit {

  FilterName: any = '';
  token: any;
  ridersList = [];
  selectedArrayBts:any;
  pageOfItems!: Array<any>;
  riderFil = [{ "id": 0, "value": "All" }, { "id": 1, "value": "Active" }, { "id": 2, "value": "InActive" }]
  dayDisable: boolean = false;
  closeResult = '';
  errorMessage: any;
  errorMessageTit: any; 
  errorMessageDes: any;
  modalOption: NgbModalOptions = {};
  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private route: Router,
    private router: ActivatedRoute,
    private service: passengerService,
    private service1: exportService,
    private modalService: NgbModal,
    private loginService: LoginService,
    private elemRef: ElementRef
  ) {
    if (localStorage['token'] != "" || localStorage['token'] != undefined) {
      this.token = localStorage['token'];
    }
    else
      this.route.navigate(['/login']);
  }

  ngOnInit() {
    debugger;
    this.getRidersView(0, '');
    this.loginService.addInteraction(sessionStorage.getItem('email'),"Viewed Riders ").subscribe((result:any) => {});
    $('#main').floatingScroll();
    //this.AfterViewInit();
}
  AfterViewInit(){
    let options={
      beautifyScroll:true // set to TRUE if you want a beautiful scrollbar
     // scrollBarColor:"", // scrollbar color for making it more beautiful, leave it blank or false
    }
  //  customScrollBar.scroll(document.getElementById("main"),options);
 }
  getRidersView(filt:any, days:any) {
    debugger; this.ridersList = [];

    //var searchkey = (<HTMLInputElement>document.getElementById("search"));

    const inputRequest = {
      token: this.token,
      days: days
    };
    this.service.getPassengerList(inputRequest, filt).subscribe((result: any) => {
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
  editRiders(id:any) {
    debugger;
    if (id != undefined && id != 0)
      this.route.navigate(['rider/add-edit-riders/' + id]);
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
    this.service1.exportExcel(this.ridersList, 'riderDetails');
  }
  riderFilter(event:any) {
    debugger;
    var txtDays = (<HTMLInputElement>document.getElementById("txtDays"));
    var target = event.target.value;
    if (target == '1' || target == '2')
      this.dayDisable = true;
    else { txtDays.value = ""; this.dayDisable = false; }
    this.getRidersView(target, txtDays.value);
  }
  filterDays(event:any) {
    debugger;
    var target = event.target;
    var selRiderFilter = (<HTMLInputElement>document.getElementById("selRiderFilter"));
    this.getRidersView(selRiderFilter.value, target.value);
  }
  setUserBlock(event: { target: any; }, id: string) {
    debugger;
    var target = event.target;
    if (target.checked == true) {
      var btnModelPopup = (<HTMLInputElement>document.getElementById("btnModelPopup"));
      btnModelPopup.setAttribute("name", id);
      btnModelPopup.setAttribute("data-label", target.checked == true ? '1' : '0');
      btnModelPopup.click();
    }
    else {
      const inputToken = {
        token: this.token
      }
      const inputRequest = {
        isBlock: target.checked == true ? '1' : '0'
      }
      this.service.blockDriverStatus(inputToken, inputRequest, id).subscribe((result: any) => {
        if (result.data) {
          console.log("Block status", result.data);
        }
      });
    }
  }

  open(content: any) {
    this.errorMessage="";     
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
  saveReason() {
    debugger;
    this.errorMessage = ""
    var txtreason = (<HTMLInputElement>document.getElementById("txtreason"));
    var closeBtn = (<HTMLInputElement>document.getElementById("closeBtn"));
    var btnModelPopup = (<HTMLInputElement>document.getElementById("btnModelPopup"));
    var chk = btnModelPopup.dataset["label"];
    var id = btnModelPopup.name;
    if (txtreason.value == "") {
      this.errorMessage = "Block Reason is Required";
      return;
    }
    else {
      const inputToken = {
        token: this.token
      }
      const inputRequest = {
        isBlock: chk,
        block_reason: txtreason.value
      }
      this.service.blockDriverStatus(inputToken, inputRequest, id).subscribe((result: any) => {
        if (result.data) {
          console.log("Block status", result.data);
        }
        closeBtn.click();
      });
    }
  }
  showNotifyBtn() {
    var btnNotify = (<HTMLInputElement>document.getElementById("btnNotify"));
    var notifycheck = document.getElementsByClassName("notifycheck");
    var chkEnable = 0;
    btnNotify.hidden = false;

    this.selectedArrayBts = Array.from(notifycheck);    
    this.selectedArrayBts.forEach((element: { checked: boolean; }) => {
      if (element.checked == true) {
        chkEnable = 1;     
      }
    });
    if(chkEnable == 0)
    btnNotify.hidden = true;  
  }
  openNotifyModel() {
    var btnModelPopupNotify = (<HTMLInputElement>document.getElementById("btnModelPopupNotify"));
    btnModelPopupNotify.click();
  }
  open1(content: any) {
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
  sendNotifyMsg() {
    debugger; var iserror = 0;
    var txtTitle = (<HTMLInputElement>document.getElementById("txtTitle"));
    var txtDescription = (<HTMLInputElement>document.getElementById("txtDescription"));
    var notifycheck = document.getElementsByClassName("notifycheck");
    var closeBtnNotify = (<HTMLInputElement>document.getElementById("closeBtnNotify"));
    var btnNotify = (<HTMLInputElement>document.getElementById("btnNotify"));
   
    if (txtTitle.value == "") {
      this.errorMessageTit = "* Title is required"; iserror = 1;
    }
    if (txtDescription.value == "") {
      this.errorMessageDes = "* Description is required"; iserror = 1;
    }
    if (iserror == 1)
      return;
    else {
      this.selectedArrayBts = Array.from(notifycheck);
      let tmparry: any[] = [];
      this.selectedArrayBts.forEach((element: { checked: boolean; id: any; }) => {
        if (element.checked == true) {
          const fomValue = element.id;
          tmparry.push(fomValue);
        }
      });
      console.log("Temp arr",tmparry);
      const inputToken = {
        token: this.token
      }
      const inputRequest = {
        title: txtTitle.value,
        description: txtDescription.value,
        user_id: tmparry
      }
      this.service.sendWarnNotification(inputRequest, inputToken).subscribe((result: any) => {
        if (result)
          console.log("Notify msg", result);
        this.toastr.success("Successfully send the Notification");
        closeBtnNotify.click();

        this.selectedArrayBts.forEach((element: { checked: boolean; }) => {
          if (element.checked == true) {
            element.checked = false;
          }
        });
        btnNotify.hidden = true;
      });
    }
  }
  clearError(){
    this.errorMessage="";     
   }
}
