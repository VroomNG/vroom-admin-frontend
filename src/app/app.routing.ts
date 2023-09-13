import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

var route: string = "user";

const role = localStorage.getItem('token');

if (role != null)  {
  // dashboard
  route = "dashboard"
} else {
  // login
  route = "login"
}

export function getBreadcrumb(){
  
}

const routes: Routes = [
  // { path: 'first-component', component: FirstComponent },
  {
    path: '',
    redirectTo: route,
    pathMatch: 'full',
    data: {breadcrumb: getBreadcrumb},
  }, {
    path: '',
    component: AdminLayoutComponent,
    // children: [
    //   {
    //     path: '',
    //     loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
    //   }
    // ]
  }, {
    path: '',
    component: AuthLayoutComponent,
    // children: [
    //   {
    //     path: '',
    //     loadChildren: './layouts/auth-layout/auth-layout.module#AuthLayoutModule'
    //   }
    // ]
  }, {
    path: '**',
    redirectTo: 'dashboard'
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true,onSameUrlNavigation:'reload'
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
