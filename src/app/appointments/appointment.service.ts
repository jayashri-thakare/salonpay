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
export class AppointmentService {
  private res: Object;
  apptime: any;
  appObj: any
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
  bookedTime: any;
  arrayofselectedappointment : Array<any> = []; 
  constructor(private httpClient: HttpClient, private messageService: MessageService) { }

  public showNav(nav) {
    this.navTab = nav;
    console.log(this.navTab);
  }

  deleteNote(noteid) {
    return this.httpClient.delete(' http://172.16.0.99:8011/api/Notes/DisableNotes?Id=' + noteid);
  }

  getAllServices() {
    this.ParentCompanyId = parseInt(localStorage.getItem('companyId'));
    this.baseUrl = 'https://payziliapi3.azurewebsites.net/api/Services/GetServicesList?ParentCompanyId=' + this.ParentCompanyId +'&ServiceId=0&PageNumber=1&PageSize=20';
    return this.httpClient.get<Observable<any>>(this.baseUrl, httpOptions).pipe(map(data => data));
  }

  getAppointmentList() {
    this.ParentCompanyId = parseInt(localStorage.getItem('companyId'));
    this.baseUrl = 'http://172.16.0.114:5555/api/Appointments/GetAppointmentList?ParentCompanyId=' + this.ParentCompanyId +'&ServiceId=0&PageNumber=1&PageSize=20';
    return this.httpClient.get<Observable<any>>(this.baseUrl, httpOptions).pipe(map(data => data));
  }

  tecBookTime(tech) {
    var app = {}
    app['technicianId'] = tech.id
    app['appointmentDate'] = tech.appointmentDate;
    app['parentCompanyId'] = parseInt(localStorage.getItem('companyId'));

  //
  //   var app={
  //   "technicianId": "cfe2e89c-8c8a-47fc-8b72-d4a9ded74079",
  //   "parentCompanyId": 6,
  //   "appointmentDate": "7/11/2020",
  //   "bookedTime": [
  //     "string"
  //   ],
  //   "requestTimeOff": [
  //     "string"
  //   ]
  // }
      this.baseUrl = 'http://172.16.0.114:5555/api/Appointments/GetTechBookedTime';
    return this.httpClient.post<Observable<any>>(this.baseUrl, app, httpOptions).pipe(map(data => data));
  }


  getSearchService(name) {
    this.ParentCompanyId = parseInt(localStorage.getItem('companyId'));
    this.baseUrl = 'http://172.16.0.114:5555/api/Appointments/SearchServiceByName?ParentCompanyId=' + this.ParentCompanyId +'&ServiceName='+name;
    return this.httpClient.get<Observable<any>>(this.baseUrl, httpOptions).pipe(map(data => data));
  }

  getSearchTechnician(name) {
    this.ParentCompanyId = parseInt(localStorage.getItem('companyId'));
    this.baseUrl = 'http://172.16.0.114:5555/api/Appointments/SearchTechniciansByName?ParentCompanyId=' + this.ParentCompanyId +'&Name='+name;
    return this.httpClient.get<Observable<any>>(this.baseUrl, httpOptions).pipe(map(data => data));
}
  getServiceTechnician(serviceids) {
    let parentCompanyId = parseInt(localStorage.getItem('companyId'));
    let service ={};

    service['parentCompanyId'] = parentCompanyId;
    service['serviceIds'] = [9, 15]
    this.baseUrl = 'http://172.16.0.114:5555/api/Appointments/GetTechniciansList'
    return this.httpClient.post<Observable<any>>(this.baseUrl, service,  httpOptions).pipe(map(data => data));
  }

  addNote(note) {
    this.baseUrl = 'http://172.16.0.99:8011/api/Notes/AddNotes';
    note['ParentCompanyId'] = parseInt(localStorage.getItem('companyId'));
    note['CreatedBy'] = localStorage.getItem('userId')
    return this.httpClient.post<Observable<Customerdetail>>(this.baseUrl, note, httpOptions)
      // tslint:disable-next-line:align
      .pipe(map( data => data) );
  }


  getAllAppointment(){
    this.ParentCompanyId = parseInt(localStorage.getItem('companyId'));
    this.baseUrl = 'http://172.16.0.114:5555/api/Appointments/GetAppointmentList?ParentCompanyId=' + this.ParentCompanyId + '&PageNumber=1&PageSize=20';
    return this.httpClient.get<Observable<any>>(this.baseUrl, httpOptions).pipe(map(data => data));
  }

  getCustomerList() {
    this.ParentCompanyId = parseInt(localStorage.getItem('companyId'));
    this.baseUrl = 'http://172.16.0.114:5555/api/Customers/GetCustomersList?ParentCompanyId=' + this.ParentCompanyId + '&PageNumber=1&PageSize=20';
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
  create_appointment(appointment) {
    debugger;
    appointment.lastModifiedBy = localStorage.userId;
    appointment.createdBy = localStorage.userId;
    this.baseUrl = 'http://172.16.0.114:5555/api/Appointments/CreateAppointment';
    return this.httpClient.post<Observable<any>>(this.baseUrl, appointment, httpOptions)
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
