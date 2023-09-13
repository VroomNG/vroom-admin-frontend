import { Component, OnInit, ElementRef, ViewChild, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { driverInfo } from '../../../model/driverInfo';
import { passengerService } from '../../../service/passenger.service';
import { vehicleService } from '../../../service/vehicle.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Configuration } from '../../../../configuration';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../../environments/environment';
import { Location } from '@angular/common';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ApiService, Maps } from '../../../service/api.service';
import { LoginService } from '../../../service/login.service';

@Component({
  selector: 'app-add-partner',
  templateUrl: './add-driver.component.html',
  styleUrls: ['./add-driver.component.css']
})
export class AddPartnerComponent implements OnInit {
  // global declartions
  @ViewChild("search")
  public searchElementRef!: ElementRef;
  driverForm: any;
  partnerForm:any;
  driverDetails!: driverInfo;
  token: any;
  submitted = false;
  filetype: any;
  pagePath: any;
  InsuranceType: any;
  licenceType: any; otherDocType: any; multiDocType: any;
  filepath: any = '';
  siteURL: any;
  filename: any;
  filepathIns: any = ''; filepathother: any = ''; filepathmulti: any = []; filemulti: any = '';
  siteURLIns: any;
  filenameIns: any; filenameOther: any; filenameMul: any;
  vehicletypeList!: [];
  isFormReady: boolean = false;
  paramsval: any;
  fileToUpload!: File;
  fileToUploadIns!: File;
  License: any; Insurance: any;
  fileListAsArray: any; fileDataSource: any;
  isBlock: any;
  block_reason: any;
  errorMessage: any;
  closeResult = '';
  paramsBlock: any;
  profile_url:any;
 
