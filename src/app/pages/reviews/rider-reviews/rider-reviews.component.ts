import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { driverService } from '../../../service/driver.service';
import {exportService} from '../../../service/export.service';
import { LoginService } from '../../../service/login.service';
@Component({
  selector: 'app-rider-reviews',
  templateUrl: './rider-reviews.component.html',
  styleUrls: ['./rider-reviews.component.css']
})
export class RiderReviewsComponent implements OnInit {
  FilterName: any = '';
  token: any;
  riderList = []; 
  pageOfItems: Array<any>;
  constructor(
    private formBuilder: FormBuilder,
    // private toastr: ToastrService,    
    private route: Router,
    private router: ActivatedRoute,
    private service: driverService,
    private service1:exportService,private loginService:LoginService
  ) { 
    if (localStorage.token != "" || localStorage.token != undefined) {
      this.token = localStorage.token;
    }
    else
      this.route.navigate(['/login']);   
  }

  ngOnInit() {   
    this.getRiderReview();
    this.loginService.addInteraction(sessionStorage.getItem('email'),"Viewed Rider reviews ").subscribe((result:any) => {});
  }
  getRiderReview() {
    debugger; this.riderList = [];

    const inputRequest = {
      token: this.token
    };
    
    this.service.getRiderReviewList(inputRequest,2).subscribe((result: any) => {      
      this.riderList = [];
      console.log(result)
      if (result) {
        if (result.data.length)          
          this.riderList = result.data;        
      }
    })
  }

  deleteRiderRating(id) {
    // console.log('deleted id', id)
    if (id != undefined && id != 0) {
      const inputRequest = {
        token: this.token
      };
      
      this.service.deleteDriverReview(inputRequest,id).subscribe((result: any) => {
        // debugger;      
        if (result) {
          if (result.data) {
            // this.driverList = result.data;
            this.getRiderReview();
            console.log("deleted review",result.data)
          }
        }
      })
    }
  }
  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }
  exportRiderReview(){     
    if(this.FilterName != '')
    this.service1.exportExcel(this.riderList.filter((item:any) => (item.driverName != null ? item.driverName.toLowerCase().includes(this.FilterName.toLowerCase()):'') || ( item.riderName != null ? item.riderName.toLowerCase().includes(this.FilterName.toLowerCase()):'') || item.trip_id === this.FilterName || (item.comments != null ? item.comments.toLowerCase().includes(this.FilterName.toLowerCase()):'') || (item.phone_no != null ? item.phone_no.toLowerCase().includes(this.FilterName.toLowerCase()):'') || (item.rating === this.FilterName)), 'riderReviewDetails');
   else
   this.service1.exportExcel(this.riderList, 'riderReviewDetails');     
  }
}
