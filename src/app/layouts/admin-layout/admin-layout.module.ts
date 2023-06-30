import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClipboardModule } from 'ngx-clipboard';
//import { NgScrollbarModule } from 'ngx-scrollbar'


import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { AddAdminComponent } from '../../pages/admin/add-admin/add-admin.component';
import { ViewAdminComponent } from '../../pages/admin/view-admin/view-admin.component';
import { ViewRidersComponent } from '../../pages/rider/view-riders/view-riders.component';
import { AddEditRidersComponent } from '../../pages/rider/add-edit-riders/add-edit-riders.component';
import { AddVehicleComponent } from '../../pages/vehicle/add-vehicle/add-vehicle.component';
import { ViewVehicleComponent } from '../../pages/vehicle/view-vehicle/view-vehicle.component';
import { DistancefareComponent } from '../../pages/distancefare/distancefare.component';
import { DistancefareviewComponent } from '../../pages/distancefareview/distancefareview.component';
import { RiderReviewsComponent } from '../../pages/reviews/rider-reviews/rider-reviews.component';
import { DriverReviewsComponent } from '../../pages/reviews/driver-reviews/driver-reviews.component';
import { DriverRatingsComponent } from '../../pages/ratings/driver-ratings/driver-ratings.component';
import { RiderRatingsComponent } from '../../pages/ratings/rider-ratings/rider-ratings.component';
import { AddDriverComponent } from '../../pages/driver/add-driver/add-driver.component';
import { AddPartnerComponent } from '../../pages/driver/add-partner/add-driver.component';
import { ViewPartnerComponent } from '../../pages/driver/partners/trips.component';
import { ViewScheduleComponent } from '../../pages/notify-schedule/view-schedules/view_schedule.component';
import { ViewDriverComponent } from '../../pages/driver/view-driver/view-driver.component';
import { DriverCurrentStatusComponent } from '../../pages/driver/driver-current-status/driver-current-status.component';
import { DriverProfileComponent } from '../../pages/driver/driver-profile/driver-profile.component';
import { PromocodeComponent } from '../../pages/promocode/promocode.component';
import { AddpromocodeComponent } from '../../pages/promocode/addpromocode/addpromocode.component';
import { DetailpromocodeComponent } from '../../pages/promocode/detailpromocode/detailpromocode.component';
import { TripsComponent } from '../../pages/trips/trips.component';
import { TripsDetailComponent } from '../../pages/trips/trips-detail/trips-detail.component';
import { RetryMTDComponent } from '../../pages/trips/retry-mtd/retry-mtd.component';
import { EndTripComponent } from '../../pages/trips/end-trip/end-trip.component';
import { DispatchComponent } from '../../pages/dispatch/dispatch.component';
import { DispatchviewListComponent } from '../../pages/dispatch/dispatchview-list/dispatchview-list.component';
import { DriverSettlementComponent } from '../../pages/settlements/driver-settlement/driver-settlement.component';
import { RiderSettlementComponent } from '../../pages/settlements/rider-settlement/rider-settlement.component';
import { PaymentComponent } from '../../pages/payment/payment.component';
import { AddPaymentComponent } from '../../pages/payment/add-payment/add-payment.component';
import { ReportComponent } from '../../pages/report/report.component';
import { NotifyScheduleComponent } from '../../pages/notify-schedule/notify-schedule.component';

import { AddSettingsComponent } from '../../pages/settings/add-settings/add-settings.component';
import { EditSettingsComponent } from '../../pages/settings/edit-settings/edit-settings.component';

import { AddDiscountComponent } from '../../pages/discount/add-discount/add-discount.component';
import { EditDiscountComponent } from '../../pages/discount/edit-discount/edit-discount.component';

