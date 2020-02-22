import { Injectable } from '@angular/core';
import {CanActivate, CanLoad, Router} from '@angular/router';
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): boolean {
    return this.canLoad();
  }

  canLoad(): boolean {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/']).then();
    }

    return !this.authService.isLoggedIn();
  }
}
