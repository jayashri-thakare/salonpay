import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { ModalService } from '../../_modal/modal.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AdminService} from '../admin.service';
import {MessageService} from '../../message.service';

@Component({
  selector: 'adduser-modal',
  template: '<jw-modal id="add-tax-table1">\n' +
    '        <div class="mobile-side">\n' +
    '        <!-- common headline -->\n' +
    '        <h3 *ngIf="addform" class="close-btn main-comm-head">\n' +
    '            <i class="icon-down-arrow com-arw" (click)="closeModal(\'add-tax-table1\')"></i>Add <span>User</span>\n' +
    '        </h3>\n' +
    '        <h3 *ngIf="updateform" class="close-btn main-comm-head">\n' +
    '            <i class="icon-down-arrow com-arw" (click)="closeModal(\'add-tax-table1\')"></i>Update <span>User</span>\n' +
    '        </h3>\n' +
    '        <!-- common headline end -->\n' +
    '        <form *ngIf="addform" class="popup-scrll" [formGroup]="adduserForm" (ngSubmit)="createuser(adduserForm.value)">\n' +
    '    \n' +
    '            <div class="filBox">\n' +
    '                <!-- start -->\n' +
    '                <div class="fill-box-in scrollbar">\n' +
    // '                    <div class="avatar-upload inventory-image">\n' +
    // '                        <div class="avatar-edit">\n' +
    // '                            <input type="file" id="imageUpload" accept=".png, .jpg, .jpeg">\n' +
    // '                            <label for="imageUpload"><i class="icon-uploading grd-icon"></i></label>\n' +
    // '                        </div>\n' +
    // '                        <div class="avatar-preview">\n' +
    // '                            <div id="imagePreview" style="background-image: url(../../../assets/img/usr-profile.svg);">\n' +
    // '                            </div>\n' +
    // '                        </div>\n' +
    // '                    </div>\n' +
    '                    <div class="form-group">\n' +
    '                        <input type="text" id="full-name" formControlName="FirstName" class="form-field" required />\n' +
    '                        <p class="form-label">Full Name</p>\n' +
    '                    </div>\n' +
    '                    <div class="form-group">\n' +
    '                        <input type="text" id="last-name" formControlName="LastName" class="form-field" required />\n' +
    '                        <p class="form-label">Last Name</p>\n' +
    '                    </div>\n' +
    '                    <div class="form-group">\n' +
    '                        <input type="email" id="email" formControlName="Email" class="form-field" required />\n' +
    '                        <p class="form-label">Email</p>\n' +
    '                    </div>\n' +
    '                    <div class="form-group">\n' +
    '                        <input type="text" id="phone-no" formControlName="PhoneNumber" class="form-field" max-length="10"\n' +
    '                            required />\n' +
    '                        <p class="form-label">Phone Number</p>\n' +
    '                    </div>\n' +
    '                    <!-- start -->\n' +
    '                    <div class="form-group popup-select2">\n' +
    '                    <ejs-multiselect formControlName="ServiceIds" id=\'localData\' #local [dataSource]=\'services\' [fields]=\'localFields\' [placeholder]=\'localWaterMark\'></ejs-multiselect>\n'+
    '                    </div>\n' +
    '                    <!-- end -->\n' +
    '                    <div class="form-group">\n' +
    '                        <select class="select-field form-field" formControlName="ExpLevelId" id="select-fld" required>\n' +
    '                            <option></option>\n' +
    '                            <option *ngFor="let exp of userexp" [value]="exp.expLevelId">{{exp.levelType}}</option>\n' +
    '                        </select>\n' +
    '                        <p class="form-label sel-blk">Experience Level</p>\n' +
    '                    </div>\n' +
    '                    <!-- start -->\n' +
    '                    <div class="form-group">\n' +
    '                        <h6 class="poptile">Track Hours</h6>\n' +
    '                        <div class="switch switch--horizontal m-0">\n' +
    '                            <input id="trk-hrs-no" type="radio" formControlName="TimeTrack" value="false">\n' +
    '                            <label for="trk-hrs-no">No</label>\n' +
    '                            <input id="trk-hrs-yes" type="radio" formControlName="TimeTrack" value="true">\n' +
    '                            <label for="trk-hrs-yes">Yes</label><span class="toggle-outside"><span\n' +
    '                                    class="toggle-inside"></span></span>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                    <!-- end -->\n' +
    '                    <!-- start -->\n' +
    '                    <h6 class="poptile">Gender</h6>\n' +
    '                    <div class="radio-box">\n' +
    '                        <input type="radio" id="radio1" formControlName="Gender" value="Male" />\n' +
    '                        <label for="radio1">Male</label>\n' +
    '                    </div>\n' +
    '                    <div class="radio-box">\n' +
    '                        <input type="radio" id="radio2" formControlName="Gender" value="Female" />\n' +
    '                        <label for="radio2">Female</label>\n' +
    '                    </div>\n' +
    '                    <div class="radio-box">\n' +
    '                        <input type="radio" id="radio3" formControlName="Gender" value="Others" />\n' +
    '                        <label for="radio3">Others</label>\n' +
    '                    </div>\n' +
    '                    <!-- end -->\n' +
    '                </div>\n' +
    '                <!-- end -->\n' +
    '            </div>\n' +
    '    \n' +
    '            <div class="popBtn">\n' +
    '                <button class="button line close-btn" type="button" (click)="closeModal(\'add-tax-table1\')">Cancel</button>\n' +
    '                <button class="button" type="submit">Create</button>\n' +
    '            </div>\n' +
    '    \n' +
    '        </form>\n' +
    '        <form *ngIf="updateform" class="popup-scrll" [formGroup]="updateuserForm" (ngSubmit)="updateuser(updateuserForm.value)">\n' +
    '    \n' +
    '            <div class="filBox" *ngFor="let userdetail of arrayofselectedobj">\n' +
    '                <!-- start -->\n' +
    '                <div class="fill-box-in scrollbar">\n' +
    // '                    <div class="avatar-upload inventory-image">\n' +
    // '                        <div class="avatar-edit">\n' +
    // '                            <input type="file" id="imageUpload" accept=".png, .jpg, .jpeg">\n' +
    // '                            <label for="imageUpload"><i class="icon-uploading grd-icon"></i></label>\n' +
    // '                        </div>\n' +
    // '                        <div class="avatar-preview">\n' +
    // '                            <div id="imagePreview" style="background-image: url(../../../assets/img/usr-profile.svg);">\n' +
    // '                            </div>\n' +
    // '                        </div>\n' +
    // '                    </div>\n' +
    '                    <div class="form-group">\n' +
    '                        <input type="text" id="full-name" ngModel="{{userdetail.firstName}}" formControlName="FirstName" class="form-field field--not-empty" required />\n' +
    '                        <p class="form-label">Full Name</p>\n' +
    '                    </div>\n' +
    '                    <div class="form-group">\n' +
    '                        <input type="text" id="last-name" ngModel="{{userdetail.lastName}}" formControlName="LastName" class="form-field field--not-empty" required />\n' +
    '                        <p class="form-label">Last Name</p>\n' +
    '                    </div>\n' +
    '                    <div class="form-group">\n' +
    '                        <input type="email" id="email" ngModel="{{userdetail.email}}" formControlName="Email" class="form-field field--not-empty" required />\n' +
    '                        <p class="form-label">Email</p>\n' +
    '                    </div>\n' +
    '                    <div class="form-group">\n' +
    '                        <input type="text" id="phone-no" internationalTelNo ngModel="{{userdetail.phoneNumber}}" formControlName="PhoneNumber" class="form-field field--not-empty" max-length="10"\n' +
    '                            required />\n' +
    '                        <p class="form-label">Phone Number</p>\n' +
    '                    </div>\n' +
    '                    <!-- start -->\n' +
    '                    <div class="form-group popup-select2">\n' +
    '                    <ejs-multiselect formControlName="ServiceIds" id=\'localData\' #local [dataSource]=\'services\' [fields]=\'localFields\' [placeholder]=\'localWaterMark\'></ejs-multiselect>\n'+
    '                    </div>\n' +
    '                    <!-- end -->\n' +
    '                    <div class="form-group">\n' +
    '                        <select class="select-field form-field" ngModel="{{userdetail.levelType}}" formControlName="ExpLevelId" id="select-fld" required>\n' +
    '                            <option></option>\n' +
    '                            <option *ngFor="let exp of userexp" [value]="exp.expLevelId">{{exp.levelType}}</option>\n' +
    '                        </select>\n' +
    '                        <p class="form-label sel-blk">Experience Level</p>\n' +
    '                    </div>\n' +
    '                    <!-- start -->\n' +
    '                    <div class="form-group">\n' +
    '                        <h6 class="poptile">Track Hours</h6>\n' +
    '                        <div class="switch switch--horizontal m-0">\n' +
    '                            <input id="trk-hrs-no" type="radio" ngModel="{{userdetail.timeTrack}}" formControlName="TimeTrack" value="false">\n' +
    '                            <label for="trk-hrs-no">No</label>\n' +
    '                            <input id="trk-hrs-yes" type="radio" ngModel="{{userdetail.timeTrack}}" formControlName="TimeTrack" value="true">\n' +
    '                            <label for="trk-hrs-yes">Yes</label><span class="toggle-outside"><span\n' +
    '                                    class="toggle-inside"></span></span>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                    <!-- end -->\n' +
    '                    <!-- start -->\n' +
    '                    <h6 class="poptile">Gender</h6>\n' +
    '                    <div class="radio-box">\n' +
    '                        <input type="radio" id="radio1" ngModel="{{userdetail.gender}}" formControlName="Gender" value="Male" />\n' +
    '                        <label for="radio1">Male</label>\n' +
    '                    </div>\n' +
    '                    <div class="radio-box">\n' +
    '                        <input type="radio" id="radio2" ngModel="{{userdetail.gender}}" formControlName="Gender" value="Female" />\n' +
    '                        <label for="radio2">Female</label>\n' +
    '                    </div>\n' +
    '                    <div class="radio-box">\n' +
    '                        <input type="radio" id="radio3" ngModel="{{userdetail.gender}}" formControlName="Gender" value="Others" />\n' +
    '                        <label for="radio3">Others</label>\n' +
    '                    </div>\n' +
    '                    <!-- end -->\n' +
    '                </div>\n' +
    '                <!-- end -->\n' +
    '            </div>\n' +
    '    \n' +
    '            <div class="popBtn">\n' +
    '                <button class="button line close-btn" (click)="closeModal(\'add-tax-table1\')" type="button">Cancel</button>\n' +
    '                <button class="button" type="submit">Update</button>\n' +
    '            </div>\n' +
    '    \n' +
    '        </form>\n' +
    '    \n' +
    '    </div>\n'+
    '    </jw-modal>'
})
export class AddUserComponent implements OnInit {
  adduserForm: FormGroup;
  updateuserForm: FormGroup;
  control: FormControl;
  submitted = false;
  @Input('addAdmin') addform: any;
  @Input('updateAdmin') updateform: any;
  @Input('userobj') arrayofselectedobj: any;
  userservice: any;
  userexp: any;
  public services: { [key: string]: Object; }[] = [
    { Name: 'Haircut', Id: '1' },
        { Name: 'Shampoo', Id: '2' }
    ];
    // maps the local data column to fields property
    public localFields: Object = { text: 'Name', value: 'Id' };
    // set the placeholder to MultiSelect Dropdown input element
    public localWaterMark: string = 'Select services';
  userlist: any;

