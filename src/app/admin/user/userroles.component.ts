import {Component, Input, OnInit} from '@angular/core';
import {ModalService} from '../../_modal/modal.service';
import {MessageService} from '../../message.service';
import {AdminService} from '../admin.service';
import {FormBuilder, FormGroup, FormControl} from '@angular/forms';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-userrights',
  styleUrls: ['./user.component.css'],
  template: ' <!-- user details start -->\n' +
    '                                <!-- start -->\n' +
    '                            <div id="inner-tab2" *ngIf="AdminService.showTab == 2">\n' +
    '                                <div *ngFor="let userdet of userlist">\n' +
    '                                    <div *ngIf="AdminService.selecteduserid==userdet.user.id">\n' +
    '                                <!-- roles start -->\n' +
    '                                <!-- start -->\n' +
    '                                <div class="comm-headline-btn comm-headline-btn-admin">\n' +
    '                                    <h3 class="main-comm-head m-0">\n' +
    '                                        Roles\n' +
    '                                        <i class="icon-question rig-icn" data-toggle="tooltip" data-placement="right"\n' +
    '                                            title="Merge Sales"></i>\n' +
    '                                    </h3>\n' +
    '                                    <div class="filter-container">\n' +
    '                                        <a (click)="assignRoleToUser(userroleForm.value, userdet)" class="button mr-2 addbtncol">Save</a>\n' +
    '                                        <a href="#" class="button line mr-2">Cancel</a>\n' +
    '                                        <a href="#" class="button line orange">Reset</a>\n' +
    '                                    </div>\n' +
    '                                </div>\n' +
    '                                <!-- end -->\n' +
    '                                <div class="admin-comm-rig-scroll scrollbar">\n' +
    '                                    <!-- start -->\n' +
    '                                    <h6 class="comm-subhdn">{{userdet.user.firstName}}\'s Role</h6>\n' +
    '                                    <div class="row" *ngFor="let roles of userroles">\n' +
    '                                        <form class="popup-scrll" [formGroup]="userroleForm">\n' +
      '                                        <div class="w50 w-1200-100">\n' +
      '                                            <!-- start -->\n' +
      '                                             <div class="radio-box">\n' +
                                                      '<input id="{{roles.name}}" type="radio" [value]="roles.name" formControlName="RoleList" />\n' +
                                                          '<label for="{{roles.name}}">{{roles.name}}</label>\n' +
      '                                              </div>\n' +
      '                                            <!-- end -->\n' +
      '                                        </div>\n' +
      '                                      </form>\n' +
    '                                    </div>\n' +
    '                                    <!-- end -->\n' +
    // '                                    <form [formGroup]="userrightForm" (ngSubmit)="createuser(userrightForm.value)">\n' +
    '                                        <!-- start -->\n' +
    '                                         <h6 class="comm-subhdn">Module Rights</h6>\n' +
    '                                            <div class="row">\n' +
    '                                                <div class="w100" *ngFor="let moduleright of rolesmodulerights">\n' +
    '                                                    <!-- start -->\n' +
    '                                                    <div class="module-role-box">\n' +
    '                                                        <div class="module-rig">\n' +
    '                                                            <h6 class="promo-head">{{moduleright.moduleName}}</h6>\n' +
    '                                                            <div class="switch switch--horizontal only-switch"\n' +
    '                                                                data-name="customer-switch">\n' +
    '                                                                <input class="notif-radio" ngModel="{{options}}" (click)="moduleonoff($event, false, moduleright.moduleName)" id="{{moduleright.moduleName}}" type="radio"\n' +
    '                                                                    name="{{moduleright.moduleName}}" [value]="false" />\n' +
    '                                                                <label for="{{moduleright.moduleName}}"></label>\n' +
    '                                                                <input class="notif-radio" ngModel="{{options}}" (click)="moduleonoff($event, true, moduleright.moduleName)" id="{{moduleright.moduleName}}" type="radio"\n' +
    '                                                                    name="{{moduleright.moduleName}}" [value]="true" />\n' +
    '                                                                <label for="{{moduleright.moduleName}}"></label><span class="toggle-outside"><span\n' +
    '                                                                        class="toggle-inside"></span></span>\n' +
    '                                                            </div>\n' +
    '                                                        </div>\n' +
    '                                                        <div class="module-btm customer-switch">\n' +
    '                                                            <div class="checkbox-box" *ngFor="let permission of moduleright.permissions">\n' +
    '                                                                <div id="{{moduleright.moduleName}}">\n' +
    '                                                                    <input type="checkbox" id="{{permission.permission}}_{{moduleright.moduleName}}" (click)="modulepermission($event, permission.permission, moduleright.moduleName)" name="{{permission.permission}}" required="">\n' +
    '                                                                    <label for="{{permission.permission}}_{{moduleright.moduleName}}">{{permission.permission}}</label>\n' +
    '                                                                </div>\n' +
    '                                                            </div>\n' +
    '                                                        </div>\n' +
    '                                                    </div>\n' +
    '                                                    <!-- end -->\n' +
    '                                                </div>\n' +
    '                                            </div>\n' +
    '                                        <!-- end -->\n' +
    '                                        <!-- start -->\n' +
    '                                        <h6 class="comm-subhdn">Individual Rights</h6>\n' +
    '                                          <div class="row">\n' +
    '                                              <div class="w100" *ngFor="let individualright of rolesindividualrights">\n' +
    '                                                  <!-- start -->\n' +
    '                                                  <div class="module-role-box">\n' +
    '                                                      <div class="module-rig">\n' +
    '                                                          <h6 class="promo-head">{{individualright.permission}}</h6>\n' +
    '                                                          <div class="switch switch--horizontal only-switch">\n' +
    '                                                              <input id="{{individualright.permission}}" type="radio" [value]="false" name="{{individualright.permission}}" (click)="individualonoff($event, false, individualright.permission)" name="indiv-radio1" />\n' +
    '                                                              <label for="{{individualright.permission}}"></label>\n' +
    '                                                              <input id="{{individualright.permission}}" type="radio" [value]="true" name="{{individualright.permission}}" (click)="individualonoff($event, true, individualright.permission)" name="indiv-radio1" />\n' +
    '                                                              <label for="{{individualright.permission}}"></label><span class="toggle-outside"><span\n' +
    '                                                                      class="toggle-inside"></span></span>\n' +
    '                                                          </div>\n' +
    '                                                      </div>\n' +
    '                                                      <p class="role-para">If this right is given then the user will be\n' +
    '                                                          able to see\n' +
    '                                                          the New\n' +
    '                                                          Sale button\n' +
    '                                                          and will\n' +
    '                                                         be able to create sales and use the point of sale portion of the\n' +
    '                                                          application.</p>\n' +
    '                                                  </div>\n' +
    '                                                  <!-- end -->\n' +
    '                                              </div>\n' +
    '                                          </div>\n' +
    '                                          <button class="button" (click)="addupdateclaims(userdet)">Save</button>\n' +
    // '                                    </form>\n' +
    '                                </div>\n' +
    '                                </div>\n' +
    '                                </div>'
})

