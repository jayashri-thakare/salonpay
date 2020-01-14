import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
// import 'rxjs/add/operator/map'
import { map } from 'rxjs/operators';
import {Observable, of, Subject} from 'rxjs';
import {MessageService} from './message.service';
import { environment } from './../environments/environment';
import * as url from 'url';

class User {
}
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Access-Control-Allow-Origin': '*',
    // Authorization: localStorage.getItem('Token'),
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
    'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type, Accept, Origin,Access-Control-Allow-Origin'
  })
};

// class Userdetail {
// }

class userdetail {
}

@Injectable({
  providedIn: 'root'
})
export class UserdataService {
 	constructor(private httpClient: HttpClient) {
 	  // let url = environment.apiUrl;
    this.url = environment.apiUrl; }
  baseUrl = 'http://49.248.77.14:5555/api/account/signup';

  private obj: {};
  private userdetail: {};
  private string: string;
  // tslint:disable-next-line:indent
  private email: string;
  private userdata: any;
  private form: string;
  private url1: string;
  private url: string;
  emailnav: boolean;
  notificationnav: boolean;
  profilenav: boolean;
  accountnav: boolean;
  schedulenav: boolean;
  banknav: boolean;
  userId: any;
  private params;
  body: any;
  schedulebody: {};
  ParentCompanyId: number;
  editschedulebody: {};
  private subjects: Subject<any>[] = [];
 	// Service to sign up users
  // tslint:disable-next-line:indent
	public registerUsers(obj) {
 	  this.email = obj.Email;
    return this.httpClient.post(this.baseUrl, obj, httpOptions )
    .pipe(map(data => data));
  }

  public forgotPassword(obj) {
    this.baseUrl = 'http://49.248.77.14:7894/api/Account/ForgetPassword' ;
    return this.httpClient.post(this.baseUrl, obj, httpOptions )
      .pipe(map(data => data));
  }
  public resetPassword(obj) {
    this.baseUrl = 'http://49.248.77.14:7894/api/Account/ResetPassword';
    return this.httpClient.post(this.baseUrl, obj, httpOptions )
      .pipe(map(data => data));
  }

  getLogin(userdata) {
    this.baseUrl = 'http://49.248.77.14:5555/api/account/login';
    return this.httpClient.post(this.baseUrl, userdata, httpOptions )
      .pipe(map(data => data));
  }

  getUserAccount() {
    console.log(url);
    this.baseUrl = 'http://49.248.77.14:7894/api/ProfileMaster/GetTimeZone';
    return this.httpClient.get<Observable<userdetail>>(this.baseUrl, httpOptions).pipe(map( data => data));
  }

  getUserSignature() {
    this.ParentCompanyId = parseInt(localStorage.getItem('companyId'));
    this.baseUrl = 'http://49.248.77.14:7894/api/Email/GetEmailSignature?id=' + this.userId + '&parentCompanyId=' + this.ParentCompanyId;
    return this.httpClient.get<Observable<any>>(this.baseUrl, httpOptions).pipe(map(data => data));
  }

  getUserDetail() {
    if (this.userId === undefined) {
      this.userId = localStorage.getItem('userId');
    }
    // tslint:disable-next-line:indent
    this.ParentCompanyId = parseInt(localStorage.getItem('companyId'));
    this.baseUrl = 'http://49.248.77.14:7894/api/profile/getuserdetails?id=' + this.userId + '&parentCompanyId=' + this.ParentCompanyId;
    return this.httpClient.get<Observable<userdetail>>(this.baseUrl, httpOptions).pipe(map( data => data)
    );
  }

  getMasterNotification() {
    this.baseUrl = 'http://49.248.77.14:7894/api/notificationsetting/GetNotificationTypes';
    return this.httpClient.get<Observable<userdetail>>(this.baseUrl, httpOptions).pipe(map( data => data)
    );
  }
  getNotification() {
    this.ParentCompanyId = parseInt(localStorage.getItem('companyId'));
    this.baseUrl = 'http://49.248.77.14:7894/api/notificationsetting/GetNotifcationSetting?UserId=' + this.userId + '&ParentCompanyId=' + this.ParentCompanyId;
    return this.httpClient.get<Observable<userdetail>>(this.baseUrl, httpOptions).pipe(map( data => data)
    );
  }

  getUserSchedule() {
    if (this.userId === undefined) {
      this.userId = localStorage.getItem('userId');
   }
    this.ParentCompanyId = parseInt(localStorage.getItem('companyId'));
    this.baseUrl = 'http://49.248.77.14:7894/api/schedule/GetUserSchedule?id=' + this.userId + '&ParentCompanyID=' + this.ParentCompanyId;
    return this.httpClient.get<Observable<userdetail>>(this.baseUrl, httpOptions).pipe(map( data => data)
   );
 }

