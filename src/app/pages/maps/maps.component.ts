import { Component, OnInit, SecurityContext } from '@angular/core';
import { BrowserModule, SafeHtml, DomSanitizer } from '@angular/platform-browser';
// import { from } from 'rxjs';
declare const google: any;
import { timer, of, Subject, interval, from, Observable } from 'rxjs';
import { MapService } from '../../service/map.service';
import { driverService } from '../../service/driver.service';
import { LoginService } from '../../service/login.service';
import { passengerService } from '../../service/passenger.service';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements OnInit {
  closeResult = '';
  // viewMode = 'tab1';
  mapsData: any;
  token: any;
  mapDataList: any;
  CMI: number = 1;
  filterMapList: any;
  // driver data
  driverData: any;
  isFormReady = false;
  tripsList = [];
  zoomOnce: boolean = false;
  // driverClickID:any;
  isFormReadyPop: boolean = false;

  data: SafeHtml;
  res: string;

  maproute: any = "";

  constructor(private sanitizer: DomSanitizer, private mapService: MapService, private modalService: NgbModal, private driverService: driverService, private service: passengerService,private loginService:LoginService) {
    sessionStorage.setItem('ilat', '');
    sessionStorage.setItem('ilng', '');
    sessionStorage.setItem('isClick', 'false');
    sessionStorage.setItem('iindex', '0');
  }

  ngOnInit() {

    const inputRequest = {
      token: this.token,
    };

    this.mapService.getdriverList(inputRequest).subscribe((result: any) => {
      // debugger;
      this.isFormReady = true;
      if (result) {
        if (result.data) {
          this.driverData = result.data;
          console.log("driver map data", this.driverData);
        }
      }
    });
    sessionStorage.setItem('zoomSts', 'false');
    this.Maprefresh();
    interval(1000 * 30).subscribe(x => {
      this.Maprefresh();
    });
    this.loginService.addInteraction(sessionStorage.getItem('email'),"Viewed Maps ").subscribe((result:any) => {});
  }

  Maprefresh() {
   
    const inputRequest = {
      token: this.token,
    };

    this.mapService.getMapsList(inputRequest).subscribe((result: any) => {
       debugger;
      if (result) {
        if (result.data) {
          this.mapDataList = result.data;
          console.log("map data", this.mapDataList);
          this.filterMapList = this.mapDataList.filter((item) => item.driverStatus == '1')
          console.log("driver details ", this.filterMapList);
          if (sessionStorage.getItem('iindex') != undefined && sessionStorage.getItem('iindex') != '0')
            this.getMarkerImage(sessionStorage.getItem('iindex'));
          else
            this.getMarkerImage(this.CMI);
        }
      }
    });

  }

  getMarkerImage(index) {
    debugger;
    var url = "";
    if (index == 1) {
      url = "/dist/assets/img/online.png"
      // url = "/assets/img/online.png"
    }
    else if (index == 2) {
     url = "/dist/assets/img/offline.png"
        // url = "/assets/img/offline.png"
    }
    else if (index == 3) {
     url = "/dist/assets/img/Accepted.png"
      //  url = "/assets/img/Accepted.png"
    }
    else if (index == 4) {
     url = "/dist/assets/img/Active-car.png"
      //  url = "/assets/img/Active-car.png"
    }
    else if (index == 5) {
     url = "/dist/assets/img/arrived.png"
      //  url = "/assets/img/arrived.png"
    }
    else if (index == 6) {
     url = "/dist/assets/img/inactive.svg"
      //  url = "/assets/img/inactive.svg"
    }
   
    this.getMap(url);
  }

  getMap(markerUrl) {
    
    // Creating a new map
    var map = new google.maps.Map(document.getElementById("map"), {
      center: sessionStorage.getItem('ilat') != undefined && sessionStorage.getItem('ilat') != '' ? new google.maps.LatLng(sessionStorage.getItem('ilat'), sessionStorage.getItem('ilng')) : new google.maps.LatLng(11.74, 79.77),
      zoom: sessionStorage.getItem('isClick') == 'false' ? 3 : 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP
      // mapTypeId: google.maps.MapTypeId.SATELLITE
      // mapTypeId: google.maps.MapTypeId.HYBRID
    });

    for (var i = 0; i < this.filterMapList.length; i++) {
     

      var data = this.filterMapList[i]
      // latLng = new google.maps.LatLng(data.lat, data.lng);

      // Creating a marker and putting it on the map

      var offline = {
        // url: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png", // OnlineUrl
        url: markerUrl,
        scaledSize: new google.maps.Size(20, 20), // scaled size
        origin: new google.maps.Point(0, 0), // origin
        anchor: new google.maps.Point(0, 0) // anchor
      };

      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(data.lat, data.lng),
        map: map,
        title: data.firstname + ' ' + data.lastname,
        icon: offline,
        // animation: google.maps.Animation.DROP,
      });

      var infoWindow = new google.maps.InfoWindow();
      google.maps.event.addListener(marker, 'click', (function (marker, i) {


        // // Attaching a click event to the current marker
        return function () {
          // debugger;

          infoWindow.setContent("<b>Name: </b>" + i.firstname + ' ' + i.lastname);
          console.log(i.firstname + ' ' + i.lastname);
          sessionStorage.setItem('ilat', i.lat);
          sessionStorage.setItem('ilng', i.lng);
          sessionStorage.setItem('isClick', 'true');
          infoWindow.open(map, marker);
          window.setTimeout(() => {
            map.setCenter(marker.getPosition());
            map.panTo(marker.getPosition());
          }, 100);
          if (sessionStorage.zoomSts == 'false') {
            sessionStorage.setItem('zoomSts', 'true');
            map.setZoom(16);
          }

          sessionStorage.setItem('driverClickID', i.id);
          //this.driverClickID = i.id;

          var btnModelPopup = (<HTMLInputElement>document.getElementById("btnModelPopup"));
          btnModelPopup.click();

        };

      })(marker, data));

    }

  }

  onlineDrivers(e, i, value, data) {  
    debugger;  
    // console.log(i,value,data)
    sessionStorage.setItem('ilat', '');
    sessionStorage.setItem('ilng', '');
    sessionStorage.setItem('isClick', 'false');
    sessionStorage.setItem('zoomSts', 'false');
    sessionStorage.setItem('iindex', i);
    if (data == 'driver') {
      this.filterMapList = this.mapDataList.filter((item) => item.driverStatus == value);
      console.log("driver status", this.filterMapList);
      this.getMarkerImage(i);
    }
    else {
      this.filterMapList = this.mapDataList.filter((item) => item.trip_status == value);
      console.log("Trip status", this.filterMapList);
      this.getMarkerImage(i);

    }
  }
  chkDriverStatus(content) {
    // Get Driver Trip details
    // if (i.driverStatus == 2) {
    const inputRequest = {
      token: this.token,
    };
    this.driverService.getDriverCurrentStatus(inputRequest, sessionStorage.driverClickID).subscribe((result: any) => {
      if (result) {
        if (result.data.id != undefined)
          this.service.getSingleTrips(result.data.id).subscribe((resultval: any) => {

            this.tripsList = [];
            if (resultval) {
              if (resultval.data.length) {
                console.log("RESULT ==>", resultval.data);
                this.tripsList = resultval.data;
              }
            }
          })
      }
    });

    //   }
    // Trip Det end

    var btnModelPopup = (<HTMLInputElement>document.getElementById("btnModelPopup"));
    btnModelPopup.click();
  }
  open(content) {
    debugger;
    // Get Driver Trip details
    // if (i.driverStatus == 2) {
    const inputRequest = {
      token: this.token,
    };
    this.driverService.getDriverCurrentStatus(inputRequest, sessionStorage.driverClickID).subscribe((result: any) => {
      if (result) {
        if (result.data[0] != undefined)
          this.service.getSingleTrips(result.data[0].id).subscribe((resultval: any) => {
            debugger;
            this.tripsList = [];
            if (resultval) {
              if (resultval.data.length) {
                this.isFormReadyPop = true;
                console.log("RESULT ==>", resultval.data);
                this.tripsList = resultval.data;

                this.modalService.open(content, { size: 'lg' }).result.then((result) => {
                  this.closeResult = `Closed with: ${result}`;
                }, (reason) => {
                  this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
                });
                this.maproute = "https://www.google.com/maps?q=" + resultval.data[0].from_lat + "," + resultval.data[0].from_long + "&z=15&output=embed"
                // <iframe src='"+this.maproute+"' width='100%' height='300' frameborder='0' style='border:0;' allowfullscreen='' aria-hidden='false' tabindex='0'></iframe></div>
                this.res = `
    <iframe
                  src="${this.maproute}"
                  width="100%" height="300" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false"
                  tabindex="0"></iframe>`;
                this.data = this.sanitizer.bypassSecurityTrustHtml(this.res);

              }
            }
          })
      }
    });

    //   }
    // Trip Det end

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
  tripStatus(status) {
    // debugger;
    var tripSts = '';
    if (status == '0')
      tripSts = "Schedule";
    else if (status == '1')
      tripSts = "Accepted";
    else if (status == '2')
      tripSts = "Completed";
    else if (status == '3')
      tripSts = "Canceled";
    else if (status == '4')
      tripSts = "Started";
    return tripSts;
  }

}




