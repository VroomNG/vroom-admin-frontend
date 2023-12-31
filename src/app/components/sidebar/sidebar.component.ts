import { Component, OnInit, ElementRef } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { adminService } from '../../service/admin.service';
import { driverInfo } from '../../model/driverInfo';
import { LoginService } from '../../service/login.service';
import { environment } from '../../../environments/environment';
declare const $: any;

declare interface RouteInfo {
  id:number;
  path: string;
  title: string;
  icon: string;
  class: string;
  children: any;
}

@Component({
  // standalone: true,
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent implements OnInit {

  ROUTES: RouteInfo[] = [
    // { path: '/dashboard', title: 'Dashboard', icon: 'ni ni-shop', class: '', children: '' },
  
    {
      id:0,
      path: '/admin', title: 'Admin', icon: 'fa-solid fa-user-tie', class: '', children: [
        { path: '/admin/add-admin', title: 'Add Admin', icon: 'fa fa-user-plus', class: '' },
        { path: '/admin/view-admin', title: 'View Admin', icon: 'fa fa-eye', class: '' }
      ]
    },
    {
      id:1,
      path: 'vehicle/view-vehicle', title: 'Vehicle Type', icon: 'fa-solid fa-truck-monster text-primary', class: '', children: [
        { path: '/vehicle/add-vehicle', title: 'Add Vehicle type', icon: 'fa fa-car-side text-primary', class: '', children: '' },
        { path: '/vehicle/view-vehicle', title: 'View Vehicle Type', icon: 'fa fa-eye text-primary', class: '', children: '' },
      ]
    },
    {
      id:2,
      path: '/partners', title: 'partners', icon: ' fa-solid fa-handshake text-primary', class: '', children: [
        { path: '/partners/add-partners', title: 'Add Driver', icon: 'fas fa-plus text-primary', class: '', children: '' },
        { path: '/partners/view-partner/1', title: 'View Drivers', icon: 'fa fa-eye text-primary', class: '', children: '' },
        { path: '/partners/view-partner/2', title: 'View Pending Drivers', icon: 'fas fa-spinner text-primary', class: '', children: '' },
        { path: '/partners/view-partner/3', title: 'View Inactive Drivers', icon: 'fas fa-power-off text-primary', class: '', children: '' },
        { path: '/partners/view-partner/4', title: 'View No credit Drivers',  icon: 'far fa-credit-card text-primary', class: '',children:''},
        { path: '/partners/partners-current-status', title: 'Driver Current Status',  icon: 'fa fa-check-circle text-primary', class: '',children:''}
      ]
    },
    {
      id:3,
      path: '/driver', title: 'Driver', icon: 'fa-solid fa-car text-primary', class: '', children: [
        { path: '/driver/add-driver', title: 'Add Driver', icon: 'fas fa-plus text-primary', class: '', children: '' },
        { path: '/driver/view-driver/1', title: 'View Drivers', icon: 'fa fa-eye text-primary', class: '', children: '' },
        { path: '/driver/view-driver/2', title: 'View Pending Drivers', icon: 'fas fa-spinner text-primary', class: '', children: '' },
        { path: '/driver/view-driver/3', title: 'View Inactive Drivers', icon: 'fas fa-power-off text-primary', class: '', children: '' },
        { path: '/driver/view-driver/4', title: 'View No credit Drivers',  icon: 'far fa-credit-card text-primary', class: '',children:''},
        { path: '/driver/driver-current-status', title: 'Driver Current Status',  icon: 'fa fa-check-circle text-primary', class: '',children:''}
      ]
    },
    {
      id:4,
      path: '/rider', title: 'Rider', icon: 'fa fa-motorcycle text-primary', class: '', children: [
        { path: '/rider/add-edit-riders', title: 'Add Rider', icon: 'fa fa-plus-square text-primary', class: '', children: '' },
        { path: '/rider/view-riders', title: 'View Riders', icon: 'fa fa-eye text-primary', class: '', children: '' },
      ]
    },
    {
      id:5,
      path: '/#', title: 'Trips', icon: 'fa-solid fa-bus', class: '', children: [
        { path: '/trips/1', title: 'Trips', icon: 'fas fa-suitcase-rolling', class: '', children: '' },
        { path: '/trips', title: 'Ongoing Trips',  icon: 'fas fa-luggage-cart', class: '',children:''},
        { path: '/trips/2', title: 'Upcoming Trips', icon: 'ni ni-map-big ', class: '', children: '' },
        { path: '/trips', title: 'No Response Trips',  icon: 'fas fa-ban', class: '',children:''},
        { path: '/trips/3', title: 'Past Trips', icon: 'fas fa-taxi', class: '', children: '' },
      ]
    },
    { 
      id:6,
      path: '#', title: 'Dispatch',  icon: 'fas fa-clipboard text-primary', class: '', children:[
      { path: '/dispatch', title: 'Manual Taxi Dispatch',  icon: 'fas fa-clipboard-check text-primary', class: '',children:''},
      { path: '/dispatch/dispatchview-list', title: 'Pending Requests',  icon: 'fas fa-layer-group text-primary', class: '',children:''},
      { path: '/dispatch/dispatchview-list', title: 'Ride Later Bookings',  icon: 'fas fa-history text-primary', class: '',children:''},
    ]},
    {
      id:7,
      path: '/reviews', title: 'Reviews and Ratings', icon: 'fas fa-star', class: '', children: [
        { path: '/reviews/driver-reviews', title: 'Driver Reviews & Ratings', icon: 'far fa-calendar-check text-primary', class: '', children: '' },
        { path: '/reviews/rider-reviews', title: 'Rider Reviews & Ratings', icon: 'fas fa-calendar-check', class: '', children: '' },
        { path: '/ratings/driver-ratings', title: 'Driver Ratings',  icon: 'fas fa-star-half-alt text-primary', class: '',children:''},
        { path: '/ratings/rider-ratings', title: 'Rider Ratings',  icon: 'far fa-star', class: '',children:''},
      ]
    },
    {
      id:8,
      path: '/#', title: 'Settlements', icon: 'fa-solid fa-money-bill-transfer', class: '', children: [
        { path: '/settlements/driver-settlement', title: 'Driver Settlement', icon: 'fa fa-code', class: '', children: '' },
        { path: '/settlements/rider-settlement', title: 'Rider Settlement', icon: 'fa fa-eye ', class: '', children: '' },
        { path: '/settlements/driver-settlement/driver-bank-transaction', title: 'Driver Bank Transaction', icon: 'fa fa-code', class: '', children: '' },
        { path: '/settlements/driver-settlement/settlement-list', title: 'Driver Settlement List', icon: 'fa fa-code', class: '', children: '' },
      ]
    },
    //  {
    //   id:9, 
    //   path: '/icons', title: 'Icons',  icon:'ni-planet text-blue', class: '' ,children:''},
      { 
        id:9,
        path: '/maps', title: 'Maps',  icon:'fa-solid fa-location-dot text-primary', class: '' ,children:''},
    { 
      id:10,
      path: '/user-profile', title: 'User profile', icon: 'fa-solid fa-user text-primary', class: '', children: '' },
      {
        id:11,
        path: '/#', title: 'Notification Centre', icon: 'fa-solid fa-bell', class: '', children: [
          { path: '/promocode/addpromocode', title: 'Add Promocode', icon: 'fa fa-code text-primary', class: '', children: '' },
          { path: '/promocode', title: 'View Promocode', icon: 'fa fa-eye ', class: '', children: '' },
        ]
      },
      { id:12,
        path: '/App messages', title: 'App messages', icon: 'fa-solid fa-envelope text-primary', class: '', children: '' },
   
      { id:13,
        path: '/App messages', title: 'Reports', icon: 'fa-solid fa-chart-pie text-primary', class: '', children: '' },
   
      //   { id:14,
      // path: '/tables', title: 'Tables',  icon:'ni-bullet-list-67 text-red', class: '',children:'' },
    
    {
      id:14,
      path: '/settings', title: 'Surge Charge', icon: 'fa-solid fa-face-smile', class: '', children: [
        { path: '/settings/add-settings', title: 'Add settings', icon: 'fa fa-user-plus', class: '' },
        { path: '/settings/view-settings', title: 'View settings', icon: 'fa fa-eye', class: '' }
      ]
    },
    {
      id:15,
      path: '/settings', title: 'Discount', icon: 'fa-solid fa-percent', class: '', children: [
        { path: '/settings/add-settings', title: 'Add settings', icon: 'fa fa-user-plus', class: '' },
        { path: '/settings/view-settings', title: 'View settings', icon: 'fa fa-eye', class: '' }
      ]
    },
    {
      id:16,
      path: '/settings', title: 'App actions', icon: 'fa-solid fa-gear', class: '', children: [
        { path: '/settings/add-settings', title: 'Add settings', icon: 'fa fa-user-plus', class: '' },
        { path: '/settings/view-settings', title: 'View settings', icon: 'fa fa-eye', class: '' }
      ]
    },
  
  ];



  // user_type:any;
  // user_id:any;
  // public focus: any;
  // public listTitles!: any[];
  // public location: Location;
  // loginName: any;
  // filepath: any;
  // siteURL: any;
  // filename: any;
  // profileDetails!: driverInfo;
  // prifileDetails: any;
  // nabarData: boolean = false;

  // public menuItems!: any[];
  // public isCollapsed = true;

  constructor(
    // location: Location,
    // private router: Router,
    // private route: ActivatedRoute,
    // private element: ElementRef,
    // private service: adminService,
    // private loginService: LoginService,
  ) {
    // this.user_type = (localStorage['user_type'] != undefined ? localStorage['user_type'] : '')
    // this.location = location;
    // this.siteURL = environment.serverUrl;
  }

  ngOnInit() {
    // this.menuItems = ROUTES.filter(menuItem => menuItem);
    // console.log("Menu ==>", this.menuItems);
    // this.route.params.subscribe((event) => {
    //   this.isCollapsed = true;
    // });
    // this.getProfileDetails();
    console.log('onInit')

  }

  // getProfileDetails() {
    // debugger;
    // var userId = localStorage.getItem("userId");
    // this.user_id = userId;
    // console.log("userId", localStorage.getItem("userId"));
    // this.service.getInformedUsers(userId).subscribe((response: any) => {
    //   console.log("updated image", response)
    //   if (response) {
    //     this.nabarData = true;
    //     this.prifileDetails = response.data;
        // console.log(this.prifileDetails, "prifile details")
        // if (response.data != undefined){
        // if (response.data.profile_url != null && response.data.profile_url.length > 0) {
          // console.log('avatar', response.data.profile_url);
      //     this.filepath = response.data.profile_url;
      //   }
      // }
      // }
  //   });
  // }


}
