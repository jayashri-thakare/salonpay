import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import 'rxjs/add/operator/map'
import { map } from 'rxjs/operators';
import {Observable, of, Subject} from 'rxjs';
import {MessageService} from './message.service';

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

@Injectable({
  providedIn: 'root'
})
export class UserdataService {
  baseUrl = 'http://172.16.0.114:5555/api/account/signup';
  private obj: {};
  private userdetail: {};
  private string: string;
  // tslint:disable-next-line:indent
  private email: string;
  private userdata: any;
  private form: string;
  private url1: string;
  emailnav: boolean;
  notificationnav: boolean;
  profilenav: boolean;
  accountnav: boolean;
  schedulenav: boolean;
  banknav: boolean;
  userId: any;
 	constructor(private httpClient: HttpClient) { }
 	// Service to sign up users
  // tslint:disable-next-line:indent
	public registerUsers(obj) {
 	  this.email = obj['Email'];
    return this.httpClient.post(this.baseUrl, obj, httpOptions )
    .pipe(map(data => data));
  }

  public forgotPassword(obj) {
    this.baseUrl = 'http://172.16.0.99:7894/api/Account/ForgetPassword' ;
    return this.httpClient.post(this.baseUrl, obj, httpOptions )
      .pipe(map(data => data));
  }
  public resetPassword(obj) {
    this.baseUrl = 'http://172.16.0.99:7894/api/Account/ResetPassword';
    return this.httpClient.post(this.baseUrl, obj, httpOptions )
      .pipe(map(data => data));
  }

  getLogin(userdata) {
    this.baseUrl = 'http://172.16.0.114:5555/api/account/login';
    return this.httpClient.post(this.baseUrl, userdata, httpOptions )
      .pipe(map(data => data));
  }

  getUserDetail() {
 	  if(this.userId === undefined) {
 	    this.userId = localStorage.getItem('userId');
    }
 	  this.baseUrl = 'http://172.16.0.99:7894/api/profile/getuserdetails?id=' + this.userId;
    return this.httpClient.get<Observable<userdetail>>(this.baseUrl, httpOptions).pipe(map( data => data)
    );
  }
  delete(id: number) {
    return this.httpClient.delete(`http://172.16.0.99:8084/api/Signup/${id}`);
  }

  update_user_address(userdata) {
    this.baseUrl = 'http://172.16.0.99:7894/api/profile/editaddress';
    return this.httpClient.post<Observable<userdetail>>(this.baseUrl, userdata, httpOptions)
      .pipe(map( data => data));
  }

  update_profile_Users(userdata) {
    this.baseUrl = 'http://172.16.0.99:7894/api/profile/edituser';
    return this.httpClient.post<Observable<userdetail>>(this.baseUrl, userdata, httpOptions)
      .pipe(map( data => data));
  }
  update_user_password(userdata) {
    this.baseUrl = 'http://172.16.0.99:7894/api/Profile/EditUserPassword';
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
        // this.getUserUpdated();
        // return true;
      });
    } else {
      console.log(userdata);
      // this.submitted = true;
      // if (this.userprofileForm.invalid) {
      //   return;
      // }
    }
  }
  private subjects: Subject<any>[] = [];

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
