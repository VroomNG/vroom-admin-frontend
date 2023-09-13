import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { driverInfo } from '../../../model/driverInfo';
import { driverService } from '../../../service/driver.service';
import { exportService } from '../../../service/export.service';
import { passengerService } from '../../../service/passenger.service';
import { LoginService } from '../../../service/login.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
// import { customScrollBar } from 'floating-scrollbar-for-angular';


declare var $:any;
@Component({
  selector: 'app-view-driver',
  templateUrl: './view-driver.component.html',
  styleUrls: ['./view-driver.component.css']
})
export class ViewDriverComponent implements OnInit {
  public ascNumberSort = true;
  booleanValue: any = true;
  column: string = 'CategoryName';
  token: any;
  isFormReady: boolean = false;
  PermissionEnable: any;
  pagePath: any;
  FilterName: any;
  messageTarget = 0;
  pnInbox = 0;
  driverList = [];
  driverStatus: any;
  driverFil = [{ "id": 0, "value": "All" }, { "id": 1, "value": "Active" }, { "id": 2, "value": "InActive" }];
  driverOnline = [{ "id": 2, "value": "All" }, { "id": 0, "value": "Offline" }, { "id": 1, "value": "Online" }];
  dayDisable: boolean = false;
  closeResult = '';
  errorMessage: any; selectedArrayBts: any; errorMessageTit: any; errorMessageDes: any;
  // items = [];
  pageOfItems!: Array<any>;
  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private route: Router,
    private router: ActivatedRoute,
    private service: driverService,
    private service123: passengerService,
    private modalService: NgbModal,
    private service1: exportService,
    private loginService: LoginService
  ) {
    debugger;
    if (localStorage['token'] != "" || localStorage['token'] != undefined) {
      this.token = localStorage['token'];
    }
    else
      this.route.navigate(['/login']);

    this.router.params.subscribe((response: any) => {
      console.log('params data ==>', response)
      this.driverStatus = response.id == undefined ? 0 : Number(response.id);
      localStorage.setItem('driverStatus', this.driverStatus);
    });
  }

  ngOnInit() {
    debugger;
    this.getDriverView(0, '', '');
    // this.items = Array(150).fill(0).map((x, i) => ({ id: (i + 1), name: `Item ${i + 1}`}));
    this.pagePath = this.route.url.split('/');
    this.pagePath = this.pagePath[this.pagePath.length - 1];
    if(this.driverStatus == 1)
    this.loginService.addInteraction(sessionStorage.getItem('email'),"Viewed Approved Drivers ").subscribe((result:any) => {});
    else if(this.driverStatus == 2)
    this.loginService.addInteraction(sessionStorage.getItem('email'),"Viewed Unapproved Drivers ").subscribe((result:any) => {});
    else if(this.driverStatus == 3)
    this.loginService.addInteraction(sessionStorage.getItem('email'),"Viewed Rejected Drivers ").subscribe((result:any) => {});
    $('#main').floatingScroll();

    // // console.log("Path name", this.pagePath)

  }
  AfterViewInit(){
    let options={
      beautifyScroll:true // set to TRUE if you want a beautiful scrollbar
     // scrollBarColor:"", // scrollbar color for making it more beautiful, leave it blank or false
    }
  //  customScrollBar.scroll(document.getElementById("main"),options);
 }
  getDriverView(filt: any, days: string, isOnline: string) {
    debugger;
    var inputRequest;
    debugger; this.driverList = [];

    inputRequest = {
      token: this.token,
      isonline: isOnline
    };
    // console.log("driverStatus ==> ", this.driverStatus);
    if (this.driverStatus == 1) {
      // inputRequest.days = days;

      this.service.getDriverFilter(inputRequest, filt).subscribe((result: any) => {
        debugger;
        this.driverList = [];
        if (result) {
          if (result.data.length) {
            console.log("RESULT ==>", result.data);
            this.driverList = result.data;

          }
        }
      })
    }
    else {
      this.service.getDriverList(inputRequest, this.driverStatus).subscribe((result: any) => {
        this.driverList = [];
        if (result) {
          if (result.data.length) {
            this.driverList = result.data;
          }
        }
      })
    }
  }

  viewDriverDetails(id: any, isBlock: any) {
    debugger;
    if (id != undefined && id != 0)
      this.route.navigate(['driver/add-driver/' + id], { queryParams: { status: this.driverStatus, isBlock: isBlock } });
  }

  onChangePage(pageOfItems: Array<any>) {
    debugger;
    // update current page of items
    this.pageOfItems = pageOfItems;
    // // console.log("page names", this.pageOfItems)
    // this.PermissionEnable = this.pageOfItems.filter((item: any) => item.is_active === '1');

  }
  exportDriver() {
    debugger;
    if (this.FilterName != '' && this.FilterName != undefined)
      this.service1.exportExcel(this.driverList.filter((item: any) => item.firstname.toLowerCase().includes(this.FilterName.toLowerCase()) || (item.lastname != null && item.lastname != undefined ? item.lastname.toLowerCase().includes(this.FilterName.toLowerCase()) : '') || item.id === this.FilterName || (item.city != null && item.city != undefined ? item.city.toLowerCase().includes(this.FilterName.toLowerCase()) : '') || (item.vehicle_type != null && item.vehicle_type != undefined ? item.vehicle_type.toLowerCase().includes(this.FilterName.toLowerCase()) : '') || item.email.toLowerCase().includes(this.FilterName.toLowerCase()) || item.phone_no.includes(this.FilterName)), 'driverDetails');
    else
      this.service1.exportExcel(this.driverList, 'driverDetails');
  }

  // inactive drivers
  approveDriver(id:any, status:any) {
    debugger;
    this.isFormReady = true;
    var inputRequest;
    if (status == 5) {
      inputRequest = {
        is_active: 1
      };
    }
    else if (status == -5) {
      inputRequest = {
        is_active: 0
      };
    }
    else {
      inputRequest = {
        is_active: status
      };
    }

    debugger;
    this.service123.updateDriverStatus(inputRequest, id).subscribe((result: any) => {
      // // console.log("view driver", result)
      if (result.data) {
        this.getDriverView(0, '', '');
        this.route.navigate(['driver/view-driver']);
      }
    });
  }

  driverFilter(event:any) {
    debugger; var txtDays = (<HTMLInputElement>document.getElementById("txtDays"));
    var selOnlineFilter = (<HTMLInputElement>document.getElementById("selOnlineFilter"));
    var target = event.target.value;
    if (target == '1' || target == '2')
      this.dayDisable = true;
    else { txtDays.value = ""; this.dayDisable = false; }
    this.getDriverView(target, txtDays.value, selOnlineFilter.value);
  }
  filterDays(event:any) {
    debugger;
    var target = event.target;
    var selDriverFilter = (<HTMLInputElement>document.getElementById("selDriverFilter"));
    var selOnlineFilter = (<HTMLInputElement>document.getElementById("selOnlineFilter"));
    this.getDriverView(selDriverFilter.value, target.value, selOnlineFilter.value);
  }
  setDriverBlock(event:any, id:any) {
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
      this.service123.blockDriverStatus(inputToken, inputRequest, id).subscribe((result: any) => {
        if (result.data) {
          console.log("Block status", result.data);
        }
      });
    }
  }
  open(content:any) {
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
      this.service123.blockDriverStatus(inputToken, inputRequest, id).subscribe((result: any) => {
        if (result.data) {
          console.log("Block status", result.data);
        }
        closeBtn.click();
      });
    }
  }
  clearError() {
    this.errorMessage = "";
  }
  // CloseModal(){
  //   this.getDriverView(0, '');
  //   var btnHideClose = (<HTMLInputElement>document.getElementById("btnHideClose"));
  //   btnHideClose.click();

  // }
  sortNumberColumn(event:any, boolean:any) {
    debugger;
    var target = event.currentTarget,
      colName = target.id,
      classList = target.classList;

    if (classList.contains('fa-chevron-up')) {
      classList.remove('fa-chevron-up');
      classList.add('fa-chevron-down');
    } else {
      classList.add('fa-chevron-up');
      classList.remove('fa-chevron-down');
    }

    // this.driverList = this.driverList.sort((a, b) => a[colName] > b[colName] ? 1 : a[colName] < b[colName] ? -1 : 0)

    if (boolean == true) {
      this.driverList = this.driverList.sort((a, b) => a[colName] < b[colName] ? 1 : a[colName] > b[colName] ? -1 : 0)
      this.booleanValue = !this.booleanValue
    }
    else {
      this.driverList = this.driverList.sort((a, b) => a[colName] > b[colName] ? 1 : a[colName] < b[colName] ? -1 : 0)
      this.booleanValue = !this.booleanValue
    }
    this.onChangePage(this.driverList.slice(0, 10))
    // return this.pageOfItems = this.driverList;

  }
  OnlineFilter(event:any) {
    var target = event.target;
    var selDriverFilter = (<HTMLInputElement>document.getElementById("selDriverFilter"));
    var txtDays = (<HTMLInputElement>document.getElementById("txtDays"));
    this.getDriverView(selDriverFilter.value, txtDays.value, target.value);
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

  sendNotifyMsg() {
    var targetId = "";
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
      if(this.messageTarget == 1)
      {
        targetId = "inb";
      }
     if(this.pnInbox == 1)
     {
      targetId = "iap";
     }
      const inputRequest = {
        title: targetId + txtTitle.value,
        description: txtDescription.value,
        user_id: tmparry
      }
      this.service123.sendWarnNotification(inputRequest, inputToken).subscribe((result: any) => {
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
  open1(content: any) {
    this.errorMessage = "";
    let ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false
    };
    this.modalService.open(content, ngbModalOptions).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason1(reason)}`;
    });
  }
  private getDismissReason1(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  clearError1() {
    this.errorMessageTit = "";
  }
  clearError2() {
    this.errorMessageDes = "";
  }
  setTarget()
  {
    if(this.messageTarget == 0) 
    {
      this.messageTarget = 1
    }
    else if(this.messageTarget == 1)
    {
      this.messageTarget = 0;
    }
  }
  setTarget2()
  {
    if(this.pnInbox == 0) 
    {
      this.pnInbox = 1
    }
    else if(this.pnInbox == 1)
    {
      this.pnInbox = 0;
    }
  }
}