  cityList = [
    { value: "New York", id: "1", name: "New York" },
    { value: "New Jesses", id: "2", name: "New Jesses" },
    { value: "South wales", id: "3", name: "South wales" },
    { value: "Florida", id: "4", name: "Florida" },
    { value: "Island", id: "5", name: "Island" }
  ];
  // New multi uploads
  imageDeleteFrom!: FormGroup;
  imageurls = [];
  base64String!: string;
  name!: string;
  imagePath!: string;
  // End
  myForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });


  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private service: passengerService,
    private service1: vehicleService,
    private route: Router,
    private router: ActivatedRoute,
    private config: Configuration,
    private toastr: ToastrService,
    private location: Location,
    private modalService: NgbModal,
    private apiService: ApiService, private ngZone: NgZone,
    private loginService: LoginService
  ) {
    this.route.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.router.queryParams.subscribe(params => {
      this.paramsval = params['status'];
      this.paramsBlock = params["isBlock"];
      console.log(this.paramsval, 'form status')

    });
    if (localStorage['token'] != "" || localStorage['token'] != undefined) {
      this.token = localStorage['token'];
      //this.flag_admin = localStorage.flag_admin;
    }
    else
      this.route.navigate(['/login']);
    debugger;
    this.router.params.subscribe((response: any) => {
      this.driverDetails = new driverInfo();
      this.driverDetails.id = response.id == undefined ? 0 : Number(response.id);
      // // console.log("ID for Admin ==> ",this.adminDetails.id);
    });

    if (this.driverDetails.id == 0) {
      this.driverDetails.city = "";
      this.driverDetails.vehicle_type = "";
    }

    console.log("ID for driver details ==> ", this.driverDetails.id);
    this.siteURL = environment.serverUrl;
    // this.siteURL =  "http://localhost:3000/api/";
  }

  ngOnInit() {
    this.apiService.api.then(maps => {
      this.initAutocomplete(maps);
    });

    this.createForm();
    //this.createPartnerForm();
    // if (this.driverDetails.id != 0) {
    //   this.getRidersDetails();
    // }
    this.getVehicleType();

    this.pagePath = this.route.url.split('/');
    this.pagePath = this.pagePath[this.pagePath.length - 1];
    this.loginService.addInteraction(sessionStorage.getItem('email'),"Viewed Add Partner ").subscribe((result:any) => {});
    // // console.log("Path name", this.pagePath)

  }
  get f() { return this.driverForm.controls; }
  createForm() {
    console.log(this.driverDetails.vehicle_type, "selected city")
    this.isFormReady = true;
    this.driverForm = this.formBuilder.group({
      firstname: [this.driverDetails.firstname, [Validators.required, Validators.minLength(3)]],
      lastname: [this.driverDetails.lastname, [Validators.required, Validators.minLength(3)]],
      city: [this.driverDetails.city, [Validators.required]],
      phone_no: [this.driverDetails.phone_no, [Validators.required, Validators.minLength(11), Validators.maxLength(13)]],
      email: [this.driverDetails.email, [Validators.required, Validators.email]],
      password: [this.driverDetails.password, [Validators.required]],
      supervisor:[this.driverDetails.supervisor],
      licence_no: [this.driverDetails.licence_no],
      vehicle_type: [this.driverDetails.vehicle_type],
      holder_name: [this.driverDetails.holder_name],
      account_number: [this.driverDetails.account_number],
      bank_name: [this.driverDetails.bank_name],
      location: [this.driverDetails.location],
      payment_email: [this.driverDetails.payment_email],
      IFSC: [this.driverDetails.IFSC],
      licence_docu: [this.driverDetails.licence_docu],
      insurance_docu: [this.driverDetails.insurance_docu],
      other_docu: [this.driverDetails.other_docu],
      block_reason: [this.driverDetails.block_reason]
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
    console.log("error", this.driverDetails.vehicle_type)
    this.service.getSingleDriver(this.driverDetails.id).subscribe((response: any) => {
      if (response) {        
        let informedPerson: any
        console.log('driver data', response)
        if (this.driverDetails.id > 0) {
          this.profile_url = response.data[0].profile_url;
          this.driverDetails.firstname = response.data[0].firstname;
          this.driverDetails.lastname = response.data[0].lastname;
          this.driverDetails.email = response.data[0].email;
          this.driverDetails.password = response.data[0].password;
          this.driverDetails.phone_no = response.data[0].Phone_no;
          this.driverDetails.city = response.data[0].city;
          this.driverDetails.supervisor = response.data[0].supervisor;
          //this.ridersDetails.content = response.data.documentInfo.content;
          //// console.log("Phone Number ==> ",this.adminDetails.phone_no);
          this.driverDetails.holder_name = response.data[0].holder_name;
          this.driverDetails.account_number = response.data[0].account_number;
          this.driverDetails.location = response.data[0].location;
          this.driverDetails.bank_name = response.data[0].bank_name;
          this.driverDetails.payment_email = response.data[0].payment_email;
          this.driverDetails.IFSC = response.data[0].IFSC;
          this.driverDetails.licence_no = response.data[0].licence_no;
          this.driverDetails.vehicle_type = response.data[0].vehicle_type;
          this.driverDetails.other_docu = response.data[0].document;
          console.log('vechicle type', response.data[0].vehicle_type, 'vechicle id', response.data[0].vehicle_type_id);
          this.driverDetails.licence_docu = response.data[0].licence;
          this.driverDetails.insurance_docu = response.data[0].insurance;
          this.driverDetails.vehicle_type_id = response.data[0].vehicle_type_id;
          this.filepath = response.data[0].licence; //result.data.logo;  
          this.filepathIns = response.data[0].insurance;
          this.filepathother = response.data[0].document;
          this.isBlock = response.data[0].isBlock;
          this.driverDetails.block_reason = response.data[0].block_reason;
          this.filepathmulti = response.data[0].mulother.split(',');
          
        }
        console.log('driver data', this.driverDetails.vehicle_type)
        this.createForm();
      }
    }, error => {
      // // console.log('Document get exception: ' + error.message);
    });
  }

  getVehicleType() {
    debugger;
    const inputRequest = {
      token: this.token
    };
    this.service1.getVehicleList(inputRequest).subscribe((response: any) => {
      if (response) {
        if (response.data.length > 0 || response.data != null) {
          this.vehicletypeList = response.data;
          console.log('vechicle type', response.data);
        }
        if (this.driverDetails.id != 0) {
          this.getRidersDetails();
        }
        else {
          this.createForm();
        }
      }
    }, error => {
      // // console.log('Document get exception: ' + error.message);
    });
  }

  addDriver() {
    debugger;
    var logo = '';
    var selCity = (<HTMLInputElement>document.getElementById("selCity"));
    //var selVehicleType = (<HTMLInputElement>document.getElementById("selVehicleType"));
    this.isFormReady = true;
    this.submitted = true;
    if (this.driverForm.invalid) {
      return;
    }
    else {
      const inputRequest = {
        firstname: this.driverForm.value.firstname,
        lastname: this.driverForm.value.lastname,
        city: selCity.value,
        phone_no: this.driverForm.value.phone_no,
        supervisor: this.driverForm.value.supervisor,
        email: this.driverForm.value.email,
        password: this.driverForm.value.password,
        licence_no: 'PARTNER',
        //vehicle_type: selVehicleType.value,
        holder_name: this.driverForm.value.holder_name,
        user_type: '5',
        account_number: this.driverForm.value.account_number,
        bank_name: this.driverForm.value.bank_name,
        location: this.driverForm.value.location,
        payment_email: this.driverForm.value.payment_email,
        IFSC_code: this.driverForm.value.IFSC,

        //licence_docu: { filetype: this.licenceType, fileurl: this.filepath, status: "pending", file_name: "lic" },
        // insurance_docu: this.filepathIns,
        //insurance_docu: { filetype: this.InsuranceType, fileurl: this.filepathIns, status: "pending", file_name: "ins" },
        //vehicle_docu: { filetype: this.otherDocType, fileurl: this.filepathother, status: "pending", file_name: "oth" },
        //multi_docu: { filetype: this.multiDocType, fileurl: this.filepathmulti, status: "pending", file_name: "mul" },
      };
      if (this.driverForm.status == "INVALID") {
      }
      else {
      // console.log(this.driverForm.value.supervisor);
      
        console.log("add drivers", inputRequest);
        debugger;
        this.service.addDriver(inputRequest).subscribe((result: any) => {
          console.log("Add driver response val insertId", result);
          if (result.data) {
            const inputparams = {
              is_verified: 1
            }
            const inputToken1 = {
              token: this.token
            }
            this.service.adminVerify(result.data.insertId, inputparams, inputToken1).subscribe((result: any) => {
              console.log("isVerified result", result);
            });
            this.driverForm.reset();
            this.route.navigate(['partner/view-partner']);
          }
        });
      }
    }
  }
  
 updateDriver(id:any) {
    debugger;
    this.submitted = true;
    // if (this.paramsval == 2 || this.paramsval == 3) {
    //this.driverForm.get("licence_docu").disable(); //Cmt on Oct4,2021
    //this.driverForm.get("insurance_docu").disable(); //Cmt on Oct4,2021
    // }
    // else{
    //   if(this.driverForm.value.insurance_docu == null || this.driverForm.value.insurance_docu == undefined)
    //       this.driverForm.value.insurance_docu = this.filepathIns;
    //       if(this.driverForm.value.licence_docu == null || this.driverForm.value.licence_docu == undefined)
    //       this.driverForm.value.licence_docu = this.filepath;
    // }
    /*if (this.driverForm.invalid) {
      return;
    }*/
    var selCity = (<HTMLInputElement>document.getElementById("selCity"));
    //var selVehicleType = (<HTMLInputElement>document.getElementById("selVehicleType"));
    this.isFormReady = true;

    const inputRequest = {
      firstname: this.driverForm.value.firstname,
      lastname: this.driverForm.value.lastname,
      //email : this.ridersForm.value.email,
      //password : this.ridersForm.value.password,
      //supervisor: this.driverForm.value.supervisor,
      city: selCity.value,
      Phone_no: this.driverForm.value.phone_no
    };

    this.service.update(inputRequest, id).subscribe((result: any) => {
      if (result.data) {
        // this.route.navigate(['admin/view-admin']);
      }
    });

    if (this.driverForm.value.account_number != undefined && this.driverForm.value.account_number != "" && this.driverForm.value.account_number != null) {
      const inputRequest1 = {
         holder_name: this.driverForm.value.holder_name,
         account_number: this.driverForm.value.account_number,
         bank_name: this.driverForm.value.bank_name,
        location: this.driverForm.value.location,
        payment_email: this.driverForm.value.payment_email,
        IFSC: this.driverForm.value.IFSC,
        //name: this.driverForm.value.holder_name,
        //account_no: this.driverForm.value.account_number,
        // payment_email: this.driverForm.value.payment_email,
        //ifsc_code: this.driverForm.value.IFSC,

        // licence_no: this.driverForm.licence_no
      };
      this.service.updateDriverAcc(inputRequest1, id).subscribe((result: any) => {

        if (result.data) {
          // this.route.navigate(['admin/view-admin']);
        }
      });
    }

    /*const inputRequest2 = {
      vehicle_type_id: selVehicleType.value
    };
    this.service1.updateVehicleType(inputRequest2, id).subscribe((result: any) => {

      if (result.data) {
        // this.route.navigate(['admin/view-admin']);
      }
    });*/

    this.route.navigate(['partner/view-partner']);
  }

  approveDriver(id: string, status: string | number) {
    debugger;
    this.isFormReady = true;
    var inputRequest;
    if (status == 1) {
      inputRequest = {
        is_active: 1
      };
    }
    else if (status == 2) {
      inputRequest = {
        is_active: 2
      };
    }
    else {
      inputRequest = {
        // driver_status: status,
        is_active: 0
      };
    }
    if (status == 2 || status == 5) {
      if (this.isBlock != undefined && this.isBlock == 1) {
        inputRequest = {
          isBlock: '0'
        }
        var inputToken = {
          token: this.token
        }
        this.service.blockDriverStatus(inputToken, inputRequest, id).subscribe((result: any) => {
          if (result.data) {
            console.log("Reject status", result.data);
          }
          this.location.back();
        });
      }
      else {
        var btnModelPopup = (<HTMLInputElement>document.getElementById("btnModelPopup"));
        btnModelPopup.setAttribute("name", id);
        // btnModelPopup.setAttribute("data-label", status);
        btnModelPopup.click();
      }
    }
    if (status != 5) {
      this.service.updateDriverStatus(inputRequest, id).subscribe((result: any) => {
        if (result.data) {
          // this.toastr.success("User moved to Approved List");
          // this.route.navigate(['driver/view-driver/2']);
          if (status != 2)
            this.location.back();
        }
      });
    }
  }

  // handleFileInput(files: FileList) {
  //   debugger;
  //   this.fileToUpload = files.item(0);
  // }

  uploadFileToActivity(id: number, filename: string) {
    debugger;
    var fileurl = filename == 'lic' ? this.filepath : filename == 'ins' ? this.filepathIns : this.filepathother;
    if (fileurl != undefined && fileurl != '' && fileurl != null) {
      this.filetype = fileurl.split('.')[1];
      if (filename == 'lic') {
        this.licenceType = this.filetype;
      }
      else if (filename == 'ins')
        this.InsuranceType = this.filetype;
      else
        this.otherDocType = this.filetype;

      console.log('img formate', this.filetype);

      const inputRequest = {
        filetype: this.filetype,
        driver_id: id,
        fileurl: fileurl,
        file_name: filename,
      }
      this.service.documentUpdate(inputRequest).subscribe((result: any) => {
        if (result.data) {
          this.toastr.success("Upload Successfully");
        }
      });
    }
    else
      this.toastr.error("Please upload the file");
  }
  // handleFileInputIns(files: FileList) {
  //   debugger;
  //   this.fileToUploadIns = files.item(0);
  // }
  // uploadFileToActivityIns(id) {
  //   debugger;
  //   this.Insurance = this.fileToUploadIns.name;
  // }

  handleFileInputIns(event:any) {
    debugger;
    const fileList = event.target.files;
    this.fileListAsArray = Array.from(fileList);
    const tempArray: { filename: any; }[] = [];
    this.fileListAsArray.forEach((element: { name: any; }) => {
      // console.log('element file upload', element);
      const obj = {
        filename: element.name
      };
      tempArray.push(obj);
    });
    this.fileDataSource = tempArray;
    this.uploadFile(1);
    // this.fileToUploadIns = files.item(0);
  }
  uploadFile(leaveId: number) {
    // this.commonservice.UploadFile(this.formData, this.staffID, 'Leaves', leaveId);
    for (let i = 0; i < this.fileListAsArray.length; i++) {
      this.uploadFileToServer(i, this.fileListAsArray[i], leaveId);
    }
  }

  // File Upload to server.
  uploadFileToServer(idx: number, file: File, leaveId: number) {
    this.service1.uploadFiletoServer(file, this.driverDetails.id, 'Leaves', leaveId).subscribe(
      event => {
      }, err => {
        // console.log('Could not upload the file:' + file.name);
      });
  }

  onFileChange(event: { target: { files: string | any[]; }; }, filename: number) {
    debugger;
    if (event.target.files.length > 0) {
      const rawfile = event.target.files[0];
      this.myForm.patchValue({
        fileSource: rawfile
      });
      if (filename == 1)
        this.filename = 'lic';
      else if (filename == 0)
        this.filenameIns = 'ins';
      else if (filename == 2)
        this.filenameOther = 'oth';
      else if (filename == 3)
        this.filenameMul = 'mul';
      // this.update(filename)
    }
  }

  // update(filename: number) {
  //   debugger;
  //   if (this.myForm.get('fileSource').value.name != undefined && this.myForm.get('fileSource').value.name != "") {
  //     var exten = this.myForm.get('fileSource').value.name.split('.')[1];
  //     console.log('insurance formate', exten)
  //     if (exten == "png" || exten == "PNG" || exten == "jpeg" || exten == "JPEG" || exten == "jif" || exten == "JIF" || exten == "svg" || exten == "jpg" || exten == "SVG" || exten == "pdf" || exten == "PDF") {
  //       var spnFileName = (<HTMLInputElement>document.getElementById("spnFileName"));
  //       var spnFileNameIns = (<HTMLInputElement>document.getElementById("spnFileNameIns"));
  //       var spnFileNameOth = (<HTMLInputElement>document.getElementById("spnFileNameOth"));

  //       const formData = new FormData();
  //       formData.append('rawfile', this.myForm.get('fileSource').value);

  //       this.http.post(this.config.uploadLogo, formData).subscribe(res => {
  //         if (filename == 1) {
  //           this.filepath = res;
  //           spnFileName.innerText = this.myForm.get('fileSource').value.name;
  //           this.filepath = this.filepath.file_path;
  //           if (this.driverDetails.id != 0) {
  //             this.uploadFileToActivity(this.driverDetails.id, 'lic');
  //           }
  //         }
  //         else if (filename == 0) {
  //           this.filepathIns = res;
  //           spnFileNameIns.innerText = this.myForm.get('fileSource').value.name;
  //           this.filepathIns = this.filepathIns.file_path;
  //           console.log(this.filepathIns, 'insure');
  //           if (this.driverDetails.id != 0) {
  //             this.uploadFileToActivity(this.driverDetails.id, 'ins');
  //           }
  //         }
  //         else if (filename == 2) {
  //           this.filepathother = res;
  //           spnFileNameOth.innerText = this.myForm.get('fileSource').value.name;
  //           this.filepathother = this.filepathother.file_path;
  //           // console.log(this.filepathother, 'insure')
  //           if (this.driverDetails.id != 0) {
  //             this.uploadFileToActivity(this.driverDetails.id, 'oth');
  //           }
  //         }
  //         else {
  //           this.filemulti = res;
  //           // spnFileNameOth.innerText = this.myForm.get('fileSource').value.name;
  //           this.filepathmulti.push(this.filemulti.file_path);
  //           // console.log(this.filepathother, 'insure')
  //           if (this.driverDetails.id != 0) {
  //             this.uploadFileMultipleOther(this.driverDetails.id, 'mul');
  //           }
  //         }
  //         // alert('Uploaded Successfully.');
  //       }, (err) => {
  //         if (err.status == 400) { }
  //       });
  //     }
  //     else {
  //       this.toastr.warning("Upload only image file");
  //     }
  //   }
  // }

  cancel(): void {
    window.scrollTo(0, 0);
  }

  changetoView() {
    this.location.back();
  }
  saveReason() {
    debugger;
    this.errorMessage = ""
    var txtreason = (<HTMLInputElement>document.getElementById("txtreason"));
    var closeBtn = (<HTMLInputElement>document.getElementById("closeBtn"));
    var btnModelPopup = (<HTMLInputElement>document.getElementById("btnModelPopup"));
    var status = btnModelPopup.dataset["label"];
    var id = btnModelPopup.name; var inputRequest;
    if (txtreason.value == "") {
      this.errorMessage = "Reject Reason is Required";
      return;
    }
    else {
      const inputToken = {
        token: this.token
      }
      inputRequest = {
        // is_active: status,
        block_reason: txtreason.value
      }
      // if (status == '5')
      //   inputRequest.isBlock = (this.paramsBlock == 1 ? '0' : '1');

      // this.service.blockDriverStatus(inputToken, inputRequest, id).subscribe((result: any) => {
      //   if (result.data) {
      //     console.log("Reject status", result.data);
      //   }
      //   closeBtn.click();
      //   this.location.back();
      // });
    }
  }
  open(content: any) {
    this.errorMessage = "";
    let ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false
    };
    this.modalService.open(content, ngbModalOptions).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  onSelectFile(event: { target: { files: string | any[]; }; }, fname: any) {
    if (event.target.files.length > 0) {
      const rawfile = event.target.files[0];
      this.myForm.patchValue({
        fileSource: rawfile
      });
      this.filenameOther = 'mul';
      // this.update(fname)
    }

    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();
        reader.onload = (event: any) => {
          // this.imageurls.push({ base64String: event.target.result, });
        }
        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }
  removeImage(i: number) {
    debugger;
    this.imageurls.splice(i, 1);
    this.filepathmulti.splice(i, 1);
    if (this.driverDetails.id != 0)
      this.uploadFileMultipleOther(this.driverDetails.id, 'mul');
  }
  removeImageEdit(i: any, imagepath: any) {
    this.imageDeleteFrom.value.id = i;
    this.imageDeleteFrom.value.ImagePath = imagepath;
  }
  uploadMultipleOtherD(id: any) {
    debugger;
    var tt = this.imageurls; //this.imageDeleteFrom.get('imagePath').value.name
    var mul = this.filepathmulti;
    console.log("tt", tt);
    this.uploadFileMultipleOther(id, 'mul');
  }
  uploadFileMultipleOther(id: number, filename: string) {
    debugger;

    var fileurl = this.filepathmulti.toString();
    //filename == 'lic' ? this.filepath : filename == 'ins' ? this.filepathIns : this.filepathother;
    if (fileurl != undefined && fileurl != '' && fileurl != null) {
      var fURL = fileurl.split(',')[0];
      this.filetype = fURL.split('.')[1];
      if (filename == 'mul') {
        this.multiDocType = this.filetype;
      }

      console.log('img formate', this.filetype);

      const inputRequest = {
        filetype: this.filetype,
        driver_id: id,
        fileurl: fileurl,
        file_name: filename,
      }
      this.service.documentUpdate(inputRequest).subscribe((result: any) => {
        if (result.data) {
          this.toastr.success("Upload Successfully");
        }
      });
    }
    else
      this.toastr.error("Please upload the file");
  }
}
