import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { passengerService } from '../../../service/passenger.service';


@Component({
  selector: 'app-edit-surge-settings',
  templateUrl: './edit-surge-settings.component.html',
  styleUrls: ['./edit-surge-settings.component.css']
})
export class EditSurgeSettingsComponent implements OnInit {

  
  radius;
  req_threshold;

  constructor(private formBuilder: FormBuilder,
    private route: Router,
    private router: ActivatedRoute,
    private service: passengerService) { 

  }

  ngOnInit(): void {
    this.getSurgeParameters();

  }

  getSurgeParameters()
  {
    this.service.getSurgeParameters().subscribe((result: any) => {
    if(result && result.data.length)
    {
      this.radius = result.data[0].hmr;
      this.req_threshold = result.data[0].hsvt;
    }
    });
  }
  updateValues()
  {
    debugger;
    const values = {
      hmr:this.radius,
      hsvt:this.req_threshold
    }
    this.service.updateSurgeParameters(values).subscribe((result:any) => {
      if(result && result.message == "Update Successful")
      {
       alert("Update Successful");
      }
    })

  }

}
