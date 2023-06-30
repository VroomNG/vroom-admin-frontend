import { Component, OnInit ,ElementRef, ViewChild ,NgZone} from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { driverInfo } from '../../../model/driverInfo';
import { passengerService } from '../../../service/passenger.service';
import { ApiService, Maps } from '../../../service/api.service';
import { environment } from '../../../../environments/environment';
import { LoginService } from '../../../service/login.service';
@Component({
  selector: 'app-add-edit-riders',
  templateUrl: './add-edit-riders.component.html',
  styleUrls: ['./add-edit-riders.component.css']
})
export class AddEditRidersComponent implements OnInit {
  @ViewChild("search")
  public searchElementRef: ElementRef;
  ridersForm: any;
  ridersDetails: driverInfo;
  token: any;
  isFormReady = false;
  submitted = false;
  isBlock : any;
  block_reason:any;profile_url:any;
  siteURL: any;
  cityList = [
    { value: "New York", id: "1", name: "New York" },
    { value: "New Jesses", id: "2", name: "New Jesses" },
    { value: "South wales", id: "3", name: "South wales" },
    { value: "Florida", id: "4", name: "Florida" },
    { value: "Island", id: "5", name: "Island" }
    //{ value: "Karaikal", id: "6", name: "Karaikal" }
  ];
  constructor(
    private formBuilder: FormBuilder,
    private service: passengerService,
    private route: Router,
    private router: ActivatedRoute,
    private apiService: ApiService, private ngZone: NgZone,
    private loginService: LoginService
  ) {
    this.route.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    if (localStorage.token != "" || localStorage.token != undefined) {
      this.token = localStorage.token;
      //this.flag_admin = localStorage.flag_admin;

    }
    else
      this.route.navigate(['/login']);
    debugger;
    this.router.params.subscribe((response: any) => {
      this.ridersDetails = new driverInfo();
      this.ridersDetails.id = response.id == undefined ? 0 : Number(response.id);
      console.log("ID for Riders ==> ", this.ridersDetails.id);

    });

    if(this.ridersDetails.id  == 0){
      this.ridersDetails.city = "";
    }
    this.siteURL = environment.serverUrl;

  }

  ngOnInit() {
    this.apiService.api.then(maps => {
      this.initAutocomplete(maps);      
    });
    this.createForm();
    if (this.ridersDetails.id != 0) {
      this.getRidersDetails();
    }
    this.loginService.addInteraction(sessionStorage.getItem('email'),"Viewed Add Rider ").subscribe((result:any) => {});
  }
  get f() { return this.ridersForm.controls; }

  createForm() {
    this.isFormReady = true;
    this.ridersForm = this.formBuilder.group({
      firstname: [this.ridersDetails.firstname, [Validators.required, Validators.minLength(3)]],
      lastname: [this.ridersDetails.lastname, [Validators.required, Validators.minLength(3)]],
      email: [this.ridersDetails.email, [Validators.required, Validators.email]],
      password: [this.ridersDetails.password, [Validators.required]],
      phone_no: [this.ridersDetails.phone_no, [Validators.required, Validators.minLength(11), Validators.maxLength(13)]],
      city: [this.ridersDetails.city, [Validators.required]],
      balance: [this.ridersDetails.balance]
    });
  }
  initAutocomplete(maps: Maps) {
    debugger;
    if (this.searchElementRef != undefined) {
      let autocomplete = new maps.places.Autocomplete(this.searchElementRef.nativeElement);
      console.log("autocomplete ==>", autocomplete);
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          // this.onPlaceChange(autocomplete.getPlace());
        });
      });
    }
  }
  getRidersDetails() {
    debugger;
    this.service.getInformedRders(this.ridersDetails.id).subscribe((response: any) => {
      if (response) {
        let informedPerson: any
        console.log(response, "single rider")
        if (this.ridersDetails.id > 0) {
          this.profile_url = response.data.profile_url;
          this.ridersDetails.firstname = response.data.firstname;
          this.ridersDetails.lastname = response.data.lastname;
          this.ridersDetails.email = response.data.email;
          this.ridersDetails.password = response.data.password;
          this.ridersDetails.phone_no = response.data.Phone_no;
          this.ridersDetails.city = response.data.city;
          this.isBlock = response.data.isBlock;
          this.block_reason = response.data.block_reason;
          this.ridersDetails.balance = response.data.balance;
          //this.ridersDetails.content = response.data.documentInfo.content;
          console.log("Phone Number ==> ", this.ridersDetails.phone_no);
        }
        this.createForm();
      }
    }, error => {
      console.log('Document get exception: ' + error.message);
    });
  }

  updatePassenger(id) {
    debugger;
    this.submitted = true;
    var selCity = (<HTMLInputElement>document.getElementById("selCity"));
    this.isFormReady = true;
    if (this.ridersForm.invalid) {
      return;
    }  
    const inputRequest = {
      firstname: this.ridersForm.value.firstname,
      lastname: this.ridersForm.value.lastname,
      //email : this.ridersForm.value.email,
      //password : this.ridersForm.value.password,
      city: selCity.value,
      phone_no: this.ridersForm.value.phone_no,
      balance:this.ridersForm.value.balance
    };
    console.log('updated req',inputRequest)
    this.service.update(inputRequest, id).subscribe((result: any) => {
      if (result.data) {
        this.route.navigate(['rider/view-riders']);
      }
    });
  }

  addPassenger() {
    debugger;
    var selCity = (<HTMLInputElement>document.getElementById("selCity"));
    this.isFormReady = true;
    this.submitted = true;
    const inputRequest = {
      firstname: this.ridersForm.value.firstname,
      lastname: this.ridersForm.value.lastname,
      email: this.ridersForm.value.email,
      password: this.ridersForm.value.password,
      city: selCity.value,
      phone_no: this.ridersForm.value.phone_no,
      user_type: 1,
      balance:this.ridersForm.value.balance
    };

    if (this.ridersForm.status == "INVALID") {
      console.log("do not updated data");
      return;
    }
    else {
      debugger;
      this.service.addRiders(inputRequest).subscribe((result: any) => {
        console.log('rider details', result);
        if (result) {
          // if (result.data) {
            this.route.navigate(['rider/view-riders']);
          // }
        }
      });
    }
  }
  deletePassenger(id) {
    debugger;
    this.service.delete(id).subscribe((result: any) => {
      if (result) {
        this.route.navigate(['rider/view-riders']);
      }
    });
  }

  cancel(): void {
    window.scrollTo(0, 0);
  }

}
