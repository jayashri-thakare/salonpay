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
  UserId: number;
  CreatedByUserId: any;
  constructor(private httpClient: HttpClient) { }
   
  create_role_service(Admin) {
    debugger;
  this.baseUrl = 'https://payziliapi3.azurewebsites.net/api/Roles/CreateRole';
  Admin.ParentCompanyId = parseInt(localStorage.companyId);
  Admin.CreatedByUserId = localStorage.userId;
  return this.httpClient.post<Observable<Admindetail>>(this.baseUrl, Admin, httpOptions)
  .pipe(map( data => data));
  }

  update_role_service(Admin) {
    debugger;
  this.baseUrl = 'https://payziliapi3.azurewebsites.net/api/Roles/UpdateRole';
  Admin.LastModifiedByUserId = localStorage.userId;
  return this.httpClient.post<Observable<Admindetail>>(this.baseUrl, Admin, httpOptions)
  .pipe(map( data => data));
  }

  getUserRoles() {
    this.ParentCompanyId = parseInt(localStorage.getItem('companyId'));
    this.baseUrl = 'https://payziliapi3.azurewebsites.net/api/Roles/GetRoleList?parentCompanyId=' + this.ParentCompanyId;
    return this.httpClient.get<Observable<any>>(this.baseUrl, httpOptions).pipe(map(data => data));
  }

  deleteUserRoles(roleid) {
    debugger;
    return this.httpClient.delete('https://payziliapi3.azurewebsites.net/api/Roles/DeleteRole?RoleId=' + roleid);
  }

  create_user_service(Admin) {
    debugger;
  this.baseUrl = 'https://payziliapi3.azurewebsites.net/api/Users/CreateUser';
  Admin.ParentCompanyId = parseInt(localStorage.companyId);
  Admin.CreatedByUserId = localStorage.userId;
  return this.httpClient.post<Observable<Admindetail>>(this.baseUrl, Admin, httpOptions)
  .pipe(map( data => data));
  }

  getUserHistory() {
    this.CreatedByUserId = localStorage.userId;
    this.baseUrl = 'https://payziliapi3.azurewebsites.net/api/Users/GetUsersHistory?UserId=' + this.CreatedByUserId;
    return this.httpClient.get<Observable<any>>(this.baseUrl, httpOptions).pipe(map(data => data));
  }

  getUserAdminRoles() {
    this.CreatedByUserId = localStorage.userId;
    this.baseUrl = 'https://payziliapi3.azurewebsites.net/api/Roles/GetUserRoles?UserId=' + this.CreatedByUserId;
    return this.httpClient.get<Observable<any>>(this.baseUrl, httpOptions).pipe(map(data => data));
  }

  getUserAdminList() {
    this.ParentCompanyId = parseInt(localStorage.getItem('companyId'));
    this.baseUrl = 'https://payziliapi3.azurewebsites.net/api/Users/GetCompanyUsersList?ParentCompanyId=' + this.ParentCompanyId;
    return this.httpClient.get<Observable<any>>(this.baseUrl, httpOptions).pipe(map(data => data));
  }

  getrolesModuleRights() {
    // We have to take productId from the backend side in login api (Rohan)
    this.baseUrl = 'https://payziliapi3.azurewebsites.net/api/Roles/GetModulePermissions?ProductId=1';
    return this.httpClient.get<Observable<any>>(this.baseUrl, httpOptions).pipe(map(data => data));
  }

  getrolesIndividualRights() {
    // We have to take productId from the backend side in login api (Rohan)
    this.baseUrl = 'https://payziliapi3.azurewebsites.net/api/Roles/GetIndividualPermissions?ProductId=1';
    return this.httpClient.get<Observable<any>>(this.baseUrl, httpOptions).pipe(map(data => data));
  }

  getUserServiceList() {
    this.ParentCompanyId = parseInt(localStorage.getItem('companyId'));
    this.baseUrl = 'https://payziliapi3.azurewebsites.net/api/Users/GetServiceDDL?ParentCompanyId=' + this.ParentCompanyId;
    return this.httpClient.get<Observable<any>>(this.baseUrl, httpOptions).pipe(map(data => data));
  }

  getUserExp() {
    this.ParentCompanyId = parseInt(localStorage.getItem('companyId'));
    this.baseUrl = 'https://payziliapi3.azurewebsites.net/api/Users/GetExpLevelDDL?ParentCompanyId=' + this.ParentCompanyId;
    return this.httpClient.get<Observable<any>>(this.baseUrl, httpOptions).pipe(map(data => data));
  }

  update_user_service(Admin) {
    debugger;
  this.baseUrl = 'https://payziliapi3.azurewebsites.net/api/Users/UpdateUser';
  Admin.ParentCompanyId = parseInt(localStorage.companyId);
  Admin.CreatedByUserId = localStorage.userId;
  return this.httpClient.post<Observable<Admindetail>>(this.baseUrl, Admin, httpOptions)
  .pipe(map( data => data));
  }

  deleteUser(userid) {
    debugger;
    return this.httpClient.delete('https://payziliapi3.azurewebsites.net/Users/DeleteUser?UserId=' + userid);
  }

  GetCompanyRolesClaims() {
    this.ParentCompanyId = parseInt(localStorage.getItem('companyId'));
    this.baseUrl = 'https://payziliapi3.azurewebsites.net/api/Roles/GetCompanyRolesClaims?ParentCompanyId=' + this.ParentCompanyId;
    return this.httpClient.get<Observable<any>>(this.baseUrl, httpOptions).pipe(map(data => data));
  }

  publish(eventName: string) {
    debugger;
    this.subjects[eventName] = this.subjects[eventName] || new Subject();
    this.subjects[eventName].next();
  }

  on(eventName: string): Observable<any> {
    this.subjects[eventName] = this.subjects[eventName] || new Subject()
    return this.subjects[eventName].asObservable();
  }

}
