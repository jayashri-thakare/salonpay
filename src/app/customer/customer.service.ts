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
  private subjects: Subject<any>[] = [];
  baseUrl: string;
  ParentCompanyId: number;
  public navTab = 1;
  note: {
    description: any;
    title: any;
    id: any;
  };
  imagepath: string;
  arrayofselectedcustobj: Array<any> = [];
  private customId: string;
  customerId: number;
  constructor(private httpClient: HttpClient, private messageService: MessageService) { }

  public showNav(nav) {
    this.navTab = nav;
    console.log(this.navTab);
  }

  deleteNote(noteid) {
    return this.httpClient.delete(' http://172.16.0.99:8011/api/Notes/DisableNotes?Id=' + noteid);
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
    this.baseUrl = 'http://172.16.0.114:5555/api/Customers/CreateCustomer';
    return this.httpClient.post<Observable<Customerdetail>>(this.baseUrl, customer, httpOptions)
  .pipe(map( data => data));
  }

  getNotes() {
    this.ParentCompanyId = parseInt(localStorage.getItem('companyId'));
    this.customId = localStorage.getItem('Arrayofcustomer');
    this.baseUrl = 'http://172.16.0.99:8011/api/Notes/GetAllNotes?ParentCompanyId='+ this.ParentCompanyId +'&PageNumber=1&PageSize=20&ClientId='+this.customId;
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
    this.baseUrl = 'http://172.16.0.114:5555/api/Customers/GetCustomersList?ParentCompanyId=' + this.ParentCompanyId + '&PageNumber=1&PageSize=40';
    return this.httpClient.get<Observable<any>>(this.baseUrl, httpOptions).pipe(map(data => data));
  }

  update_customer_profile(customer) {
    debugger;
    customer.lastModifiedByUserId = localStorage.userId;
    customer.id = parseInt(localStorage.Arrayofcustomer);
    customer.parentCompanyId = parseInt(localStorage.getItem('companyId'));
    this.baseUrl = 'http://172.16.0.114:5555/api/Customers/EditCustomer';
    return this.httpClient.post<Observable<Customerdetail>>(this.baseUrl, customer, httpOptions)
  .pipe(map( data => data));
  }

  update_customer_profile_address(customer) {
    debugger;
    // customer.lastModifiedByUserId = localStorage.userId;
    customer.customerId = parseInt(localStorage.Arrayofcustomer);
    customer.parentCompanyId = parseInt(localStorage.getItem('companyId'));
    this.baseUrl = 'http://172.16.0.114:5555/api/Customers/EditAddress';
    return this.httpClient.post<Observable<Customerdetail>>(this.baseUrl, customer, httpOptions)
  .pipe(map( data => data));
  }

  update_status(customer) {
    debugger;
    // customer.lastModifiedByUserId = localStorage.userId;
    customer.id = parseInt(localStorage.Arrayofcustomer);
    customer.parentCompanyId = parseInt(localStorage.getItem('companyId'));
    this.baseUrl = 'http://172.16.0.114:5555/api/Customers/ToggleUpdateStatus';
    return this.httpClient.post<Observable<Customerdetail>>(this.baseUrl, customer, httpOptions)
  .pipe(map( data => data));
  }

  update_emailRemainder(customer) {
    debugger;
    // customer.lastModifiedByUserId = localStorage.userId;
    customer.id = parseInt(localStorage.Arrayofcustomer);
    customer.parentCompanyId = parseInt(localStorage.getItem('companyId'));
    this.baseUrl = 'http://172.16.0.114:5555/api/Customers/ToggleUpdateEmailReminder';
    return this.httpClient.post<Observable<Customerdetail>>(this.baseUrl, customer, httpOptions)
  .pipe(map( data => data));
  }

  update_smsRemainder(customer) {
    debugger;
    // customer.lastModifiedByUserId = localStorage.userId;
    customer.id = parseInt(localStorage.Arrayofcustomer);
    customer.parentCompanyId = parseInt(localStorage.getItem('companyId'));
    this.baseUrl = 'http://172.16.0.114:5555/api/Customers/ToggleUpdateSmsReminder';
    return this.httpClient.post<Observable<Customerdetail>>(this.baseUrl, customer, httpOptions)
  .pipe(map( data => data));
  }

  upload_customer_profile_image(userdata) {
	  this.baseUrl = 'http://172.16.0.114:5555/api/Customers/UploadProfilePicture';
    const input = new FormData();
    input.append('ParentCompanyId', localStorage.companyId)
    input.append('CustomerId', localStorage.Arrayofcustomer);
	  input.append('file', userdata[0]);
   this.httpClient.post(this.baseUrl, input).subscribe((val) => {
      this.imagepath = '';
      this.imagepath = 'http://172.16.0.114:5555/' + val['profilePicPath'] ;
    });
  }

  getCustomerProfilePic(customerId) {
    this.ParentCompanyId = parseInt(localStorage.getItem('companyId'));
    this.baseUrl = 'http://172.16.0.114:5555/api/Customers/GetProfilePicture?CustomerId=' + customerId + '&ParentCompanyId=' + this.ParentCompanyId;
    this.httpClient.get<Observable<imagepath>>(this.baseUrl).subscribe((data) => {
      this.imagepath = '';
      this.imagepath =  'http://172.16.0.114:5555/' + data['path'];
    });
  }

  getCustomerProfile(customerId) {
    this.ParentCompanyId = parseInt(localStorage.getItem('companyId'));
    this.baseUrl = 'http://172.16.0.114:5555/api/Customers/GetCustomersProfile?ParentCompanyId=' + this.ParentCompanyId + '&CustomerId=' + customerId;
    return this.httpClient.get<Observable<any>>(this.baseUrl, httpOptions).pipe(map(data => data));
  }

  getCustomerSales() {
    this.ParentCompanyId = parseInt(localStorage.getItem('companyId'));
    this.customerId = parseInt(localStorage.getItem('customerId'));
    this.baseUrl = 'http://172.16.0.99:8044/api/CreateSale/GetCustomerSell?ParentCompanyId=' + this.ParentCompanyId + '&CustomerId=' + this.customerId;
    return this.httpClient.get<Observable<any>>(this.baseUrl, httpOptions).pipe(map(data => data));
  }

  getCustomerHistory(customerId) {
    this.baseUrl = 'http://172.16.0.114:5555/api/Customers/GetCustomersHistory?CustomerId=' + customerId + '&PageNumber=1&PageSize=10';
    return this.httpClient.get<Observable<any>>(this.baseUrl, httpOptions).pipe(map(data => data));
  }

  getCustomerRecentSale() {
    this.ParentCompanyId = parseInt(localStorage.getItem('companyId'));
    this.customId = localStorage.getItem('Arrayofcustomer');
    this.baseUrl = 'http://172.16.0.99:8044/api/CustomerDashboard/GetCustomerDashboardRecentSale?ParentCompanyId='+ this.ParentCompanyId + '&CustomerId=' + this.customId;
    return this.httpClient.get<Observable<Customerdetail>>(this.baseUrl, httpOptions).pipe(map(data => data));
  }

  getCustomerRecentAppointment() {
    this.ParentCompanyId = parseInt(localStorage.getItem('companyId'));
    this.customId = localStorage.getItem('Arrayofcustomer');
    this.baseUrl = 'http://172.16.0.99:8044/api/CustomerDashboard/GetAppointmentbyCustomer?ParentCompanyId='+ this.ParentCompanyId + '&CustomerId=' + this.customId;
    return this.httpClient.get<Observable<Customerdetail>>(this.baseUrl, httpOptions).pipe(map(data => data));
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
