import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthService } from './auth.service';
import {MatSnackBar} from '@angular/material';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthService,
    private snackBar: MatSnackBar
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const isLoggedIn = this.authenticationService.isLoggedIn();

    if (isLoggedIn) {
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.snackBar.open('Please log in to continue', null, {duration: 2000});
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
