import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { ModalService } from '../../_modal/modal.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AdminService} from '../admin.service';
import {MessageService} from '../../message.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'addroles-modal',
  template: '<jw-modal id="add-tax-table">' +
    ' <div class="mobile-side" >\n' +
    '        <!-- common headline -->\n' +
    '        <h3 *ngIf="addform" class="close-btn main-comm-head">\n' +
    '            <i class="icon-down-arrow com-arw" (click)="closeModal(\'add-tax-table\')"></i>Add New <span>Role</span>\n' +
    '        </h3>\n' +
    '        <h3 *ngIf="updateform" class="close-btn main-comm-head">\n' +
    '            <i class="icon-down-arrow com-arw" (click)="closeModal(\'add-tax-table\')"></i>Update <span>Role</span>\n' +
    '        </h3>\n' +
    '        <!-- common headline end -->\n' +
    '        <form *ngIf="addform" [formGroup]="addrolesForm" (ngSubmit)="createroles(addrolesForm.value)"  class="popup-scrll">\n' +
    '\n' +
    '            <div class="filBox">\n' +
    '                <!-- start -->\n' +
    '                <div class="fill-box-in scrollbar">\n' +
    '\n' +
    '                    <!-- Tab panes -->\n' +
    '                    <div class="tab-content">\n' +
    '                        <div class="tab-pane active" id="role-popup-tab1">\n' +
    '                            <!-- start -->\n' +
    '                            <div class="form-group">\n' +
    '                                <input type="text" id="mod-role-name" name="mod-role-name" formControlName="RoleName" class="form-field"\n' +
    '                                    required />\n' +
    '                                <p class="form-label">Role Name</p>\n' +
    '                            </div>\n' +
    '                            <div class="form-textarea-group">\n' +
    '                                <textarea type="text" class="form-field" formControlName="Description"></textarea>\n' +
    '                                <p class="form-label">Description</p>\n' +
    '                            </div>\n' +
    '                            <!-- end -->\n' +
    '                        </div>\n' +
    '                        <div class="tab-pane fade" id="role-popup-tab2">\n' +
    '                            <!-- start -->\n' +
    '                            <div class="form-group">\n' +
    '                                <input type="text" id="indi-role-name" name="indi-role-name" class="form-field"\n' +
    '                                    required />\n' +
    '                                <p class="form-label">Role Name</p>\n' +
    '                            </div>\n' +
    '                            <div class="form-textarea-group">\n' +
    '                                <textarea type="text" class="form-field"></textarea>\n' +
    '                                <p class="form-label">Description</p>\n' +
    '                            </div>\n' +
    '                            <!-- end -->\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '\n' +
    '\n' +
    '                </div>\n' +
    '                <!-- end -->\n' +
    '            </div>\n' +
    '\n' +
    '            <div class="popBtn">\n' +
    '                <button class="button line close-btn" (click)="closeModal(\'add-tax-table\')" type="button">Cancel</button>\n' +
    '                <button class="button" type="submit">Create</button>\n' +
    '            </div>\n' +
    '\n' +
    '        </form>\n' +
    '        <form *ngIf="updateform" [formGroup]="updaterolesForm" (ngSubmit)="updateroles(updaterolesForm.value, arrayofselectedobj)"  class="popup-scrll">\n' +
    '\n' +
    '            <div class="filBox">\n' +
    '                <!-- start -->\n' +
    '                <div class="fill-box-in scrollbar">\n' +
    '\n' +
    '                    <!-- Tab panes -->\n' +
    '                    <div class="tab-content">\n' +
    '                        <div class="tab-pane active" id="role-popup-tab1" *ngFor="let roles of arrayofselectedobj">\n' +
    '                            <!-- start -->\n' +
    '                            <div class="form-group">\n' +
    '                                <input type="text" id="mod-role-name" name="mod-role-name" ngModel="{{roles.name}}" formControlName="RoleName" class="form-field field--not-empty"\n' +
    '                                    required />\n' +
    '                                <p class="form-label">Role Name</p>\n' +
    '                            </div>\n' +
    '                            <div class="form-textarea-group">\n' +
    '                                <textarea type="text" class="form-field field--not-empty" ngModel="{{roles.description}}" formControlName="Description"></textarea>\n' +
    '                                <p class="form-label">Description</p>\n' +
    '                            </div>\n' +
    '                            <!-- end -->\n' +
    '                        </div>\n' +
    // '                        <div class="tab-pane fade" id="role-popup-tab2">\n' +
    // '                            <!-- start -->\n' +
    // '                            <div class="form-group">\n' +
    // '                                <input type="text" id="indi-role-name" name="indi-role-name" class="form-field"\n' +
    // '                                    required />\n' +
    // '                                <p class="form-label">Role Name</p>\n' +
    // '                            </div>\n' +
    // '                            <div class="form-textarea-group">\n' +
    // '                                <textarea type="text" class="form-field"></textarea>\n' +
    // '                                <p class="form-label">Description</p>\n' +
    // '                            </div>\n' +
    // '                            <!-- end -->\n' +
    // '                        </div>\n' +
    '                    </div>\n' +
    '\n' +
    '\n' +
    '                </div>\n' +
    '                <!-- end -->\n' +
    '            </div>\n' +
    '\n' +
    '            <div class="popBtn">\n' +
    '                <button class="button line close-btn" (click)="closeModal(\'add-tax-table\')" type="button">Cancel</button>\n' +
    '                <button class="button" type="submit">Update</button>\n' +
    '            </div>\n' +
    '\n' +
    '        </form>\n' +
    '\n' +
    '    </div>\n' +
    '</jw-modal>'
})
export class AddRolesComponent implements OnInit {
  addrolesForm: FormGroup;
  updaterolesForm: FormGroup;
  control: FormControl;
  submitted = false;
  private subscription: Subscription;
  @Input('addAdmin') addform: any;
  @Input('updateAdmin') updateform: any;
  @Input('userroleobj') arrayofselectedobj: any;
  userroles: any;
  constructor(private AdminService: AdminService, private formBuilder: FormBuilder, private modalService: ModalService, private router: Router, private messageService: MessageService) { }
  
