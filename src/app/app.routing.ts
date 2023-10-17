import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';

var route: string = "user";

const role = localStorage.getItem('token');

// if (role != null)  {
//   // dashboard
//   route = "dashboard"
// } else {
//   // login
//   route = "login"
// }

export function getBreadcrumb(){
}

const routes: Routes = [
  {
    path: '',
    redirectTo: route,
    pathMatch: 'full',
    data: {breadcrumb: getBreadcrumb},
  },
  // {
  //   path: '',
  //   component: AdminLayoutComponent
  // },
  // {
  //   path: 'login',
  //   component: LoginComponent
  // },
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('../app/layouts/admin-layout/admin-layout.module').then(m=> m.AdminLayoutModule)
      }
    ]
  },
  //  {
  //   path: '',
  //   component: AuthLayoutComponent,
  //   children: [
  //     {
  //       path: '',
  //       loadChildren: () => import('./layouts/auth-layout/auth-layout.module').then(m=> m.AuthLayoutModule)
  //     }
  //   ]
  // }, 
  {
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
export class AppRoutingModule { 


}
