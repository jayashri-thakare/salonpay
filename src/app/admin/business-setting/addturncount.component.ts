import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { ModalService } from '../../_modal/modal.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AdminService} from '../admin.service';
import {MessageService} from '../../message.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'addturncount-modal',
  template: '<jw-modal id="add-turncount">\n' +
  '        <div class="mobile-side">\n' +
  '        <!-- common headline -->\n' +
  '        <h3 *ngIf="addturncount" class="close-btn main-comm-head">\n' +
  '            <i class="icon-down-arrow com-arw"></i>Add <span>turn count</span>\n' +
  '        </h3>\n' +
  '        <h3 *ngIf="updateturncount" class="close-btn main-comm-head">\n' +
  '            <i class="icon-down-arrow com-arw"></i>Update <span>turn count</span>\n' +
  '        </h3>\n' +
  '        <!-- common headline end -->\n' +
  '        <form *ngIf="addturncount" [formGroup]="addturncountForm" (ngSubmit)="createTurnCount(addturncountForm.value)" id="addTurnCount" class="popup-scrll">\n' +
  '\n' +
  '            <div class="filBox">\n' +
  '                <!-- start -->\n' +
  '                <div class="fill-box-in scrollbar">\n' +
  '                    <!-- start -->\n' +
  '                    <div class="form-group mt-2">\n' +
  '                        <input type="text" id="first-name" formControlName="Value" name="first-name" class="form-field"\n' +
  '                            required />\n' +
  '                        <p class="form-label">Value</p>\n' +
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
  '        <form *ngIf="updateturncount" [formGroup]="updateturncountForm" (ngSubmit)="updateTurnCount(updateturncountForm.value)" id="editProfile" class="popup-scrll">\n' +
  '\n' +
  '            <div class="filBox">\n' +
  '                <!-- start -->\n' +
  '                <div class="fill-box-in scrollbar" *ngFor="let turncount of arrayofselectedobj">\n' +
  '                    <!-- start -->\n' +
  '                    <div class="form-group mt-2">\n' +
  '                        <input type="text" id="first-name" formControlName="Value" ngModel="{{turncount?.value}}" name="first-name" class="form-field field--not-empty"\n' +
  '                            required />\n' +
  '                        <p class="form-label">Value</p>\n' +
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
export class AddTurnCountComponent implements OnInit {
    addturncountForm: FormGroup;
    updateturncountForm: FormGroup;
  control: FormControl;
  submitted = false;
  @Input('addturncount') addturncount: any;
  @Input('updateturncount') updateturncount: any;
  @Input('turncountsobj') arrayofselectedobj: Array<any>=[];
  constructor(public AdminService: AdminService, private formBuilder: FormBuilder, private modalService: ModalService, private router: Router, private messageService: MessageService) { }

  
  get f() {
    return this.addturncountForm.controls;
  }
  get f1() {
    return this.updateturncountForm.controls;
  }  

  ngOnInit() {
    this.addturncountForm = this.formBuilder.group({
        Value: ['']
    });
    this.updateturncountForm = this.formBuilder.group({
        Value: ['']
    });
  }

  createTurnCount(Admin) {
    debugger;
    console.log(Admin)
    // tslint:disable-next-line:triple-equals
    if (this.addturncountForm.status == 'VALID') {
      this.AdminService.add_turncount(Admin).subscribe((data) => {
        this.AdminService.publish('call-turncount');
        this.messageService.clear();
        this.messageService.add('Turn Count added successfully.')
        this.modalService.close('add-turncount');
      });
    } else {
      console.log(Admin, this.addturncountForm.status);
      this.submitted = true;
      if (this.addturncountForm.invalid) {
        return;
      }
    }
  }

  updateTurnCount(Admin) {
    debugger;
    console.log(Admin)
    Admin.TurnCountId = this.arrayofselectedobj[0].turnCountId;
    // tslint:disable-next-line:triple-equals
    if (this.updateturncountForm.status == 'VALID') {
      this.AdminService.update_turncount(Admin).subscribe((data) => {
        this.AdminService.publish('call-turncount');
        this.messageService.clear();
        this.messageService.add('Turn Count updated successfully.')
        this.modalService.close('add-turncount');
      });
    } else {
      console.log(Admin, this.updateturncountForm.status);
      this.submitted = true;
      if (this.updateturncountForm.invalid) {
        return;
      }
    }
  }

}
