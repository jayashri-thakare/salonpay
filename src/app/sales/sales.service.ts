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

class customerProfile {
}

@Injectable({
  providedIn: 'root'
})
export class SalesService {
  private res: Object;
  private result: {
    serviceDetails: { serviceId: any };
  };
  couponName: string;
  private baseUrl: string;
  public selectedCustomer;
  private customerId: any;
  private parentId: number;
  customid: any;
  arrayofselectedobj: Array<any> = [];
  constructor(private httpClient: HttpClient, private messageService: MessageService) {
  }

  getCustomers() {
    this.parentId = parseInt(localStorage.getItem('companyId'));
    this.baseUrl = 'http://172.16.0.99:8044/api/Sales/GetAllCustomers?ParentCompanyId=' + this.parentId + '&PageNumber=1&PageSize=5';
    return this.httpClient.get<Observable<any>>(this.baseUrl, httpOptions).pipe(map(data => data));
  }

  storeCustomer(id) {
    localStorage.setItem('customerId', id);
  }

  getCustomerDetails() {
    this.parentId = parseInt(localStorage.getItem('companyId'));
    this.customerId = parseInt(localStorage.getItem('customerId'));
    if (this.customid) {
      this.customerId = this.customid;
    }
    this.baseUrl = 'http://172.16.0.114:5555/api/Customers/GetCustomersProfile?ParentCompanyId=' + this.parentId + '&CustomerId=' + this.customerId;
    return this.httpClient.get<Observable<customerProfile>>(this.baseUrl, httpOptions).pipe(map(data => data));
  }

  searchCustomer(name) {
    this.parentId = parseInt(localStorage.getItem('companyId'));
    this.baseUrl = 'http://172.16.0.99:8044/api/Sales/GetAllCustomersBySearch?ParentCompanyId=' + this.parentId + '&searchtxt=' + name;
    return this.httpClient.get<Observable<any>>(this.baseUrl, httpOptions).pipe(map(data => data));
    // this.httpClient.get<Observable<customerProfile>>(this.baseUrl).subscribe((data) => {
    //   debugger;
    //   this.customerId = data['id'];
    //   // this.baseUrl = 'http://172.16.0.114:5656/api/Customers/GetCustomersProfile?ParentCompanyId=' + this.parentId + '&CustomerId=' + this.customerId;
    //   // return this.httpClient.get<Observable<customerProfile>>(this.baseUrl, httpOptions).pipe(map(data => data));
    // });
    // return customerProfile;
  }

  getServicesByCategoryId(serviceid) {
    this.baseUrl = 'http://172.16.0.99:8044/api/Sales/GetServicesByCategoryId?ServiceCategoryId=' + serviceid;
    return this.httpClient.get<Observable<any>>(this.baseUrl, httpOptions).pipe(map(data => data));
  }

  getAllAddedServices(serviceid) {
    this.parentId = parseInt(localStorage.getItem('companyId'));
    this.baseUrl = 'http://172.16.0.99:8044/api/Sales/GetAddOnsByServiceId?ServiceId=' + serviceid + '&ParentCompanyId=' + this.parentId;
    return this.httpClient.get<Observable<any>>(this.baseUrl, httpOptions).pipe(map(data => data));
  }

  GetProductList() {
    this.parentId = parseInt(localStorage.getItem('companyId'));
    this.baseUrl = ' http://172.16.0.99:8055/api/Inventory/GetProductCategory?ParentCompanyId=' + this.parentId;
    return this.httpClient.get<Observable<any>>(this.baseUrl, httpOptions).pipe(map(data => data));
  }

  create_sales(Sales) {
    this.baseUrl = 'http://172.16.0.99:8044/api/CreateSale/CreateSale';
    Sales.ParentCompanyId = parseInt(localStorage.getItem('companyId'));
    return this.httpClient.post<Observable<any>>(this.baseUrl, Sales, httpOptions)
    .pipe(map( data => data));
  }

  create_sales_service(Sales) {
    this.baseUrl = 'http://172.16.0.99:8044/api/CreateSale/SaveServices';
    Sales.ParentCompanyId = parseInt(localStorage.getItem('companyId'));
    return this.httpClient.post<Observable<any>>(this.baseUrl, Sales, httpOptions)
    .pipe(map( data => data));
  }

