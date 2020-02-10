import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { ModalService } from '../../_modal/modal.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AdminService} from '../admin.service';
import {MessageService} from '../../message.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'addexplevel-modal',
  template: '<jw-modal id="add-explevel">\n' +
  '        <div class="mobile-side">\n' +
  '        <!-- common headline -->\n' +
  '        <h3 *ngIf="addexplevel" class="close-btn main-comm-head">\n' +
  '            <i class="icon-down-arrow com-arw"></i>Add <span>Experience Level</span>\n' +
  '        </h3>\n' +
  '        <h3 *ngIf="updateexplevel" class="close-btn main-comm-head">\n' +
  '            <i class="icon-down-arrow com-arw"></i>Update <span>Experience Level</span>\n' +
  '        </h3>\n' +
  '        <!-- common headline end -->\n' +
  '        <form *ngIf="addexplevel" [formGroup]="addexplevelForm" (ngSubmit)="createExpLevel(addexplevelForm.value)" id="addexplevel" class="popup-scrll">\n' +
  '\n' +
  '            <div class="filBox">\n' +
  '                <!-- start -->\n' +
  '                <div class="fill-box-in scrollbar">\n' +
  '                    <!-- start -->\n' +
  '                    <div class="form-group mt-2">\n' +
  '                        <input type="text" id="first-name" formControlName="ServiceLevelName" name="first-name" class="form-field"\n' +
  '                            required />\n' +
  '                        <p class="form-label">Level Name</p>\n' +
  '                    </div>\n' +
  '                    <!-- end -->\n' +
  '                </div>\n' +
  '                <!-- end -->\n' +
  '            </div>\n' +
  '\n' +
  '            <div class="popBtn">\n' +
  '                <button class="button line close-btn" type="button">Cancel</button>\n' +
  '                <button class="button" type="submit">Create</button>\n' +
  '            </div>\n' +
  '\n' +
  '        </form>\n' +
  '        <form *ngIf="updateexplevel" [formGroup]="updateexplevelForm" (ngSubmit)="updateExpLevel(updateexplevelForm.value)" id="editexplevel" class="popup-scrll">\n' +
  '\n' +
  '            <div class="filBox">\n' +
  '                <!-- start -->\n' +
  '                <div class="fill-box-in scrollbar" *ngFor="let explevel of arrayofselectedobj">\n' +
  '                    <!-- start -->\n' +
  '                    <div class="form-group mt-2">\n' +
  '                        <input type="text" id="first-name" formControlName="ServiceLevelName" ngModel="{{explevel?.serviceLevelName}}" name="first-name" class="form-field field--not-empty"\n' +
  '                            required />\n' +
  '                        <p class="form-label">Level Name</p>\n' +
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
export class AddExpLevelComponent implements OnInit {
    addexplevelForm: FormGroup;
    updateexplevelForm: FormGroup;
  control: FormControl;
  submitted = false;
  @Input('addexplevel') addexplevel: any;
  @Input('updateexplevel') updateexplevel: any;
  @Input('explevelobj') arrayofselectedobj: Array<any>=[];
  constructor(public AdminService: AdminService, private formBuilder: FormBuilder, private modalService: ModalService, private router: Router, private messageService: MessageService) { }

  
  get f() {
    return this.addexplevelForm.controls;
  }
  get f1() {
    return this.updateexplevelForm.controls;
  }  

  ngOnInit() {
    this.addexplevelForm = this.formBuilder.group({
        ServiceLevelName: ['']
    });
    this.updateexplevelForm = this.formBuilder.group({
        ServiceLevelName: ['']
    });
  }

  createExpLevel(Admin) {
    debugger;
    console.log(Admin)
    // tslint:disable-next-line:triple-equals
    if (this.addexplevelForm.status == 'VALID') {
      this.AdminService.add_explevel(Admin).subscribe((data) => {
        this.AdminService.publish('call-explevel');
        this.messageService.clear();
        this.messageService.add('Experience Level added successfully.')
        this.modalService.close('add-explevel');
      });
    } else {
      console.log(Admin, this.addexplevelForm.status);
      this.submitted = true;
      if (this.addexplevelForm.invalid) {
        return;
      }
    }
  }

  updateExpLevel(Admin) {
    debugger;
    console.log(Admin)
    Admin.ServiceLevelId = this.arrayofselectedobj[0].serviceLevelId;
    // tslint:disable-next-line:triple-equals
    if (this.updateexplevelForm.status == 'VALID') {
      this.AdminService.update_explevel(Admin).subscribe((data) => {
        this.AdminService.publish('call-explevel');
        this.messageService.clear();
        this.messageService.add('Experience Level updated successfully.')
        this.modalService.close('add-explevel');
      });
    } else {
      console.log(Admin, this.updateexplevelForm.status);
      this.submitted = true;
      if (this.updateexplevelForm.invalid) {
        return;
      }
    }
  }

}