export class UserRightsComponent implements OnInit {
  userroleForm: FormGroup;
  control: FormControl;
  submitted = false;
  private userroles: Observable<any>;
  private rolesindividualrights: Observable<any>;
  private rolesmodulerights: Observable<any>;
  private ModuleRightsobj= {};
  Customers_var: any;
  Appointments_var: any;
  Sales_var: any;
  arrayofselectedmoduleobj: Array<any> = [];
  private individualRightsobj= {};
  arrayofselectedindividualobj: Array<any> = [];
  private claims= {};

  constructor(private modalService: ModalService,private messageService: MessageService, public AdminService: AdminService,  private formBuilder: FormBuilder) { }
  @Input('userdetail') userlist: any;
  ngOnInit() {
    this.getuserRoles();
    this.getusrRoles();
    this.getrolesModuleRights();
    this.getrolesIndividualRights();
    this.userroleForm = this.formBuilder.group({
        RoleList : ['']
    });
  }
  moduleonoff(event, checkvalue, moduleright){
    console.log(event, moduleright)
    if(moduleright == "Customers"){
      this.Customers_var = checkvalue;
      this.ModuleRightsobj['ModuleName'] = moduleright;
      this.ModuleRightsobj['IsSelected'] = checkvalue;
      this.ModuleRightsobj['Rights'] = {
        "View": false,
        "Update": false,
        "Create": false,
        "Delete": false
      }
    }else if(moduleright == "Appointments"){
      this.Appointments_var = checkvalue;
      this.ModuleRightsobj['ModuleName'] = moduleright;
      this.ModuleRightsobj['IsSelected'] = checkvalue;
      this.ModuleRightsobj['Rights'] = {
        "View": false,
        "Update": false,
        "Create": false,
        "Delete": false
      }
    }else if(moduleright == "Sales"){
      this.Sales_var = checkvalue;
      this.ModuleRightsobj['ModuleName'] = moduleright;
      this.ModuleRightsobj['IsSelected'] = event.currentTarget.checked;
      this.ModuleRightsobj['Rights'] = {
        "View": false,
        "Update": false,
        "Create": false,
        "Delete": false
      }
    }
    console.log(this.ModuleRightsobj)
    var index = this.arrayofselectedmoduleobj.indexOf(this.ModuleRightsobj);
    if(index<0 && checkvalue){
      this.arrayofselectedmoduleobj.push(this.ModuleRightsobj);
      this.ModuleRightsobj = {};
    }else{
      for(let i=0; i < this.arrayofselectedmoduleobj.length; i++){
        if(this.arrayofselectedmoduleobj[i]['ModuleName'] == moduleright){
          this.arrayofselectedmoduleobj.splice(i, 1);
        }
      }
    }
  }

