import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserdataService} from '../userdata.service';
import {MessageService} from '../message.service';
import {MustMatch} from '../_helpers/must-match.validator';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {
  resetForm: FormGroup;
  control: FormControl;
  submitted = false;
  model: any ={};
  private msg: string;
  private sub: any;
  public href: string;
  url: string;
  private code: any;
  public user:any;
  id$: Observable<string>
  id: string
  email: string
  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private userdataService: UserdataService,
              private messageService: MessageService) { }

  get f() {
    return this.resetForm.controls;
  }
  ngOnInit() {
    this.resetForm = this.formBuilder.group({
      Password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&*_+=!])(?=\S+$).{8,}$/)]],
      ConfirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    }, {
      validator: MustMatch('Password', 'ConfirmPasssword')
    });
    // this.id$ = this.route.paramMap.pipe(map(paramMap => paramMap.get('id')));
    // this.id = this.route.snapshot.paramMap.get('id');
    // this.email = this.route.snapshot.paramMap.get('email');
    // debugger;
    this.sub = this.route.params.subscribe(params => {
      debugger;
      this.id = params['id']; // (+) converts string 'id' to a number
      this.email = params['email'];
      // In a real app: dispatch action to load the details here.
    });
  }

  reset(userdata) {
    console.log(userdata, this.resetForm);
    // tslint:disable-next-line:triple-equals
    if (this.resetForm.status == 'VALID') {
      console.log(userdata, this.resetForm.status);
      userdata.Token = this.route.snapshot.params["id"];
      userdata.Email = this.route.snapshot.params["email"];
      // User data which we have received from the registration form.
      this.userdataService.resetPassword(userdata).subscribe((response) => {
        console.log(response);
        debugger;
        this.messageService.add('Password changed succesfully.');
        this.router.navigate(['/login']);
      });
      // this.messageService.add('Password changed succesfully.');
      // this.router.navigate(['/login']);
    } else {
      console.log(userdata, this.resetForm.status);
      this.submitted = true;
      if (this.resetForm.invalid) {
        return;
      }
    }
  }

}
