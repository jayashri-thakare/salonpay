import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {UserdataService} from '../userdata.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MessageService} from '../message.service';

@Component({
  selector: 'app-login',
  template: '<div class="login-container forgetActive">\n' +
    '  <div class="login-left">\n' +
    '    <div class="login-left-bg"></div>\n' +
    '    <div class="login-logo"><a href="#"><img src="../../assets/img/logo-white.svg" alt="logo" /></a></div>\n' +
    '    <h4>{{\'Simply\' | translate}}, <b>{{\'The Best\' | translate}}\n' +
    '      {{\'Salon App\' | translate}}</b><br />\n' +
    '      {{\'on the planet\' | translate}}.</h4>\n' +
    '    <p>{{\'SalonPay is a salon management app with an integrated POS system,\' | translate}} <br>\n' +
    '      {{\'CRM and all the features you need to run your salon with ease and simplicity.\'| translate}}</p>\n' +
    '  </div>\n' +
    '  <div class="login-right">\n' +
    '<div class="forgot-box">\n' +
    '      <h3>{{\'Forgot\' | translate}} {{\'Password\' | translate}}</h3>\n' +
    '   <form id="forgotForm" [formGroup]="forgotForm" (ngSubmit)="forgot(forgotForm.value)">\n' +
    '        <div class="login-box-in">\n' +
    '          <div class="form-group">\n' +
    '            <input type="email" id="Email" formControlName="Email" class="form-field" [ngClass]="{ \'error\': submitted && f.Email.errors }" />\n' +
    '            <p class="form-label">{{\'Email\' | translate}}</p>\n' +
    '          </div>\n' +
    '          <button class="button button--block orange">{{\'Reset\' | translate}}</button>\n' +
    '          <div class="forget-login">{{\'Already Member\' | translate}} : <span class="forget-login-link"><a href="/login">{{\'Login\' | translate}}</a></span>\n' +
    '          </div>\n' +
    '        </div>\n' +
    '      </form>\n' +
    '\n' +
    '      <div class="login-copy">\n' +
    '        {{\'©2019 Payzli Corp. All rights reserved\' | translate}}. <br>\n' +
    '        <a href="#">{{\'Privacy Policy\' | translate}}</a> {{\'and\' | translate}} <a href="#">{{\'Terms Of Use\' | translate}}</a>\n' +
    '      </div>\n' +
    '    </div>' +
    '  </div>\n' +
    '</div>'
})
export class ForgotComponent implements OnInit {
  forgotForm: FormGroup
  control: FormControl;
  public msg: string;
  submitted = false;

  constructor(private messageService: MessageService, private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private userdataservice: UserdataService)
  { }

  get f() {
    return this.forgotForm.controls;
  }
  ngOnInit() {
    this.forgotForm = this.formBuilder.group({
      Email: ['', [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]]
    });
  }

  forgot(userdata) {
    console.log(userdata, this.forgotForm.errors)
    // tslint:disable-next-line:triple-equals
    if (this.forgotForm.status == 'VALID') {
      this.userdataservice.forgotPassword(userdata).subscribe((data) => {
        console.log('EMAIL SENT');
        this.messageService.clear();
        this.messageService.add('Email has been sent to your Email Id, please check your Email.');
        this.router.navigate(['/login']);
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