  modulepermission(event, type, moduleright){
    console.log(event, type)
    for(let i=0; i < this.arrayofselectedmoduleobj.length; i++){
      if(this.arrayofselectedmoduleobj[i]['ModuleName'] == moduleright){
        if(type){
          this.arrayofselectedmoduleobj[i]['Rights'][type] = event.currentTarget.checked
        }
      }
    }
  }

  individualonoff(event, checkvalue, individualright){
    console.log(event, individualright)
    if(individualright == "Create New Sale"){
      this.individualRightsobj['ModuleName'] = individualright;
      this.individualRightsobj['IsSelected'] = checkvalue;
    }else if(individualright == "Create New Appointment"){
      this.individualRightsobj['ModuleName'] = individualright;
      this.individualRightsobj['IsSelected'] = checkvalue;
    }else if(individualright == "Manage Sales Commissions,Tips and Turns"){
      this.individualRightsobj['ModuleName'] = individualright;
      this.individualRightsobj['IsSelected'] = checkvalue;
    }else if(individualright == "Cancel Appointments"){
      this.individualRightsobj['ModuleName'] = individualright;
      this.individualRightsobj['IsSelected'] = checkvalue;
    }else if(individualright == "Bulk Edit"){
      this.individualRightsobj['ModuleName'] = individualright;
      this.individualRightsobj['IsSelected'] = checkvalue;
    }else if(individualright == "Communicate with Customers"){
      this.individualRightsobj['ModuleName'] = individualright;
      this.individualRightsobj['IsSelected'] = checkvalue;
    }else if(individualright == "Add Customer Notes"){
      this.individualRightsobj['ModuleName'] = individualright;
      this.individualRightsobj['IsSelected'] = checkvalue;
    }
    console.log(this.individualRightsobj)
    var index = this.arrayofselectedindividualobj.indexOf(this.individualRightsobj);
    if(index<0 && checkvalue){
      this.arrayofselectedindividualobj.push(this.individualRightsobj);
      this.individualRightsobj = {};
    }else{
      for(let i=0; i < this.arrayofselectedindividualobj.length; i++){
        if(this.arrayofselectedindividualobj[i]['ModuleName'] == individualright){
          this.arrayofselectedindividualobj.splice(i, 1);
        }
      }
    }
  }

  addupdateclaims(Admin) {
    debugger;
    this.claims['ModuleRights'] = this.arrayofselectedmoduleobj;
    this.claims['IndividualRights'] = this.arrayofselectedindividualobj;
    this.claims['Email'] = Admin.user.email;
    // tslint:disable-next-line:triple-equals
    if (this.claims['IndividualRights'].length == 0 && this.claims['ModuleRights'].length == 0 ) {
      this.messageService.clear();
      this.messageService.add('Please add Rights of the User.')
    }else{
      this.AdminService.addupdateclaims(this.claims).subscribe((data) => {
        // this.AdminService.publish('call-user');
        this.claims = {};
        this.arrayofselectedindividualobj = [];
        this.arrayofselectedmoduleobj = [];
        this.messageService.clear();
        this.messageService.add('Claims Created successfully.')
      });
    }
  }

  getuserRoles() {
    this.AdminService.getUserAdminRoles().subscribe((data) => {
      this.userroles = data;
      this.userroles = this.userroles['result'];
      console.log(this.userroles, "role");
    });
  }

  getusrRoles() {
    this.AdminService.getUserRoles().subscribe((data) => {
      this.userroles = data;
      this.userroles = this.userroles['result'];
      console.log(this.userroles, "rolesofuser")
    });
  }

  getrolesModuleRights() {
    this.AdminService.getrolesModuleRights().subscribe((data) => {
      this.rolesmodulerights = data;
      this.rolesmodulerights = this.rolesmodulerights['result'];
      console.log(this.rolesmodulerights, "module")
    });
  }

  getrolesIndividualRights() {
    this.AdminService.getrolesIndividualRights().subscribe((data) => {
      this.rolesindividualrights = data;
      this.rolesindividualrights = this.rolesindividualrights['result'];
      console.log(this.rolesindividualrights)
    });
  }

  assignRoleToUser(Admin, user) {
    debugger;
    Admin.User = {
      "UserName": user.user.email,
      "Email": user.user.email,
      "Id": user.user.id
    }
    Admin.RoleList = [Admin.RoleList];
    // tslint:disable-next-line:triple-equals
    if (this.userroleForm.status == 'VALID') {
      this.AdminService.assign_Role_ToUser(Admin).subscribe((data) => {
        // this.AdminService.publish('call-user');
        this.messageService.clear();
        this.messageService.add('User Role updated successfully.')
      });
    } else {
      console.log(Admin, this.userroleForm.status);
      this.submitted = true;
      if (this.userroleForm.invalid) {
        return;
      }
    }
  }
}
