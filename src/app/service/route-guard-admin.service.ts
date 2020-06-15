import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class RouteGuardAdminService implements CanActivate {

  constructor(private router: Router) {
  }

  role = localStorage.getItem('role');

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    if (this.role === 'Admin' ) {
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }
}


