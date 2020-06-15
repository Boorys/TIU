import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class RouteGuardUserService implements CanActivate {

  constructor(private router: Router) {
  }

  role = localStorage.getItem('role');

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    if (this.role === 'User' || this.role === 'Admin') {
      return true;
    }
    
    return false;
  }
}


