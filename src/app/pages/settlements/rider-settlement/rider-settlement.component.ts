import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { driverService } from '../../../service/driver.service';
import { exportService } from '../../../service/export.service';
import { LoginService } from '../../../service/login.service';

@Component({
  selector: 'app-rider-settlement',
  templateUrl: './rider-settlement.component.html',
  styleUrls: ['./rider-settlement.component.css']
})
export class RiderSettlementComponent implements OnInit {
  token: any;
  FilterName = '';
  riderList = [];
  driverStatus: any;
  pageOfItems: Array<any>;
  constructor(
    private formBuilder: FormBuilder,
    // private toastr: ToastrService,    
    private route: Router,
    private router: ActivatedRoute,
    private service: driverService,
    private service1: exportService,
    private loginService:LoginService
  ) {
    if (localStorage.token != "" || localStorage.token != undefined) {
      this.token = localStorage.token;
    }
    else
      this.route.navigate(['/login']);    
   }

   ngOnInit() {
    this.getRiderPayments();
    this.loginService.addInteraction(sessionStorage.getItem('email'),"Viewed rider settlement").subscribe((result:any) => {});
  }
  getRiderPayments() {
    this.riderList = [];
    const inputRequest = {
      token: this.token
    };   
    this.service.getRiderPayments(inputRequest).subscribe((result: any) => {      
      this.riderList = [];
      if (result) {
        if (result.data.length) {          
          this.riderList = result.data;
        }
      }
    })
  }

  SinglRiderPayment(id,amount,fname,lname) {  
    var name = fname + " "+lname;      
    // if (id != undefined && id != 0)
    //   this.route.navigate(['settlements/rider-settlement/transaction-details-rider/' + id]);
    if (id != undefined && id != 0)
    this.route.navigate(['settlements/driver-settlement/transaction-details-driver/' + id], { queryParams: { amount: amount,name:name} });     
  }

  onChangePage(pageOfItems: Array<any>) {   
    this.pageOfItems = pageOfItems;
  }
  exportRiderSettlement() {  
    if(this.FilterName != '')
    this.service1.exportExcel(this.riderList.filter((item:any) => (item.firstname != null ? item.firstname.toLowerCase().includes(this.FilterName.toLowerCase()):'') || (item.lastname != null ? item.lastname.toLowerCase().includes(this.FilterName.toLowerCase()):'') || item.phone_no.includes(this.FilterName)), 'driverSettlementDetails');
  else
    this.service1.exportExcel(this.riderList, 'driverSettlementDetails');
  }
}
