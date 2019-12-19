import {Component, ComponentRef, Input, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserdataService} from '../userdata.service';
@Component({
  selector: 'app-forgot',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.less']
})
export class ForgotpasswordComponent implements OnInit {
  forgotForm: FormGroup;
  control: FormControl;
  submitted = false;
  constructor(private router: Router,
              private formBuilder: FormBuilder, private userdataService: UserdataService) { }

  get f() {
    return this.forgotForm.controls;
  }

  ngOnInit() {
    this.forgotForm = this.formBuilder.group({
      EmailID: ['']
    });
  }

  forgotPassword(userdata) {
    if (this.forgotForm.status == 'VALID') {
      console.log(userdata, this.forgotForm.status);
      // User data which we have received from the registration form.
      this.userdataService.forgotPassword(userdata).subscribe((response) => {
        console.log(response);
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
