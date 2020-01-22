import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NGXLogger} from 'ngx-logger';
import {UserdataService} from '../userdata.service';
import {MustMatch} from '../_helpers/must-match.validator';
import {Router} from '@angular/router';
import {MessageService} from '../message.service';

@Component({
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  registerForm: FormGroup;
  control: FormControl;
  submitted = false;
  model: any = {};
  public msg: string;
  public email1: string;
  public signuperrormsg: string;
  public signupfail: boolean;
  constructor(private formBuilder: FormBuilder, private logger: NGXLogger,
              private userdataService: UserdataService, private router: Router,
              private messageService: MessageService) {
    this.logger.debug('Debug message');
    this.logger.info('Info message');
    this.logger.log('Default log message');
    this.logger.warn('Warning message');
    this.logger.error('Error message');
  }
  get f() {
    return this.registerForm.controls;
  }
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      FirstName: ['', [Validators.required, Validators.pattern(/^[A-Za-z]+$/)]],
      LastName: ['', [Validators.required, Validators.pattern(/^[A-Za-z]+$/)]],
      Email: ['', [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]],
      PhoneNumber: ['', [Validators.required, Validators.pattern(/^(1\s|1|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/)]],
      // tslint:disable-next-line:max-line-length
      Password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&*_+=!])(?=\S+$).{8,}$/)]],
      ConfirmPasssword: ['', [Validators.required, Validators.minLength(8)]],
      BusinessName: ['', [Validators.required, Validators.pattern(/^[A-Za-z]+$/)]]
    }, {
      validator: MustMatch('Password', 'ConfirmPasssword')
    });
  }
  RegisterUser(userdata) {
    console.log(userdata, this.registerForm);
    if (this.registerForm.status == 'VALID') {
      this.userdataService.registerUsers(userdata).subscribe((data) => {
        this.messageService.add('Sign up succesfull');
        // this.router.navigate(['/profilesetting']);
        if (data['success'] === 0) {
          this.signuperrormsg = data['result'];
          this.signupfail = true;
        }else{
          console.log(data);
          this.signupfail = false;
          this.messageService.clear();
          this.messageService.add("User register successfull, please check your mail for activation link.")
          this.router.navigate(['/login']);
        }
      });
    } else {
      this.submitted = true;
      if (this.registerForm.invalid) {
        return;
      }
    }

    // this.messageService.add("User register successfull, please check your mail for activation link.")
    // this.router.navigate(['/login']);
  }

}
