<nav class="navbar bg-red-400" id="sidenav-main">
   <div class="container-fluid">
      <!-- Toggler -->
      <!-- <button class="navbar-toggler" type="button" 
      (click)="isCollapsed=!isCollapsed"
         aria-controls="sidenav-collapse-main">
         <span class="navbar-toggler-icon"></span>
      </button> -->
      <button class="navbar-toggler" type="button" 
         aria-controls="sidenav-collapse-main">
         <span class="navbar-toggler-icon"></span>
      </button>
      <!-- Brand -->
      <!-- <a class="navbar-brand pt-0" routerLinkActive="active" [routerLink]="['/dashboard']"> -->
      <a class="navbar-brand pt-0 w-[300px]">
         <img src="./assets/img/brand/Logo.png" class="navbar-brand-img" alt="...">
      </a>
      <!-- User -->
      <ul class="nav align-items-center d-md-none" *ngIf="nabarData">
         <!-- <li class="nav-item" ngbDropdown placement="bottom-right">
        <a class="nav-link nav-link-icon" role="button" ngbDropdownToggle>
          <i class="ni ni-bell-55"></i>
        </a>
        <div class="dropdown-menu-arrow dropdown-menu-right" ngbDropdownMenu>
          <a class="dropdown-item" href="javascript:void(0)">Action</a>
          <a class="dropdown-item" href="javascript:void(0)">Another action</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="javascript:void(0)">Something else here</a>
        </div>
      </li> -->
         <li class="nav-item" ngbDropdown placement="bottom-right">
            <a class="nav-link" role="button" ngbDropdownToggle>
               <div class="media align-items-center">
                  <span class="avatar avatar-sm ">
                     <!-- <img class="img-fluid circle_img" alt="Image placeholder" src="{{siteURL}}/{{filepath}}"> -->
                     <img src=""/>
                  </span>
                  <!-- <span class="ml-1">{{this.prifileDetails.firstname}}</span> -->
                  <!-- <span class="ml-1">{{this.prifileDetails.lastname}}</span> -->
               </div>
            </a>
            <div class="dropdown-menu-arrow dropdown-menu-right" ngbDropdownMenu>
               <div class=" dropdown-header noti-title">
                  <h6 class="text-overflow m-0">Welcome!</h6>
               </div>
               <!-- <a routerLinkActive="active" [routerLink]="['/user-profile']" class="dropdown-item"> -->
               <a>
                  <i class="ni ni-single-02"></i>
                  <span>My profile</span>
               </a>
               <!-- <a routerLinkActive="active" [routerLink]="['/user-profile']" class="dropdown-item">
            <i class="ni ni-settings-gear-65"></i>
            <span>Settings</span>
          </a>
          <a routerLinkActive="active" [routerLink]="['/user-profile']" class="dropdown-item">
            <i class="ni ni-calendar-grid-58"></i>
            <span>Activity</span>
          </a> -->
               <a routerLinkActive="active">
                <!-- [routerLink]="['/forgot-password']" class="dropdown-item" -->
                  <i class="ni ni-lock-circle-open"></i>
                  <span>Forgot Password</span>
                  </a>
               <div class="dropdown-divider"></div>
               <a 
               class="dropdown-item">
               <!-- [routerLink]="['/login']"  -->
                  <i class="ni ni-user-run"></i>
                  <span>Logout</span>
               </a>
            </div>
         </li>
      </ul>
      <!-- Collapse -->
      <div class="collapse navbar-collapse" 
      
      id="sidenav-collapse-main"
      >
      <!-- [ngbCollapse]="isCollapsed"  -->
         <!-- Collapse header -->
         <div class="navbar-collapse-header d-md-none">
            <div class="row">
               <div class="col-6 collapse-brand">
                  <a routerLinkActive="active" [routerLink]="['/dashboard']">
                     <img src="./assets/img/brand/Logo.png">
                  </a>
               </div>
               <div class="col-6 collapse-close">
                  <button type="button" class="navbar-toggler" (click)="isCollapsed=!isCollapsed">
                     <span></span>
                     <span></span>
                  </button>
               </div>
            </div>
         </div>
         <!-- Form -->
         <form class="mt-4 mb-3 d-md-none">
        <div class="input-group input-group-rounded input-group-merge">
          <input type="search" class="form-control form-control-rounded form-control-prepended" placeholder="Search" aria-label="Search">
          <div class="input-group-prepend">
            <div class="input-group-text">
              <span class="fa fa-search"></span>
            </div>
          </div>
        </div>
      </form>
         <!-- Navigation  *ngIf="menuItem.children.length>0" -->
         <!-- <ul class="navbar-nav">
          <li *ngFor="let menuItem of menuItems" class="{{menuItem.class}} nav-item" >
              <a routerLinkActive="active" [routerLink]="[menuItem.path]" class="nav-link">
             
                  <i class="ni {{menuItem.icon}}"></i>
                  {{menuItem.title}}
              </a>

              <ng-container *ngIf="menuItem.children && menuItem.children.length > 0">
              
                <ul class="nav">
                   <li routerLinkActive="active" *ngFor="let childmenu of menuItem.children" class="{{menuItem.class}} nav-item">
                     <a class="nav-link" [routerLink]="[childmenu.path]">
                       <i class="ni {{childmenu.icon}}"></i>
                       <p>{{childmenu.title}}</p>
                      </a>
                   </li>
                </ul>
            
            </ng-container>
          
     
          </li>
      </ul> -->

         <ul class="navbar-nav sidemenustart">
            <li class="nav-item">
               <a class=" nav-link" routerLinkActive="active" routerLink="/dashboard"><i class="ni ni-shop"></i>
                  Dashboard </a>
            </li>
            <li class="nav-item nav-with-child" ngbDropdown *ngIf="user_type == 4">
               <a class=" nav-link" routerLinkActive="active" ngbDropdownToggle><i
                     class="ni ni-single-02 text-primary"></i> Admin </a>
               <ul class="nav-item-child" ngbDropdownMenu>
                  <li class="nav-item nav-with-child " routerLinkActive="active" >
                     <a class=" nav-link dropdown-item" routerLink="/admin/add-admin">
                        <i class="fa fa-user-plus ni"></i>
                        <p>Add Admin</p>
                     </a>
                  </li>
                  <li class="nav-item nav-with-child" routerLinkActive="active">
                     <a class=" nav-link dropdown-item" routerLink="/admin/view-admin">
                        <i class="fa fa-eye ni"></i>
                        <p>View Admin</p>
                     </a>
                  </li>
                  <li class="nav-item nav-with-child" routerLinkActive="active">
                     <a class=" nav-link dropdown-item" routerLink="/view-access-trail">
                        <i class="fa fa-eye ni"></i>
                        <p>View Access Trail</p>
                     </a>
                  </li>

               </ul>
            </li>
            <li class="nav-item nav-with-child" ngbDropdown *ngIf = "user_type != 5">
               <a class=" nav-link" routerLinkActive="active" ngbDropdownToggle><i
                     class="fa fa-car-alt ni text-primary"></i> Vehicle Type </a>
               <ul class="nav-item-child" ngbDropdownMenu>
                  <li class="nav-item nav-with-child" routerLinkActive="active">
                     <a class=" nav-link dropdown-item" routerLink="/vehicle/add-vehicle">
                        <i class="fa fa-car-side ni text-primary"></i>
                        <p>Add Vehicle type</p>
                     </a>
                  </li>
                  <li class="nav-item nav-with-child" routerLinkActive="active">
                     <a class=" nav-link dropdown-item" routerLink="/vehicle/view-vehicle">
                        <i class="fa fa-eye ni text-primary"></i>
                        <p>View Vehicle Type</p>
                     </a>
                  </li>

               </ul>

            </li>
            <li class="nav-item nav-with-child" ngbDropdown *ngIf = "user_type != 5">
               <a class=" nav-link" routerLinkActive="active" ngbDropdownToggle><i
                     class="ni ni-support-16 text-primary"></i> Partners</a>
               <ul class="nav-item-child" ngbDropdownMenu>
                  
                  <li class="nav-item nav-with-child" routerLinkActive="active">
                     <a class=" nav-link dropdown-item" routerLink="/partner/add-partner">
                        <i class="fa-plus fas ni text-primary"></i>
                        <p>Add Partner</p>
                     </a>
                  </li>
                   <li class="nav-item nav-with-child" routerLinkActive="active">
                     <a class=" nav-link dropdown-item" routerLink="/partner/view-partner">
                        <i class="fa fa-eye ni text-primary"></i>
                        <p>View Partners</p>
                     </a>
                  </li>
               </ul>
            </li>
            <li class="nav-item nav-with-child" ngbDropdown>
               <a class=" nav-link" routerLinkActive="active" ngbDropdownToggle><i
                     class="ni ni-support-16 text-primary"></i> Driver </a>
               <ul class="nav-item-child" ngbDropdownMenu>
                  
                  <li class="nav-item nav-with-child" routerLinkActive="active" *ngIf = "user_type != 5">
                     <a class=" nav-link dropdown-item" routerLink="/driver/add-driver">
                        <i class="fa-plus fas ni text-primary"></i>
                        <p>Add Driver</p>
                     </a>
                  </li>

                  <li class="nav-item nav-with-child" routerLinkActive="active">
                     <a class="nav-link dropdown-item" routerLink="/driver/view-driver/1" 
                       >
                        <i class="fa fa-eye ni text-primary"></i>
                        <!-- [routerLinkActiveOptions]="{exact: true}" -->
                        <!-- [routerLinkActive]="active" -->
                        <p>Approved Drivers</p>
                     </a>
                  </li>
                  <li class="nav-item nav-with-child" routerLinkActive="active">
                     <a class="nav-link dropdown-item" routerLink="/driver/view-driver/2" routerLinkActive="active"
                        [routerLinkActiveOptions]="{exact: true}">
                        <i class="fa-spinner fas ni text-primary"></i>
                        <p>Unapproved Drivers</p>
                     </a>
                  </li>
                  <li class="nav-item nav-with-child" routerLinkActive="active">
                     <a class="nav-link dropdown-item" routerLink="/driver/view-driver/3" routerLinkActive="active"
                        [routerLinkActiveOptions]="{exact: true}">
                        <i class="fa-power-off fas ni text-primary"></i>
                        <p>Rejected Drivers</p>
                     </a>
                  </li>
                 
               </ul>

            </li>
            <li class="nav-item nav-with-child" ngbDropdown>
               <a class=" nav-link" routerLinkActive="active" ngbDropdownToggle><i
                     class="fa fa-motorcycle ni text-primary"></i> Rider </a>
               <ul class="nav-item-child " ngbDropdownMenu>
                  <li class="nav-item nav-with-child" routerLinkActive="active">
                     <a class=" nav-link dropdown-item" routerLink="/rider/add-edit-riders">
                        <i class="fa fa-plus-square ni text-primary"></i>
                        <p>Add Rider</p>
                     </a>
                  </li>
                  <li class="nav-item nav-with-child" routerLinkActive="active">
                     <a class=" nav-link dropdown-item" routerLink="/rider/view-riders">
                        <i class="fa fa-eye ni text-primary"></i>
                        <p>View Riders</p>
                     </a>
                  </li>

               </ul>

            </li>
            <li class="nav-item nav-with-child" ngbDropdown *ngIf = "user_type != 5">
               <a class=" nav-link" routerLinkActive="active" ngbDropdownToggle><i class="fa-taxi fas ni"></i> Trips
               </a>
               <ul class="nav-item-child " ngbDropdownMenu>
                  <li class="nav-item  nav-with-child" routerLinkActive="active">
                     <a class=" nav-link dropdown-item" routerLink="/trips/1">
                        <i class="fa-suitcase-rolling fas ni"></i>
                        <p>All Trips</p>
                     </a>
                  </li>
                  <!-- <li    class="nav-item nav-with-child" routerLinkActive="active">
                 <a   class=" nav-link dropdown-item"  routerLink="/trips/" >
                    <i  class="fa-luggage-cart fas ni"></i>
                    <p >Ongoing Trips</p>
                 </a>
              </li> -->
                  <li class="nav-item nav-with-child" routerLinkActive="active">
                     <a class=" nav-link dropdown-item" routerLink="/trips/2">
                        <i class="ni ni-map-big"></i>
                        <p>Upcoming Trip</p>
                     </a>
                  </li>
                  <!-- <li    class="nav-item nav-with-child" routerLinkActive="active">
                 <a   class=" nav-link dropdown-item"  routerLink="/trips" >
                    <i  class="fa-ban fas ni"></i>
                    <p >No Response Trips</p>
                 </a>
              </li> -->
                  <li class="nav-item nav-with-child" routerLinkActive="active">
                     <a class=" nav-link dropdown-item" routerLink="/trips/3">
                        <i class="fa-taxi fas ni"></i>
                        <p>Past Trip </p>
                     </a>
                  </li>

               </ul>

            </li>
            
            <li class="nav-item nav-with-child" ngbDropdown *ngIf = "user_type != 5">
               <a class=" nav-link" routerLinkActive="active" ngbDropdownToggle><i class="fa-star fas ni"></i>Reviews
                  and Ratings</a>
               <ul class="nav-item-child" ngbDropdownMenu>
                  <li class="nav-item  nav-with-child" routerLinkActive="active">
                     <a class=" nav-link dropdown-item" routerLink="/reviews/driver-reviews">
                        <i class="fa-calendar-check fas ni"></i>
                        <p>Driver Reviews & Ratings</p>
                     </a>
                  </li>
                  <li class="nav-item nav-with-child" routerLinkActive="active">
                     <a class=" nav-link dropdown-item" routerLink="/reviews/rider-reviews">
                        <i class="fa-calendar-check far ni text-primary"></i>
                        <p>Rider Reviews & Ratings</p>
                     </a>
                  </li>
                  <!-- <li    class="nav-item">
                 <a   class=" nav-link" href="#/ratings/driver-ratings" >
                    <i  class="fa-star-half-alt fas ni text-primary"></i>
                    <p >Driver Ratings</p>
                 </a>
              </li>
              <li    class="nav-item">
                 <a   class=" nav-link"  href="#/ratings/rider-ratings" >
                    <i  class="fa-star far ni"></i>
                    <p >Rider Ratings</p>
                 </a>
              </li> -->

               </ul>

            </li>


            <li class="nav-item nav-with-child " ngbDropdown>
               <!-- <a   class=" nav-link"  routerLinkActive="active"  ngbDropdownToggle ><i  class="fa fa-code ni"></i> Promocode </a>
           <ul   class="nav-item-child" ngbDropdownMenu>
              <li    class="nav-item nav-with-child"  routerLinkActive="active">
                 <a   class=" nav-link dropdown-item"  routerLink="/promocode/addpromocode" >
                    <i  class="fa fa-code ni"></i>
                    <p >Add Promocode</p>
                 </a>
              </li>
              <li    class="nav-item nav-with-child"  routerLinkActive="active">
                 <a   class=" nav-link dropdown-item"  routerLink="/promocode" >
                    <i  class="fa fa-eye ni"></i>
                    <p >View Promocode</p>
                 </a>
              </li>
     
           </ul> -->

            </li>
            <li class="nav-item nav-with-child " ngbDropdown *ngIf="user_type == 4">
               <a class=" nav-link" routerLinkActive="active" ngbDropdownToggle><i class="fa-handshake fas ni"></i>
                  Settlements </a>
               <ul class="nav-item  nav-with-child " ngbDropdownMenu>
                  <li class="nnav-item nav-with-child" routerLinkActive="active">
                     <a class=" nav-link dropdown-item" routerLink="/settlements/driver-settlement">
                        <i class="fa-file-invoice-dollar fas ni"></i>
                        <p>Cash Settlement</p>
                     </a>
                  </li>
                  <!-- <li class="nav-item nav-with-child" routerLinkActive="active">
                     <a class=" nav-link dropdown-item" routerLink="/settlements/rider-settlement">
                        <i class="fa-dollar-sign fas ni"></i>
                        <p>Rider Settlement</p>
                     </a>
                  </li> -->
                  <li class="nav-item nav-with-child" routerLinkActive="active">
                     <a class=" nav-link dropdown-item"
                        routerLink="/settlements/driver-settlement/driver-bank-transaction">
                        <i class="fa-exchange-alt fas ni"></i>
                        <p>Withdraw Request</p>
                     </a>
                  </li>
                  <li class="nav-item nav-with-child" routerLinkActive="active">
                     <a class=" nav-link dropdown-item"
                        routerLink="/settlements/driver-settlement/settlement-list">
                        <i class="fa-exchange-alt fas ni"></i>
                        <p>Withdraw Details</p>
                     </a>
                  </li>
                  <li class="nav-item nav-with-child" routerLinkActive="active">
                     <a class=" nav-link dropdown-item"
                        routerLink="/view-partner-withdraws">
                        <i class="fa-exchange-alt fas ni"></i>
                        <p>Partner Withdraw Request</p>
                     </a>
                  </li>

               </ul>

            </li>
            <!-- <li  class="nav-item nav-with-child " ngbDropdown>
           <a   class=" nav-link"   routerLinkActive="active"  ngbDropdownToggle ><i  class="fa-money-bill-alt far ni"></i> Driver Payment Package </a>
           <ul   class="nav-item-child " ngbDropdownMenu>
              <li    class="nav-item nav-with-child"  routerLinkActive="active">
                 <a   class=" nav-link dropdown-item"  routerLink="/package/list-package" >
                    <i  class="fa-box fas ni"></i>
                    <p >Package List</p>
                 </a>
              </li>
              <li    class="nav-item nav-with-child"  routerLinkActive="active">
                 <a   class=" nav-link dropdown-item"  routerLink="/package/driver-credits" >
                    <i  class="fa-credit-card fas ni"></i>
                    <p >Driver Credits</p>
                 </a>
              </li>
     
           </ul>
    
        </li>
        <li  class="nav-item nav-with-child" ngbDropdown>
           <a   class=" nav-link"   routerLinkActive="active"  ngbDropdownToggle ><i  class="fa-gift fas ni"></i> Offers </a>
           <ul   class="nav-item-child " ngbDropdownMenu>
              <li    class="nav-item nav-with-child"  routerLinkActive="active">
                 <a   class=" nav-link dropdown-item"  routerLink="/offers/add-offers" >
                    <i  class="fa-hourglass far ni"></i>
                    <p >Add Current Offer</p>
                 </a>
              </li>
              <li    class="nav-item nav-with-child"  routerLinkActive="active">
                 <a   class=" nav-link dropdown-item"  routerLink="/offers/current-offers" >
                    <i  class="fa-hourglass-start fas ni"></i>
                    <p >View Current Offers</p>
                 </a>
              </li>
              <li    class="nav-item nav-with-child"  routerLinkActive="active">
                 <a   class=" nav-link dropdown-item"  routerLink="/offers/expired-offers" >
                    <i  class="fa-hourglass-end fas ni"></i>
                    <p >Expired Offers</p>
                 </a>
              </li>
     
           </ul>
    
        </li>
        <li  class="nav-item nav-with-child" ngbDropdown>
           <a   class=" nav-link"  routerLinkActive="active"  ngbDropdownToggle ><i  class="fa-file fas ni"></i> Daily Reports </a>
           <ul   class="nav-item-child " ngbDropdownMenu>
              <li    class="nav-item nav-with-child"  routerLinkActive="active">
                 <a   class=" nav-link dropdown-item"  routerLink="/payment/payment-report" >
                    <i  class="fa-file-invoice-dollar fas ni"></i>
                    <p >Payment Report</p>
                 </a>
              </li>
              <li    class="nav-item nav-with-child"  routerLinkActive="active">
                 <a   class=" nav-link dropdown-item"  routerLink="/trips/trip-status" >
                    <i  class="fa-file-medical-alt fas ni"></i>
                    <p >Trip Status</p>
                 </a>
              </li>
              <li    class="nav-item nav-with-child"  routerLinkActive="active">
                 <a   class=" nav-link dropdown-item"  routerLink="/trips/trip-types" >
                    <i  class="ni ni-caps-small"></i>
                    <p >Trip Types</p>
                 </a>
              </li>
              <li    class="nav-item nav-with-child"  routerLinkActive="active">
                 <a   class=" nav-link dropdown-item"  routerLink="/trips/trip-booked" >
                    <i  class="fa-bookmark fas ni"></i>
                    <p >Trip Booked</p>
                 </a>
              </li>
     
           </ul>
    
        </li>
        <li  class="nav-item nav-with-child " ngbDropdown>
           <a   class=" nav-link" routerLinkActive="active"  ngbDropdownToggle ><i  class="fa-file-invoice fas ni"></i> Report </a>
           <ul   class="nav-item-child" ngbDropdownMenu>
              <li    class="nav-item nav-with-child"  routerLinkActive="active">
                 <a   class=" nav-link dropdown-item"  routerLink="/payment/trip-payment" >
                    <i  class="fa-money-bill-wave-alt fas ni"></i>
                    <p >Trip Payments</p>
                 </a>
              </li>
              <li    class="nav-item nav-with-child"  routerLinkActive="active">
                 <a   class=" nav-link dropdown-item"  routerLink="/payment/driver-payment" >
                    <i  class="fa-money-bill-wave fas ni"></i>
                    <p >Driver Payment</p>
                 </a>
              </li>
              <li    class="nav-item nav-with-child"  routerLinkActive="active">
                 <a   class=" nav-link dropdown-item"  routerLink="/settlements/company-settlement" >
                    <i  class="fa-building fas ni"></i>
                    <p >Company Settlements</p>
                 </a>
              </li>
              <li    class="nav-item nav-with-child"  routerLinkActive="active">
                 <a   class=" nav-link dropdown-item"  routerLink="/settlements/rider-settlement/rider-wallet" >
                    <i  class="fa-wallet fas ni"></i>
                    <p >Rider Wallet</p>
                 </a>
              </li>
              <li    class="nav-item nav-with-child"  routerLinkActive="active">
                 <a   class=" nav-link dropdown-item"  routerLink="/trips/trip-status" >
                    <i  class="fa-file-medical-alt fas ni"></i>
                    <p >Trip Status</p>
                 </a>
              </li>
              <li    class="nav-item nav-with-child"  routerLinkActive="active">
                 <a   class=" nav-link dropdown-item"  routerLink="/package/subscription" >
                    <i  class="fa-ticket-alt fas ni"></i>
                    <p >Subscription Report</p>
                 </a>
              </li>
              <li    class="nav-item nav-with-child"  routerLinkActive="active">
                 <a   class=" nav-link dropdown-item"  routerLink="/trips/trip-types" >
                    <i  class="ni ni-caps-small"></i>
                    <p >Tripe Types</p>
                 </a>
              </li>
              <li    class="nav-item nav-with-child"  routerLinkActive="active">
                 <a   class=" nav-link dropdown-item"  routerLink="/trips/trip-booked" >
                    <i  class="fa-bookmark fas ni"></i>
                    <p >Tripe Booked</p>
                 </a>
              </li>
              <li    class="nav-item nav-with-child"  routerLinkActive="active">
                 <a   class=" nav-link dropdown-item"  routerLink="/package/package-history" >
                    <i  class="fa-history fas ni"></i>
                    <p >Package Purchase History</p>
                 </a>
              </li>
              <li    class="nav-item nav-with-child"  routerLinkActive="active">
                 <a   class=" nav-link dropdown-item"  routerLink="/settlements/driver-settlement" >
                    <i  class="fa-wallet fas ni"></i>
                    <p >Driver Wallet</p>
                 </a>
              </li>
     
           </ul>
    
        </li> -->
            <!-- <li  class="nav-item">
           <a   class=" nav-link"   href="#/icons" ><i  class="ni ni-planet text-blue"></i> Icons </a>
        </li>-->
            <li class="nav-item" *ngIf = "user_type != 5">
               <a class=" nav-link" href="#/maps"><i class="ni ni-pin-3 text-orange"></i> Maps </a>
            </li>
            <li class="nav-item" *ngIf = "user_type != 5">
               <a class=" nav-link" routerLinkActive="active" routerLink="/user-profile"><i
                     class="ni ni-single-02 text-yellow"></i> User profile </a>
            </li>
            
            <li class="nav-item nav-with-child" ngbDropdown>
               <a class="nav-link" routerLinkActive="active" ngbDropdownToggle><i class="ni ni-email-83 text-yellow"></i>
                  Notification Centre</a>
                  <ul class = "nav-item-child" ngbDropdownMenu>
                    <li class="nav-item  nav-with-child" routerLinkActive="active"><a class=" nav-link dropdown-item" routerLink = "/notify"><i class="fa fa-plus-square ni text-primary"></i><p>Add Schedule</p></a></li>
                    <li class="nav-item  nav-with-child" routerLinkActive="active"><a class=" nav-link dropdown-item" routerLink = "/view-schedule"><i class="fa fa-eye ni text-primary"></i><p>View Schedules</p></a></li>
                  </ul>
                </li>
               <li class="nav-item nav-with-child" ngbDropdown>
               <a class="nav-link" routerLinkActive="active" ngbDropdownToggle><i class="ni ni-email-83 text-yellow"></i>
                  App Messages</a>
                  <ul class = "nav-item-child" ngbDropdownMenu>
                    <li class="nav-item  nav-with-child" routerLinkActive="active"><a class=" nav-link dropdown-item" routerLink = "/driver/insertfeed"><i class="fa fa-plus-square ni text-primary"></i><p>Push New Message</p></a></li>
                    <li class="nav-item  nav-with-child" routerLinkActive="active"><a class=" nav-link dropdown-item" routerLink = "/driver/viewfeed"><i class="fa fa-eye ni text-primary"></i><p>View Messages</p></a></li>
                  </ul>
                </li>


            <li class="nav-item nav-with-child" ngbDropdown *ngIf = "user_type != 5">
               <a class="nav-link" routerLinkActive="active" ngbDropdownToggle><i class="ni ni-chart-pie-35 text-primary"></i>
                  Reports</a>
                  <ul class = "nav-item-child" ngbDropdownMenu>
                    <li class="nav-item  nav-with-child" routerLinkActive="active"><a class=" nav-link dropdown-item" routerLink = "/report"><i class="fa fa-eye ni text-primary"></i><p>View Report</p></a></li>
                    <li class="nav-item  nav-with-child" routerLinkActive="active"><a class=" nav-link dropdown-item" routerLink = "/refreport"><i class="fa fa-eye ni text-primary"></i><p>View Referral Report</p></a></li>
                  </ul>
                </li>
            <!-- <li class="nav-item">
               <a class=" nav-link" routerLinkActive="active" routerLink="/settings"><i class="ni ni-settings-gear-65"></i>
                  Settings </a>
            </li> -->

            <li class="nav-item nav-with-child" ngbDropdown *ngIf = "user_type != 5">
               <a class=" nav-link" routerLinkActive="active" ngbDropdownToggle><i
                     class="ni ni-satisfied text-primary"></i> Surge Charge </a>
               <ul class="nav-item-child" ngbDropdownMenu>
                  <li class="nav-item nav-with-child " routerLinkActive="active">
                     <a class=" nav-link dropdown-item" routerLink="/settings/add-settings">
                        <i class="fa fa-user-plus ni"></i>
                        <p>Add Surge Charge</p>
                     </a>
                  </li>
                   <li class="nav-item nav-with-child" routerLinkActive="active">
                     <a class=" nav-link dropdown-item" routerLink="/settings/edit-surge-settings">
                        <i class="fa fa-eye ni"></i>
                        <p>Edit Surge Settings</p>
                     </a>
                  </li>
                  <li class="nav-item nav-with-child" routerLinkActive="active">
                     <a class=" nav-link dropdown-item" routerLink="/settings/view-settings">
                        <i class="fa fa-eye ni"></i>
                        <p>View Surge Charge</p>
                     </a>
                  </li>

               </ul>
            </li>

            <li class="nav-item nav-with-child" ngbDropdown *ngIf = "user_type != 5">
               <a class=" nav-link" routerLinkActive="active" ngbDropdownToggle><i class="fas fa-percent" style="color: #219cdb !important;"></i> Discount </a>
               <ul class="nav-item-child" ngbDropdownMenu>
                  <li class="nav-item nav-with-child " routerLinkActive="active">
                     <a class=" nav-link dropdown-item" routerLink="/discount/add-discount">
                        <i class="fa fa-user-plus ni"></i>
                        <p>Add Discount</p>
                     </a>
                  </li>
                  <li class="nav-item nav-with-child" routerLinkActive="active">
                     <a class=" nav-link dropdown-item" routerLink="/discount/edit-discount">
                        <i class="fa fa-eye ni"></i>
                        <p>View Discount</p>
                     </a>
                  </li>
                  <li class="nav-item nav-with-child" routerLinkActive="active">
                     <a class=" nav-link dropdown-item" routerLink="/view-coupon-use">
                        <i class="fa fa-eye ni"></i>
                        <p>View Discount-code Use</p>
                     </a>
                  </li>

               </ul>
            </li>

            <!-- <li  class="nav-item">
           <a   class=" nav-link"   href="#/tables" ><i  class="ni ni-bullet-list-67 text-red"></i> Tables </a>
        </li> -->
            <li class="nav-item">
               <!-- <a    class=" nav-link" routerLinkActive="active"  routerLink="/login" ><i  class="ni ni-key-25 text-info"></i> Login </a> -->
            </li>
            <!-- <li  class="nav-item">
           <a   class=" nav-link"   href="#/register" ><i  class="ni ni-circle-08 text-pink"></i> Register </a>
        </li> -->

         </ul>
         <!-- Divider -->
         <hr class="my-3">
         <!-- Heading -->
         <!-- <h6 class="navbar-heading text-muted">Documentation</h6> -->
         <!-- Navigation -->
         <!-- <ul class="navbar-nav mb-md-3">
        <li class="nav-item">
          <a class="nav-link" href="https://demos.creative-tim.com/argon-dashboard-angular/documentation/tutorial">
            <i class="ni ni-spaceship"></i> Getting started
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="https://demos.creative-tim.com/argon-dashboard-angular/documentation/colors">
            <i class="ni ni-palette"></i> Foundation
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="https://demos.creative-tim.com/argon-dashboard-angular/documentation/alerts">
            <i class="ni ni-ui-04"></i> Components
          </a>
        </li>
      </ul> -->
      </div>
   </div>
</nav>