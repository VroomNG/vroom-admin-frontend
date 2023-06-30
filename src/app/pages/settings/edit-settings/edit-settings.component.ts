import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { chartService } from '../../../service/chart.service';
import { exportService } from '../../../service/export.service';
import { LoginService } from '../../../service/login.service';



@Component({
  selector: 'app-edit-settings',
  templateUrl: './edit-settings.component.html',
  styleUrls: ['./edit-settings.component.css']
})
export class EditSettingsComponent implements OnInit {

  // declartion
  FilterName = '';
  token: any;
  surgechargeList = [];
  pageOfItems: Array<any>;

  constructor(
    private formBuilder: FormBuilder,
    // private toastr: ToastrService,    
    private route: Router,
    private router: ActivatedRoute,
    private service: chartService,
    private service1:exportService,
    private loginService: LoginService
  ) {
    if (localStorage.token != "" || localStorage.token != undefined) {
      this.token = localStorage.token;
    }
    else
      this.route.navigate(['/login']);
  }

  ngOnInit(): void {
    this.getSurchargeView();
    this.loginService.addInteraction(sessionStorage.getItem('email'),"Edited a setting").subscribe((result:any) => {});
  }

  getSurchargeView() {
    debugger; 
    this.surgechargeList = [];

    const inputRequest = {
      token: this.token
    };
    this.service.getallSurge(inputRequest).subscribe((result: any) => {
      debugger;
      this.surgechargeList = [];
      if (result) {
        if (result.data.length) {
          console.log("RESULT ==>", result.data);
          this.surgechargeList = result.data;
        }
      }
    })
  }


  editSurcharge(id) {
    debugger;
    if (id != undefined && id != 0){
      console.log(id)
      this.route.navigate(['settings/add-settings/' + id]);
    }
    // settings/add-settings 

  }

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }
  exportSurCharge(){     
    debugger;
    var ttfil = this.surgechargeList.filter((item:any) => (item.charge  === this.FilterName) || ( item.startTime != null ? item.startTime.toLowerCase().includes(this.FilterName.toLowerCase()):'') || item.endTime === this.FilterName);
    if(this.FilterName != '')
    this.service1.exportExcel(this.surgechargeList.filter((item:any) => (item.charge  === this.FilterName) || ( item.startTime != null ? item.startTime.toLowerCase().includes(this.FilterName.toLowerCase()):'') || item.endTime === this.FilterName), 'surChargeDetails');
   else
   this.service1.exportExcel(this.surgechargeList, 'surChargeDetails');     
  }

}
