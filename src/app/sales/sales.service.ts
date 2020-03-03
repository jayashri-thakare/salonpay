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
    this.baseUrl = 'http://172.16.0.114:5656/api/Customers/GetCustomersProfile?ParentCompanyId=' + this.parentId + '&CustomerId=' + this.customerId;
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
}
