import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Profile } from '../../types/profile.types';
import { AuthService } from '../Auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  endpointBase = environment.endpointBase;

  headers = {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }

  constructor(private http: HttpClient, private _authService: AuthService) {
    this.http
  }

  create(payload: any) {
    return this.http.post(
      this.endpointBase.concat("Profile/Create"), payload,
      { observe: 'events', reportProgress: true, headers: this.headers });
  }

  updateByProfileHolder(payload: any) {
    return this.http.post(
      this.endpointBase.concat("Profile/EditByParent"), payload,
      { observe: 'events', reportProgress: true, headers: this.headers });
  }

  getByParentEmailAddress() {
    return this.http.get(
      this.endpointBase.concat("Profile/ByParentEmail/" + this._authService.currentUser.UserName),
      { reportProgress: true, observe: 'events', headers: this.headers }
    );
  }
}
