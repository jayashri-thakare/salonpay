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
  private res: Object;
  private result: {
    serviceDetails: { serviceId: any };
  };
  constructor(private httpClient: HttpClient) { }
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
  public serviceData: {
    serviceId: any;
  };
  // private result: Object = {
  //   result: any
  // };
  private subjects: Subject<any>[] = [];
  selecteduserid: any;
  public navTab = 1;
  public business_settingnav = 1;
  editservice: boolean;
  serviceList: Observable<any>;
  productData: any;
    private coupon: {};

  create_role_service(Admin) {
    debugger;
  this.baseUrl = 'http://172.16.0.114:5555/api/Roles/CreateRole';
  Admin.ParentCompanyId = parseInt(localStorage.companyId);
  Admin.CreatedByUserId = localStorage.userId;
  return this.httpClient.post<Observable<Admindetail>>(this.baseUrl, Admin, httpOptions)
  .pipe(map( data => data));
  }

  showSubtab(tab) {
    this.showTab = tab;
  }

  getServiceObject(id) {
    this.ParentCompanyId = parseInt(localStorage.getItem('companyId'));
    this.editservice = true;
    this.baseUrl = 'http://172.16.0.114:5555/api/Services/GetServicesList?ParentCompanyId=6&ServiceId=' + id;
    // return this.httpClient.get<Observable<any>>(this.baseUrl, httpOptions).pipe(map(data => data));
    this.httpClient.get(this.baseUrl).subscribe((data) => {
      // tslint:disable-next-line:indent
      this.res = data;
      // tslint:disable-next-line:indent
      this.result = this.res['result'];
      this.serviceData = this.result.serviceDetails;
      // this.serviceData = this.result.result.serviceDetails;
    });


  }
  public showNav(nav) {
    this.navTab = nav;
    console.log(this.navTab);
  }

  public showBusinessNav(nav) {
    this.business_settingnav = nav;
    console.log(this.business_settingnav);
  }
  public setIndex(index: number, userid){
    this.selectedIndex = index;
    this.selecteduserid = userid;
  }

  update_role_service(Admin) {
  this.baseUrl = 'http://172.16.0.114:5555/api/Roles/UpdateRole';
  Admin.LastModifiedByUserId = localStorage.userId;
  return this.httpClient.post<Observable<Admindetail>>(this.baseUrl, Admin, httpOptions)
  .pipe(map( data => data));
  }

  getUserRoles() {
    this.ParentCompanyId = parseInt(localStorage.getItem('companyId'));
    this.baseUrl = 'http://172.16.0.114:5555/api/Roles/GetRoleList?parentCompanyId=' + this.ParentCompanyId;
    return this.httpClient.get<Observable<any>>(this.baseUrl, httpOptions).pipe(map(data => data));
  }

  getServiceCategories() {
    this.baseUrl = 'http://172.16.0.114:5555/api/Services/GetServicesDDL?ParentCompanyId=6';
    return this.httpClient.get<Observable<any>>(this.baseUrl, httpOptions).pipe(map(data => data));
  }

  getAddonServices() {
    this.baseUrl = 'http://172.16.0.114:5555/api/Users/GetServiceDDL?ParentCompanyId=5';
    return this.httpClient.get<Observable<any>>(this.baseUrl, httpOptions).pipe(map(data => data));
  }

  getServiceDetails() {
    this.baseUrl = 'http://172.16.0.114:5555/api/Services/GetServicesList?ParentCompanyId=6&ServiceId=18';
    return this.httpClient.get<Observable<any>>(this.baseUrl, httpOptions).pipe(map(data => data));
  }

  getAllServices() {
    this.baseUrl = 'http://172.16.0.114:5555/api/Services/GetServicesList?ParentCompanyId=6&ServiceId=0&PageNumber=1&PageSize=10';
    return this.httpClient.get<Observable<any>>(this.baseUrl, httpOptions).pipe(map(data => data));
  }


  deleteService(service) {
    return this.httpClient.delete('http://172.16.0.114:5555/api/Services/DeleteService?ServiceId=' + service);
  }

  deleteUserRoles(roleid) {
    debugger;
    return this.httpClient.delete('http://172.16.0.114:5555/api/Roles/DeleteRole?RoleId=' + roleid);
  }

  add_service(servicedata) {
    if (this.editservice === true) {
      servicedata.ServiceId = this.serviceData.serviceId ;
      this.baseUrl = 'http://172.16.0.114:5555/api/Services/UpdateService';
    } else {
      this.baseUrl = 'http://172.16.0.114:5555/api/Services/CreateService';
    }
    servicedata.ParentCompanyId = parseInt(localStorage.companyId);
    servicedata.CreatedByUserId = localStorage.userId;
    return this.httpClient.post<Observable<Admindetail>>(this.baseUrl, servicedata, httpOptions)
      .pipe(map( data => data));
  }

  add_coupon(coupon) {
    debugger;
    this.baseUrl = 'http://172.16.0.99:8055/api/Coupan/AddCopuan';
    coupon.ParentCompanyId = parseInt(localStorage.companyId);
    coupon.Service = [coupon.Service];
    coupon.Technician = [coupon.Technician];
    coupon.ProductId = [coupon.ProductId];
    return this.httpClient.post<Observable<Admindetail>>(this.baseUrl, coupon, httpOptions)
      .pipe(map( data => data));
  }

  create_user_service(Admin) {
    debugger;
  this.baseUrl = 'http://172.16.0.114:5555/api/Users/CreateUser';
  Admin.ParentCompanyId = parseInt(localStorage.companyId);
  Admin.CreatedByUserId = localStorage.userId;
  return this.httpClient.post<Observable<Admindetail>>(this.baseUrl, Admin, httpOptions)
  .pipe(map( data => data));
  }

  getUserHistory(user) {
    this.CreatedByUserId = user.user.id;
    this.baseUrl = 'http://172.16.0.114:5555/api/Users/GetUsersHistory?UserId=' + this.CreatedByUserId + '&PageNumber=1&PageSize=10';
    return this.httpClient.get<Observable<any>>(this.baseUrl, httpOptions).pipe(map(data => data));
  }

  getUserAdminRoles() {
    this.CreatedByUserId = localStorage.userId;
    this.baseUrl = '	http://172.16.0.114:5555/api/Users/GetUserRoles?UserId=' + this.CreatedByUserId;
    return this.httpClient.get<Observable<any>>(this.baseUrl, httpOptions).pipe(map(data => data));
  }

  getUserAdminList() {
    this.ParentCompanyId = parseInt(localStorage.getItem('companyId'));
    this.baseUrl = 'http://172.16.0.114:5555/api/Users/GetCompanyUsersList?ParentCompanyId=' + this.ParentCompanyId + '&PageNumber=1&PageSize=10';
    return this.httpClient.get<Observable<any>>(this.baseUrl, httpOptions).pipe(map(data => data));
  }

  getrolesModuleRights() {
    // We have to take productId from the backend side in login api (Rohan)
    this.baseUrl = 'http://172.16.0.114:5555/api/Roles/GetModulePermissions?ProductId=1';
    return this.httpClient.get<Observable<any>>(this.baseUrl, httpOptions).pipe(map(data => data));
  }

  getrolesIndividualRights() {
    // We have to take productId from the backend side in login api (Rohan)
    this.baseUrl = 'http://172.16.0.114:5555/api/Roles/GetIndividualPermissions?ProductId=1';
    return this.httpClient.get<Observable<any>>(this.baseUrl, httpOptions).pipe(map(data => data));
  }

  getUserServiceList() {
    this.ParentCompanyId = parseInt(localStorage.getItem('companyId'));
    this.baseUrl = 'http://172.16.0.114:5555/api/Users/GetServiceDDL?ParentCompanyId=' + this.ParentCompanyId;
    return this.httpClient.get<Observable<any>>(this.baseUrl, httpOptions).pipe(map(data => data));
  }

  getUserExp() {
    this.ParentCompanyId = parseInt(localStorage.getItem('companyId'));
    this.baseUrl = 'http://172.16.0.114:5555/api/Users/GetExpLevelDDL?ParentCompanyId=' + this.ParentCompanyId;
    return this.httpClient.get<Observable<any>>(this.baseUrl, httpOptions).pipe(map(data => data));
  }

  update_user_service(Admin) {
    debugger;
  this.baseUrl = 'http://172.16.0.114:5555/api/Users/UpdateUser';
  Admin.ParentCompanyId = parseInt(localStorage.companyId);
  Admin.CreatedByUserId = localStorage.userId;
  return this.httpClient.post<Observable<Admindetail>>(this.baseUrl, Admin, httpOptions)
  .pipe(map( data => data));
  }

  deleteUser(userid) {
    debugger;
    return this.httpClient.delete('http://172.16.0.114:5555/Users/DeleteUser?UserId=' + userid);
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
    this.baseUrl = 'http://172.16.0.114:5555/api/User/AssignRoleToUser';
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

  add_rewards(Admin) {
    debugger;
  this.baseUrl = 'http://172.16.0.114:5555/api/Rewards/CreateReward';
  Admin.ParentCompanyId = parseInt(localStorage.getItem('companyId'));
  Admin.CreatedByUserId = localStorage.userId;
  return this.httpClient.post<Observable<Admindetail>>(this.baseUrl, Admin, httpOptions)
  .pipe(map( data => data));
  }

  update_rewards(Admin) {
    debugger;
  this.baseUrl = 'http://172.16.0.114:5555/api/Rewards/UpdateReward';
  Admin.ParentCompanyId = parseInt(localStorage.getItem('companyId'));
  Admin.CreatedByUserId = localStorage.userId;
  return this.httpClient.post<Observable<Admindetail>>(this.baseUrl, Admin, httpOptions)
  .pipe(map( data => data));
  }

  GetRewardsList() {
    this.ParentCompanyId = parseInt(localStorage.getItem('companyId'));
    this.baseUrl = 'http://172.16.0.114:5555/api/Rewards/GetRewardsList?ParentCompanyId=' + this.ParentCompanyId + '&PageNumber=1&PageSize=10';
    return this.httpClient.get<Observable<any>>(this.baseUrl, httpOptions).pipe(map(data => data));
  }

  deleteReward(rewardid) {
    debugger;
    return this.httpClient.delete('http://172.16.0.114:5555/api/Rewards/DeleteReward?RewardId=' + rewardid);
  }

  GetReviewList() {
    this.ParentCompanyId = parseInt(localStorage.getItem('companyId'));
    this.baseUrl = 'http://172.16.0.114:5555/api/BusinessSettings/GetGoogleReviewURL?ParentCompanyId=' + this.ParentCompanyId;
    return this.httpClient.get<Observable<any>>(this.baseUrl, httpOptions).pipe(map(data => data));
  }

  add_review(Admin) {
    debugger;
  this.baseUrl = 'http://172.16.0.114:5555/api/BusinessSettings/AddGoogleReviewURL';
  Admin.ParentCompanyId = parseInt(localStorage.getItem('companyId'));
  return this.httpClient.post<Observable<Admindetail>>(this.baseUrl, Admin, httpOptions)
  .pipe(map( data => data));
  }

  update_review(Admin) {
    debugger;
  this.baseUrl = 'http://172.16.0.114:5555/api/BusinessSettings/UpdateGoogleReviewURL';
  Admin.ParentCompanyId = parseInt(localStorage.getItem('companyId'));
  return this.httpClient.post<Observable<Admindetail>>(this.baseUrl, Admin, httpOptions)
  .pipe(map( data => data));
  }

  deleteReview() {
    debugger;
    this.ParentCompanyId = parseInt(localStorage.getItem('companyId'));
    return this.httpClient.delete('http://172.16.0.114:5555/api/BusinessSettings/DeleteGoogleReviewURL?ParentCompanyId=' + this.ParentCompanyId);
  }

  GetTaxTableList() {
    this.ParentCompanyId = parseInt(localStorage.getItem('companyId'));
    this.baseUrl = 'http://172.16.0.114:5555/api/BusinessSettings/GetTaxTableDetails?ParentCompanyId=' + this.ParentCompanyId;
    return this.httpClient.get<Observable<any>>(this.baseUrl, httpOptions).pipe(map(data => data));
  }

  add_taxtable(Admin) {
    debugger;
  this.baseUrl = 'http://172.16.0.114:5555/api/BusinessSettings/CreateTaxTable';
  Admin.ParentCompanyId = parseInt(localStorage.getItem('companyId'));
  return this.httpClient.post<Observable<Admindetail>>(this.baseUrl, Admin, httpOptions)
  .pipe(map( data => data));
  }

  update_taxtable(Admin) {
    debugger;
  this.baseUrl = 'http://172.16.0.114:5555/api/BusinessSettings/UpdateTaxTable';
  Admin.ParentCompanyId = parseInt(localStorage.getItem('companyId'));
  return this.httpClient.post<Observable<Admindetail>>(this.baseUrl, Admin, httpOptions)
  .pipe(map( data => data));
  }

  deleteTax(taxid) {
    debugger;
    return this.httpClient.delete('http://172.16.0.114:5555/api/BusinessSettings/DeleteTaxTable?TaxId=' + taxid);
  }

  add_new_email(Admin) {
    debugger;
  this.baseUrl = 'http://172.16.0.99:8055/api/Communication/AddEmailTemplate';
  Admin.ParentCompanyId = parseInt(localStorage.getItem('companyId'));
  return this.httpClient.post<Observable<Admindetail>>(this.baseUrl, Admin, httpOptions)
  .pipe(map( data => data));
  }

  add_new_sms(Admin) {
    debugger;
  this.baseUrl = 'http://172.16.0.99:8055/api/Communication/AddSMSTemplate';
  Admin.ParentCompanyId = parseInt(localStorage.getItem('companyId'));
  return this.httpClient.post<Observable<Admindetail>>(this.baseUrl, Admin, httpOptions)
  .pipe(map( data => data));
  }

  GetEmailAndSmsTemplateList() {
    this.baseUrl = 'http://172.16.0.99:8055/api/Communication/GetEmailAndSmsTemplateList';
    return this.httpClient.get<Observable<any>>(this.baseUrl, httpOptions).pipe(map(data => data));
  }

  deleteEmailSmsCom(templateid, type) {
    debugger;
    return this.httpClient.delete(' http://172.16.0.99:8055/api/Communication/DeleteEmailAndSmsTemplate?id=' + templateid + '&type=' + type);
  }

  addEmailSmsNotification(Admin) {
    debugger;
  Admin.ParentCompanyId = parseInt(localStorage.getItem('companyId'));
  this.baseUrl = 'http://172.16.0.114:5555/api/BusinessSettings/AddCustNotifSettings';
  return this.httpClient.post<Observable<Admindetail>>(this.baseUrl, Admin, httpOptions)
  .pipe(map( data => data));
  }

  getCustNotification() {
    this.ParentCompanyId = parseInt(localStorage.getItem('companyId'));
    this.baseUrl = 'http://172.16.0.114:5555/api/BusinessSettings/GetCustNotifSettings?ParentCompanyId=' + this.ParentCompanyId;
    return this.httpClient.get<Observable<any>>(this.baseUrl, httpOptions).pipe(map(data => data));
  }

  updateEmailSmsNotification(Admin) {
    debugger;
  this.baseUrl = 'http://172.16.0.114:5555/api/BusinessSettings/UpdateCustNotifSettings';
  return this.httpClient.post<Observable<Admindetail>>(this.baseUrl, Admin, httpOptions)
  .pipe(map( data => data));
  }

  add_business_coupon(Admin) {
    debugger;
  Admin.ParentCompanyId = parseInt(localStorage.getItem('companyId'));
  this.baseUrl = 'http://172.16.0.114:5555/api/BusinessSettings/AddCouponSettings';
  return this.httpClient.post<Observable<Admindetail>>(this.baseUrl, Admin, httpOptions)
  .pipe(map( data => data));
  }

  GetBusinessCoupons() {
    this.ParentCompanyId = parseInt(localStorage.getItem('companyId'));
    this.baseUrl = 'http://172.16.0.114:5555/api/BusinessSettings/GetCouponSettings?ParentCompanyId=' + this.ParentCompanyId;
    return this.httpClient.get<Observable<any>>(this.baseUrl, httpOptions).pipe(map(data => data));
  }

  update_business_coupon(Admin) {
    debugger;
  Admin.ParentCompanyId = parseInt(localStorage.getItem('companyId'));
  this.baseUrl = 'http://172.16.0.114:5555/api/BusinessSettings/UpdateCouponSettings';
  return this.httpClient.post<Observable<Admindetail>>(this.baseUrl, Admin, httpOptions)
  .pipe(map( data => data));
  }

  deleteBusinessCoupon() {
    debugger;
    this.ParentCompanyId = parseInt(localStorage.getItem('companyId'));
    return this.httpClient.delete('http://172.16.0.114:5555/api/BusinessSettings/DeleteCouponSettings?ParentCompanyId=' + this.ParentCompanyId);
  }

  GetServicesList() {
    this.ParentCompanyId = parseInt(localStorage.getItem('companyId'));
    this.baseUrl = 'http://172.16.0.114:5555/api/BusinessSettings/GetServiceCategoryList?ParentCompanyId=' + this.ParentCompanyId + '&PageNumber=1&PageSize=5';
    return this.httpClient.get<Observable<any>>(this.baseUrl, httpOptions).pipe(map(data => data));
  }

  add_services(Admin) {
    debugger;
  this.baseUrl = 'http://172.16.0.114:5555/api/BusinessSettings/CreateServiceCategory';
  Admin.ParentCompanyId = parseInt(localStorage.getItem('companyId'));
  return this.httpClient.post<Observable<Admindetail>>(this.baseUrl, Admin, httpOptions)
  .pipe(map( data => data));
  }

  update_services(Admin) {
    debugger;
  this.baseUrl = 'http://172.16.0.114:5555/api/BusinessSettings/UpdateServiceCategory';
  Admin.ParentCompanyId = parseInt(localStorage.getItem('companyId'));
  return this.httpClient.post<Observable<Admindetail>>(this.baseUrl, Admin, httpOptions)
  .pipe(map( data => data));
  }

  GetTurnCountList() {
    this.ParentCompanyId = parseInt(localStorage.getItem('companyId'));
    this.baseUrl = ' http://172.16.0.114:5555/api/BusinessSettings/GetTurnCountList?ParentCompanyId=' + this.ParentCompanyId;
    return this.httpClient.get<Observable<any>>(this.baseUrl, httpOptions).pipe(map(data => data));
  }

  add_turncount(Admin) {
    debugger;
  this.baseUrl = 'http://172.16.0.114:5555/api/BusinessSettings/CreateTurnCount';
  Admin.ParentCompanyId = parseInt(localStorage.getItem('companyId'));
  return this.httpClient.post<Observable<Admindetail>>(this.baseUrl, Admin, httpOptions)
  .pipe(map( data => data));
  }

  update_turncount(Admin) {
    debugger;
  this.baseUrl = 'http://172.16.0.114:5555/api/BusinessSettings/UpdateTurnCount';
  Admin.ParentCompanyId = parseInt(localStorage.getItem('companyId'));
  return this.httpClient.post<Observable<Admindetail>>(this.baseUrl, Admin, httpOptions)
  .pipe(map( data => data));
  }

  GetExpLevelList() {
    this.ParentCompanyId = parseInt(localStorage.getItem('companyId'));
    this.baseUrl = ' http://172.16.0.114:5555/api/BusinessSettings/GetExperienceLevel?ParentCompanyId=' + this.ParentCompanyId;
    return this.httpClient.get<Observable<any>>(this.baseUrl, httpOptions).pipe(map(data => data));
  }

  add_explevel(Admin) {
    debugger;
  this.baseUrl = 'http://172.16.0.114:5555/api/BusinessSettings/CreateExperienceLevel';
  Admin.ParentCompanyId = parseInt(localStorage.getItem('companyId'));
  return this.httpClient.post<Observable<Admindetail>>(this.baseUrl, Admin, httpOptions)
  .pipe(map( data => data));
  }

  update_explevel(Admin) {
    debugger;
  this.baseUrl = ' http://172.16.0.114:5555/api/BusinessSettings/UpdateExperienceLevel';
  Admin.ParentCompanyId = parseInt(localStorage.getItem('companyId'));
  return this.httpClient.post<Observable<Admindetail>>(this.baseUrl, Admin, httpOptions)
  .pipe(map( data => data));
  }

  toggle_business_coupon(Admin) {
    debugger;
  Admin.ParentCompanyId = parseInt(localStorage.getItem('companyId'));
  this.baseUrl = 'http://172.16.0.114:5555/api/BusinessSettings/ToggleUpdateCouponsStng';
  return this.httpClient.post<Observable<Admindetail>>(this.baseUrl, Admin, httpOptions)
  .pipe(map( data => data));
  }

  GetTipAdjustmentList() {
    this.ParentCompanyId = parseInt(localStorage.getItem('companyId'));
    this.baseUrl = 'http://172.16.0.99:8055/api/BusinessProfile/GetCompanyProfile?ParentCompanyId=' + '32';
    return this.httpClient.get<Observable<any>>(this.baseUrl, httpOptions).pipe(map(data => data));
  }

  add_business_inventory(Admin) {
    debugger;
  Admin.ParentCompanyId = parseInt(localStorage.getItem('companyId'));
  this.baseUrl = 'http://172.16.0.99:8055/api/BusinessProfile/InventoryManageStock';
  return this.httpClient.post<Observable<Admindetail>>(this.baseUrl, Admin, httpOptions)
  .pipe(map( data => data));
  }

  GetBusinessInventory() {
    this.ParentCompanyId = parseInt(localStorage.getItem('companyId'));
    this.baseUrl = 'http://172.16.0.99:8055/api/BusinessProfile/GetInventoryStock?ParentCompanyId=' + this.ParentCompanyId;
    return this.httpClient.get<Observable<any>>(this.baseUrl, httpOptions).pipe(map(data => data));
  }

  update_profiledetail(Admin) {
    debugger;
  // Admin.ParentCompanyId = parseInt(localStorage.getItem('companyId'));
  Admin.ParentCompanyId = parseInt('32');
  this.baseUrl = 'http://172.16.0.99:8055/api/BusinessProfile/UpdateCompanyInfo';
  return this.httpClient.post<Observable<Admindetail>>(this.baseUrl, Admin, httpOptions)
  .pipe(map( data => data));
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
