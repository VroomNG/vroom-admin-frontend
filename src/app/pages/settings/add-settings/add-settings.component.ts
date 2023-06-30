import { Component, OnInit, ElementRef, ViewChild, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { chartService } from '../../../service/chart.service';
import { SettingInfo } from '../../../model/surgeChargeInfo';
import { ApiService, Maps } from '../../../service/api.service';
import { LoginService } from '../../../service/login.service';

import * as turf from '@turf/turf';
declare const google: any;

import { geolib } from '../../../geolib'
// ./geolib';
const colors = [
  'red',
  'blue',
  'green',
  'yellow',
  'brown',
  'BurlyWood',
  'Cyan',
  'DarkGreen',
  'DarkOrchid',
  'DarkOliveGreen',
  'Fuchsia',
  'GoldenRod',
  'Indigo',
  'LightCoral',
  'MediumSlateBlue',
];
// declare const geolib: any;

let colorIndex = 0;
const place = null as google.maps.places.PlaceResult;
type Components = typeof place.address_components;
@Component({
  selector: 'app-add-settings',
  templateUrl: './add-settings.component.html',
  styleUrls: ['./add-settings.component.css']
})
export class AddSettingsComponent implements OnInit {
  @ViewChild("search")
  public searchElementRef: ElementRef;
  @ViewChild("map")
  public mapElementRef: ElementRef;
  private map: google.maps.Map;
  public entries = [];
  public place: google.maps.places.PlaceResult;
  mapLatitude: any;
  mapLongitude: any;
  numRegex = /^-?\d*[.,]?\d{0,2}$/;
  surgeForm: FormGroup;
  settingData: SettingInfo;
  // declartion
  surgeSelected: any;
  token: any;
  SelectedDate: any;
  isFormReady = false;
  submitted = false;
  minDate: any = new Date();
  minTime: any = new Date().getTime();
  dateEnable: boolean = false;
  errorMessage: any; errorMessageDate: any; 
  chargeOption: any;
  citySelect: any;
  radiusVal: any;
  latitude:any;
  longitude:any;
  select = [
    { value: 1, name: "Specific Day" },
    { value: 0, name: "All Days" }
  ];
  // cities=[{value:"Lagos",name:"Lagos"},{value:"Onitsha",name:"Onitsha"},{value:"Kano",name:"Kano"},{value:"Ibadan",name:"Ibadan"},{value:"Owerri",name:"Owerri"},
  // {value:"Abuja",name:"Abuja"},{value:"Maiduguri",name:"Maiduguri"},{value:"Benin City",name:"Benin City"},{value:"Ikare",name:"Ikare"},{value:"Ogbomoso",name:"Ogbomoso"},
  // {value:"Zaria",name:"Zaria"},{value:"Abeokuta",name:"Abeokuta"},{value:"Jos",name:"Jos"},{value:"Ilorin",name:"Ilorin"},{value:"Warri",name:"Warri"},
  // {value:"Kaduna",name:"Kaduna"},{value:"Oyo",name:"Oyo"},{value:"Sokoto",name:"Sokoto"},{value:"Enugu",name:"Enugu"},{value:"Bauchi",name:"Bauchi"}]
  constructor(
    private route: Router,
    private router: ActivatedRoute,
    private location: Location,
    private formbuilder: FormBuilder,
    private surgeService: chartService,
    private loginService: LoginService,
    private apiService: ApiService, private ngZone: NgZone
  ) {
    this.route.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    if (localStorage.token != "" || localStorage.token != undefined) {
      this.token = localStorage.token;
      //this.flag_admin = localStorage.flag_admin;

    }
    else {
      this.route.navigate(['/login']);
    }

    this.router.params.subscribe((response: any) => {
      this.settingData = new SettingInfo();
      this.settingData.id = response.id == undefined ? 0 : Number(response.id);
      // console.log(this.settingData, "<== data ")
      // console.log("ID for Admin ==> ",this.settingData.id);

    });

    // apiService.api.then(maps => {
    //   this.initAutocomplete(maps);
    //   this.initMap(maps);
    // });
  }

  ngOnInit(): void {

    // this.apiService.api.then(maps => {
    //   this.initAutocomplete(maps);
    //   this.initMap(maps);
    //  this.map = new google.maps.Map(
    //     document.getElementById("map") as HTMLElement,
    //     {
    //       center: { lat: 40.749933, lng: -73.98633 },
    //       zoom: 13,
    //     })
    // });

    this.createForm();
    if (this.settingData.id != 0) {
      this.getSingleData();
    }
    else
      this.surgeForm.value.SelectedDate = 0;

      this.apiService.api.then(maps => {
        this.initAutocomplete(maps);
        this.initMap(maps);
       this.map = new google.maps.Map(
          document.getElementById("map") as HTMLElement,
          {
            center: { lat: 40.749933, lng: -73.98633 },
            zoom: 13,
          })
      });
      this.loginService.addInteraction(sessionStorage.getItem('email'),"Added a setting ").subscribe((result:any) => {});
  
  }

  get f() { return this.surgeForm.controls; }


  createForm() {

    // var today = new Date().toISOString().split('T')[0];
    // document.getElementById("txtDate")[0].setAttribute('min', today);

    this.surgeForm = this.formbuilder.group({
      SelectedDate: [this.settingData.SelectedDate, Validators.required],
      charge: [this.settingData.charge, [Validators.required, Validators.pattern(this.numRegex)]],
      utcStartDateTime: [this.settingData.utcStartDateTime, Validators.required],
      utcToDateTime: [this.settingData.utcToDateTime, Validators.required],
      fromDate: [this.settingData.fromDate],
      // toDate: [this.settingData.toDate, Validators.required],
    })
  }

  // add surge charge
  addSettings() {
    debugger;
    // console.log("form data", this.surgeForm);
    this.errorMessage = ""; this.errorMessageDate = "";
    this.submitted = true;
    this.isFormReady = true;

    var amount = (<HTMLInputElement>document.getElementById("amount"));
    var multipler = (<HTMLInputElement>document.getElementById("multipler"));
    var city = document.getElementsByClassName("form-control auto") as HTMLCollectionOf<HTMLInputElement>;
    var radius = (<HTMLInputElement>document.getElementById("radius"));
    const inputRequest = {
      surgeSelected: this.surgeForm.value.SelectedDate,
      charge: this.surgeForm.value.charge,
      startTime: this.surgeForm.value.utcStartDateTime,
      endTime: this.surgeForm.value.utcToDateTime,
      fromDate: this.surgeForm.value.fromDate,
      city: city[0].value,
      chargeOption: (amount.checked == true ? 1 : multipler.checked == true ? 2 : 0),
      ratio: radius.value,
      latitude: this.mapLatitude,
      longitude: this.mapLongitude
      // toDate: this.surgeForm.value.toDate,
    }


    if (this.surgeForm.invalid) {
      return
    }
    else if (multipler.checked == false && amount.checked == false) {
      this.errorMessage = "Surge Charge option is required";
      return;
    }
    else {
      if (multipler.checked == true) {
        if (this.surgeForm.value.charge > 6) {
          this.errorMessage = "Surge Charge less then 5";
          return;
        }
      }
      if (this.surgeForm.value.SelectedDate == 1) {
        if (this.surgeForm.value.fromDate == undefined || this.surgeForm.value.fromDate == "" || this.surgeForm.value.fromDate == null) {
          this.errorMessageDate = "Date is required ";
          return;
        }
      }
      debugger;

      console.log('input request', inputRequest)
      this.surgeService.addSurgeCharge(inputRequest).subscribe((result: any) => {
        console.log("resupt", result.data);
        if (result.data) {
          this.surgeForm.reset();
          this.route.navigate(['settings/view-settings']);
        }
        else if (result.error.code == 100) {
          console.log("error mail data ")
        }
        else {
          console.log("clear form data")
        }

      });
    }
  }

  // update passanger
  updateSettings(id) {
    debugger;
    this.errorMessage = ""; this.errorMessageDate = "";
    var amount = (<HTMLInputElement>document.getElementById("amount"));
    var multipler = (<HTMLInputElement>document.getElementById("multipler"));
    // var city = (<HTMLInputElement>document.getElementById("search"));
    var city = document.getElementsByClassName("form-control auto") as HTMLCollectionOf<HTMLInputElement>;
    var radius = (<HTMLInputElement>document.getElementById("radius"));
    var days_val = (<HTMLInputElement>document.getElementById("days"));

    this.isFormReady = true;
    this.submitted = true;
    // if(days_val.value==""){
    if (this.surgeForm.invalid)          
      return;        
  // }
    else {
      if (multipler.checked == true) {
        if (this.surgeForm.value.charge > 6) {
          this.errorMessage = "Surge Charge less then 5";
          return;
        }
      }
      if (this.surgeForm.value.SelectedDate == 1) {
        if (this.surgeForm.value.fromDate == undefined || this.surgeForm.value.fromDate == "" || this.surgeForm.value.fromDate == null) {
          this.errorMessageDate = "Date is required ";
          return;
        }
      }
      if (amount.checked == false && multipler.checked == false) {
        this.errorMessage = "Please select Surge Charge option";
        return;
      }
      var selDays = (<HTMLInputElement>document.getElementById("days"));
    }
    const inputRequest = {
      surgeSelected: selDays.value,
      charge: this.surgeForm.value.charge,
      fromDate: this.surgeForm.value.fromDate,
      // toDate: this.surgeForm.value.toDate,
      startTime: this.surgeForm.value.utcStartDateTime,
      endTime: this.surgeForm.value.utcToDateTime,
      city: city[0].value,
      chargeOption: (amount.checked == true ? 1 : multipler.checked == true ? 2 : 0),
      ratio: radius.value,
      latitude: this.mapLatitude,
      longitude: this.mapLongitude
    };

    console.log('update status', inputRequest);

    this.surgeService.updateSurgeCharge(inputRequest, id).subscribe((result: any) => {
      // console.log("Updated admin data", result.data);
      if (result) {
        if (result.data) {
          this.route.navigate(['settings/view-settings']);
        }
      }

    });
  }

  selectedEvent(i) {
    debugger;
    this.errorMessageDate = "";
    this.surgeSelected = i.target.value;
    // console.log(this.surgeSelected);
    if (this.surgeSelected === '0') {
      this.SelectedDate = this.surgeSelected;
      this.dateEnable = false
    }
    else if (this.surgeSelected === '1') {
      this.SelectedDate = this.surgeSelected;
      this.dateEnable = true;
    }
    else {
      console.log("value is null");
    }
  }

  // delete surcharge
  deleteSettings(id) {
    this.surgeService.deleteSurge(id).subscribe((result: any) => {
      if (result) {
        this.route.navigate(['settings/view-settings']);
      }
    });
  }

  changePathUrl() {
    this.location.back();
  }


  getSingleData() {
debugger;
    this.surgeService.getsingleSurge(this.settingData.id).subscribe((response: any) => {
      if (response) {
        console.log('surge charge', response)
        if (this.settingData.id > 0) {
          this.settingData.charge = response.data.charge;

          this.settingData.fromDate = response.data.fromDate;
          // this.settingData.toDate = response.data.toDate;
          this.settingData.utcStartDateTime = response.data.startTime;
          this.settingData.utcToDateTime = response.data.endTime;
          this.settingData.surgeSelected = response.data.surgeSelected;
          this.dateEnable = (response.data.surgeSelected == 1 ? true : false);
          this.chargeOption = response.data.chargeOption;
          this.citySelect = response.data.city;
          this.radiusVal = response.data.ratio;
          this.latitude = response.data.latitude;
          this.longitude = response.data.longitude;
          this.settingData.SelectedDate = response.data.surgeSelected
        }
        this.createForm();
        var panData = new google.maps.LatLng(this.latitude, this.longitude)
        this.map.panTo(panData);
        var marker = new google.maps.Marker({
          position: panData
        })
        marker.setMap(this.map);
        marker.addListener("click", () => {
          this.map.setZoom(15);
          this.map.setCenter(marker.getPosition() as google.maps.LatLng);
        });
        console.log("Bind map");
      }
    });
  }

  chargeErrMsg() {
    this.errorMessage = "";
  }
  chargeErrMsgDate() {
    this.errorMessageDate = "";
  }
  initAutocomplete(maps: Maps) {
    debugger;
    if (this.searchElementRef != undefined) {
      let autocomplete = new maps.places.Autocomplete(this.searchElementRef.nativeElement);
      console.log("autocomplete ==>", autocomplete);
      autocomplete.setComponentRestrictions({country:["NG"]});
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          this.onPlaceChange(autocomplete.getPlace());
        });
      });
    }
  }
  initMap(maps: Maps) {
    this.map = new maps.Map(this.mapElementRef.nativeElement, {
      zoom: 7
    });
    this.map.addListener('click', event => {

      const ellipsePoints = toEllipse(this.entries[0].location.bounds);
      var line = turf.helpers.lineString(ellipsePoints.map(p => [p.longitude, p.latitude]));

      const pointLatLng = event.latLng as google.maps.LatLng;
      var point = turf.helpers.point([pointLatLng.lng(), pointLatLng.lat()]);
      //point = turf.helpers.point([this.entries[0].location.coordinates.longitude, this.entries[0].location.coordinates.latitude]);
      const isInside = geolib.isPointInside({ latitude: pointLatLng.lat(), longitude: pointLatLng.lng() }, ellipsePoints);
      const distance = isInside ? 0 : turf.pointToLineDistance(point, line);
      console.log('distance', distance * 1000);
    });
  }

  onPlaceChange(place: google.maps.places.PlaceResult) {
    console.log("onplace change");
    debugger;
    var radius_val = (<HTMLInputElement>document.getElementById("radius"));
console.log("radius_val",radius_val.value);
    if (place.geometry != undefined)
      this.map.setCenter(place.geometry.location);
    console.log("Place =>", place.geometry.location.lat);
    this.mapLatitude = place.geometry.viewport.toJSON().north;
    this.mapLongitude = place.geometry.viewport.toJSON().east;
    console.log("lati val =>", this.mapLatitude, this.mapLongitude);
    const color = colors[(colorIndex++) % colors.length]
    const pin = this.pin(color);

    const marker = new google.maps.Marker({
      position: place.geometry.location,
      animation: google.maps.Animation.DROP,
      map: this.map,
      icon: this.pin(color),
    });

    const rectangle = new google.maps.Circle({
      strokeColor: color,
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: color,
      fillOpacity: 0.35,
      map: this.map,
      //bounds: place.geometry.viewport
    });

    const expandedRectangle = new google.maps.Circle({
      strokeColor: color,
      strokeOpacity: 0.8,
      strokeWeight: 0.5,
      fillColor: color,
      fillOpacity: 0.2,
      map: this.map,
     // bounds: expandBounds(place.geometry.viewport.toJSON(), 5000),
    });

    const location = this.locationFromPlace(place);

    // const ellipse = new google.maps.Polygon({
    //   paths: toEllipse(location.bounds).map(({ latitude, longitude }) => new google.maps.LatLng(latitude, longitude)),
    //   strokeColor: color,
    //   strokeOpacity: 1,
    //   strokeWeight: 1,
    //   fillColor: color,
    //   fillOpacity: 0.3,
    // });
    // ellipse.setMap(this.map);
    const ellipse = new google.maps.Circle({        
      strokeColor: color,
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: color,
      fillOpacity: 0.35,
     map:this.map,
     // center: citymap[city].center,
      radius: (radius_val != undefined && radius_val != null ? parseInt(radius_val.value):100)
    });
ellipse.bindTo('center', marker, 'position');

    this.entries.unshift({ place, marker, rectangle, expandedRectangle, ellipse, color, location });
  }
  pin(color) {
    return {
      path: 'M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z M -2,-30 a 2,2 0 1,1 4,0 2,2 0 1,1 -4,0',
      fillColor: color,
      fillOpacity: 1,
      strokeColor: '#000',
      strokeWeight: 2,
      scale: 1,
    };
  }
  public locationFromPlace(place: google.maps.places.PlaceResult) {
    const components = place.address_components;
    if (components === undefined) {
      return null;
    }

    const areaLevel3 = getShort(components, 'administrative_area_level_3');
    const locality = getLong(components, 'locality');

    const cityName = locality || areaLevel3;
    const countryName = getLong(components, 'country');
    const countryCode = getShort(components, 'country');
    const stateCode = getShort(components, 'administrative_area_level_1');
    const name = place.name !== cityName ? place.name : null;

    const coordinates = {
      latitude: place.geometry.location.lat(),
      longitude: place.geometry.location.lng(),
    };

    const bounds = place.geometry.viewport.toJSON();

    // placeId is in place.place_id, if needed
    return { name, cityName, countryName, countryCode, stateCode, bounds, coordinates };
  }
}
function getComponent(components: Components, name: string) {
  return components.filter(component => component.types[0] === name)[0];
}

