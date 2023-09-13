import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { chartService } from '../../../service/chart.service';
import { exportService } from '../../../service/export.service';

@Component({
  selector: 'app-edit-discount',
  templateUrl: './edit-discount.component.html',
  styleUrls: ['./edit-discount.component.css']
})
export class EditDiscountComponent implements OnInit {
  // declartion
  FilterName = '';
  token: any;
  discountList = [];
  pageOfItems!: Array<any>;
  constructor(  private formBuilder: FormBuilder,
    // private toastr: ToastrService,    
    private route: Router,
    private router: ActivatedRoute,
    private service: chartService,
    private service1:exportService) {
      debugger;
      if (localStorage['token'] != "" || localStorage['token'] != undefined) {
        this.token = localStorage['token'];
      }
      else
        this.route.navigate(['/login']);
     }

  ngOnInit(): void {
    this.getDiscountView();
  }
  getDiscountView() {
    debugger; 
    this.discountList = [];

    const inputRequest = {
      token: this.token
    };
    this.service.getallDiscount(inputRequest).subscribe((result: any) => {
      debugger;
      this.discountList = [];
      if (result) {
        if (result.data.length) {
          console.log("RESULT ==>", result.data);
          this.discountList = result.data;
        }
      }
    })
  }


  editDiscount(id:any) {
    debugger;
    if (id != undefined && id != 0){
      console.log(id)
      this.route.navigate(['discount/add-discount/' + id]);
    }
    // settings/add-settings 

  }
  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }
  exportSurCharge(){     
    debugger;
    var ttfil = this.discountList.filter((item:any) => (item.charge  === this.FilterName) || ( item.startTime != null ? item.startTime.toLowerCase().includes(this.FilterName.toLowerCase()):'') || item.endTime === this.FilterName);
    if(this.FilterName != '')
    this.service1.exportExcel(this.discountList.filter((item:any) => (item.charge  === this.FilterName) || ( item.startTime != null ? item.startTime.toLowerCase().includes(this.FilterName.toLowerCase()):'') || item.endTime === this.FilterName), 'surChargeDetails');
   else
   this.service1.exportExcel(this.discountList, 'discountDetails');     
  }

}
