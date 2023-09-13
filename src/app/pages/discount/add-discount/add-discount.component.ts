import { Component, OnInit, ElementRef, ViewChild, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { chartService } from '../../../service/chart.service';
import { discountInfo } from '../../../model/discountInfo';
import { ApiService, Maps } from '../../../service/api.service';
import { ReplaySubject } from 'rxjs';
// import { ThrowStmt } from '@angular/compiler';
let colorIndex = 0;
// const place = null as unknown as google.maps.places.PlaceResult;
// type Components = typeof place.address_components;

@Component({
  selector: 'app-add-discount',
  templateUrl: './add-discount.component.html',
  styleUrls: ['./add-discount.component.css']
})
export class AddDiscountComponent implements OnInit {
token : any;
discountData!: discountInfo;
discountForm!: FormGroup;
errorMessage: any;
isFormReady = false;
submitted = false;
numRegex = /^-?\d*[.,]?\d{0,2}$/;
minDate: any = new Date();
private randomSub = new ReplaySubject(1);
random = this.randomSub.asObservable();
DisID:any;
  constructor( private route: Router,
    private router: ActivatedRoute,
    private location: Location,
    private formbuilder: FormBuilder,
    private surgeService: chartService,
    private apiService: ApiService, private ngZone: NgZone) { 
      this.route.routeReuseStrategy.shouldReuseRoute = function () {
        return false;
      };
  
      if (localStorage['token'] != "" || localStorage['token'] != undefined) {
        this.token = localStorage['token'];
        //this.flag_admin = localStorage.flag_admin;
  
      }
      else {
        this.route.navigate(['/login']);
      }
  
      this.router.params.subscribe((response: any) => {
        this.discountData = new discountInfo();
        this.discountData.id = response.id == undefined ? 0 : Number(response.id);
        // console.log(this.settingData, "<== data ")
        // console.log("ID for Admin ==> ",this.settingData.id);
        
        // var rand =this.emitRandomNumber();
        // console.log("random mu",Math.random());
      });
    
      if(this.discountData.id == 0){
        var s = this.getNewID();   
        var firstDigit = toString().substring(1,6); 
        console.log("firstDigit",firstDigit);
        
        this.discountData.discount_code = firstDigit;
      }
     
    }

  ngOnInit(): void {
    debugger;
    this.createForm();
    if (this.discountData.id != 0) {
      this.getSingleData();
    }
    else{
      this.discountForm.value.SelectedDate = 0;
     this.discountData.discount_code = "12345678";// Math.random();
      
    }
  }
  get f() { return this.discountForm.controls; }
  // emitRandomNumber() {
  //    this.randomSub.next(Math.random());
  //    console.log("ran tt==>", this.randomSub.next(Math.random()));
  // }
  getNewID():any {
    try {
        var myDate = new Date();
        var varID = myDate.getHours() + "" + myDate.getMinutes() + "" + myDate.getSeconds() + "" + myDate.getMilliseconds();
        if (varID.length > 15) {
            varID = varID.substr(0, 15);
        }
        return varID;
    } catch (e:any) {
        console.log(e.message);
    }
}

  createForm() {
  this.discountForm = this.formbuilder.group({
    discount_code: [this.discountData.discount_code, Validators.required],
      title: [this.discountData.title, [Validators.required]],
      description: [this.discountData.description, Validators.required],
      start_date: [this.discountData.start_date, Validators.required],
      end_date: [this.discountData.end_date, Validators.required],
      discount_percent: [this.discountData.discount_percent, [Validators.required,Validators.pattern(this.numRegex)]],
      max_discount_amount: [this.discountData.max_discount_amount,[Validators.pattern(this.numRegex)]],
      max_no_of_users: [this.discountData.max_no_of_users,[Validators.pattern(this.numRegex)]],     
    })
   

  }
  addDiscount() {
    debugger;    
    this.errorMessage = ""; 
    this.submitted = true;
    this.isFormReady = true;

    // var amount = (<HTMLInputElement>document.getElementById("amount"));
    // var multipler = (<HTMLInputElement>document.getElementById("multipler"));
    // var city = document.getElementsByClassName("form-control auto") as HTMLCollectionOf<HTMLInputElement>;
    // var radius = (<HTMLInputElement>document.getElementById("radius"));
    const inputRequest = {
      discount_code: this.discountForm.value.discount_code,
      title: this.discountForm.value.title,
      description: this.discountForm.value.description,
      start_date: this.discountForm.value.start_date,
      end_date: this.discountForm.value.end_date,
      discount_percent: this.discountForm.value.discount_percent,
      max_discount_amount: this.discountForm.value.max_discount_amount,
      max_no_of_users: this.discountForm.value.max_no_of_users
      // latitude: this.discountForm.value.fromDate,
      // longitude: this.discountForm.value.fromDate,
      // toDate: this.discountForm.value.toDate,
    }


    if (this.discountForm.invalid) {
      return
    }
   
    console.log('input request', inputRequest)
      this.surgeService.addDiscount(inputRequest).subscribe((result: any) => {
        console.log("resupt", result.data);
        if (result.data) {
          this.discountForm.reset();
          this.route.navigate(['discount/edit-discount']);
        }
        else if (result.error.code == 100) {
          console.log("error mail data ")
        }
        else {
          console.log("clear form data")
        }

      });
    }
  

  getSingleData() {
    debugger;
        this.surgeService.getsingleDiscount(this.discountData.id).subscribe((response: any) => {
          if (response) {
            console.log('surge charge', response)
            if (this.discountData.id > 0) {
              this.discountData.discount_code = response.data.discount_code;
    
              this.discountData.title = response.data.title;              
              this.discountData.description = response.data.description;
              this.discountData.start_date = response.data.start_date;
              this.discountData.end_date = response.data.end_date;
              
              this.discountData.discount_percent = response.data.discount_percent;
              this.discountData.max_discount_amount = response.data.max_discount_amount;
              this.discountData.max_no_of_users = response.data.max_no_of_users;             
             
            }
            this.createForm();
          }
        });
      }
        // update passanger
  updateDiscount(id:any) {
    debugger;    
    this.isFormReady = true;
    this.submitted = true;
    
    if (this.discountForm.invalid)          
      return;        
    
    const inputRequest = {
      discount_code: this.discountForm.value.discount_code,
      title: this.discountForm.value.title,
      description: this.discountForm.value.description,
      start_date: this.discountForm.value.start_date,
      end_date: this.discountForm.value.end_date,
      discount_percent: this.discountForm.value.discount_percent,
      max_discount_amount: this.discountForm.value.max_discount_amount,
      max_no_of_users: this.discountForm.value.max_no_of_users,
    };

    console.log('update status', inputRequest);

    this.surgeService.updateDiscount(inputRequest, id).subscribe((result: any) => {     
      if (result) {
        if (result.data) {
          this.route.navigate(['discount/edit-discount']);
        }
      }

    });
  }
  // delete surcharge
  deleteDiscount(id:any) {
    this.surgeService.deleteDiscount(id).subscribe((result: any) => {
      if (result) {
        this.route.navigate(['discount/edit-discount']);
      }
    });
  }
  changePathUrl() {
    // this.location.back();
    this.route.navigate(['discount/edit-discount']);
  }
}

