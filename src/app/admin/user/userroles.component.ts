import {Component, Input, OnInit} from '@angular/core';
import {ModalService} from '../../_modal/modal.service';
import {MessageService} from '../../message.service';
import {AdminService} from '../admin.service';
import {FormBuilder} from '@angular/forms';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-userrights',
  template: ' <!-- user details start -->\n' +
    '                                <!-- start -->\n' +

    '                            <div id="inner-tab2" *ngIf="adminService.showTab == 2">\n' +
    '                                <div *ngFor="let userdet of userlist">\n' +
    '                                    <div *ngIf="adminService.selecteduserid==userdet.user.id">\n' +
    '                                <!-- roles start -->\n' +
    '                                <!-- start -->\n' +
    '                                <div class="comm-headline-btn comm-headline-btn-admin">\n' +
    '                                    <h3 class="main-comm-head m-0">\n' +
    '                                        Roles\n' +
    '                                        <i class="icon-question rig-icn" data-toggle="tooltip" data-placement="right"\n' +
    '                                            title="Merge Sales"></i>\n' +
    '                                    </h3>\n' +
    '                                    <div class="filter-container">\n' +
    '                                        <a href="#" class="button mr-2">Save</a>\n' +
    '                                        <a href="#" class="button line mr-2">Cancel</a>\n' +
    '                                        <a href="#" class="button line orange">Reset</a>\n' +
    '                                    </div>\n' +
    '                                </div>\n' +
    '                                <!-- end -->\n' +
    '                                <div class="admin-comm-rig-scroll scrollbar">\n' +
    '                                    <!-- start -->\n' +
    '                                    <h6 class="comm-subhdn">{{userdet.user.firstName}}\'s Role</h6>\n' +
    '                                    <div class="row" *ngFor="let roles of userroles">\n' +
    '                                        <div class="w50 w-1200-100">\n' +
    '                                            <!-- start -->\n' +
    '                                            <div class="yur-mail-box">\n' +
    '                                                <h6 class="promo-head">{{roles.name}}</h6>\n' +
    '                                                <div class="switch switch--horizontal only-switch">\n' +
    '                                                    <input id="admin1" type="radio" [value]="false" name="admi-radio1" />\n' +
    '                                                    <label for="admin1"></label>\n' +
    '                                                    <input id="admin12" type="radio" [value]="true" name="admi-radio1" />\n' +
    '                                                    <label for="admin12"></label><span class="toggle-outside"><span\n' +
    '                                                            class="toggle-inside"></span></span>\n' +
    '                                                </div>\n' +
    '                                            </div>\n' +
    '                                            <!-- end -->\n' +
    '                                        </div>\n' +
    '                                    </div>\n' +
    '                                    <!-- end -->\n' +
    // '                                    <form [formGroup]="userrightForm" (ngSubmit)="createuser(userrightForm.value)">\n' +
    '                                        <!-- start -->\n' +
    '                                        <h6 class="comm-subhdn">Module Rights</h6>\n' +
    '                                        <div class="row">\n' +
    '                                            <div class="w100" *ngFor="let moduleright of rolesmodulerights">\n' +
    '                                                <!-- start -->\n' +
    '                                                <div class="module-role-box">\n' +
    '                                                    <div class="module-rig">\n' +
    '                                                        <h6 class="promo-head">{{moduleright.moduleName}}</h6>\n' +
    '                                                        <div class="switch switch--horizontal only-switch"\n' +
    '                                                            data-name="customer-switch">\n' +
    '                                                            <input class="notif-radio" id="{{moduleright.moduleName}}" type="radio"\n' +
    '                                                                name="{{moduleright.moduleName}}" [value]="false" />\n' +
    '                                                            <label for="{{moduleright.moduleName}}"></label>\n' +
    '                                                            <input class="notif-radio" id="{{moduleright.moduleName}}" type="radio"\n' +
    '                                                                name="{{moduleright.moduleName}}" [value]="true" />\n' +
    '                                                            <label for="{{moduleright.moduleName}}"></label><span class="toggle-outside"><span\n' +
    '                                                                    class="toggle-inside"></span></span>\n' +
    '                                                        </div>\n' +
    '                                                    </div>\n' +
    '                                                    <div class="module-btm customer-switch">\n' +
    '                                                        <div class="checkbox-box" *ngFor="let permission of moduleright.permissions">\n' +
    '                                                            <div>\n' +
    '                                                                <input type="checkbox" id="{{permission.permission}}_{{moduleright.moduleName}}" name="{{permission.permission}}" required="">\n' +
    '                                                                <label for="{{permission.permission}}_{{moduleright.moduleName}}">{{permission.permission}}</label>\n' +
    '                                                            </div>\n' +
    '                                                        </div>\n' +
    '                                                    </div>\n' +
    '                                                </div>\n' +
    '                                                <!-- end -->\n' +
    '                                            </div>\n' +
    '                                        </div>\n' +
    '                                        <!-- end -->\n' +
    '                                        <!-- start -->\n' +
    '                                        <h6 class="comm-subhdn">Individual Rights</h6>\n' +
    '                                        <div class="row">\n' +
    '                                            <div class="w100" *ngFor="let individualright of rolesindividualrights">\n' +
    '                                                <!-- start -->\n' +
    '                                                <div class="module-role-box">\n' +
    '                                                    <div class="module-rig">\n' +
    '                                                        <h6 class="promo-head">{{individualright.permission}}</h6>\n' +
    '                                                        <div class="switch switch--horizontal only-switch">\n' +
    '                                                            <input id="{{individualright.permission}}" type="checkbox" name="indiv-radio1" ngModel="{{individualright.isActive}}"/>\n' +
    '                                                            <label for="{{individualright.permission}}"></label>\n' +
    '                                                            <input id="{{individualright.permission}}" type="checkbox" name="indiv-radio1" ngModel="{{individualright.isActive}}"/>\n' +
    '                                                            <label for="{{individualright.permission}}"></label><span class="toggle-outside"><span\n' +
    '                                                                    class="toggle-inside"></span></span>\n' +
    '                                                        </div>\n' +
    '                                                    </div>\n' +
    '                                                    <p class="role-para">If this right is given then the user will be\n' +
    '                                                        able to see\n' +
    '                                                        the New\n' +
    '                                                        Sale button\n' +
    '                                                        and will\n' +
    '                                                        be able to create sales and use the point of sale portion of the\n' +
    '                                                        application.</p>\n' +
    '                                                </div>\n' +
    '                                                <!-- end -->\n' +
    '                                            </div>\n' +
    '                                        </div>\n' +
    '                                        <button class="button" type="submit">Save</button>\n' +
    // '                                    </form>\n' +
    '                                </div>\n' +
    '                                </div>\n' +
    '                                </div>'
})