function getLong(components: Components, name: string) {
  const component = getComponent(components, name);
  return component && component.long_name;
}

function getShort(components: Components, name: string) {
  const component = getComponent(components, name);
  return component && component.short_name;
}
function toEllipse({ north, south, east, west }: cosmos.LatLngBoundsLiteral) {
  const latitude = (north + south) / 2;
  const longitude = (east + west) / 2;
  const r1 = geolib.getDistance({ latitude: north, longitude }, { latitude: south, longitude }) / 2;
  const r2 = geolib.getDistance({ latitude, longitude: west }, { latitude, longitude: east }) / 2;

  const center = { latitude, longitude };
  const latitudeConv = geolib.getDistance(center, { latitude: latitude + 0.1, longitude }) * 10;
  const longitudeCong = geolib.getDistance(center, { latitude, longitude: longitude + 0.1 }) * 10;

  const points: cosmos.Coordinates[] = [];
  const FULL = Math.PI * 2;
  for (let i = 0; i <= FULL + 0.0001; i += FULL / 8) {
    points.push({
      latitude: latitude + r1 * Math.cos(i) / latitudeConv,
      longitude: longitude + r2 * Math.sin(i) / longitudeCong,
    });
  }
  return points;
}
function expandBounds(bounds: cosmos.LatLngBoundsLiteral, meters: number) {
  const SQRT_2 = 1.4142135623730951;
  const { longitude: west, latitude: north } = geolib.computeDestinationPoint({
    latitude: bounds.north,
    longitude: bounds.west,
  }, SQRT_2 * meters, 315);
  const { longitude: east, latitude: south } = geolib.computeDestinationPoint({
    latitude: bounds.south,
    longitude: bounds.east,
  }, SQRT_2 * meters, 135);
  return { west, north, east, south };
}

namespace cosmos {
  export interface Coordinates {
    /**
     * Coordinates latitude.
     * @type {number}
     */
    latitude: number;
    /**
     * Coordinates longitude.
     * @type {number}
     */
    longitude: number;
  }
  export interface LatLngBoundsLiteral {
    /**
     * LatLngBoundsLiteral east.
     * @type {number}
     */
    east: number;
    /**
     * LatLngBoundsLiteral north.
     * @type {number}
     */
    north: number;
    /**
     * LatLngBoundsLiteral south.
     * @type {number}
     */
    south: number;
    /**
     * LatLngBoundsLiteral west.
     * @type {number}
     */
    west: number;
  }
}