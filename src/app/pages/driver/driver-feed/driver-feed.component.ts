import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import { passengerService } from '../../../service/passenger.service';
import { driverService } from '../../../service/driver.service';
import {DateFilterPipe} from '../../../pipe_filter/date-filter.pipe';
import { Configuration } from '../../../../configuration';


@Component({
  selector: 'app-driver-feed',
  templateUrl: './driver-feed.component.html',
  styleUrls: ['./driver-feed.component.css']
})
export class DriverFeedComponent implements OnInit {

  title;
  content;
  imageurl;
  expires = 0;
  expiryDate;


  constructor(
    private route: Router,
    private router: ActivatedRoute,
    private service: passengerService,
    private driverService:driverService,
    private config: Configuration,
    private http: HttpClient) { 

  }

  ngOnInit(): void {
  }

  send()
  {
    debugger;
    var now = new Date();
    now.setHours(now.getHours() - 7);
    const strdate = (now).toISOString().slice(0, 19).replace("T", " ")
    var expireTime = new Date(this.expiryDate);
    expireTime.setHours(expireTime.getHours() - 7);
    const expdate = (expireTime).toISOString().slice(0, 19).replace("T", " ")
    const request = {
      title: this.title,
      content: this.content,
      imageurl:this.imageurl,
      datestamp:strdate,
      expires:this.expires,
      date_expire:expdate
      }


    this.service.insertFeed(request).subscribe((result:any) => {
   
      
      if(result)
      {
        if(result.code == 200)
          alert("Message Placement Success!");
        this.reset();

      }
      
    });
   //alert(this.selectedDate);
  }

  reset()
  {
    this.title = "";
    this.content = "";
    this.imageurl = "";
  }

  setExpires()
  {
    debugger;
    if(this.expires == 1)
      this.expires  = 0;
    else this.expires = 1;
  }
  uploadImage(imageFiles:FileList)
  {
    const file = imageFiles.item(0);
    //this.driverService.uploadImagetoServer(file);
    const formData = new FormData();
    formData.append('photo',file);
    this.http.post(this.config.externalImages,formData).subscribe(res => {
      console.log(res);
      //this.imageurl = res.url;
      //console.log(this.imageurl);
    });
  }
  

}
