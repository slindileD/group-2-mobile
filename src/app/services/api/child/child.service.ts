import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '../Auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ChildService {

  endpointBase = environment.endpointBase;
  headers = {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }

  constructor(private http: HttpClient, private _authService: AuthService) {
    this.http
  }

  add(payload: any) {
    return this.http.post(
      this.endpointBase.concat("Child/Add"), payload,
      { observe: 'events', reportProgress: true, headers: this.headers });
  }

  updateByParent(payload: any) {
    return this.http.post(
      this.endpointBase.concat("Child/EditByParent"), payload,
      { observe: 'events', reportProgress: true, headers: this.headers });
  }

  getByParentEmailAddress() {
    return this.http.get(
      this.endpointBase.concat("Child/ByParentEmail/" + this._authService.currentUser.UserName),
      { reportProgress: true, observe: 'events', headers: this.headers }
    );
  }

}
