import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { map } from 'rxjs/operators';
import {Observable, of, Subject} from 'rxjs';

class User {
}
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Access-Control-Allow-Origin': 'http://172.16.0.99:7894',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
    'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type, Accept, Origin'
  })
};

class Admindetail {
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  subjects: any;
  ParentCompanyId: any;
  userId: any;
  baseUrl: string;
  usernav: boolean;
  rolesnav: boolean;
  servicesnav: boolean;
  inventorynav: boolean;
  communicationnav: boolean;
  taxtablenav: boolean;
  couponsnav: boolean;
  rewardsnav: boolean;
  businessnav: boolean;
  constructor(private httpClient: HttpClient) { }
   
  create_role_service(Admin) {
    debugger;
  this.baseUrl = 'http://172.16.0.114:5555/api/Roles/CreateRole';
  Admin.ParentCompanyId = parseInt(localStorage.companyId);
  Admin.CreatedByUserId = localStorage.userId;
  return this.httpClient.post<Observable<Admindetail>>(this.baseUrl, Admin, httpOptions)
  .pipe(map( data => data));
  }

  update_role_service(Admin) {
    debugger;
  this.baseUrl = 'http://172.16.0.114:5555/api/Roles/UpdateRole';
  Admin.LastModifiedByUserId = localStorage.userId;
  return this.httpClient.post<Observable<Admindetail>>(this.baseUrl, Admin, httpOptions)
  .pipe(map( data => data));
  }

  publish(eventName: string) {
    this.subjects[eventName] = this.subjects[eventName] || new Subject();
    this.subjects[eventName].next();
  }

  on(eventName: string): Observable<any> {
    this.subjects[eventName] = this.subjects[eventName] || new Subject()
    return this.subjects[eventName].asObservable();
  }

}
