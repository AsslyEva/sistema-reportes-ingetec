import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../global/auth.service';
import { UsersService } from '../global/users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private userService: UsersService,
    private router: Router
    ){

    }

    canActivate(): boolean {
      if (this.userService.loggedIn()){
        return true;
      }
      this.router.navigate(['/login']);
      return false;
    }

  }
