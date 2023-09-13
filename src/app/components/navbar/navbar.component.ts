import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { adminService } from '../../service/admin.service';
import { driverInfo } from '../../model/driverInfo';
import { LoginService } from '../../service/login.service';
import { environment } from '../../../environments/environment';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public focus: any;
  public listTitles!: any[];
  public location: Location;
  loginName: any;
  filepath: any;
  siteURL: any;
  filename: any;
  profileDetails!: driverInfo;


  constructor(
    location: Location,
    private element: ElementRef,
    private router: Router,
    private service: adminService,
    public loginService: LoginService,
    ) {
    this.location = location;
    this.siteURL = environment.serverUrl;
  }

  ngOnInit() {
    debugger;
    this.loginName = localStorage['firstname'] + ' ' + (localStorage['lastname'] != 'null' ? localStorage['lastname'] : '');
    this.listTitles = ROUTES.filter(listTitle => listTitle);
    this.getProfileDetails();
  }
  getTitle() {
    // console.log("Current Page==>",this.router.url);
    // debugger;
    var pages;
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === '#') {
      titlee = titlee.slice(1);
    }

    for (var item = 0; item < this.listTitles.length; item++) {
      if (this.listTitles[item].path === titlee) {
        return this.listTitles[item].title;
      }
    }
    if (this.router.url == "/dashboard"){
      pages = "Dashboard";
    }
    else
      pages = "";
    return pages;
  }


  getProfileDetails() {
    debugger;
    var userId = localStorage.getItem("userId");
    // console.log("userId", localStorage.getItem("userId"));
    this.service.getInformedUsers(userId).subscribe((response: any) => {
      // console.log("updated image", response)
      if (response) {
        if (response.data != undefined){
        if (response.data.profile_url != null && response.data.profile_url.length > 0) {
          // console.log('avatar', response.data.profile_url);          
          this.filepath = response.data.profile_url;
        }
      }
      }
    });
  }


  // logOut
  logout(){
    localStorage.setItem('enableSignIn', '1');
    localStorage.removeItem('token');
    this.loginService.logout();
    this.router.navigate(['login']);
  }




}
