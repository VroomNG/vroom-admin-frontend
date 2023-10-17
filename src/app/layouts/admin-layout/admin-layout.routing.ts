import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { NotifyScheduleComponent } from '../../pages/notify-schedule/notify-schedule.component'
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { ViewAdminComponent } from '../../pages/admin/view-admin/view-admin.component';
import { AddAdminComponent } from '../../pages/admin/add-admin/add-admin.component';
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
import { ViewPartnerComponent } from '../../pages/driver/partners/trips.component'
import { AddPartnerComponent } from '../../pages/driver/add-partner/add-driver.component';
import { ViewDriverComponent } from '../../pages/driver/view-driver/view-driver.component';
import { DriverCurrentStatusComponent } from '../../pages/driver/driver-current-status/driver-current-status.component';
import { DriverProfileComponent } from '../../pages/driver/driver-profile/driver-profile.component';
import { PromocodeComponent } from '../../pages/promocode/promocode.component';
import { AddpromocodeComponent } from '../../pages/promocode/addpromocode/addpromocode.component'
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
import { AddSettingsComponent } from '../../pages/settings/add-settings/add-settings.component';
import { EditSettingsComponent } from '../../pages/settings/edit-settings/edit-settings.component';
import {AddDiscountComponent} from '../../pages/discount/add-discount/add-discount.component';
import {EditDiscountComponent} from '../../pages/discount/edit-discount/edit-discount.component';
import { ViewScheduleComponent } from '../../pages/notify-schedule/view-schedules/view_schedule.component';
import { ViewCouponUseComponent } from '../../pages/discount/view-coupon-use/view-coupon-use.component';

import { TransactionDetailsDriverComponent } from '../../pages/settlements/driver-settlement/transaction-details-driver/transaction-details-driver.component';
import { TransactionDetailsRiderComponent } from '../../pages/settlements/rider-settlement/transaction-details-rider/transaction-details-rider.component';
import { DriverWalletDetailsComponent } from '../../pages/settlements/driver-settlement/driver-wallet-details/driver-wallet-details.component';
import { DriverBankTransactionComponent } from '../../pages/settlements/driver-settlement/driver-bank-transaction/driver-bank-transaction.component';
import { DriverBankTransactionDetailComponent } from '../../pages/settlements/driver-settlement/driver-bank-transaction-detail/driver-bank-transaction-detail.component';
import {SettlementListComponent} from '../../pages/settlements/driver-settlement/settlement-list/settlement-list.component';
import {SettlementListEditComponent} from '../../pages/settlements/driver-settlement/settlement-list-edit/settlement-list-edit.component';
import {WithdrawListviewComponent} from '../../pages/settlements/driver-settlement/withdraw-listview/withdraw-listview.component';
import {RefComponent} from '../../pages/referrals/trips.component';
import { PartnerSettlementComponent } from '../../pages/settlements/partner-settlement/partner-settlement.component';

