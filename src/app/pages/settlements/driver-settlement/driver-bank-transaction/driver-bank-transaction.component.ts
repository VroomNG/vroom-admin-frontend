import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { driverInfo } from '../../../../model/driverInfo';
import { passengerService } from '../../../../service/passenger.service';
import {exportService} from '../../../../service/export.service';

@Component({
  selector: 'app-driver-bank-transaction',
  templateUrl: './driver-bank-transaction.component.html',
  styleUrls: ['./driver-bank-transaction.component.css']
})
export class DriverBankTransactionComponent implements OnInit {

  FilterName = '';
  token: any;
  driverList = [];
  tripStatusId: any;
  pageOfItems: Array<any>;
  constructor(
    private formBuilder: FormBuilder,
    private route: Router,
    private router: ActivatedRoute,
    private service: passengerService,
    private service1: exportService
  ) { 
    if (localStorage.token != "" || localStorage.token != undefined) {
      this.token = localStorage.token;
    }
    else
      this.route.navigate(['/login']);

    this.router.params.subscribe((response: any) => {     
      this.tripStatusId = response.id == undefined ? 0 : Number(response.id);

    });
  }

  ngOnInit(){
    this.getDriverTransDetails();
  }
  getDriverTransDetails() {
    debugger; this.driverList = [];

    const inputRequest = {
      token: this.token
    };
    this.service.getWithdrawReq(inputRequest).subscribe((result: any) => {
      debugger;
      this.driverList = [];
      if (result) {
        console.log("driver transaction ==>", result)
        this.driverList = result.data;
        
      }
    })
  }

  onChangePage(pageOfItems: Array<any>) {   
    this.pageOfItems = pageOfItems;
  }
  exportRiderBankSettlement() {    
    if(this.FilterName != '')
    this.service1.exportExcel(this.driverList.filter((item:any) => (item.name != null ? item.name.toLowerCase().includes(this.FilterName.toLowerCase()):'') || (item.driverId === this.FilterName) || item.phone_no.includes(this.FilterName)), 'driverBankSettlement');
    else
this.service1.exportExcel(this.driverList, 'driverBankSettlement');    
       
  }
  viewWithdrawReq(id,amount) {
    debugger;    
    if (id != undefined && id != 0) {     
        this.route.navigate(['settlements/driver-settlement/driver-bank-transaction-detail/' + id], { queryParams: { amount: amount} });
    }
  }
  viewWithdrawHistory(id,amount) {
    debugger;    
    if (id != undefined && id != 0) {     
        this.route.navigate(['settlements/driver-settlement/driver-wallet-details/' + id], { queryParams: { amount: amount} });
    }
  }
}
