import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { vehicleInfo } from '../../../model/vehicleInfo';
import { vehicleService } from '../../../service/vehicle.service';
import {exportService} from '../../../service/export.service';
import { driverService } from '../../../service/driver.service';
import { LoginService } from '../../../service/login.service';
@Component({
  selector: 'app-view-vehicle',
  templateUrl: './view-vehicle.component.html',
  styleUrls: ['./view-vehicle.component.css']
})
export class ViewVehicleComponent implements OnInit {

  FilterName = '';

  token: any;
  vehicleList = [];
  pageOfItems: Array<any> | undefined;
  settlementList:[] | undefined;
  constructor(
    private formBuilder: FormBuilder,
    private route: Router,
    private router: ActivatedRoute,
    private service: vehicleService,
    private service1: exportService,
    private service2:driverService,
    private loginService: LoginService
  ) {
    if (localStorage['token'] != "" || localStorage['token'] != undefined) {
      this.token = localStorage['token'];
    }
    else
      this.route.navigate(['/login']);
  }

  ngOnInit() {
    debugger;
    this.getVehicleView();
    this.loginService.addInteraction(sessionStorage.getItem('email'),"Viewed Vehicle Info ").subscribe((result:any) => {});

  }
  getVehicleView() {

    debugger; this.vehicleList = [];

    const inputRequest = {
      token: this.token
    };
    this.service.getVehicleList(inputRequest).subscribe((result: any) => {
      debugger;
      this.vehicleList = [];
      if (result) {
        if (result.data.length) {
          console.log("Vehicle ==>", result.data);
          this.vehicleList = result.data;
        }
      }
    })
    const inputToken = {
    token: this.token
  }
  this.service2.getSettings(inputToken).subscribe((result: any) => {
    if (result) {
      this.settlementList = result.data;
      
      console.log("Result Settlement", result);
    }
  });
  }

  viewVehicleDetails(id: string | number | undefined) {
    debugger;
    if (id != undefined && id != 0)
      this.route.navigate(['vehicle/add-vehicle/' + id]);
  }
  // onChangePage(pageOfItems: Array<any>) {
  //   // update current page of items
  //   this.pageOfItems = pageOfItems;
  // }
  exportVehicles(){       
    if(this.FilterName != '')
    this.service1.exportExcel(this.vehicleList.filter((item:any) => item.vehicle_type.toLowerCase().includes(this.FilterName.toLowerCase()) || item.trip_type.toLowerCase().includes(this.FilterName.toLowerCase()) || item.per_km_rate === this.FilterName || item.minimum_fare === this.FilterName || item.commission === this.FilterName || item.base_fare === this.FilterName || item.tolls_fees === this.FilterName), 'vehiclesDetails');
   else
    this.service1.exportExcel(this.vehicleList, 'vehiclesDetails');  
  }
  changeRadius(id: any){
    debugger;
    var vehicleRadius = (<HTMLInputElement>document.getElementById("vehicleRadius"));    
    const inputRequest = {
      radius:vehicleRadius.value
    }
    const inputToken = {
      token: this.token
    }
    this.service2.updateSettings(inputRequest, inputToken, id).subscribe((result: any) => {
      if (result) {
        console.log("result", result);        
      }
    });
  }


  // const inputToken = {
  //   token: this.token
  // }
  // this.service.getSettings(inputToken).subscribe((result: any) => {
  //   if (result) {
  //     this.settlementList = result.data;
  //     this.thresholdAmt = result.data.threshold_amount;
  //     console.log("Result Settlement", result);
  //   }
  // });
}
