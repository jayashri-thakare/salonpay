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
  public showTab  = 1;
  selectedIndex: number = null;

  private subjects: Subject<any>[] = [];
  selecteduserid: any;
  constructor(private httpClient: HttpClient) { }

  create_role_service(Admin) {
    debugger;
  this.baseUrl = 'https://payziliapi3.azurewebsites.net/api/Roles/CreateRole';
  Admin.ParentCompanyId = parseInt(localStorage.companyId);
  Admin.CreatedByUserId = localStorage.userId;
  return this.httpClient.post<Observable<Admindetail>>(this.baseUrl, Admin, httpOptions)
  .pipe(map( data => data));
  }

  showSubtab(tab) {
    this.showTab = tab;
  }

  public setIndex(index: number, userid){
    this.selectedIndex = index;
    this.selecteduserid = userid;
  }

  update_role_service(Admin) {
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

  getUserHistory(user) {
    this.CreatedByUserId = user.user.id;
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

  GetCompanyRolesClaims(roleid) {
    this.baseUrl = '  http://172.16.0.114:5555/api/Roles/GetRoleClaims?RoleId=' + roleid;
    return this.httpClient.get<Observable<any>>(this.baseUrl, httpOptions).pipe(map(data => data));
  }

  addupdateclaims(Admin) {
    debugger;
  this.baseUrl = 'http://172.16.0.114:5555/api/Users/ManageUserClaim';
  Admin.CreatedByUserId = localStorage.userId;
  return this.httpClient.post<Observable<Admindetail>>(this.baseUrl, Admin, httpOptions)
  .pipe(map( data => data));
  }

  assign_Role_ToUser(Admin) {
    debugger;
  this.baseUrl = 'http://172.16.0.114:5555/api/Roles/AssignRoleToUser';
  Admin.ParentCompanyId = parseInt(localStorage.companyId);
  return this.httpClient.post<Observable<Admindetail>>(this.baseUrl, Admin, httpOptions)
  .pipe(map( data => data));
  }

  addUpdateRoleClaims(Admin) {
    debugger;
  this.baseUrl = 'http://172.16.0.114:5555/api/Roles/ManageRoleClaims';
  Admin.CreatedByUserId = localStorage.userId;
  return this.httpClient.post<Observable<Admindetail>>(this.baseUrl, Admin, httpOptions)
  .pipe(map( data => data));
  }

  GetSupplierList() {
    this.ParentCompanyId = parseInt(localStorage.getItem('companyId'));
    this.baseUrl = 'http://172.16.0.99:8055/api/Inventory/GetSupplierList?ParentCompanyId=' + this.ParentCompanyId;
    return this.httpClient.get<Observable<any>>(this.baseUrl, httpOptions).pipe(map(data => data));
  }

  add_inventory(Admin) {
    debugger;
  this.baseUrl = 'http://172.16.0.99:8055/api/Inventory/AddProduct';
  Admin.ParentCompanyId = parseInt(localStorage.getItem('companyId'));
  return this.httpClient.post<Observable<Admindetail>>(this.baseUrl, Admin, httpOptions)
  .pipe(map( data => data));
  }

  GetProductList() {
    this.ParentCompanyId = parseInt(localStorage.getItem('companyId'));
    this.baseUrl = ' http://172.16.0.99:8055/api/Inventory/GetProductList?ParentCompanyId=' + this.ParentCompanyId + '&PageNumber=1&PageSize=10';
    return this.httpClient.get<Observable<any>>(this.baseUrl, httpOptions).pipe(map(data => data));
  }

  deleteProduct(productid) {
    debugger;
    return this.httpClient.delete(' http://172.16.0.99:8055/api/Inventory/DeleteProduct?ProductId=' + productid);
  }

  publish(eventName: string) {
    // ensure a subject for the event name exists
        this.subjects[eventName] = this.subjects[eventName] || new Subject();
    // publish event
        this.subjects[eventName].next();
      }

      on(eventName: string): Observable<any> {
    // ensure a subject for the event name exists
        this.subjects[eventName] = this.subjects[eventName] || new Subject();

    // return observable
        return this.subjects[eventName].asObservable();
      }

  // static setIndex(index: number) {
  //
  // }
}
