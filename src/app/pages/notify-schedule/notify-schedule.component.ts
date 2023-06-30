import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { passengerService } from '../../service/passenger.service';
import {DateFilterPipe} from '../../pipe_filter/date-filter.pipe';

@Component({
  selector: 'app-notify-schedule',
  templateUrl: './notify-schedule.component.html',
  styleUrls: ['./notify-schedule.component.css']
})
export class NotifyScheduleComponent implements OnInit {

  selectedDate;
  title;
  description;
  forRiders = 0;
  forDrivers = 0;
  forUd = 0;
  noteLabel;
  token: any;


  constructor(
    private route: Router,
    private router: ActivatedRoute,
    private service: passengerService) 
  { 
    if (localStorage.token != "" || localStorage.token != undefined) {
      this.token = localStorage.token;
    }
    else
      this.route.navigate(['/login']);

  }

  ngOnInit(): void {
  }

  schedule()
  {
    debugger;
    const request = {
      sendDate: this.selectedDate,
      title: this.title,
      textBody: this.description,
      riders:this.forRiders,
      drivers:this.forDrivers,
      udrivers:this.forUd,
      token:this.token
    }


    this.service.schedulePush(request).subscribe((result:any) => {
   
      
      if(result)
      {
        if(result.code == 200)
          alert("Schedule Registered");
        this.reset();

      }
      
    });
   //alert(this.selectedDate);
  }
  setRiders()
  {
    if(this.forRiders == 0) 
    {
      this.forRiders = 1
    }
    else if(this.forRiders == 1)
    {
      this.forRiders = 0;
    }
  }
  setDrivers()
  {
   if(this.forDrivers == 0) 
    {
      this.forDrivers = 1
    }
    else if(this.forDrivers == 1)
    {
      this.forDrivers = 0;
    }
  }
  setUd()
  {
   if(this.forUd == 0) 
    {
      this.forUd = 1
    }
    else if(this.forUd == 1)
    {
      this.forUd = 0;
    }
  }
  reset()
  {
    this.title = "";
    this.description = "";
    this.noteLabel = "";
    this.forDrivers = 0;
    this.forRiders = 0;


  }
}