  get f() {
    return this.addrolesForm.controls;
    return this.updaterolesForm.controls;
  }
  get f1() {
    return this.updaterolesForm.controls;
  }
  ngOnInit() {
    // this.getuserRoles();
    this.addrolesForm = this.formBuilder.group({
      RoleName: ['', Validators.required],
      Description: ['', Validators.required]
    });
    this.updaterolesForm = this.formBuilder.group({
      RoleName: ['', Validators.required],
      Description: ['', Validators.required]
    });
    // this.subscription = this.AdminService.on('call-roles').subscribe(() => this.getuserRoles());
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  createroles(Admin) {
    debugger;
    console.log(Admin, this.addrolesForm)
    // tslint:disable-next-line:triple-equals
    if (this.addrolesForm.status == 'VALID') {
      this.AdminService.create_role_service(Admin).subscribe((data) => {
        this.AdminService.publish('call-parent');
        this.messageService.clear();
        this.messageService.add('Role Created successfully.')
        this.closeModal('add-tax-table');
      });
    } else {
      console.log(Admin, this.addrolesForm.status);
      this.submitted = true;
      if (this.addrolesForm.invalid) {
        return;
      }
    }
  }

  updateroles(Admin, selectedobj) {
    debugger;
    Admin.RoleId = selectedobj[0].id
    console.log(Admin, this.updaterolesForm)
    // tslint:disable-next-line:triple-equals
    if (this.updaterolesForm.status == 'VALID') {
      this.AdminService.update_role_service(Admin).subscribe((data) => {
        this.AdminService.publish('call-roles');
        this.messageService.clear();
        this.messageService.add('Role Updated successfully.')
        this.closeModal('add-tax-table');
      });
    } else {
      console.log(Admin, this.updaterolesForm.status);
      this.submitted = true;
      if (this.updaterolesForm.invalid) {
        return;
      }
    }
  }

  getuserRoles() {
    this.AdminService.getUserRoles().subscribe((data) => {
      this.userroles = data;
      this.userroles = this.userroles.result;
      console.log(this.userroles)
      // localStorage.setItem('companyId', data['ParentCompanyID']);
    });
  }

}
