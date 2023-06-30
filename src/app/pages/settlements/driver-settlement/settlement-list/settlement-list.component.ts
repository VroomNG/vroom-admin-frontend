import { Component, OnInit } from '@angular/core';
import { passengerService } from '../../../../service/passenger.service';
import {exportService} from '../../../../service/export.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-settlement-list',
  templateUrl: './settlement-list.component.html',
  styleUrls: ['./settlement-list.component.css']
})
export class SettlementListComponent implements OnInit {
  FilterName = '';
  token: any;
  driverList = [];
  tripStatusId: any;
  pageOfItems: Array<any>;
  constructor(private service: passengerService,
    private service1: exportService,private route: Router,
    private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.getDriverPayablelist();
  }
  getDriverPayablelist(){
    debugger; this.driverList = [];

    const inputRequest = {
      token: this.token
    };
    this.service.getDriverWithdrawList(inputRequest).subscribe((result: any) => {
      debugger;
      this.driverList = [];
      if (result) {
        console.log("driver settlement transaction ==>", result)
        this.driverList = result.data;
        console.log("settlement list", this.driverList)
      }
    })
  }
  onChangePage(pageOfItems: Array<any>) {   
    this.pageOfItems = pageOfItems;
  }
  viewDriverWithdraw(id,amount) {
    debugger;    
    if (id != undefined && id != 0) {     
        this.route.navigate(['settlements/driver-settlement/withdraw-listview/' + id], { queryParams: { amount: amount} });
    }
  }
}
