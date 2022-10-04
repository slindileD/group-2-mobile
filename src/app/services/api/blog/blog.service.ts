import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  endpointBase = environment.endpointBase;
  headers = {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }

  constructor(private _httpClient: HttpClient) {
  }

  getAll() {
    return this._httpClient.get(
      this.endpointBase.concat("Blogs"),
      { reportProgress: true, observe: 'events', headers: this.headers }
    );
  }

  get(id: number) {
    return this._httpClient.get(
      this.endpointBase.concat("Blogs/" + id),
      { reportProgress: true, observe: 'events', headers: this.headers }
    );
  }

  create(payload: any) {
    return this._httpClient.post(
      this.endpointBase.concat("Blogs"), payload,
      { reportProgress: true, observe: 'events', headers: this.headers }
    );
  }

  delete(id: number) {
    return this._httpClient.delete(
      this.endpointBase.concat("Blogs/" + id),
      { reportProgress: true, observe: 'events', headers: this.headers }
    );
  }
}
