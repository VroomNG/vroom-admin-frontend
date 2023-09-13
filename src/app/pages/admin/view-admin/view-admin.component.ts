import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { adminService } from '../../../service/admin.service';
import { exportService } from '../../../service/export.service';
// import { loginInfo } from '../../model/loginInfo';


@Component({
  selector: 'app-view-admin',
  templateUrl: './view-admin.component.html',
  styleUrls: ['./view-admin.component.css'],
})
export class ViewAdminComponent implements OnInit {

  FilterName = '';
  token: any;
  adminList = [];
  pageOfItems!: Array<any>;

  constructor(
    private formBuilder: FormBuilder,
    // private toastr: ToastrService,    
    private route: Router,
    private router: ActivatedRoute,
    private service: adminService,
    private service1: exportService
  ) {
    if (localStorage['token'] != "" || localStorage['token'] != undefined) {
      this.token = localStorage['token'];
    }
    else
      this.route.navigate(['/login']);
  }

  ngOnInit(): void {
    debugger;
    this.getDriverView();
  }
  getDriverView() {

    debugger;
    this.adminList = [];

    //var searchkey = (<HTMLInputElement>document.getElementById("search"));

    const inputRequest = {
      token: this.token
    };
    this.service.getAdminList(inputRequest).subscribe((result: any) => {
      debugger;
      this.adminList = [];
      if (result) {
        if (result.data.length) {
          console.log("RESULT ==>", result.data);
          this.adminList = (result.data.filter((x: { user_type: number; })=> x.user_type != 4));
        }
      }
    })
  }

  editAdmin(id: string | number | undefined) {
    debugger;
    if (id != undefined && id != 0)
      this.route.navigate(['admin/add-admin/' + id]);
  }

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }

  exportAdmin() {         
    // var ttfil = this.adminList.filter((item: any) => item.firstname.toLowerCase().includes(this.FilterName.toLowerCase()) || item.lastname.toLowerCase().includes(this.FilterName.toLowerCase()) || item.email.toLowerCase().includes(this.FilterName.toLowerCase()) || item.phone_no.includes(this.FilterName));
    //  console.log("Export filter =>",ttfil);
    if (this.FilterName != '')
      this.service1.exportExcel(this.adminList.filter((item: any) => item.firstname.toLowerCase().includes(this.FilterName.toLowerCase()) || item.lastname.toLowerCase().includes(this.FilterName.toLowerCase()) || item.email.toLowerCase().includes(this.FilterName.toLowerCase()) || item.phone_no.includes(this.FilterName)), 'adminDetails');
      else
      this.service1.exportExcel(this.adminList, 'adminDetails');  
  }


}



