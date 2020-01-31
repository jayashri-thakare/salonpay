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
    'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type, Accept, Origin'
  })
};

// class Userdetail {
// }

class userdetail {
}

class timeZonesList {
}

@Injectable({
  providedIn: 'root'
})
export class UserdataService {
  // tslint:disable-next-line:ban-types
  imagepath: string;
 	constructor(private httpClient: HttpClient) {
 	  // let url = environment.apiUrl;
    this.url = environment.apiUrl; }
  baseUrl = 'https://payziliapi3.azurewebsites.net/api/account/signup';

  private obj: {};
  private userdetail: {};
  private timeZonesList: {};
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
  office_ClientID = '6196a40d-aa7e-4069-80a5-312865bb368c';
  office_ClientSecret = '__2uE:eybf6f/llxTBcBBeOwZIrXoI95';
  office_TenantID = '819c5746-460c-416e-b656-d4f259797ea6';

  private subjects: Subject<any>[] = [];
 	// Service to sign up users
  // tslint:disable-next-line:indent
	public registerUsers(obj) {
 	  this.email = obj.Email;
    return this.httpClient.post(this.baseUrl, obj, httpOptions )
    .pipe(map(data => data));
  }

  public forgotPassword(obj) {
    this.baseUrl = 'https://payzliapi1.azurewebsites.net/api/Account/ForgetPassword' ;
    return this.httpClient.post(this.baseUrl, obj, httpOptions )
      .pipe(map(data => data));
  }
  public resetPassword(obj) {
    this.baseUrl = 'https://payzliapi1.azurewebsites.net/api/Account/ResetPassword';
    return this.httpClient.post(this.baseUrl, obj, httpOptions )
      .pipe(map(data => data));
  }

  getLogin(userdata) {
    this.baseUrl = 'https://payziliapi3.azurewebsites.net/api/account/login';
    return this.httpClient.post(this.baseUrl, userdata, httpOptions )
      .pipe(map(data => data));
  }

  addOffice(userdata) {
    // tslint:disable-next-line:no-debugger
  	debugger;
	  // const input = new URLSearchParams();
   //  // input.append('grant_type', 'password');
	  // // input.append('scope', ' https://graph.microsoft.com/.default');
	  // // input.append('client_id', this.office_ClientID);
	  // // input.append('client_secret', this.office_ClientSecret);
	  // input.append('password', userdata.password);
	  // input.append('username', userdata.username);

   // this.baseUrl = 'https://login.microsoftonline.com/819c5746-460c-416e-b656-d4f259797ea6/oauth2/v2.0/token ';
   //  let body = JSON.stringify(input)
   //  const httpOptions = {
   //    headers: new HttpHeaders({
   //      'Content-Type': 'application/x-www-form-urlencoded'
   //      // Authorization: 'Basic ' + btoa('client_id' + ':' + '__2uE:eybf6f/llxTBcBBeOwZIrXoI95')
   //    })
   //  };

   	//   const input = new URLSearchParams();
    //   input.append('grant_type', 'password');
	  // input.append('scope', ' https://graph.microsoft.com/.default');
	  // input.append('client_id', this.office_ClientID);
	  // input.append('client_secret', this.office_ClientSecret);
	  // input.append('password', 'vx!4Un7E%928');
	  // input.append('username', 'kapil@payzli.com');

   // this.baseUrl = 'https://login.microsoftonline.com/819c5746-460c-416e-b656-d4f259797ea6/oauth2/v2.0/token ';
    this.baseUrl = 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=6196a40d-aa7e-4069-80a5-312865bb368c&response_type=code&redirect_uri=https://payzli.leosys.net/dashboard&response_mode=query&scope=offline_access%20user.read%20mail.read&user.read.all%20&state=12345';

  //   let body = JSON.stringify(input)
  //   const httpOptions = {
	//   headers: new HttpHeaders({
	//     'Content-Type':  'application/x-www-form-urlencoded',
	//     'Access-Control-Allow-Origin': '*'
	//   })
	// }

    this.httpClient.post(this.baseUrl, httpOptions).subscribe((val) => {
      debugger
    });


	  // this.httpClient.post(this.baseUrl, body, httpOptions).subscribe((val) => {
    //   debugger;
    // });
  }

  getUserAccount() {
    console.log(url);
    this.baseUrl = 'https://payzliapi1.azurewebsites.net/api/ProfileMaster/GetTimeZone';
    return this.httpClient.get<Observable<timeZonesList>>(this.baseUrl, httpOptions).pipe(map( data => data));
  }

