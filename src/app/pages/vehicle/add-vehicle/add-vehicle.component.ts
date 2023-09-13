import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { vehicleInfo } from '../../../model/vehicleInfo';
import { vehicleService } from '../../../service/vehicle.service';
import { Location } from '@angular/common';
import { LoginService } from '../../../service/login.service';


@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.css']
})
export class AddVehicleComponent implements OnInit {
  
  vehicleForm: any;
  vehicleDetails!: vehicleInfo;
  submitted = false;
  token: any;
  isFormReady = false;
  vehicleModelChange:any;
  flatRateSwitch:any = 0;
  tripType = [
    { value: "Daily", id: "1", name: "Daily" },
    { value: "Weekly", id: "2", name: "Weekly" },
    { value: "Monthly", id: "3", name: "Monthly" },
    { value: "yearly", id: "4", name: "yearly" }

  ];

  vechicleActive = [
    {value: "1", id: "1", name: "Yes"},
    {value: "0", id: "2", name: "No"},
  ]
  vehicleCategory=[{value: "SUV", name: "SUV"},{value: "Sedan", name: "Sedan"},{value: "Coupe", name: "Coupe"},{value: "Convertible", name: "Convertible"},
  {value: "Hatchback", name: "Hatchback"},{value: "Van", name: "Van"},{value: "Minivan", name: "Minivan"},{value: "Wagon", name: "Wagon"}]
  vehicleMake=[
    {value: "Ford", name: "Ford"},
    {value: "Honda", name: "Honda"},
    {value: "Hyundai", name: "Hyundai"},
    {value: "Toyota", name: "Toyota"},
    {value: "Susuki", name: "Susuki"},
    {value:"Jaguar",name:"Jaguar"},
    {value:"KIA",name :"KIA"},
    {value: "Mahindra", name:"Mahindra"},
    {value: "Nissan", name:"Nissan"},
    {value: "Ferrari", name:"Ferrari"},
    {value: "Audi", name:"Audi"},
    {value: "BMW", name:"BMW"},
    {value: "Holden", name:"Holden"},
    {value: "Bentley", name:"Bentley"},
    {value: "Bugatti", name:"Bugatti"},
    {value: "Mercedes-Benz", name:"Mercedes-Benz"},
    {value: "Rolls Royce", name:"Rolls Royce"},
    {value: "Fiat", name:"Fiat"},
    {value: "Alfa Romeo", name:"Alfa Romeo"},
    {value: "Acura", name:"Acura"}, 
    {value: "Dacia", name:"Dacia"}, 
    {value: "Renault", name:"Renault"},
    {value: "Volvo", name:"Volvo"},
    {value: "Mini", name:"Mini"},
    {value: "Buick", name:"Buick"},
    
  ]
  //vehicleMake=[{value: "Ford", name: "Ford"},{value: "Honda", name: "Honda"},{value: "Hyundai", name: "Hyundai"},{value: "Toyota", name: "Toyota"},{value: "Susuki", name: "Susuki"},{value: "JAGUAR", name: "JAGUAR"}]
  
//   vehicleModel=[{id:"Yaris Hatchback",value: "Yaris Hatchback", name: "Toyota"},{value:"Tundra Regular Cab",id: "Tundra Regular Cab", name: "Toyota"},
//   {value:"Aerostar Cargo",id: "Aerostar Cargo", name: "Ford"},{value:"Bronco",id: "Bronco", name: "Ford"},
//   {value:"Accord",id: "Accord", name: "Honda"},{value:"Civic",id: "Civic", name: "Honda"},
//   {value:"Veracruz",id: "Veracruz", name: "Hyundai"},{value:"XG350",id: "XG350", name: "Hyundai"},
// {value:"Samurai",id: "Samurai", name: "Susuki"},{value:"X-90",id: "X-90", name: "Susuki"},{value:"JAGUAR XF",id:"JAGUAR XF", name:"JAGUAR"}]
vehicleModel=[
  {id:"Yaris Hatchback",value: "Yaris Hatchback", name: "Toyota"},{value:"Tundra Regular Cab",id: "Tundra Regular Cab", name: "Toyota"},
  {value:"Aerostar Cargo",id: "Aerostar Cargo", name: "Ford"},{value:"Bronco",id: "Bronco", name: "Ford"},
  {value:"Accord",id: "Accord", name: "Honda"},{value:"Civic",id: "Civic", name: "Honda"},
  {value:"Veracruz",id: "Veracruz", name: "Hyundai"},{value:"XG350",id: "XG350", name: "Hyundai"},
  {value:"Samurai",id: "Samurai", name: "Susuki"},{value:"X-90",id: "X-90", name: "Susuki"},
  {value:"JAGUAR XF",id:"JAGUAR XF", name:"Jaguar"},{value:"JAGUAR E-PACE",id:"JAGUAR E-PACE", name:"Jaguar"},{value:"JAGUAR F‑TYPE",id:"JAGUAR F‑TYPE", name:"Jaguar"},{value:"JAGUAR F‑TYPE",id:"JAGUAR F‑TYPE", name:"Jaguar"},
  {value:"Kia K900",id:"Kia K900", name:"KIA"},{value:"Stinger",id:"Stinger", name:"KIA"},{value:"Forte",id:"Forte", name:"KIA"},{value:"Rio",id:"Rio", name:"KIA"},
  {value:"Thar",id:"Thar", name:"Mahindra"},{value:"Quanto",id:"Quanto", name:"Mahindra"},  {value:"Verito Vibe",id:"Verito Vibe", name:"Mahindra"},  {value:"Scorpio",id:"Scorpio", name:"Mahindra"},
  {value:"Magnite",id:"Magnite", name:"Nissan"},{value:"Kicks",id:"Kicks", name:"Nissan"},  {value:"GT-R",id:"GT-R", name:"Nissan"},
  {value:"Roma",id:"Roma", name:"Ferrari"},{value:"Portofino",id:"Portofino", name:"Ferrari"},{value:"F8 Tributo",id:"F8 Tributo", name:"Ferrari"},{value:"Ferrari 812",id:"Ferrari 812", name:"Ferrari"},
  {value:"S5 Sportback",id:"S5 Sportback", name:"Audi"}, {value:"Q8",id:"Q8", name:"Audi"},{value:"RS7",id:"RS7", name:"Audi"},{value:"e-tron",id:"e-tron", name:"Audi"},
  {value:"X7",id:"X7", name:"BMW"},{value:"X6 M50d",id:"X6 M50d", name:"BMW"},{value:"Z4",id:"Z4", name:"BMW"},{value:"M5",id:"M5", name:"BMW"},
  {value:"VY Adventra",id:"VY Adventra", name:"Holden"},{value:"JK Apollo",id:"JK Apollo", name:"Holden"},{value:"LB Astra",id:"LB Astra", name:"Holden"},{value:"MB Barina",id:"MB Barina", name:"Holden"},
  {value:"Bentley Flying Spur",id:"Bentley Flying Spur", name:"Bentley"},{value:"Bentley Bentayga",id:"Bentley Bentayga", name:"Bentley"},{value:"Bentley Continental",id:"Bentley Continental", name:"Bentley"},
  {value:"Bugatti Divo",id:"Bugatti Divo", name:"Bugatti"},{value:"Bugatti Veyron",id:"Bugatti Veyron", name:"Bugatti"},{value:"Bugatti EB 118",id:"Bugatti EB 118", name:"Bugatti"},{value:"Bugatti Vision Gran Turismo.",id:"Bugatti Vision Gran Turismo.", name:"Bugatti"},
  {value:"S-Class",id:"S-Class", name:"Mercedes-Benz"},{value:"GLA",id:"GLA", name:"Mercedes-Benz"},{value:"E-Class",id:"E-Class", name:"Mercedes-Benz"},{value:"AMG GT",id:"AMG GT", name:"Mercedes-Benz"},
  {value:"Phantom",id:"Phantom", name:"Rolls Royce"},{value:"Ghost",id:"Ghost", name:"Rolls Royce"},{value:"Cullinan",id:"Cullinan", name:"Rolls Royce"},{value:"Dawn",id:"Dawn", name:"Rolls Royce"},
  {value:"Punto Pure",id:"Punto Pure", name:"Fiat"},{value:"Punto Evo",id:"Punto Evo", name:"Fiat"},{value:"Linea Classic",id:"Linea Classic", name:"Fiat"},{value:"Avventura",id:"Avventura", name:"Fiat"},
  {value:"24HP",id:"24HP", name:"Alfa Romeo"},{value:"8C 2900B Lungo Spyder",id:"8C 2900B Lungo Spyder", name:"Alfa Romeo"},{value:"Tipo B P3",id:"Tipo B P3", name:"Alfa Romeo"},{value:"Giulietta Sprint Veloce",id:"Giulietta Sprint Veloce", name:"Alfa Romeo"},
  {value:"RLX",id:"RLX", name:"Acura"}, {value:"ILX",id:"ILX", name:"Acura"}, {value:"MDX",id:"MDX", name:"Acura"},{value:"TSX",id:"TSX", name:"Acura"},
  {value:"Logan",id:"Logan", name:"Dacia"},{value:"Dokker Van",id:"Dokker Van", name:"Dacia"},{value:"Sandero Stepway",id:"Sandero Stepway", name:"Dacia"},{value:"Dokker Stepway",id:"Dokker Stepway", name:"Dacia"},
  {value:"KWID",id:"KWID", name:"Renault"},{value:"Pulse",id:"Pulse", name:"Renault"}, {value:"Lodgy",id:"Lodgy", name:"Renault"},{value:"Scala",id:"Scala", name:"Renault"},
  {value:"XC90",id:"XC90", name:"Volvo"},{value:"XC40 Recharge",id:"XC40 Recharge", name:"Volvo"},{value:"S90",id:"S90", name:"Volvo"},{value:"V60 Cross Country",id:"V60 Cross Country", name:"Volvo"},
  {value:"Cooper Countryman",id:"Cooper Countryman", name:"Mini"},{value:"Cooper Convertible",id:"Cooper Convertible", name:"Mini"},{value:"Cooper 3 DOOR",id:"Cooper 3 DOOR", name:"Mini"},{value:"John cooper Works",id:"John cooper Works", name:"Mini"},
  {value:"Invicta",id:"Invicta", name:"Buick"},{value:"Enclave",id:"Enclave", name:"Buick"},{value:"Cascada",id:"Cascada", name:"Buick"},{value:"LaCrosse",id:"LaCrosse", name:"Buick"},
]

vehicleYear=[{value: "1990", name: "1990"},{value: "1991", name: "1991"},{value: "1992", name: "1992"},{value: "1993", name: "1993"},{value: "1994", name: "1994"},{value: "1995", name: "1995"},{value: "1996", name: "1996"},{value: "1997", name: "1997"},{value: "1998", name: "1998"},{value: "1999", name: "1999"},{value: "2000", name: "2000"},
{value: "2001", name: "2001"},{value: "2002", name: "2002"},{value: "2003", name: "2003"},{value: "2004", name: "2004"},{value: "2005", name: "2005"},{value: "2006", name: "2006"},{value: "2007", name: "2007"},{value: "2008", name: "2008"},{value: "2009", name: "2009"},{value: "2010", name: "2010"},
{value: "2011", name: "2011"},{value: "2012", name: "2012"},{value: "2013", name: "2013"},{value: "2014", name: "2014"},{value: "2015", name: "2015"},{value: "2016", name: "2016"},{value: "2017", name: "2017"},{value: "2018", name: "2018"},{value: "2019", name: "2019"},{value: "2020", name: "2020"},{value: "2021", name: "2021"}]



