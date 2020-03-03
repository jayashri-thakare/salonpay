import {Component, Input, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {UserdataService} from '../userdata.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MessageService} from '../message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  forgotForm: FormGroup;
  control: FormControl;
  submitted = false;
  model: any = {};
  private msg: string;
  // messageService: [];
  public loginfail: boolean;
  @Input('userID') userID: any;

  constructor( private formBuilder: FormBuilder,
               private route: ActivatedRoute,
               private router: Router,
               private userdataservice: UserdataService,
               private messageService: MessageService) { }
  ngOnInit() {
    this.loginfail = false;
    this.loginForm = this.formBuilder.group({
      Email: ['', [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]],
      // tslint:disable-next-line:max-line-length
      Password: ['']
    });

  }

  get f() { return this.loginForm.controls; }

  login(userdata) {
    // tslint:disable-next-line:triple-equals
    if (this.loginForm.status == 'VALID') {
      this.userdataservice.getLogin(userdata).subscribe((response) => {
        if (response['success'] == 0) {
          this.loginfail = true;
        } else {
          this.loginfail = false;
          if (localStorage.getItem('userId')){
            localStorage.clear();
          }
          localStorage.setItem('userId', response['userID']);
          localStorage.setItem('companyId', response['parentCompanyId']);
          localStorage.setItem('Token', response["token"]);
          this.router.navigate(['/dashboard']);
          this.messageService.clear();
          this.messageService.add("Logged In Successfully.")
        }
      });
    } else {
      console.log(userdata, this.loginForm.status);
      if (this.loginForm.invalid) {
        return;
      }
    }
  }

  forgot(userdata) {
    console.log(userdata, this.forgotForm)
    // tslint:disable-next-line:triple-equals
    if (this.forgotForm.status == 'VALID') {
      this.userdataservice.forgotPassword(userdata).subscribe((data) => {
        console.log('EMAIL SENT');
        // this.router.navigate(['/login']);
        this.messageService.add('Email has been sent to your Email Id, please check your Email.');
        // tslint:disable-next-line:only-arrow-functions
        window.location.reload();
      });
    } else {
      console.log(userdata, this.forgotForm.status);
      this.submitted = true;
      if (this.forgotForm.invalid) {
        return;
      }
    }
  }

}
