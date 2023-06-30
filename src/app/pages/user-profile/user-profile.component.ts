import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { driverInfo } from '../../model/driverInfo';
import { adminService } from '../../service/admin.service';
import { Configuration } from '../../../configuration';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../../src/environments/environment';
import { LoginService } from '../../service/login.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  profileForm: any;
  profileDetails: driverInfo;
  token: any;
  isFormReady = false;
  isEdit: boolean = false;


  submitted: boolean = false;
  // UploadImage: any;
  fileToUpload: File = null;

  cityList = [
    { value: "New York", id: "1", name: "New York" },
    { value: "New Jesses", id: "2", name: "New Jesses" },
    { value: "South wales", id: "3", name: "South wales" },
    { value: "Florida", id: "4", name: "Florida" },
    { value: "Island", id: "5", name: "Island" }
    //{ value: "Karaikal", id: "6", name: "Karaikal" }
  ];

  // file group
  myForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });
  filepath: any; siteURL: any; filename: any;
  filepathIns: any; siteURLIns: any; filenameIns: any;
  // vehicletypeList: [];


  constructor(
    private formBuilder: FormBuilder,
    private service: adminService,
    private route: Router,
    private router: ActivatedRoute,
    private http: HttpClient,
    private config: Configuration,
    private toastr: ToastrService,
    private loginService:LoginService
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
      this.profileDetails = new driverInfo();
      this.profileDetails.id = localStorage.userId;
      this.profileDetails.user_id = localStorage.userId // response.id == undefined ? 0 : Number(response.id);
      // console.log("ID for Riders ==> ", this.profileDetails.id);

    });
    // this.siteURL = "http://198.199.103.230:3000";
    this.siteURL = environment.serverUrl;

  }

  ngOnInit() {
    this.createForm();
    if (this.profileDetails.id != 0) {
      this.getProfileDetails();
    }
    this.loginService.addInteraction(sessionStorage.getItem('email'),"Viewed User Profiles ").subscribe((result:any) => {});
  }
  get f() { return this.profileForm.controls; }
  createForm() {
    this.isFormReady = true;
    this.profileForm = this.formBuilder.group({
      firstname: [this.profileDetails.firstname, [Validators.required]],
      lastname: [this.profileDetails.lastname, [Validators.required]],
      email: [this.profileDetails.email, [Validators.required, Validators.email]],
      password: [this.profileDetails.password, [Validators.required]],
      phone_no: [this.profileDetails.phone_no, [Validators.required, Validators.minLength(10), Validators.maxLength(13)]],
      city: [this.profileDetails.city, [Validators.required]],
      address: [this.profileDetails.address, [Validators.required]],
      postal_code: [this.profileDetails.postal_code, [Validators.required]],
      about_me: [this.profileDetails.about_me],

    });
  }
  getProfileDetails() {
    debugger;
    this.service.getInformedUsers(this.profileDetails.id).subscribe((response: any) => {
      if (response) {
        console.log(response, "user")
       
          if (this.profileDetails.id > 0) {
            if(response.data != undefined){
            this.profileDetails.id = response.data.id;
            this.profileDetails.firstname = response.data.firstname;
            this.profileDetails.lastname = response.data.lastname;
            this.profileDetails.email = response.data.email;
            this.profileDetails.profile_url = response.data.profile_url;
            this.profileDetails.phone_no = response.data.phone_no;
            this.profileDetails.city = response.data.city;
            this.profileDetails.address = response.data.address;
            this.profileDetails.postal_code = response.data.postal_code;
            this.profileDetails.about_me = response.data.about_me;
            this.filepath = response.data.profile_url;
            }
          }
        
        this.createForm();
      }
    }, error => {
      // console.log('Document get exception: ' + error.message);
    });
  }

  updateUsers() {
    debugger;
    var selCity = (<HTMLInputElement>document.getElementById("selCity"));
    this.isFormReady = true;
    this.submitted = true;

    const inputRequest = {
      firstname: this.profileForm.value.firstname,
      lastname: this.profileForm.value.lastname,
      email: this.profileForm.value.email,
      city: selCity.value,
      phone_no: this.profileForm.value.phone_no,
      address: this.profileForm.value.address,
      postal_code: this.profileForm.value.postal_code,
      about_me: this.profileForm.value.about_me,
      profile_url: this.filepath,

      // fileToUpload: this.fileToUpload.name,
    };
    console.log("req data -->", inputRequest)
    this.service.updateUser(inputRequest, this.profileDetails.user_id).subscribe((result: any) => {
      if (result) {
        this.isEdit = false;
        // this.route.navigate(['rider/view-riders']);
      }
    });
  }
  editProfile() {
    this.isEdit = true;
  }

  // file upload
  handleFileInput(event) {
    if (event.target.files.length > 0) {
      const rawfile = event.target.files[0];
      this.myForm.patchValue({
        fileSource: rawfile
      });
      // console.log("rawfile", rawfile.name)
    }
    this.UploadImage();
  }

  UploadImage() {
    debugger;
    if (this.myForm.get('fileSource').value.name != undefined && this.myForm.get('fileSource').value.name != "") {
      var exten = this.myForm.get('fileSource').value.name.split('.')[1];
      if (exten == "png" || exten == "PNG" || exten == "jpeg" || exten == "JPEG" || exten == "jif" || exten == "JIF" || exten == "jpg" || exten == "JPG") {

        const formData = new FormData();
        formData.append('rawfile', this.myForm.get('fileSource').value);
        // this.http.post(this.config.UploadAvatar, formData)
        this.http.post(this.config.uploadLogo, formData)
          .subscribe(res => {
            this.filepath = res;
            // this.filepath = '/' + this.filepath.file_path;
            this.filepath = this.filepath.file_path;
            this.toastr.success("Uploaded successfully");
          }, (err) => {
            if (err.status == 400) { }
          });
      }
      else {
        this.toastr.warning("Upload only image file");
      }
    }

  }
}