  constructor(private AdminService: AdminService, private formBuilder: FormBuilder, private modalService: ModalService, private router: Router, private messageService: MessageService) { }

  get f() {
    return this.adduserForm.controls;
  }
  get f1() {
    return this.updateuserForm.controls;
  }

  ngOnInit() {
    this.adduserForm = this.formBuilder.group({
      FirstName: [''],
      LastName: [''],
      Gender: [''],
      Email: [''],
      Password: [''],
      PhoneNumber: [''],
      ServiceIds: [''],
      ExpLevelId: [''],
      TimeTrack: ['']
    });
    this.updateuserForm = this.formBuilder.group({
      FirstName: [''],
      LastName: [''],
      Gender: [''],
      Email: [''],
      Password: [''],
      PhoneNumber: [''],
      ServiceIds: [''],
      ExpLevelId: [''],
      TimeTrack: ['']
    });
    this.getuserServices();
    this.getuserExp();
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  createuser(Admin) {
    debugger;
    console.log(Admin, this.adduserForm)
    Admin.TimeTrack = Boolean(Admin.TimeTrack)
    Admin.ExpLevelId = parseInt(Admin.ExpLevelId);
    Admin.ServiceIds = parseInt(Admin.ServiceIds);
    Admin.ServiceIds = [Admin.ServiceIds];
    Admin.Password = "Leo@123";
    // tslint:disable-next-line:triple-equals
    if (this.adduserForm.status == 'VALID') {
      this.AdminService.create_user_service(Admin).subscribe((data) => {
        // this.AdminService.publish('call-user');
        this.messageService.clear();
        this.messageService.add('User Created successfully.')
        this.closeModal('add-tax-table1');
      });
    } else {
      console.log(Admin, this.adduserForm.status);
      this.submitted = true;
      if (this.adduserForm.invalid) {
        return;
      }
    }
  }

  updateuser(Admin) {
    debugger;
    console.log(Admin, this.updateuserForm)
    Admin.TimeTrack = Boolean(Admin.TimeTrack)
    Admin.ExpLevelId = parseInt(Admin.ExpLevelId);
    Admin.ServiceIds = parseInt(Admin.ServiceIds);
    Admin.ServiceIds = [Admin.ServiceIds];
    Admin.Password = "Leo@123";
    // tslint:disable-next-line:triple-equals
    if (this.updateuserForm.status == 'VALID') {
      this.AdminService.update_user_service(Admin).subscribe((data) => {
        // this.AdminService.publish('call-user');
        this.messageService.clear();
        this.messageService.add('User updated successfully.')
        this.closeModal('add-tax-table1');
      });
    } else {
      console.log(Admin, this.updateuserForm.status);
      this.submitted = true;
      if (this.updateuserForm.invalid) {
        return;
      }
    }
  }

  getuserServices() {
    this.AdminService.getUserServiceList().subscribe((data) => {
      this.userservice = data;
      this.userservice = this.userservice.result;
    });
  }

  getuserExp() {
    this.AdminService.getUserExp().subscribe((data) => {
      this.userexp = data;
      this.userexp = this.userexp.result;
    });
  }

  getuserList() {
    this.AdminService.getUserAdminList().subscribe((data) => {
      this.userlist = data;
      this.userlist = this.userlist.result;
      console.log(this.userlist, "userlist")
    });
  }

}
