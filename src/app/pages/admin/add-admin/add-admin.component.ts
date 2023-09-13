import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { driverInfo } from '../../../model/driverInfo';
import { passengerService } from '../../../service/passenger.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css']
})
export class AddAdminComponent implements OnInit {

  adminForm: any;
  adminDetails!: driverInfo;
  token: any;
  isFormReady = false;
  submitted = false;

  cityList = [
    { value: "New York", id: "1", name: "New York" },
    { value: "New Jesses", id: "2", name: "New Jesses" },
    { value: "South wales", id: "3", name: "South wales" },
    { value: "Florida", id: "4", name: "Florida" },
    { value: "Island", id: "5", name: "Island" }
  ];
  
  adminTypeList = [
    { value: "3", id: "1", name: "Admin" },
    { value: "4", id: "2", name: "Super Admin" }
  ];
  
  constructor(
    private formBuilder: FormBuilder,
    private service: passengerService,
    private route: Router,
    private router: ActivatedRoute,
    private location: Location,
  ) {
    this.route.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    if (localStorage['token'] != "" || localStorage['token'] != undefined) {
      this.token = localStorage['token'];
      //this.flag_admin = localStorage.flag_admin;

    }
    else
      this.route.navigate(['/login']);
    // debugger;
    this.router.params.subscribe((response: any) => {
      this.adminDetails = new driverInfo();
      this.adminDetails.id = response.id == undefined ? 0 : Number(response.id);
      console.log(this.adminDetails.id, "<== data ")
      // console.log("ID for Admin ==> ",this.adminDetails.id);

    });
    if(this.adminDetails.id == 0){
      this.adminDetails.city = ""
    }
    console.log("Cityyyy", this.adminDetails.city)
    // console.log("ID for Admin ==> ", this.adminDetails.id);
  }

  ngOnInit() {
    this.createForm();
    if (this.adminDetails.id != 0) {
      this.getRidersDetails();
    }
  }
  get f() { return this.adminForm.controls; }

  createForm() {
    // debugger;
   console.log('city details',this.adminDetails.city)

    this.isFormReady = true;
    this.adminForm = this.formBuilder.group({
      firstname: [this.adminDetails.firstname, [Validators.required]],
      lastname: [this.adminDetails.lastname, [Validators.required]],
      email: [this.adminDetails.email, [Validators.required, Validators.email]],
      password: [this.adminDetails.password, [Validators.required]],
      phone_no: [this.adminDetails.phone_no, [Validators.required, Validators.minLength(10), Validators.maxLength(13)]],
      city: [this.adminDetails.city, [Validators.required]],
      // user_type: [this.adminDetails.user_type, [Validators.required]]
    });

  }

  getRidersDetails() {
    // debugger;
    this.service.getInformedRders(this.adminDetails.id).subscribe((response: any) => {
      if (response) {
        console.log('single admin details', response)
        if (this.adminDetails.id > 0) {
          this.adminDetails.firstname = response.data.firstname;
          this.adminDetails.lastname = response.data.lastname;
          this.adminDetails.email = response.data.email;
          this.adminDetails.password = response.data.password;
          this.adminDetails.phone_no = response.data.Phone_no;
          this.adminDetails.city = response.data.city;
          this.adminDetails.user_type = response.data.user_type;

          //console.log("Phone Number ==> ",this.adminDetails.phone_no);
        }
        this.createForm();
      }
    }, error => {
      // console.log('Document get exception: ' + error.message);
    });
  }

  updatePassenger(id: string) {
    debugger;
    this.isFormReady = true;
    this.submitted = true;
    if (this.adminForm.invalid)
      return;
    var selCity = (<HTMLInputElement>document.getElementById("selCity"));
    const inputRequest = {
      firstname: this.adminForm.value.firstname,
      lastname: this.adminForm.value.lastname,
      //email : this.ridersForm.value.email,
      //password : this.ridersForm.value.password,
      phone_no: this.adminForm.value.phone_no,
      city: selCity.value,
    };
    console.log("Updated admin data", inputRequest);
    this.service.update(inputRequest, id).subscribe((result: any) => {
      // console.log("Updated admin data", result.data);
      if(result){
        if (result.data) {
          this.route.navigate(['admin/view-admin']);
        }
      }
    });


    // debugger;
    // console.log("formDatas ==>" + JSON.stringify(this.adminForm.value));
  }

  addPassenger() {
    debugger;
    // console.log("form data", this.adminForm);
    this.submitted = true;
    this.isFormReady = true;
    var adminType = (<HTMLInputElement>document.getElementById("adminType"));
    const inputRequest = {
      firstname: this.adminForm.value.firstname,
      lastname: this.adminForm.value.lastname,
      email: this.adminForm.value.email,
      password: this.adminForm.value.password,
      phone_no: this.adminForm.value.phone_no,
      city: this.adminForm.value.city,
      user_type: "3",
    };
    // console.log(inputRequest);
    if (this.adminForm.status == "INVALID") {
    }
    else {
      debugger;
      console.log("add pasanger", inputRequest)
      this.service.addRiders(inputRequest).subscribe((result: any) => {
        // console.log("resupt", result.data);
        if (result) {
          this.adminForm.reset();
          this.route.navigate(['admin/view-admin']);
        }
        else if (result.error.code == 100) {
          console.log("error mail data ")
        }
        else {
          console.log("clear form data")
        }

      });
    }
  }

  deletePassenger(id: string) {
    this.service.delete(id).subscribe((result: any) => {
      if (result) {
        this.route.navigate(['admin/view-admin']);
      }
    });
  }

  changePathUrl() {
    this.location.back();
  }


}
