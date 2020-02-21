import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { map } from 'rxjs/operators';
import {Observable, of, Subject} from 'rxjs';
import {MessageService} from '../message.service';

class User {
}
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Access-Control-Allow-Origin': '*',
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
  couponName: string;
  constructor(private httpClient: HttpClient, private messageService: MessageService) { }
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
  public arrayofselectedobj: Array<any>=[];
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
    coupon: {};

  create_role_service(Admin) {
    this.baseUrl = 'https://payziliapi3.azurewebsites.net/api/Roles/CreateRole';
    Admin.ParentCompanyId = parseInt(localStorage.companyId);
    Admin.CreatedByUserId = localStorage.userId;
    return this.httpClient.post<Observable<Admindetail>>(this.baseUrl, Admin, httpOptions)
    .pipe(map( data => data));
  }

  showSubtab(tab) {
    this.showTab = tab;
  }

  getCoupon(coupon){
    this.coupon = coupon;
  }
  getServiceObject(id) {
    this.ParentCompanyId = parseInt(localStorage.getItem('companyId'));
    this.editservice = true;
    this.baseUrl = 'https://payziliapi3.azurewebsites.net/api/Services/GetServicesList?ParentCompanyId=' + this.ParentCompanyId + '&ServiceId=' + id;
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

  getStaff() {
    this.baseUrl = 'https://payziliapi3.azurewebsites.net/api/BusinessSettings/GetStaffSetting?ParentCompanyId=' + this.ParentCompanyId;
    return this.httpClient.get<Observable<any>>(this.baseUrl, httpOptions).pipe(map(data => data));
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

  getServiceCategories() {
    this.baseUrl = 'https://payziliapi3.azurewebsites.net/api/Services/GetServicesDDL?ParentCompanyId=' + this.ParentCompanyId;
    return this.httpClient.get<Observable<any>>(this.baseUrl, httpOptions).pipe(map(data => data));
  }

  getAddonServices() {
    this.baseUrl = 'https://payziliapi3.azurewebsites.net/api/Users/GetServiceDDL?ParentCompanyId=' + this.ParentCompanyId;
    return this.httpClient.get<Observable<any>>(this.baseUrl, httpOptions).pipe(map(data => data));
  }

  getServiceDetails() {
    this.baseUrl = 'https://payziliapi3.azurewebsites.net/api/Services/GetServicesList?ParentCompanyId=' + this.ParentCompanyId +'&ServiceId=8';
    return this.httpClient.get<Observable<any>>(this.baseUrl, httpOptions).pipe(map(data => data));
  }

  getAllServices() {
    this.baseUrl = 'https://payziliapi3.azurewebsites.net/api/Services/GetServicesList?ParentCompanyId=' + this.ParentCompanyId +'&ServiceId=0&PageNumber=1&PageSize=20';
    return this.httpClient.get<Observable<any>>(this.baseUrl, httpOptions).pipe(map(data => data));
  }


  deleteService(service) {
    return this.httpClient.delete('https://payziliapi3.azurewebsites.net/api/Services/DeleteService?ServiceId=' + service);
  }

  deleteUserRoles(roleid) {
    return this.httpClient.delete('https://payziliapi3.azurewebsites.net/api/Roles/DeleteRole?RoleId=' + roleid);
  }

  deleteCoupon(coupon) {
    return this.httpClient.delete('https://payziliapi3.azurewebsites.net/api/Coupan/DeleteCoupon?CouponId=' + coupon);
  }
  add_service(servicedata) {
    if (this.editservice === true) {
      servicedata.ServiceId = this.serviceData.serviceId ;
      this.baseUrl = 'https://payziliapi3.azurewebsites.net/api/Services/UpdateService';
    } else {
      this.baseUrl = 'https://payziliapi3.azurewebsites.net/api/Services/CreateService';
    }
    servicedata.ParentCompanyId = parseInt(localStorage.companyId);
    servicedata.CreatedByUserId = localStorage.userId;
    return this.httpClient.post<Observable<Admindetail>>(this.baseUrl, servicedata, httpOptions)
      .pipe(map( data => data));
  }

  add_coupon(coupon) {
    this.baseUrl = 'https://payziliapi3.azurewebsites.net/api/Coupan/AddCopuan';
    coupon.ParentCompanyId = parseInt(localStorage.companyId);
    // coupon.Service = [coupon.Service];
    coupon.Technician = [coupon.Technician];
    // coupon.ProductId = [coupon.ProductId];
    return this.httpClient.post<Observable<Admindetail>>(this.baseUrl, coupon, httpOptions)
      .pipe(map( data => data));
  }

  createStaff(staff) {
    this.baseUrl = 'https://payziliapi3.azurewebsites.net/api/BusinessSettings/SaveStaffSetting';
    let userdata = {}
    userdata['ParentCompanyId'] = parseInt(localStorage.companyId);
    userdata['staff'] = staff
    // coupon.Service = [coupon.Service];
    // coupon.ProductId = [coupon.ProductId];
    return this.httpClient.post<Observable<Admindetail>>(this.baseUrl, userdata, httpOptions)
      .pipe(map( data => data));
  }

  create_user_service(Admin) {
    this.baseUrl = 'https://payziliapi3.azurewebsites.net/api/Users/CreateUser';
    Admin.ParentCompanyId = parseInt(localStorage.companyId);
    Admin.CreatedByUserId = localStorage.userId;
    return this.httpClient.post<Observable<Admindetail>>(this.baseUrl, Admin, httpOptions)
    .pipe(map( data => data));
  }

  getUserHistory(user) {
    this.CreatedByUserId = user.user.id;
    this.baseUrl = 'https://payziliapi3.azurewebsites.net/api/Users/GetUsersHistory?UserId=' + this.CreatedByUserId + '&PageNumber=1&PageSize=20';
    return this.httpClient.get<Observable<any>>(this.baseUrl, httpOptions).pipe(map(data => data));
  }

  getCouponList() {
    this.ParentCompanyId = parseInt(localStorage.getItem('companyId'));
    this.baseUrl = 'https://payziliapi3.azurewebsites.net/api/Coupan/GetCouponsList?ParentCompanyId=' + this.ParentCompanyId+'&PageNumber=1&PageSize=20';
    return this.httpClient.get<Observable<any>>(this.baseUrl, httpOptions).pipe(map(data => data));
  }

  getTechnician() {
    this.ParentCompanyId = parseInt(localStorage.getItem('companyId'));
    this.baseUrl = 'https://payziliapi3.azurewebsites.net/Coupan/GetTechnicianList?ParentCompanyId=' + this.ParentCompanyId;
    return this.httpClient.get<Observable<any>>(this.baseUrl, httpOptions).pipe(map(data => data));
  }

  getUserAdminRoles(user) {
    this.CreatedByUserId = user.user.id;
    this.baseUrl = '	https://payziliapi3.azurewebsites.net/api/Users/GetUserRoles?UserId=' + this.CreatedByUserId;
    return this.httpClient.get<Observable<any>>(this.baseUrl, httpOptions).pipe(map(data => data));
  }

  getUserAdminList() {
    this.ParentCompanyId = parseInt(localStorage.getItem('companyId'));
    this.baseUrl = 'https://payziliapi3.azurewebsites.net/api/Users/GetCompanyUsersList?ParentCompanyId=' + this.ParentCompanyId + '&PageNumber=1&PageSize=20';
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
    this.baseUrl = 'https://payziliapi3.azurewebsites.net/api/Users/UpdateUser';
    Admin.ParentCompanyId = parseInt(localStorage.companyId);
    Admin.LastModifiedByUserId = localStorage.userId;
    return this.httpClient.post<Observable<Admindetail>>(this.baseUrl, Admin, httpOptions)
    .pipe(map( data => data));
  }

  deleteUser(userid) {
    return this.httpClient.delete('https://payziliapi3.azurewebsites.net/api/Users/DeleteUser?UserId=' + userid);
  }

  GetCompanyRolesClaims(roleid) {
    this.baseUrl = '  https://payziliapi3.azurewebsites.net/api/Roles/GetRoleClaims?RoleId=' + roleid;
    return this.httpClient.get<Observable<any>>(this.baseUrl, httpOptions).pipe(map(data => data));
  }

  addupdateclaims(Admin) {
    this.baseUrl = 'https://payziliapi3.azurewebsites.net/api/Users/ManageUserClaim';
    Admin.CreatedByUserId = localStorage.userId;
    return this.httpClient.post<Observable<Admindetail>>(this.baseUrl, Admin, httpOptions)
  .pipe(map( data => data));
  }

  assign_Role_ToUser(Admin) {
    this.baseUrl = 'https://payziliapi3.azurewebsites.net/api/Users/AssignRoleToUser';
    Admin.ParentCompanyId = parseInt(localStorage.companyId);
    return this.httpClient.post<Observable<Admindetail>>(this.baseUrl, Admin, httpOptions)
  .pipe(map( data => data));
  }

  update_assign_Role_ToUser(Admin) {
    this.baseUrl = 'https://payziliapi3.azurewebsites.net/api/Users/UpdateUserRole';
    Admin.ParentCompanyId = parseInt(localStorage.companyId);
    return this.httpClient.post<Observable<Admindetail>>(this.baseUrl, Admin, httpOptions)
  .pipe(map( data => data));
  }

  addUpdateRoleClaims(Admin) {
    this.baseUrl = 'https://payziliapi3.azurewebsites.net/api/Roles/ManageRoleClaims';
    Admin.CreatedByUserId = localStorage.userId;
    return this.httpClient.post<Observable<Admindetail>>(this.baseUrl, Admin, httpOptions)
  .pipe(map( data => data));
  }

  GetSupplierList() {
    this.ParentCompanyId = parseInt(localStorage.getItem('companyId'));
    this.baseUrl = 'https://payziliapi3.azurewebsites.net/api/Inventory/GetSupplierList?ParentCompanyId=' + this.ParentCompanyId;
    return this.httpClient.get<Observable<any>>(this.baseUrl, httpOptions).pipe(map(data => data));
  }

  add_supplier(Admin) {
    Admin.ParentCompanyId = parseInt(localStorage.getItem('companyId'));
    this.baseUrl = 'https://payziliapi3.azurewebsites.net/api/Inventory/AddSupplier';
    return this.httpClient.post<Observable<Admindetail>>(this.baseUrl, Admin, httpOptions)
  .pipe(map( data => data));
  }

  add_inventory(Admin) {
    this.baseUrl = 'https://payziliapi3.azurewebsites.net/api/Inventory/AddProduct';
    Admin.ParentCompanyId = parseInt(localStorage.getItem('companyId'));
    return this.httpClient.post<Observable<Admindetail>>(this.baseUrl, Admin, httpOptions)
  .pipe(map( data => data));
  }

  GetProductList() {
    this.ParentCompanyId = parseInt(localStorage.getItem('companyId'));
    this.baseUrl = ' https://payziliapi3.azurewebsites.net/api/Inventory/GetProductList?ParentCompanyId=' + this.ParentCompanyId + '&PageNumber=1&PageSize=20';
    return this.httpClient.get<Observable<any>>(this.baseUrl, httpOptions).pipe(map(data => data));
  }

  deleteProduct(productid) {
    return this.httpClient.delete(' https://payziliapi3.azurewebsites.net/api/Inventory/DeleteProduct?ProductId=' + productid);
  }

  add_rewards(Admin) {
    this.baseUrl = 'https://payziliapi3.azurewebsites.net/api/Rewards/CreateReward';
    Admin.ParentCompanyId = parseInt(localStorage.getItem('companyId'));
    Admin.CreatedByUserId = localStorage.userId;
    return this.httpClient.post<Observable<Admindetail>>(this.baseUrl, Admin, httpOptions)
    .pipe(map( data => data));
  }

  update_rewards(Admin) {
    this.baseUrl = 'https://payziliapi3.azurewebsites.net/api/Rewards/UpdateReward';
    Admin.ParentCompanyId = parseInt(localStorage.getItem('companyId'));
    Admin.CreatedByUserId = localStorage.userId;
    return this.httpClient.post<Observable<Admindetail>>(this.baseUrl, Admin, httpOptions)
    .pipe(map( data => data));
  }

  GetRewardsList() {
    this.ParentCompanyId = parseInt(localStorage.getItem('companyId'));
    this.baseUrl = 'https://payziliapi3.azurewebsites.net/api/Rewards/GetRewardsList?ParentCompanyId=' + this.ParentCompanyId + '&PageNumber=1&PageSize=20';
    return this.httpClient.get<Observable<any>>(this.baseUrl, httpOptions).pipe(map(data => data));
  }

  deleteReward(rewardid) {
    return this.httpClient.delete('https://payziliapi3.azurewebsites.net/api/Rewards/DeleteReward?RewardId=' + rewardid);
  }

  GetReviewList() {
    this.ParentCompanyId = parseInt(localStorage.getItem('companyId'));
    this.baseUrl = 'https://payziliapi3.azurewebsites.net/api/BusinessSettings/GetGoogleReviewURL?ParentCompanyId=' + this.ParentCompanyId;
    return this.httpClient.get<Observable<any>>(this.baseUrl, httpOptions).pipe(map(data => data));
  }

  add_review(Admin) {
    this.baseUrl = 'https://payziliapi3.azurewebsites.net/api/BusinessSettings/AddGoogleReviewURL';
    Admin.ParentCompanyId = parseInt(localStorage.getItem('companyId'));
    return this.httpClient.post<Observable<Admindetail>>(this.baseUrl, Admin, httpOptions)
    .pipe(map( data => data));
  }

  update_review(Admin) {
    this.baseUrl = 'https://payziliapi3.azurewebsites.net/api/BusinessSettings/UpdateGoogleReviewURL';
    Admin.ParentCompanyId = parseInt(localStorage.getItem('companyId'));
    return this.httpClient.post<Observable<Admindetail>>(this.baseUrl, Admin, httpOptions)
    .pipe(map( data => data));
  }

  deleteReview() {
    this.ParentCompanyId = parseInt(localStorage.getItem('companyId'));
    return this.httpClient.delete('https://payziliapi3.azurewebsites.net/api/BusinessSettings/DeleteGoogleReviewURL?ParentCompanyId=' + this.ParentCompanyId);
  }

  GetTaxTableList() {
    this.ParentCompanyId = parseInt(localStorage.getItem('companyId'));
    this.baseUrl = 'https://payziliapi3.azurewebsites.net/api/BusinessSettings/GetTaxTableDetails?ParentCompanyId=' + this.ParentCompanyId;
    return this.httpClient.get<Observable<any>>(this.baseUrl, httpOptions).pipe(map(data => data));
  }

  add_taxtable(Admin) {
    this.baseUrl = 'https://payziliapi3.azurewebsites.net/api/BusinessSettings/CreateTaxTable';
    Admin.ParentCompanyId = parseInt(localStorage.getItem('companyId'));
    return this.httpClient.post<Observable<Admindetail>>(this.baseUrl, Admin, httpOptions)
    .pipe(map( data => data));
  }

  update_taxtable(Admin) {
    this.baseUrl = 'https://payziliapi3.azurewebsites.net/api/BusinessSettings/UpdateTaxTable';
    Admin.ParentCompanyId = parseInt(localStorage.getItem('companyId'));
    return this.httpClient.post<Observable<Admindetail>>(this.baseUrl, Admin, httpOptions)
    .pipe(map( data => data));
  }

  deleteTax(taxid) {
    return this.httpClient.delete('https://payziliapi3.azurewebsites.net/api/BusinessSettings/DeleteTaxTable?TaxId=' + taxid);
  }

  add_new_email(Admin) {
    this.baseUrl = 'https://payziliapi3.azurewebsites.net/api/Communication/AddEmailTemplate';
    Admin.ParentCompanyId = parseInt(localStorage.getItem('companyId'));
    return this.httpClient.post<Observable<Admindetail>>(this.baseUrl, Admin, httpOptions)
    .pipe(map( data => data));
  }

  add_new_sms(Admin) {
    this.baseUrl = 'https://payziliapi3.azurewebsites.net/api/Communication/AddSMSTemplate';
    Admin.ParentCompanyId = parseInt(localStorage.getItem('companyId'));
    return this.httpClient.post<Observable<Admindetail>>(this.baseUrl, Admin, httpOptions)
    .pipe(map( data => data));
  }

  GetEmailAndSmsTemplateList() {
    this.baseUrl = 'https://payziliapi3.azurewebsites.net/api/Communication/GetEmailAndSmsTemplateList';
    return this.httpClient.get<Observable<any>>(this.baseUrl, httpOptions).pipe(map(data => data));
  }

  deleteEmailSmsCom(templateid, type) {
    return this.httpClient.delete(' https://payziliapi3.azurewebsites.net/api/Communication/DeleteEmailAndSmsTemplate?id=' + templateid + '&type=' + type);
  }

  addEmailSmsNotification(Admin) {
  Admin.ParentCompanyId = parseInt(localStorage.getItem('companyId'));
  this.baseUrl = 'https://payziliapi3.azurewebsites.net/api/BusinessSettings/AddCustNotifSettings';
  return this.httpClient.post<Observable<Admindetail>>(this.baseUrl, Admin, httpOptions)
  .pipe(map( data => data));
  }

  getCustNotification() {
    this.ParentCompanyId = parseInt(localStorage.getItem('companyId'));
    this.baseUrl = 'https://payziliapi3.azurewebsites.net/api/BusinessSettings/GetCustNotifSettings?ParentCompanyId=' + this.ParentCompanyId;
    return this.httpClient.get<Observable<any>>(this.baseUrl, httpOptions).pipe(map(data => data));
  }

  updateEmailSmsNotification(Admin) {
    this.baseUrl = 'https://payziliapi3.azurewebsites.net/api/BusinessSettings/UpdateCustNotifSettings';
    return this.httpClient.post<Observable<Admindetail>>(this.baseUrl, Admin, httpOptions)
    .pipe(map( data => data));
  }

  add_business_coupon(Admin) {
    Admin.ParentCompanyId = parseInt(localStorage.getItem('companyId'));
    this.baseUrl = 'https://payziliapi3.azurewebsites.net/api/BusinessSettings/AddCouponSettings';
    return this.httpClient.post<Observable<Admindetail>>(this.baseUrl, Admin, httpOptions)
    .pipe(map( data => data));
  }

  GetBusinessCoupons() {
    this.ParentCompanyId = parseInt(localStorage.getItem('companyId'));
    this.baseUrl = 'https://payziliapi3.azurewebsites.net/api/BusinessSettings/GetCouponSettings?ParentCompanyId=' + this.ParentCompanyId;
    return this.httpClient.get<Observable<any>>(this.baseUrl, httpOptions).pipe(map(data => data));
  }

  update_business_coupon(Admin) {
  Admin.ParentCompanyId = parseInt(localStorage.getItem('companyId'));
  this.baseUrl = 'https://payziliapi3.azurewebsites.net/api/BusinessSettings/UpdateCouponSettings';
  return this.httpClient.post<Observable<Admindetail>>(this.baseUrl, Admin, httpOptions)
  .pipe(map( data => data));
  }

  deleteBusinessCoupon() {
    this.ParentCompanyId = parseInt(localStorage.getItem('companyId'));
    return this.httpClient.delete('https://payziliapi3.azurewebsites.net/api/BusinessSettings/DeleteCouponSettings?ParentCompanyId=' + this.ParentCompanyId);
  }

  GetServicesList() {
    this.ParentCompanyId = parseInt(localStorage.getItem('companyId'));
    this.baseUrl = 'https://payziliapi3.azurewebsites.net/api/BusinessSettings/GetServiceCategoryList?ParentCompanyId=' + this.ParentCompanyId + '&PageNumber=1&PageSize=20';
    return this.httpClient.get<Observable<any>>(this.baseUrl, httpOptions).pipe(map(data => data));
  }

  add_services(Admin) {
    this.baseUrl = 'https://payziliapi3.azurewebsites.net/api/BusinessSettings/CreateServiceCategory';
    Admin.ParentCompanyId = parseInt(localStorage.getItem('companyId'));
    return this.httpClient.post<Observable<Admindetail>>(this.baseUrl, Admin, httpOptions)
    .pipe(map( data => data));
  }

  update_services(Admin) {
    this.baseUrl = 'https://payziliapi3.azurewebsites.net/api/BusinessSettings/UpdateServiceCategory';
    Admin.ParentCompanyId = parseInt(localStorage.getItem('companyId'));
    return this.httpClient.post<Observable<Admindetail>>(this.baseUrl, Admin, httpOptions)
    .pipe(map( data => data));
  }

  GetTurnCountList() {
    this.ParentCompanyId = parseInt(localStorage.getItem('companyId'));
    this.baseUrl = ' https://payziliapi3.azurewebsites.net/api/BusinessSettings/GetTurnCountList?ParentCompanyId=' + this.ParentCompanyId;
    return this.httpClient.get<Observable<any>>(this.baseUrl, httpOptions).pipe(map(data => data));
  }

  add_turncount(Admin) {
    this.baseUrl = 'https://payziliapi3.azurewebsites.net/api/BusinessSettings/CreateTurnCount';
    Admin.ParentCompanyId = parseInt(localStorage.getItem('companyId'));
    return this.httpClient.post<Observable<Admindetail>>(this.baseUrl, Admin, httpOptions)
    .pipe(map( data => data));
  }

  update_turncount(Admin) {
    this.baseUrl = 'https://payziliapi3.azurewebsites.net/api/BusinessSettings/UpdateTurnCount';
    Admin.ParentCompanyId = parseInt(localStorage.getItem('companyId'));
    return this.httpClient.post<Observable<Admindetail>>(this.baseUrl, Admin, httpOptions)
    .pipe(map( data => data));
  }

  GetExpLevelList() {
    this.ParentCompanyId = parseInt(localStorage.getItem('companyId'));
    this.baseUrl = ' https://payziliapi3.azurewebsites.net/api/BusinessSettings/GetExperienceLevel?ParentCompanyId=' + this.ParentCompanyId;
    return this.httpClient.get<Observable<any>>(this.baseUrl, httpOptions).pipe(map(data => data));
  }

  add_explevel(Admin) {
    this.baseUrl = 'https://payziliapi3.azurewebsites.net/api/BusinessSettings/CreateExperienceLevel';
    Admin.ParentCompanyId = parseInt(localStorage.getItem('companyId'));
    return this.httpClient.post<Observable<Admindetail>>(this.baseUrl, Admin, httpOptions)
    .pipe(map( data => data));
  }

  update_explevel(Admin) {
    this.baseUrl = ' https://payziliapi3.azurewebsites.net/api/BusinessSettings/UpdateExperienceLevel';
    Admin.ParentCompanyId = parseInt(localStorage.getItem('companyId'));
    return this.httpClient.post<Observable<Admindetail>>(this.baseUrl, Admin, httpOptions)
    .pipe(map( data => data));
  }

  toggle_business_coupon(Admin) {
    Admin.ParentCompanyId = parseInt(localStorage.getItem('companyId'));
    this.baseUrl = 'https://payziliapi3.azurewebsites.net/api/BusinessSettings/ToggleUpdateCouponsStng';
    return this.httpClient.post<Observable<Admindetail>>(this.baseUrl, Admin, httpOptions)
    .pipe(map( data => data));
  }

  GetTipAdjustmentList() {
    this.ParentCompanyId = parseInt(localStorage.getItem('companyId'));
    this.baseUrl = 'https://payziliapi3.azurewebsites.net/api/BusinessSettings/GetCompanyProfile?ParentCompanyId=' + this.ParentCompanyId;
    return this.httpClient.get<Observable<any>>(this.baseUrl, httpOptions).pipe(map(data => data));
  }

  add_business_inventory(Admin) {
    Admin.ParentCompanyId = parseInt(localStorage.getItem('companyId'));
    this.baseUrl = 'https://payziliapi3.azurewebsites.net/api/BusinessSettings/InventoryManageStock';
    return this.httpClient.post<Observable<Admindetail>>(this.baseUrl, Admin, httpOptions)
    .pipe(map( data => data));
  }

  GetBusinessInventory() {
    this.ParentCompanyId = parseInt(localStorage.getItem('companyId'));
    this.baseUrl = 'https://payziliapi3.azurewebsites.net/api/BusinessSettings/GetInventoryStock?ParentCompanyId=' + this.ParentCompanyId;
    return this.httpClient.get<Observable<any>>(this.baseUrl, httpOptions).pipe(map(data => data));
  }

  update_profiledetail(Admin) {
    // Admin.ParentCompanyId = parseInt(localStorage.getItem('companyId'));
    Admin.ParentCompanyId = parseInt(localStorage.getItem('companyId'));
    this.baseUrl = 'https://payziliapi3.azurewebsites.net/api/BusinessSettings/UpdateCompanyInfo';
    return this.httpClient.post<Observable<Admindetail>>(this.baseUrl, Admin, httpOptions)
    .pipe(map( data => data));
  }

  add_schedulebusiness(Admin) {
    Admin.ParentCompanyId = parseInt(localStorage.getItem('companyId'));
    this.baseUrl = 'https://payziliapi3.azurewebsites.net/api/BusinessSettings/saveBusinessSchedule';
    return this.httpClient.post<Observable<Admindetail>>(this.baseUrl, Admin, httpOptions)
    .pipe(map( data => data));
  }

  GetScheduleList() {
    this.ParentCompanyId = parseInt(localStorage.getItem('companyId'));
    this.baseUrl = ' https://payziliapi3.azurewebsites.net/api/BusinessSettings/GetBusinessSchedule?ParentCompanyId=' + this.ParentCompanyId;
    return this.httpClient.get<Observable<any>>(this.baseUrl, httpOptions).pipe(map(data => data));
  }

  GetPayPeriodList() {
    this.ParentCompanyId = parseInt(localStorage.getItem('companyId'));
    this.baseUrl = 'https://payziliapi3.azurewebsites.net/api/BusinessSettings/GetPayPeriod?ParentCompanyId=' + this.ParentCompanyId;
    return this.httpClient.get<Observable<any>>(this.baseUrl, httpOptions).pipe(map(data => data));
  }

  add_payperiod(Admin) {
    Admin.ParentCompanyId = parseInt(localStorage.getItem('companyId'));
    this.baseUrl = 'https://payziliapi3.azurewebsites.net/api/BusinessSettings/savePayPeriod ';
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
