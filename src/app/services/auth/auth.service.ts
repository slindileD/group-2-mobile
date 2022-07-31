import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CurrentUser } from 'src/app/shared/types/auth.types';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  endpointBase = environment.endpointBase;

  constructor(
    private _httpClient: HttpClient,
    private _router: Router
  ) { }

  get currentUser(){
    let token = localStorage.getItem('token');
    if(!token){
      return null;
    }

    const helper = new JwtHelperService();
    return helper.decodeToken(token) as CurrentUser;
  }

  isSignedIn() {
    let token = localStorage.getItem('token');

    if (!token) return false;

    const helper = new JwtHelperService();
    if (helper.isTokenExpired(token)) return false;

    return true;
  }

  signOut() {
    localStorage.removeItem('token');
    this._router.navigate(['/tabs/categories']);
  }


  signIn(payload: any) {
    return this._httpClient
      .post(this.endpointBase.concat("Account/SignIn"), payload, { reportProgress: true, observe: 'events' });
  }


}
