import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { HttpModule } from '@angular/http';
import { UserService } from './user.service';
import { JwtUserDataService } from './settingtokenuserdata.service';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private userService: UserService, private _jwtuserdataservice: JwtUserDataService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this._jwtuserdataservice.getToken()){
      return true;
    }
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
   return false;

  }
}