  create_sales_product(Sales) {
    this.baseUrl = 'http://172.16.0.99:8044/api/CreateSale/SaveProducts';
    Sales.ParentCompanyId = parseInt(localStorage.getItem('companyId'));
    return this.httpClient.post<Observable<any>>(this.baseUrl, Sales, httpOptions)
    .pipe(map( data => data));
  }

  getCustomerProductCart(Sales) {
    this.baseUrl = 'http://172.16.0.99:8044/api/CreateSale/GetProductDetails?SaleId=' + Sales;
    return this.httpClient.get<Observable<any>>(this.baseUrl, httpOptions).pipe(map(data => data));
  }

  getCustomerServices(Sales) {
    this.baseUrl = 'http://172.16.0.99:8044/api/CreateSale/GetServicesAndAddOnServices?SaleId=' + Sales;
    return this.httpClient.get<Observable<any>>(this.baseUrl, httpOptions).pipe(map(data => data));
  }

  getCustomerServiceTechnicians(Sales) {
    this.parentId = parseInt(localStorage.getItem('companyId'));
    this.baseUrl = 'http://172.16.0.99:8044/api/CreateSale/GetTechnicianList?SaleId=' + Sales + '&parentCompanyId=6' + this.parentId;
    return this.httpClient.get<Observable<any>>(this.baseUrl, httpOptions).pipe(map(data => data));
  }

  getCustomerReward(Sales) {
    this.baseUrl = 'http://172.16.0.99:8044/api/CreateSale/GetCustomerRewward?CustomerId=' + Sales;
    return this.httpClient.get<Observable<any>>(this.baseUrl, httpOptions).pipe(map(data => data));
  }

  add_reward(Sales) {
    this.baseUrl = 'http://172.16.0.99:8044/api/CreateSale/PostCustomerRewward';
    Sales.CustomerId = parseInt(localStorage.getItem('customerId'));
    return this.httpClient.post<Observable<any>>(this.baseUrl, Sales, httpOptions)
    .pipe(map( data => data));
  }

  add_coupon(Sales) {
    this.baseUrl = 'http://172.16.0.99:8044/api/CreateSale/CoupanValidOrNot?CoupanCode=' + Sales.CouponCode;
    return this.httpClient.get<Observable<any>>(this.baseUrl, httpOptions)
    .pipe(map( data => data));
  }

  create_final_sales(Sales) {
    this.baseUrl = 'http://172.16.0.99:8044/api/CreateSale/SaveFinalSale';
    return this.httpClient.post<Observable<any>>(this.baseUrl, Sales, httpOptions)
    .pipe(map( data => data));
  }

  create_merge_sales(Sales) {
    this.baseUrl = 'http://172.16.0.99:8044/api/CreateSale/SaveMergeSale';
    return this.httpClient.post<Observable<any>>(this.baseUrl, Sales, httpOptions)
    .pipe(map( data => data));
  }

  getCustomerMergeSales() {
    this.parentId = parseInt(localStorage.getItem('companyId'));
    this.baseUrl = 'http://172.16.0.99:8044/api/CreateSale/GetOperSaleForMargeList?ParentCompanyId=' + this.parentId;
    return this.httpClient.get<Observable<any>>(this.baseUrl, httpOptions).pipe(map(data => data));
  }

  getProductByCategoryId(productid) {
    this.baseUrl = 'http://172.16.0.99:8044/api/Sales/GetProductByCategoryId?ProductCategoryId=' + productid;
    return this.httpClient.get<Observable<any>>(this.baseUrl, httpOptions).pipe(map(data => data));
  }

  getTipData(Sales) {
    this.baseUrl = 'http://172.16.0.99:8044/api/CreateSale/GetTipData?SaleId=' + Sales;
    return this.httpClient.get<Observable<any>>(this.baseUrl, httpOptions).pipe(map(data => data));
  }

  create_final_sales_tip(Sales) {
    this.parentId = parseInt(localStorage.getItem('companyId'));
    this.baseUrl = 'http://172.16.0.99:8044/api/CreateSale/PostTipData';
    return this.httpClient.post<Observable<any>>(this.baseUrl, Sales, httpOptions)
    .pipe(map( data => data));
  }
}