  constructor(
    private formBuilder: FormBuilder,
    private service: vehicleService,
    private route: Router,
    private router: ActivatedRoute,
    private loginService: LoginService,
    private location: Location
  ) {
    this.route.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    if (localStorage['token'] != "" || localStorage['token'] != undefined) {
      this.token = localStorage['token'];
      //this.flag_admin = localStorage.flag_admin;

    }
    else
      this.route.navigate(['/login']);
    debugger;
    this.router.params.subscribe((response: any) => {
      this.vehicleDetails = new vehicleInfo();
      this.vehicleDetails.id = response.id == undefined ? 0 : Number(response.id);
      console.log("ID for vechicle ==> ",this.vehicleDetails.id);
      if(this.vehicleDetails.id == 0){
        this.vehicleDetails.isactive = "";
        this.vehicleDetails.trip_type = "";
        this.vehicleDetails.type="";
        this.vehicleDetails.make="";
        this.vehicleDetails.model="";
        this.vehicleDetails.year = "";
      }
    });
    // console.log("ID for Admin ==> ", this.vehicleDetails.id);
    this.vehicleModelChange = this.vehicleModel;
  }

  ngOnInit() {
   
    this.createForm();
    if (this.vehicleDetails.id != 0) {
      this.getRidersDetails();
    }
    this.loginService.addInteraction(sessionStorage.getItem('email'),"Viewed Add Vehicle ").subscribe((result:any) => {});
  }
  get f() { return this.vehicleForm.controls; }
  createForm() {
    this.isFormReady = true;
    this.vehicleForm = this.formBuilder.group({
      type: [this.vehicleDetails.type, [Validators.required]],
      trip_type: [this.vehicleDetails.trip_type, [Validators.required]],
      per_km_rate: [this.vehicleDetails.per_km_rate, [Validators.required]],
      minimum_fare: [this.vehicleDetails.minimum_fare, [Validators.required]],
      commission: [this.vehicleDetails.commission, [Validators.required]],
      available_seat: [this.vehicleDetails.available_seat, [Validators.required]],
      cancel_charge_driver: [this.vehicleDetails.cancel_charge_driver, [Validators.required]],
      cancel_charge_rider: [this.vehicleDetails.cancel_charge_rider, [Validators.required]],
      isactive: [this.vehicleDetails.isactive, [Validators.required]],
      description: [this.vehicleDetails.description],
      per_minute_rate: [this.vehicleDetails.per_minute_rate, [Validators.required]],
      base_fare: [this.vehicleDetails.base_fare, [Validators.required]],
      tolls_fees: [this.vehicleDetails.tolls_fees, [Validators.required]],
      peek_hour_fare: [this.vehicleDetails.peek_hour_fare],
      make: [this.vehicleDetails.make],
      model: [this.vehicleDetails.model],
      year: [this.vehicleDetails.year],
      tax_percent:[this.vehicleDetails.tax_percent],
      per_km_rate_share:[this.vehicleDetails.per_km_rate_share,[Validators.required]],
      per_minute_rate_share:[this.vehicleDetails.per_minute_rate_share,[Validators.required]],
      minimum_fare_share:[this.vehicleDetails.minimum_fare_share,[Validators.required]],
      base_fare_share:[this.vehicleDetails.base_fare_share,[Validators.required]],
      flatRate:[this.vehicleDetails.promo_amount],
      toggleFlatRate:[this.vehicleDetails.promo_status]
    });
  }
  getRidersDetails() {
    debugger;

    this.service.getSingleVehicle(this.vehicleDetails.id).subscribe((response: any) => {
      if (response) {
        // let informedPerson: any
        console.log('single vechicle',response)
        if (this.vehicleDetails.id > 0) {
          this.vehicleDetails.type = response.data.vehicle_type;
          this.vehicleDetails.trip_type = response.data.trip_type;
          this.vehicleDetails.per_km_rate = response.data.per_km_rate;
          this.vehicleDetails.minimum_fare = response.data.minimum_fare;
          this.vehicleDetails.commission = response.data.commission;
          this.vehicleDetails.available_seat = response.data.available_seat;
          this.vehicleDetails.base_fare = response.data.base_fare,
          this.vehicleDetails.tolls_fees = response.data.tolls_fees,
          this.vehicleDetails.peek_hour_fare = response.data.peek_hour_fare,
          this.vehicleDetails.cancel_charge_driver = response.data.cancel_charge_driver;
          this.vehicleDetails.cancel_charge_rider = response.data.cancel_charge_rider;
          this.vehicleDetails.isactive = response.data.isactive;
          this.vehicleDetails.description = response.data.description;
          this.vehicleDetails.per_minute_rate = response.data.per_minute_rate;
          this.vehicleDetails.make = response.data.make;
          this.vehicleDetails.model = response.data.model;
          this.vehicleDetails.year = response.data.year;
          this.vehicleDetails.tax_percent = response.data.tax_percent;
          this.vehicleDetails.per_km_rate_share = response.data.per_km_rate_share;
          this.vehicleDetails.per_minute_rate_share = response.data.per_minute_rate_share;
          this.vehicleDetails.minimum_fare_share = response.data.minimum_fare_share;
          this.vehicleDetails.base_fare_share = response.data.base_fare_share;
          this.vehicleDetails.promo_amount = response.data.max_fare_value;
          this.vehicleDetails.promo_status = response.data.promo_status;
          this.vehicleModelChange = this.vehicleModel.filter(item => item.name === response.data.make);
          
        }
        this.createForm();
      }
    }, error => {
      // console.log('Document get exception: ' + error.message);
    });
  }
  updateVehicle(id: any) {
    debugger;
    var selTripType = (<HTMLInputElement>document.getElementById("selTripType"));
    var vehicleAvai = (<HTMLInputElement>document.getElementById("vehicleAvai"));
    this.isFormReady = true;
    this.submitted = true;
    const inputRequest = {
      vehicle_type: this.vehicleForm.value.type,
      trip_type: selTripType.value,
      per_km_rate: this.vehicleForm.value.per_km_rate,
      minimum_fare: this.vehicleForm.value.minimum_fare,
      commission: this.vehicleForm.value.commission,
      available_seat: this.vehicleForm.value.available_seat,
      cancel_charge_driver: this.vehicleForm.value.cancel_charge_driver,
      cancel_charge_rider: this.vehicleForm.value.cancel_charge_rider,
      isactive: vehicleAvai.value,
      description: this.vehicleForm.value.description,
      
      per_minute_rate: this.vehicleForm.value.per_minute_rate,
      base_fare: this.vehicleForm.value.base_fare,
      tolls_fees: this.vehicleForm.value.tolls_fees,
      peek_hour_fare: this.vehicleForm.value.peek_hour_fare,

      make:this.vehicleForm.value.make,
      model:this.vehicleForm.value.model,
      year:this.vehicleForm.value.year,
      tax_percent:this.vehicleForm.value.tax_percent,
      per_km_rate_share:this.vehicleForm.value.per_km_rate_share,
      per_minute_rate_share:this.vehicleForm.value.per_minute_rate_share,
      minimum_fare_share:this.vehicleForm.value.minimum_fare_share,
      base_fare_share:this.vehicleForm.value.base_fare_share,
      promo_status:this.vehicleForm.value.toggleFlatRate,
      max_fare_value:this.vehicleForm.value.flatRate
    };

    if (this.vehicleForm.status == "INVALID") {
      // console.log("Please check the right validation in Updated Vehicle")
    }
    
    else{
      this.service.updateVehicle(inputRequest, id).subscribe((result: any) => {
        if (result.data) {
          this.route.navigate(['vehicle/view-vehicle']);
        }
      });
    }

  }
  addVehicle() {
    debugger;
    this.submitted = true;
    var selTripType = (<HTMLInputElement>document.getElementById("selTripType"));
    var vehicleAvai = (<HTMLInputElement>document.getElementById("vehicleAvai"));
    this.isFormReady = true;
    const inputRequest = {
      vehicle_type: this.vehicleForm.value.type,
      trip_type: selTripType.value,
      per_km_rate: this.vehicleForm.value.per_km_rate,
      minimum_fare: this.vehicleForm.value.minimum_fare,
      commission: this.vehicleForm.value.commission,
      available_seat: this.vehicleForm.value.available_seat,
      cancel_charge_driver: this.vehicleForm.value.cancel_charge_driver,
      cancel_charge_rider: this.vehicleForm.value.cancel_charge_rider,
      isactive: vehicleAvai.value,
      description: this.vehicleForm.value.description,

      per_minute_rate: this.vehicleForm.value.per_minute_rate,
      base_fare: this.vehicleForm.value.base_fare,
      tolls_fees: this.vehicleForm.value.tolls_fees,
      peek_hour_fare: this.vehicleForm.value.peek_hour_fare,
      make: this.vehicleForm.value.make,
      model: this.vehicleForm.value.model,
      year:this.vehicleForm.value.year,
      tax_percent: this.vehicleForm.value.tax_percent,
      per_km_rate_share:this.vehicleForm.value.per_km_rate_share,
      per_minute_rate_share: this.vehicleForm.value.per_minute_rate_share,
      minimum_fare_share:this.vehicleForm.value.minimum_fare_share,
      base_fare_share:this.vehicleForm.value.base_fare_share
    };

    if (this.vehicleForm.status == "INVALID") {
      // console.log("Please check the right validation in Add Vehicle")
    }
    else{
      this.service.addVehicle(inputRequest).subscribe((result: any) => {
        if (result.data) {
          this.route.navigate(['vehicle/view-vehicle']);
        }
      });
    }

  }
  deleteVehicle(id: any) {
    this.service.deleteVehicle(id).subscribe((result: any) => {
      if (result) {
        this.route.navigate(['admin/view-admin']);
      }
    });
  }

  cancel(): void {
    window.scrollTo(0, 0);
  }

  changetoAddMenu(){
    this.location.back();
  }
  selectedModel(event: { target: any; }){
debugger;
var target = event.target;
this.vehicleModelChange = this.vehicleModel.filter(item => item.name === target.value);
// this.vehicleModel.filter(item=>this.vehicleModel.name = target.value).map(item)
  }
  selectedSwitchState(event: { target: any; })
  {
    var target = event.target;
    this.flatRateSwitch = target.value;
  }


}
