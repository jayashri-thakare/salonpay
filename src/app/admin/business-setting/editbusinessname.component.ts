import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { ModalService } from '../../_modal/modal.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AdminService} from '../admin.service';
import {MessageService} from '../../message.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'editname-modal',
  template: '<jw-modal id="edit-name">\n' +
  '        <div class="mobile-side">\n' +
  '        <!-- common headline -->\n' +
  '        <h3 class="close-btn main-comm-head">\n' +
  '            <i class="icon-down-arrow com-arw"></i>Edit <span>business name</span>\n' +
  '        </h3>\n' +
  '        <!-- common headline end -->\n' +
  '        <form [formGroup]="updatenameForm" (ngSubmit)="updateProfieName(updatenameForm.value)" id="editProfile" class="popup-scrll">\n' +
  '\n' +
  '            <div class="filBox">\n' +
  '                <!-- start -->\n' +
  '                <div class="fill-box-in scrollbar">\n' +
  '                    <!-- start -->\n' +
  '                    <div class="form-group mt-2">\n' +
  '                        <input type="text" id="first-name" formControlName="businessName" ngModel="{{businesstipadjustment?.businessName}}" name="first-name" class="form-field field--not-empty"\n' +
  '                            required />\n' +
  '                        <p class="form-label">Business Name</p>\n' +
  '                    </div>\n' +
  '                    <!-- end -->\n' +
  '                </div>\n' +
  '                <!-- end -->\n' +
  '            </div>\n' +
  '\n' +
  '            <div class="popBtn">\n' +
  '                <button class="button line close-btn" type="button">Cancel</button>\n' +
  '                <button class="button" type="submit">Update</button>\n' +
  '            </div>\n' +
  '\n' +
  '        </form>\n' +
  '\n' +
  '    </div>\n' +
  '    </jw-modal>'
})
export class EditBusinessProfileNameComponent implements OnInit {
    updatenameForm: FormGroup;
  control: FormControl;
  submitted = false;
  @Input('businesstipadjustment') businesstipadjustment: any;

  constructor(public AdminService: AdminService, private formBuilder: FormBuilder, private modalService: ModalService, private router: Router, private messageService: MessageService) { }

  get f() {
    return this.updatenameForm.controls;
  }

  ngOnInit() {
    this.updatenameForm = this.formBuilder.group({
        businessName: ['']
    });
  }

  updateProfieName(Admin) {
    console.log(Admin)
    // tslint:disable-next-line:triple-equals
    if (this.updatenameForm.status == 'VALID') {
      this.AdminService.update_profiledetail(Admin).subscribe((data) => {
        this.AdminService.publish('call-profiledetail');
        this.messageService.clear();
        this.messageService.add('Profile Detail Updated successfully.')
        this.modalService.close('edit-name');
      });
    } else {
      console.log(Admin, this.updatenameForm.status);
      this.submitted = true;
      if (this.updatenameForm.invalid) {
        return;
      }
    }
  }

}
