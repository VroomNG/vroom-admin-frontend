import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { NgScrollbarModule } from 'ngx-scrollbar'

import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ClipboardModule } from '@angular/cdk/clipboard'

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { Configuration } from '../configuration';
import { JwPaginationComponent } from 'jw-angular-pagination';
import { LoginComponent } from './pages/login/login.component';
import { ToastrModule } from 'ngx-toastr';
// import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
// import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
// import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';


// SERVICE
import { LoginService } from './service/login.service';
import { driverService } from './service/driver.service';
import { adminService } from './service/admin.service';
import { passengerService } from './service/passenger.service';
import { vehicleService } from './service/vehicle.service';
import { exportService } from './service/export.service';
import { chartService } from './service/chart.service';
import { MapService } from './service/map.service';

import { ForgotPasswordService } from './service/forgotPassword.service';
import { SortDirective } from './directive/sort.directive';
import {ApiService}from './service/api.service';
import { DateFilterPipe } from './pipe_filter/date-filter.pipe';
import {TrustUrlPipe} from './pipe_filter/trusturl';
import { NotifyScheduleComponent } from './pages/notify-schedule/notify-schedule.component';
//import { PartnerWithdrawalsComponent } from './pages/settlements/partner-settlement/partner-withdrawals/partner-withdrawals.component';
import { PartnerSettlementComponent } from './pages/settlements/partner-settlement/partner-settlement.component';
import { ViewCouponUseComponent } from './pages/discount/view-coupon-use/view-coupon-use.component';
import { ViewAcessTrailComponent } from './pages/admin/view-acess-trail/view-acess-trail.component';
import { EditSurgeSettingsComponent } from './pages/settings/edit-surge-settings/edit-surge-settings.component';
import { DriverFeedComponent } from './pages/driver/driver-feed/driver-feed.component';
import { ViewFeedComponent } from './pages/driver/view-feed/view-feed.component';
import { AddVehicleComponent } from './pages/vehicle/add-vehicle/add-vehicle.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { ReportListComponent } from './pages/report-list/report-list.component';

//import { SettlementListComponent } from './pages/settlements/driver-settlement/settlement-list/settlement-list.component';

// import { RevenueReportComponent } from './pages/revenue-report/revenue-report.component';
// import { ReportRidersComponent } from './pages/report-riders/report-riders.component';
// import { ReportDriverComponent } from './pages/report-driver/report-driver.component';
// import { ReportTripsComponent } from './pages/report-trips/report-trips.component';
// import { ReportListComponent } from './pages/report-list/report-list.component';
// import { AddDiscountComponent } from './pages/discount/add-discount/add-discount.component';
// import { EditDiscountComponent } from './pages/discount/edit-discount/edit-discount.component';
// import { SearchPipe } from './pipe_filter/search.pipe';

// google maps
// import { AgmCoreModule } from '@agm/core';
// import { AuthInterceptor } from './helpers/auth.interceptor';

// const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
//   suppressScrollX: true
// };


@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserModule,
    ClipboardModule,
    CommonModule,
    // AddVehicleComponent,
    // UserProfileComponent,
    //NgScrollbarModule,
    //PerfectScrollbarModule,
    // SearchPipe.forRoot(),
    ToastrModule.forRoot()
    // RouterModule.forRoot(appRoutes),
    // AgmCoreModule.forRoot({
    //   apiKey: 'AIzaSyAFgM81Qz-SwfTzUsr4F51AgDj0HdN88CQ'
    // })

  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    SortDirective,
    NotifyScheduleComponent,
    //ViewFeedComponent
    //DriverFeedComponent,
    //EditSurgeSettingsComponent,
    //TrustUrlPipe
    //ViewAcessTrailComponent,
    //PartnerWithdrawalsComponent,
    //PartnerSettlementComponent,    
   
  //  SettlementListComponent,
    
    // RevenueReportComponent,
    // ReportRidersComponent,
    // ReportDriverComponent,
    // ReportTripsComponent,
    ReportListComponent,
    // AddDiscountComponent,
    // EditDiscountComponent,
    // SearchPipe,

  ],
  providers: [
    LoginService,
    Configuration,
    driverService,
    adminService,
    passengerService,
    vehicleService,
    exportService,
    chartService,
    ApiService,
    MapService,DateFilterPipe],
  bootstrap: [AppComponent]
})
export class AppModule {
  static forRoot() {
    return {
      ngModule: AppModule,
      providers: [],
    };
  }

}