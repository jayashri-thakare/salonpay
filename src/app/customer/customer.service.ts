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
    // Authorization: localStorage.getItem('Token'),
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
    'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type, Accept, Origin'
  })
};

class Customerdetail {
}

class notes {
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
  note: {
    description: any;
    title: any;
  };
  constructor(private httpClient: HttpClient, private messageService: MessageService) { }

  public showNav(nav) {
    this.navTab = nav;
    console.log(this.navTab);
  }

  add_customer(customer) {
    customer.CreatedByUserId = localStorage.userId;
    this.baseUrl = 'http://172.16.0.114:5656/api/Customers/CreateCustomer';
    return this.httpClient.post<Observable<Customerdetail>>(this.baseUrl, customer, httpOptions)
  .pipe(map( data => data));
  }

  getNotes() {
    this.ParentCompanyId = parseInt(localStorage.getItem('companyId'));
    this.baseUrl = 'http://172.16.0.99:8011/api/Notes/GetAllNotes?ParentCompanyId=66&PageNumber=1&PageSize=5&ClientId=5cc9b3d9-a0c6-445a-bce4-7b53ec0b73d3';
    return this.httpClient.get<Observable<Customerdetail>>(this.baseUrl, httpOptions).pipe(map(data => data));
  }

  addNote(note) {
    this.baseUrl = 'http://172.16.0.99:8011/api/Notes/AddNotes';
    note['ParentCompanyId'] = parseInt(localStorage.getItem('companyId'));
    note['CreatedBy'] = localStorage.getItem('userId')
    return this.httpClient.post<Observable<Customerdetail>>(this.baseUrl, note, httpOptions)
      // tslint:disable-next-line:align
      .pipe(map( data => data) );
  }

  getCustomerList() {
    this.ParentCompanyId = parseInt(localStorage.getItem('companyId'));
    this.baseUrl = 'http://172.16.0.114:5656/api/Customers/GetCustomersList?ParentCompanyId=' + this.ParentCompanyId + '&PageNumber=1&PageSize=20';
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