  getUpdateUserAccount() {
    if (this.userId === undefined) {
      this.userId = localStorage.getItem('userId');
  }
    this.ParentCompanyId = parseInt(localStorage.getItem('companyId'));
    this.baseUrl = 'http://49.248.77.14:7894/api/ProfileMaster/GetAccountSetting?id=' + this.userId + '&ParentCompanyID=' + this.ParentCompanyId;
    return this.httpClient.get<Observable<userdetail>>(this.baseUrl, httpOptions).pipe(map( data => data)
  );
  }

  delete(id: number) {
    return this.httpClient.delete(`http://172.16.0.99:8084/api/Signup/${id}`);
  }

  update_user_address(userdata) {
    this.baseUrl = 'http://49.248.77.14:7894/api/profile/editaddress';
    return this.httpClient.post<Observable<userdetail>>(this.baseUrl, userdata, httpOptions)
      .pipe(map( data => data));
  }

  update_signature(userdata) {
    this.baseUrl = 'http://49.248.77.14:7894/api/Email/SaveEmailSignature?';
    userdata.UserId = localStorage.getItem('userId');
    userdata.ParentCompanyId = parseInt (localStorage.getItem('companyId'));
    return this.httpClient.post<Observable<userdetail>>(this.baseUrl, userdata, httpOptions)
      .pipe(map( data => data));
  }

  update_account_edit(userdata) {
    this.baseUrl = 'http://49.248.77.14:7894/api/ProfileMaster/UpdateAccount?';
    // this.params = new HttpParams()
    //   .set('id', localStorage.getItem('userId'))
    //   .set('ParentCompanyId', localStorage.getItem('companyId'))
    //   .set('TimezoneId', userdata.TimezoneId)
    //   .set('LanguageId', userdata.LanguageId);
    userdata.ParentCompanyId = this.ParentCompanyId;
    userdata.UserId = this.userId;
    return this.httpClient.post<Observable<userdetail>>(this.baseUrl, userdata, httpOptions)
      .pipe(map( data => data));
  }

  update_notification(userdata) {
    this.baseUrl = 'http://49.248.77.14:7894/api/notificationsetting/NotoficationOnOff? ';
    userdata["UserId"] = localStorage.getItem('userId');
    userdata["ParentCompanyId"] = parseInt (localStorage.getItem('companyId'));
    // userdata["NotificationType"] = [{"Custom_notification": {"EnableEmailNotification": true}}]
    userdata = JSON.stringify(userdata)
    console.log(userdata)
    // userdata = {
    //   "UserId" :"0caf29b2-eeb8-436d-8213-f31042ceea6a",
    //   "ParentCompanyId":6,
    //   "NotificationType":	[{
    //     "Custom_notification":
    //       {
    //         "EnableTextNotification":false,
    //         "EnableEmailNotification":true
    //       },
    //     "General_notification":
    //       {
    //         "EnableTextNotification":false,
    //         "EnableEmailNotification":true
    //       }
    //
    //   }]}




    return this.httpClient.post<Observable<userdetail>>(this.baseUrl, userdata, httpOptions)
      .pipe(map( data => data));
  }

  add_schedule(userdata) {
    this.baseUrl = ' http://49.248.77.14:7894/api/schedule/saveUserSchedule?';
    userdata.ParentCompanyId = this.ParentCompanyId;
    userdata.UserId = this.userId;
    return this.httpClient.post<Observable<userdetail>>(this.baseUrl, userdata, httpOptions)
      .pipe(map( data => data));
  }

  update_schedule(userdata) {
    this.baseUrl = ' http://49.248.77.14:7894/api/schedule/UpdateOneDaySchedule?';
    userdata.ParentCompanyId = this.ParentCompanyId;
    userdata.UserId = this.userId;
    return this.httpClient.post<Observable<userdetail>>(this.baseUrl, userdata, httpOptions)
      .pipe(map( data => data));
  }

  update_timeoff(userdata) {
    this.baseUrl = ' http://49.248.77.14:7894/api/schedule/Timeoffrequest';
    userdata.ParentCompanyId = this.ParentCompanyId;
    userdata.UserId = this.userId;
    return this.httpClient.post<Observable<userdetail>>(this.baseUrl, userdata, httpOptions)
      .pipe(map( data => data));
  }

  update_profile_Users(userdata) {
    this.baseUrl = 'http://49.248.77.14:7894/api/profile/edituser';
    return this.httpClient.post<Observable<userdetail>>(this.baseUrl, userdata, httpOptions)
      .pipe(map( data => data));
  }

  update_user_password(userdata) {
    this.baseUrl = 'http://49.248.77.14:7894/api/Profile/EditUserPassword';
    return this.httpClient.post<Observable<userdetail>>(this.baseUrl, userdata, httpOptions)
      .pipe(map( data => data));
  }

  getUserUpdated() {
    this.getUserDetail().subscribe((data) => {
      this.userdetail = data;
    });
  }
  update_profile_service(form, userdata) {
    if (form.status == 'VALID') {
      userdata.id = this.userId;
      this.update_profile_Users(userdata).subscribe((data) => {
        this.publish('call-parent');
      });
    } else {
      console.log(userdata);
    }
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

}
