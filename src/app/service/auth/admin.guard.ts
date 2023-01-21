import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from '../global/users.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
    private userService: UsersService,
    private router: Router
    ){

    }

    canActivate(): boolean {
      if (this.userService.isAdmin()){
        return true;
      }
      this.router.navigate(['/login']);
      return false;
    }
}
