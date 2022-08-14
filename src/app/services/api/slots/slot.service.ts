import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SlotService {

  endpointBase = environment.endpointBase;
  headers = {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }

  constructor(private _httpClient: HttpClient) {
  }

  getAllGroupedByDays() {
    return this._httpClient.get(
      this.endpointBase.concat("Slot/All/GroupedByDays"),
      { reportProgress: true, observe: 'events', headers: this.headers }
    );
  }
}
