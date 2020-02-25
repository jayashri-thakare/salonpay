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

class imagepath {
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
  imagepath: string;
  arrayofselectedcustobj: Array<any> = [];
  constructor(private httpClient: HttpClient, private messageService: MessageService) { }

  public showNav(nav) {
    this.navTab = nav;
    console.log(this.navTab);
  }

  selectedCustomerObj(selected_obj){
    var index = this.arrayofselectedcustobj.indexOf(selected_obj);
    if(index<0){
      this.arrayofselectedcustobj.splice(index, 1);
      this.arrayofselectedcustobj.push(selected_obj);
    }
    localStorage.setItem('Arrayofcustomer', JSON.stringify(this.arrayofselectedcustobj[0].id))
    console.log(this.arrayofselectedcustobj)
  }

  add_customer(customer) {
    customer.ParentCompanyId = parseInt(localStorage.companyId);
    customer.CreatedByUserId = localStorage.userId;
    this.baseUrl = 'http://172.16.0.114:5656/api/Customers/CreateCustomer';
    return this.httpClient.post<Observable<Customerdetail>>(this.baseUrl, customer, httpOptions)
  .pipe(map( data => data));
  }

  getCustomerList() {
    this.ParentCompanyId = parseInt(localStorage.getItem('companyId'));
    this.baseUrl = 'http://172.16.0.114:5656/api/Customers/GetCustomersList?ParentCompanyId=' + this.ParentCompanyId + '&PageNumber=1&PageSize=20';
    return this.httpClient.get<Observable<any>>(this.baseUrl, httpOptions).pipe(map(data => data));
  }

  update_customer_profile(customer) {
    debugger;
    customer.lastModifiedByUserId = localStorage.userId;
    customer.id = parseInt(localStorage.Arrayofcustomer);
    customer.parentCompanyId = parseInt(localStorage.getItem('companyId'));
    this.baseUrl = 'http://172.16.0.114:5656/api/Customers/EditCustomer';
    return this.httpClient.post<Observable<Customerdetail>>(this.baseUrl, customer, httpOptions)
  .pipe(map( data => data));
  }

  upload_customer_profile_image(userdata) {
	  this.baseUrl = 'http://172.16.0.114:5656/api/Customers/UploadProfilePicture';
    const input = new FormData();
    input.append('ParentCompanyId', localStorage.companyId)
    input.append('CustomerId', '1');
	  input.append('file', userdata[0]);
   this.httpClient.post(this.baseUrl, input).subscribe((val) => {
      this.imagepath = '';
      this.imagepath = 'http://172.16.0.114:5656/' + val['profilePicPath'] ;
    });
  }

  getCustomerProfilePic(customerId) {
    this.ParentCompanyId = parseInt(localStorage.getItem('companyId'));
    this.baseUrl = 'http://172.16.0.114:5656/api/Customers/GetProfilePicture?CustomerId=' + customerId + '&ParentCompanyId=' + this.ParentCompanyId;
    this.httpClient.get<Observable<imagepath>>(this.baseUrl).subscribe((data) => {
      this.imagepath = '';
      this.imagepath =  'http://172.16.0.114:5656/' + data['path'];
    });
  }

  getCustomerProfile(customerId) {
    this.ParentCompanyId = parseInt(localStorage.getItem('companyId'));
    this.baseUrl = 'http://172.16.0.114:5656/api/Customers/GetCustomersProfile?ParentCompanyId=' + this.ParentCompanyId + '&CustomerId=' + customerId;
    return this.httpClient.get<Observable<any>>(this.baseUrl, httpOptions).pipe(map(data => data));
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
