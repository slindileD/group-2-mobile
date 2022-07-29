import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '../Auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApplicationsService {

  endpointBase = environment.endpointBase;
  headers = {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }

  constructor(private _httpClient: HttpClient, private _authService: AuthService) {
  }


  getRecentByUserName() {
    return this._httpClient.get(
      this.endpointBase.concat("Applications/ByParentEmail/" + this._authService.currentUser.UserName),
      { reportProgress: true, observe: 'events', headers: this.headers }
    );
  }

}