  getUserSignature() {
    this.ParentCompanyId = parseInt(localStorage.getItem('companyId'));
    this.baseUrl = 'https://payzliapi1.azurewebsites.net/api/Email/GetEmailSignature?id=' + this.userId + '&parentCompanyId=' + this.ParentCompanyId;
    return this.httpClient.get<Observable<any>>(this.baseUrl, httpOptions).pipe(map(data => data));
  }

  getUserDetail() {
    if (this.userId === undefined) {
      this.userId = localStorage.getItem('userId');
    }
    // tslint:disable-next-line:indent
    this.ParentCompanyId = parseInt(localStorage.getItem('companyId'));
    this.baseUrl = 'https://payzliapi1.azurewebsites.net/api/profile/getuserdetails?id=' + this.userId + '&parentCompanyId=' + this.ParentCompanyId;
    return this.httpClient.get<Observable<userdetail>>(this.baseUrl, httpOptions).pipe(map( data => data)
    );
  }

  getMasterNotification() {
    this.baseUrl = 'https://payzliapi1.azurewebsites.net/api/notificationsetting/GetNotificationTypes';
    return this.httpClient.get<Observable<userdetail>>(this.baseUrl, httpOptions).pipe(map( data => data)
    );
  }
  getNotification() {
    this.ParentCompanyId = parseInt(localStorage.getItem('companyId'));
    this.baseUrl = 'https://payzliapi1.azurewebsites.net/api/notificationsetting/GetNotifcationSetting?id=' + this.userId + '&parentCompanyId=' + this.ParentCompanyId;
    return this.httpClient.get<Observable<userdetail>>(this.baseUrl, httpOptions).pipe(map( data => data)
    );
  }

  getUserSchedule() {
    if (this.userId === undefined) {
      this.userId = localStorage.getItem('userId');
   }
    this.ParentCompanyId = parseInt(localStorage.getItem('companyId'));
    this.baseUrl = 'https://payzliapi1.azurewebsites.net/api/schedule/GetUserSchedule?id=' + this.userId + '&ParentCompanyID=' + this.ParentCompanyId;
    return this.httpClient.get<Observable<userdetail>>(this.baseUrl, httpOptions).pipe(map( data => data)
   );
 }

  getUpdateUserAccount() {
    if (this.userId === undefined) {
      this.userId = localStorage.getItem('userId');
  }
    this.ParentCompanyId = parseInt(localStorage.getItem('companyId'));
    this.baseUrl = 'https://payzliapi1.azurewebsites.net/api/ProfileMaster/GetAccountSetting?id=' + this.userId + '&ParentCompanyID=' + this.ParentCompanyId;
    return this.httpClient.get<Observable<userdetail>>(this.baseUrl, httpOptions).pipe(map( data => data)
  );
  }

  delete(id: number) {
    return this.httpClient.delete(`http://172.16.0.99:8084/api/Signup/${id}`);
  }

  update_user_address(userdata) {
    this.baseUrl = 'https://payzliapi1.azurewebsites.net/api/profile/editaddress';
    return this.httpClient.post<Observable<userdetail>>(this.baseUrl, userdata, httpOptions)
      .pipe(map( data => data));
  }

  deleteUserSchedule(deldata) {
    return this.httpClient.delete('https://payzliapi1.azurewebsites.net/api/schedule/Delete?id=' + this.userId + '&ParentCompanyID=' + this.ParentCompanyId + '&DayName=' + deldata);
  }

  update_signature(userdata) {
    this.baseUrl = 'https://payzliapi1.azurewebsites.net/api/Email/SaveEmailSignature?';
    userdata.UserId = localStorage.getItem('userId');
    userdata.ParentCompanyId = parseInt (localStorage.getItem('companyId'));
    return this.httpClient.post<Observable<userdetail>>(this.baseUrl, userdata, httpOptions)
      .pipe(map( data => data));
  }

  update_account_edit(userdata) {
    this.baseUrl = 'https://payzliapi1.azurewebsites.net/api/ProfileMaster/UpdateAccount?';
    // this.params = new HttpParams()
    //   .set('id', localStorage.getItem('userId'))
    //   .set('ParentCompanyId', localStorage.getItem('companyId'))
    //   .set('TimezoneId', userdata.TimezoneId)
    //   .set('LanguageId', userdata.LanguageId);
    userdata.ParentCompanyId = this.ParentCompanyId;
    userdata.UserId = this.userId;
    return this.httpClient.post<Observable<timeZonesList>>(this.baseUrl, userdata, httpOptions)
      .pipe(map( data => data));
  }

