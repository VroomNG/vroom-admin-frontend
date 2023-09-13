import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { passengerService } from '../../../service/passenger.service';
import {DateFilterPipe} from '../../../pipe_filter/date-filter.pipe';
import { exportService } from '../../../service/export.service';

@Component({
  selector: 'app-view-feed',
  templateUrl: './view-feed.component.html',
  styleUrls: ['./view-feed.component.css']
})
export class ViewFeedComponent implements OnInit {

  FilterName = '';
  feedList = [];
  token:any;
  selectedMembers:any

  constructor(
  private route: Router,
  private router: ActivatedRoute,
  private service: passengerService,
  private expservice:exportService
    ) { 
    if (localStorage['token'] != "" || localStorage['token'] != undefined) {
      this.token = localStorage['token'];
    }
    else
      this.route.navigate(['/login']);
  }

  ngOnInit(): void {
    this.getFeeds();
  }

  getFeeds()
  {
    debugger;
    this.feedList = [];
    this.service.getFeeds().subscribe((result:any)=>{
      if(result)
      {
        this.feedList = [];
        if(result.data.length)
        {
           console.log("RESULT ==>", result.data);
           for(let i = 0;i < result.data.length;i++)
           {
        //     this.feedList.push({
        //       "id":result.data[i].id,
        //       "content":result.data[i].content,
        //       "title":result.data[i].title,
        //       "imageurl":result.data[i].imageurl,
        //       "publishedOn":result.data[i].datestamp
        //     });
           }
        }
      }

    });
  }
   onChangePage(items: Array<any>) {
    this.selectedMembers = items;
    console.log(this.selectedMembers);
  }
  exportTrips() {    
    /*if(this.FilterName != '')
    this.expservice.exportExcel(this.feedList.filter((item:any) =>(item.title != null ? item.title.toLowerCase().includes(this.FilterName.toLowerCase()):'') || item.id === this.FilterName || (item.content != null ? item..toLowerCase().includes(this.FilterName.toLowerCase()):'')), 'Feeds');
   else*/
   this.expservice.exportExcel(this.feedList, 'Feeds');
  }

}
