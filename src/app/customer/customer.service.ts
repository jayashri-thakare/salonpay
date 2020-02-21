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

class Customerdetail {
}

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private res: Object;
  private result: {
    serviceDetails: { serviceId: any };
  };
  subjects: any;
  baseUrl: string;
  ParentCompanyId: number;
  public navTab = 1;
  constructor(private httpClient: HttpClient, private messageService: MessageService) { }

  public showNav(nav) {
    this.navTab = nav;
    console.log(this.navTab);
  }

  add_customer(customer) {
    customer.CreatedByUserId = localStorage.userId;
    this.baseUrl = 'http://172.16.0.114:5555/api/Customers/CreateCustomer';
    return this.httpClient.post<Observable<Customerdetail>>(this.baseUrl, customer, httpOptions)
  .pipe(map( data => data));
  }

  getCustomerList() {
    this.ParentCompanyId = parseInt(localStorage.getItem('companyId'));
    this.baseUrl = 'http://172.16.0.114:5555/api/Customers/GetCustomersList?ParentCompanyId=' + this.ParentCompanyId + '&PageNumber=1&PageSize=20';
    return this.httpClient.get<Observable<any>>(this.baseUrl, httpOptions).pipe(map(data => data));
  }

  update_customer_profile(customer) {
    debugger;
    customer.CreatedByUserId = localStorage.userId;
    this.baseUrl = 'http://172.16.0.114:5555/api/Customers/CreateCustomer';
    return this.httpClient.post<Observable<Customerdetail>>(this.baseUrl, customer, httpOptions)
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