  update_notification(userdata) {
    debugger;
    this.baseUrl = 'https://payzliapi1.azurewebsites.net/api/notificationsetting/NotoficationOnOff? ';
    userdata.UserId = localStorage.getItem('userId');
    userdata.ParentCompanyId = parseInt (localStorage.getItem('companyId'));
    // userdata["NotificationType"] = [{"Custom_notification": {"EnableEmailNotification": true}}]
    // userdata = JSON.stringify(userdata)
    console.log(userdata);
    return this.httpClient.post<Observable<userdetail>>(this.baseUrl, userdata, httpOptions)
      .pipe(map( data => data));
  }

  add_schedule(userdata) {
    this.baseUrl = ' https://payzliapi1.azurewebsites.net/api/schedule/saveUserSchedule?';
    userdata.ParentCompanyId = this.ParentCompanyId;
    userdata.UserId = this.userId;
    return this.httpClient.post<Observable<userdetail>>(this.baseUrl, userdata, httpOptions)
      .pipe(map( data => data));
  }

  upload_profile_image(userdata) {
	   this.baseUrl = 'http://172.16.0.114:5555/api/Profile/UploadProfilePicture?';
	   const input = new FormData();
	   input.append('file', userdata[0]);
	   input.append('id', this.userId);

// 	  const input = new URLSearchParams();
//       input.append('grant_type', 'password');
// 	  input.append('scope', ' https://graph.microsoft.com/.default');
// 	  input.append('client_id', this.office_ClientID);
// 	  input.append('client_secret', this.office_ClientSecret);
// 	  input.append('password', 'vx!4Un7E%928');
// 	  input.append('username', 'kapil@payzli.com');
//
//    this.baseUrl = 'https://login.microsoftonline.com/819c5746-460c-416e-b656-d4f259797ea6/oauth2/v2.0/token ';
//     let body = JSON.stringify(input)
//     const httpOptions = {
//   headers: new HttpHeaders({
//     'Content-Type':  'application/x-www-form-urlencoded',
//     'Access-Control-Allow-Origin': '*',
// 	'Access-Control-Allow-Credentials': 'true',
// 	'Access-Control-Allow-Headers': 'Content-Type',
// 	'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
//   })
// };

    this.httpClient.post(this.baseUrl, input, httpOptions).subscribe((val) => {
    	debugger;
      this.imagepath = val['profilePicPath'];
    });
  }

  add_time_tracker(statusflag) {
  	debugger;
    this.baseUrl = 'https://payzliapi1.azurewebsites.net/api/TrackTimer/SavetrackTimer';
    let userdata = {};
    userdata['UserId'] = this.userId;
    userdata['ParentCompanyId'] = this.ParentCompanyId;
    userdata['StatusFlag'] = statusflag;

    return this.httpClient.post<Observable<userdetail>>(this.baseUrl, userdata, httpOptions)
      .pipe(map( data => data));
  }

  get_time_difference() {
  	debugger;
  	this.baseUrl = 'https://payzliapi1.azurewebsites.net/api/trackTimer/TimeDiffrence';
  //  	    let userdata = {};
	// userdata['UserId'] = this.userId;
	// userdata['ParentCompanyId'] = this.ParentCompanyId;
	// userdata['StatusFlag'] = false;
    let userdata = {
      "UserId":"0caf29b2-eeb8-436d-8213-f31042ceea6a",
      "ParentCompanyId":4,
      "StatusFlag":false
      }
  	// @ts-ignore
    return this.httpClient.get<Observable<userdetail>>(this.baseUrl, httpOptions).pipe(map( data => data));

    // this.httpClient.get(this.baseUrl, userdata).subscribe((data) => {
    // 	debugger;
    // });
  }

  update_schedule(userdata) {
    this.baseUrl = ' https://payzliapi1.azurewebsites.net/api/schedule/UpdateOneDaySchedule?';
    userdata.ParentCompanyId = this.ParentCompanyId;
    userdata.UserId = this.userId;
    return this.httpClient.post<Observable<userdetail>>(this.baseUrl, userdata, httpOptions)
      .pipe(map( data => data));
  }

  update_timeoff(userdata) {
    this.baseUrl = ' https://payzliapi1.azurewebsites.net/api/schedule/Timeoffrequest';
    userdata.ParentCompanyId = this.ParentCompanyId;
    userdata.UserId = this.userId;
    return this.httpClient.post<Observable<userdetail>>(this.baseUrl, userdata, httpOptions)
    .pipe(map( data => data));
  }

  update_profile_Users(userdata) {
    this.baseUrl = 'https://payzliapi1.azurewebsites.net/api/profile/edituser';
    return this.httpClient.post<Observable<userdetail>>(this.baseUrl, userdata, httpOptions)
      .pipe(map( data => data));
  }

  update_user_password(userdata) {
    this.baseUrl = 'https://payzliapi1.azurewebsites.net/api/Profile/EditUserPassword';
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
