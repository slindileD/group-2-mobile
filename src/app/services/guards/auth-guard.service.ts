import { Injectable } from "@angular/core";
import { CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from 'src/app/services/api/Auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _authService: AuthService, private _router: Router) { }
  canActivate(_route: any, state: RouterStateSnapshot) {
    if (this._authService.isSignedIn()) {
      return true;
    }

    this._router.navigate([''], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
