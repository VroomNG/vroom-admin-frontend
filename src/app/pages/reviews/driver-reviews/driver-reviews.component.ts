import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { driverService } from '../../../service/driver.service';
import {exportService} from '../../../service/export.service';
import { LoginService } from '../../../service/login.service';
@Component({
  selector: 'app-driver-reviews',
  templateUrl: './driver-reviews.component.html',
  styleUrls: ['./driver-reviews.component.css']
})
export class DriverReviewsComponent implements OnInit {
  FilterName: any = '';
  token: any;
  driverList = [];
  driverStatus: any;
  pageOfItems!: Array<any>;
  constructor(
    private formBuilder: FormBuilder,
    // private toastr: ToastrService,    
    private route: Router,
    private router: ActivatedRoute,
    private service: driverService,
    private service1: exportService,private loginService: LoginService
  ) {
    if (localStorage['token'] != "" || localStorage['token'] != undefined) {
      this.token = localStorage['token'];
    }
    else
      this.route.navigate(['/login']);

    this.router.params.subscribe((response: any) => {
      this.driverStatus = response.id == undefined ? 0 : Number(response.id);
     
    });
  }

  ngOnInit() {
    debugger;
    this.getDriverReview();
    this.loginService.addInteraction(sessionStorage.getItem('email'),"Viewed Driver reviews ").subscribe((result:any) => {});

  }
  getDriverReview() {

    debugger; this.driverList = [];

    const inputRequest = {
      token: this.token
    };
    
    this.service.getDriverReviewList(inputRequest,1).subscribe((result: any) => {
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

  deleteDriverRating(id:any) {
    debugger;
    if (id != undefined && id != 0) {
      const inputRequest = {
        token: this.token
      };
      
      this.service.deleteDriverReview(inputRequest,id).subscribe((result: any) => {
        debugger;      
        if (result) {
          if (result.data) {
            this.getDriverReview();
            // this.driverList = result.data;
          }
        }
      })
    }
  }
  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }
  exportDriverReview(){        
    if(this.FilterName != '')
    this.service1.exportExcel(this.driverList.filter((item:any) => (item.driverName != null ? item.driverName.toLowerCase().includes(this.FilterName.toLowerCase()):'') || ( item.riderName != null ? item.riderName.toLowerCase().includes(this.FilterName.toLowerCase()):'') || item.trip_id === this.FilterName || (item.comments != null ? item.comments.toLowerCase().includes(this.FilterName.toLowerCase()):'') || (item.phone_no != null ? item.phone_no.toLowerCase().includes(this.FilterName.toLowerCase()):'') || (item.rating === this.FilterName)), 'driverReviewDetails');
   else
this.service1.exportExcel(this.driverList, 'driverReviewDetails');     
  }
}
