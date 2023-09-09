import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { LoginService } from '../service/login.service';


@Injectable()
export class AuthGuard  {
  constructor(private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // console.log('final auth xxx', next )
    // console.log('final auth xxx', state)
    // if (localStorage.getItem('enableSignIn')) {

    //   // return true;
    // }

    if (localStorage.getItem('token')) {
      return true;
    }
    console.log("auth data 2")

    this.router.navigate(['login']);
    return false;
  }
}

