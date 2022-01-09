import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';


@Injectable()
export class BackendService {
    isDev: boolean = false;
    isCloud: boolean = true;
    urlCloud = 'https://soymartinezborja.com:3001/';
    urlLocal = 'https://localhost:3001/';
  constructor(private http:HttpClient) {
  }

  getHincha(req) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    const ep = this.prepEndpoint('hinchas/');
    return this.http.post(ep, req, httpOptions)
      .map((res: any) => res)
  }

  createHincha(req) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    const ep = this.prepEndpoint('hinchas/create');
    return this.http.post(ep, req, httpOptions)
      .map((res: any) => res)
  }

  prepEndpoint(ep) {
    if(this.isDev) {
      return this.urlLocal + ep;
    } else {
      if(this.isCloud){
        return this.urlCloud + ep; 
      }
    }
  }
}