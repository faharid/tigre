import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { environment } from "../../environments/environment";

@Injectable()
export class BackendService {
  constructor(private http:HttpClient) {
  }

  getUser(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    const ep = this.prepEndpoint(`/users/${id}`);
    return this.http.get(ep, httpOptions)
      .map((res: any) => res)
  }

  register(req) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    const ep = this.prepEndpoint(`/users`);
    return this.http.put(ep, req, httpOptions)
      .map((res: any) => res)
  }

  prepEndpoint(ep) {
    return environment.api_url + `api/${environment.env}` + ep; 
  }
}