import { TransactionDetailsDriverComponent } from '../../pages/settlements/driver-settlement/transaction-details-driver/transaction-details-driver.component';
import { TransactionDetailsRiderComponent } from '../../pages/settlements/rider-settlement/transaction-details-rider/transaction-details-rider.component';
import { DriverWalletDetailsComponent } from '../../pages/settlements/driver-settlement/driver-wallet-details/driver-wallet-details.component';
import { DriverBankTransactionComponent } from '../../pages/settlements/driver-settlement/driver-bank-transaction/driver-bank-transaction.component';
import { DriverBankTransactionDetailComponent } from '../../pages/settlements/driver-settlement/driver-bank-transaction-detail/driver-bank-transaction-detail.component';
import{SettlementListComponent} from '../../pages/settlements/driver-settlement/settlement-list/settlement-list.component';
import { SettlementListEditComponent } from '../../pages/settlements/driver-settlement/settlement-list-edit/settlement-list-edit.component';
import {WithdrawListviewComponent} from '../../pages/settlements/driver-settlement/withdraw-listview/withdraw-listview.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { JwPaginationComponent } from 'jw-angular-pagination';
import { ToastrModule } from 'ngx-toastr';
import { SearchPipe } from '../../pipe_filter/search.pipe';
import { TrustUrlPipe } from '../../pipe_filter/trusturl';

import { ReportListComponent } from '../../pages/report-list/report-list.component';
import {ReportTripsComponent} from '../../pages/report-trips/report-trips.component';
import {ReportDriverComponent} from '../../pages/report-driver/report-driver.component';
import {ReportRidersComponent} from '../../pages/report-riders/report-riders.component';
import { RevenueReportComponent } from '../../pages/revenue-report/revenue-report.component';
import {RefComponent} from '../../pages/referrals/trips.component';
import { PartnerSettlementComponent } from '../../pages/settlements/partner-settlement/partner-settlement.component';
import { ViewCouponUseComponent } from '../../pages/discount/view-coupon-use/view-coupon-use.component';
import { ViewAcessTrailComponent } from '../../pages/admin/view-acess-trail/view-acess-trail.component';
import { EditSurgeSettingsComponent } from '../../pages/settings/edit-surge-settings/edit-surge-settings.component';
import { DriverFeedComponent } from '../../pages/driver/driver-feed/driver-feed.component';
import { ViewFeedComponent } from '../../pages/driver/view-feed/view-feed.component';





// forgot password

import { AuthGuard } from '../../helpers/auth.guard';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    //NgScrollbarModule,
    //PerfectScrollbarModule,
    ReactiveFormsModule
    // ToastrModule.forRoot()
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TablesComponent,
    IconsComponent,
    MapsComponent,
    AddAdminComponent,
    ViewAdminComponent,
    ViewRidersComponent,
    AddEditRidersComponent,
    AddVehicleComponent,
    ViewVehicleComponent,
    DistancefareComponent,
    DistancefareviewComponent,
    RiderReviewsComponent,
    DriverReviewsComponent,
    DriverRatingsComponent,
    RiderRatingsComponent,
    AddDriverComponent,
    ViewDriverComponent,
    DriverCurrentStatusComponent,
    DriverProfileComponent,
    PromocodeComponent,
    AddpromocodeComponent,
    DetailpromocodeComponent,
    TripsComponent,
    TripsDetailComponent,
    RetryMTDComponent,
    EndTripComponent,
    DispatchComponent,
    DispatchviewListComponent,
    DriverSettlementComponent,
    RiderSettlementComponent,
    PaymentComponent,
    AddPaymentComponent,
    TransactionDetailsDriverComponent,
    TransactionDetailsRiderComponent,
    DriverWalletDetailsComponent,
    DriverBankTransactionComponent,
    DriverBankTransactionDetailComponent,
    JwPaginationComponent,
    SearchPipe,
    TrustUrlPipe,
    ReportComponent,
    AddSettingsComponent,
    EditSettingsComponent,
    AddDiscountComponent,
    EditDiscountComponent,
    ReportListComponent,
    ReportTripsComponent,
    ReportDriverComponent,
    ReportRidersComponent,
    RevenueReportComponent,
    SettlementListComponent,
    SettlementListEditComponent,
    WithdrawListviewComponent,
    RefComponent,
    AddPartnerComponent,
    ViewPartnerComponent,
    ViewScheduleComponent,
    PartnerSettlementComponent,
    ViewCouponUseComponent,
    EditSurgeSettingsComponent,
    ViewAcessTrailComponent,
    DriverFeedComponent,
    ViewFeedComponent
    //NotifyScheduleComponent
  ],

  providers: [
    AuthGuard,
    
  ]

})

export class AdminLayoutModule { }