export class UserRightsComponent implements OnInit {
  public userroles: Observable<any>;
  public rolesindividualrights: Observable<any>;
  public rolesmodulerights: Observable<any>;

  constructor(private modalService: ModalService,private messageService: MessageService, public adminService: AdminService,  private formBuilder: FormBuilder) { }
  @Input('userdetail') userlist: any;
  ngOnInit() {
    this.getuserRoles();
    this.getusrRoles();
    this.getrolesModuleRights();
    this.getrolesIndividualRights();
  }

  getuserRoles() {
    this.adminService.getUserAdminRoles().subscribe((data) => {
      this.userroles = data;
      this.userroles = this.userroles['result'];
      console.log(this.userroles, "role");
    });
  }

  getusrRoles() {
    this.adminService.getUserRoles().subscribe((data) => {
      this.userroles = data;
      this.userroles = this.userroles['result'];
      console.log(this.userroles, "rolesofuser")
    });
  }

  getrolesModuleRights() {
    this.adminService.getrolesModuleRights().subscribe((data) => {
      this.rolesmodulerights = data;
      this.rolesmodulerights = this.rolesmodulerights['result'];
      console.log(this.rolesmodulerights, "module")
    });
  }

  getrolesIndividualRights() {
    this.adminService.getrolesIndividualRights().subscribe((data) => {
      this.rolesindividualrights = data;
      this.rolesindividualrights = this.rolesindividualrights['result'];
      console.log(this.rolesindividualrights)
    });
  }
  }