// auth guard
import { AuthGuard } from '../../helpers/auth.guard';
import { ReportListComponent } from '../../pages/report-list/report-list.component';
import {ReportTripsComponent} from '../../pages/report-trips/report-trips.component';
import {ReportDriverComponent} from '../../pages/report-driver/report-driver.component';
import {ReportRidersComponent} from '../../pages/report-riders/report-riders.component';
import { RevenueReportComponent } from '../../pages/revenue-report/revenue-report.component';
import { ViewAcessTrailComponent } from '../../pages/admin/view-acess-trail/view-acess-trail.component';
import { EditSurgeSettingsComponent } from '../../pages/settings/edit-surge-settings/edit-surge-settings.component';
import { DriverFeedComponent } from '../../pages/driver/driver-feed/driver-feed.component';
import { ViewFeedComponent } from '../../pages/driver/view-feed/view-feed.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'user-profile', component: UserProfileComponent, },
    { path: 'tables', component: TablesComponent },
    // { path: 'icons', component: IconsComponent, canActivate: [AuthGuard] },
    { path: 'maps', component: MapsComponent },
    { path: 'report', component: ReportComponent },
    { path: 'reportlist', component: ReportListComponent },
    { path: 'reporttrips', component: ReportTripsComponent },
    { path: 'reportdriver', component: ReportDriverComponent },
    { path: 'reportrider', component: ReportRidersComponent },
    { path: 'reportrevenue', component: RevenueReportComponent },
    { path: 'refreport', component: RefComponent },
    { path: 'notify', component: NotifyScheduleComponent },

    { path: 'settings/view-settings', component: EditSettingsComponent },
    { path: 'settings/add-settings', component: AddSettingsComponent, },

    { path: 'admin/view-admin', component: ViewAdminComponent },
    { path: 'admin/add-admin', component: AddAdminComponent },

    { path: 'rider/view-riders', component: ViewRidersComponent },
    { path: 'rider/add-edit-riders', component: AddEditRidersComponent },
    { path: 'vehicle/view-vehicle', component: ViewVehicleComponent },
    { path: 'vehicle/add-vehicle', component: AddVehicleComponent },
    { path: 'distancefare/distancefare', component: DistancefareComponent },
    { path: 'distancefareview/distancefareview', component: DistancefareviewComponent },
    { path: 'reviews/rider-reviews', component: RiderReviewsComponent},
    { path: 'reviews/driver-reviews', component: DriverReviewsComponent, },
    { path: 'ratings/driver-ratings', component: DriverRatingsComponent },
    { path: 'ratings/rider-ratings', component: RiderRatingsComponent},
    { path: 'driver/add-driver', component: AddDriverComponent},
    { path: 'partner/add-partner', component: AddPartnerComponent},
    { path: 'partner/add-partner/:id', component: AddPartnerComponent},
    { path: 'partner/view-partner', component: ViewPartnerComponent},
    { path: 'driver/view-driver', component: ViewDriverComponent},
    { path: 'driver/driver-current-status', component: DriverCurrentStatusComponent },
    { path: 'driver/driver-profile', component: DriverProfileComponent},
    { path: 'promocode', component: PromocodeComponent},
    { path: 'promocode/addpromocode', component: AddpromocodeComponent},
    { path: 'promocode/detailpromocode', component: DetailpromocodeComponent},
    { path: 'trips', component: TripsComponent},
    { path: 'trips/trips-detail', component: TripsDetailComponent},
    { path: 'trips/retry-mtd', component: RetryMTDComponent},
    { path: 'trips/end-trip', component: EndTripComponent},
    { path: 'dispatch', component: DispatchComponent},
    { path: 'dispatch/dispatchview-list', component: DispatchviewListComponent},

    { path: 'settlements/driver-settlement', component: DriverSettlementComponent},
    { path: 'settlements/rider-settlement', component: RiderSettlementComponent},
    { path: 'payment', component: PaymentComponent},
    { path: 'payment/add-payment', component: AddPaymentComponent},

    { path: 'settlements/driver-settlement/transaction-details-driver', component: TransactionDetailsDriverComponent},
    { path: 'settlements/rider-settlement/transaction-details-rider', component: TransactionDetailsRiderComponent},
    { path: 'settlements/driver-settlement/driver-wallet-details/:id', component: DriverWalletDetailsComponent},
    { path: 'settlements/driver-settlement/driver-bank-transaction', component: DriverBankTransactionComponent},
    { path: 'settlements/driver-settlement/driver-bank-transaction-detail/:id', component: DriverBankTransactionDetailComponent},
    { path: 'settlements/driver-settlement/settlement-list', component: SettlementListComponent},
    { path: 'settlements/driver-settlement/settlement-list-edit', component: SettlementListEditComponent},
    { path: 'settlements/driver-settlement/settlement-list-edit/:id', component: SettlementListEditComponent},
    { path: 'settlements/driver-settlement/withdraw-listview/:id', component: WithdrawListviewComponent},
    

    { path: 'rider/add-edit-riders/:id', component: AddEditRidersComponent },
    { path: 'admin/add-admin/:id', component: AddAdminComponent},
    { path: 'driver/add-driver/:id', component: AddDriverComponent },
    { path: 'driver/view-driver/:id', component: ViewDriverComponent},
    { path: 'vehicle/add-vehicle/:id', component: AddVehicleComponent},
    { path: 'trips/trips-detail/:id', component: TripsDetailComponent},
    { path: 'settings/add-settings/:id', component: AddSettingsComponent},
    { path: 'discount/add-discount', component: AddDiscountComponent},
    { path: 'discount/add-discount/:id', component: AddDiscountComponent},
    { path: 'discount/edit-discount', component: EditDiscountComponent },
    


    { path: 'trips/:id', component: TripsComponent },
    { path: 'settlements/driver-settlement/transaction-details-driver/:id', component: TransactionDetailsDriverComponent },
    { path: 'settlements/rider-settlement/transaction-details-rider/:id', component: TransactionDetailsRiderComponent },
    { path: 'settlements/driver-settlement/driver-wallet-details/:id', component: DriverWalletDetailsComponent },
    { path: 'view-schedule', component: ViewScheduleComponent },
    { path: 'view-partner-withdraws', component:PartnerSettlementComponent  },
    { path: 'view-coupon-use', component:ViewCouponUseComponent  },
    { path: 'view-access-trail', component:ViewAcessTrailComponent ,},
    { path: 'settings/edit-surge-settings', component:EditSurgeSettingsComponent  },
    { path: 'driver/insertfeed', component:DriverFeedComponent  },
    { path: 'driver/viewfeed', component:ViewFeedComponent , canActivate: [AuthGuard] }



];
