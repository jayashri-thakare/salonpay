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
    '                                        <a *ngIf="userrolesuccess == 0" (click)="assignRoleToUser(userroleForm.value, userdet)" class="button mr-2 addbtncol">Save</a>\n' +
    '                                        <a *ngIf="userrolesuccess == 1" (click)="updateassignRoleToUser(userroleForm.value, userdet)" class="button mr-2 addbtncol">Update</a>\n' +
    '                                        <a href="#" class="button line mr-2">Cancel</a>\n' +
    '                                        <a href="#" class="button line orange">Reset</a>\n' +
    '                                    </div>\n' +
    '                                </div>\n' +
    '                                <!-- end -->\n' +
    '                                <div class="admin-comm-rig-scroll scrollbar">\n' +
    '                                    <!-- start -->\n' +
    '                                    <h6 class="comm-subhdn">{{userdet.user.firstName}}\'s Role</h6>\n' +
    '                                    <div class="row">\n' +
    '                                        <form class="popup-scrll" [formGroup]="userroleForm">\n' +
      '                                        <div class="w50 w-1200-100" *ngFor="let roles of userroleslist;let i = index">\n' +
      '                                            <!-- start -->\n' +
      '                                             <div class="radio-box">\n' +
                                                      '<input id="{{roles.name}}" type="radio" [value]="roles.name" name="RoleList" formControlName="RoleList" />\n' +
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
    '                                                <div class="w100" *ngFor="let moduleright of rolesmodulerights;let i = index;">\n' +
    '                                                    <!-- start -->\n' +
    '                                                    <div class="module-role-box">\n' +
    '                                                        <div class="module-rig">\n' +
    '                                                            <h6 class="promo-head">{{moduleright.moduleName}}</h6>\n' +
    '                                                            <div class="switch switch--horizontal only-switch"\n' +
    '                                                                data-name="customer-switch">\n' +
    '                                                                <input class="notif-radio" (click)="moduleonoff($event, false, moduleright.moduleName, i); removeRights(moduleright.moduleName); showDiv(moduleright.moduleName, i, false)" id="{{moduleright.moduleName}}" type="radio"\n' +
    '                                                                    name="{{moduleright.moduleName}}" [value]="false" />\n' +
    '                                                                <label for="{{moduleright.moduleName}}"></label>\n' +
    '                                                                <input class="notif-radio" (click)="moduleonoff($event, true, moduleright.moduleName, i); checkRights(moduleright.moduleName, true);showDiv(moduleright.moduleName, i, true)" id="{{moduleright.moduleName}}" type="radio"\n' +
    '                                                                    name="{{moduleright.moduleName}}" [value]="true" />\n' +
    '                                                                <label for="{{moduleright.moduleName}}"></label><span class="toggle-outside"><span\n' +
    '                                                                        class="toggle-inside"></span></span>\n' +
    '                                                            </div>\n' +
    '                                                        </div>\n' +
    '                                                        <div id="{{moduleright.moduleName}}{{i}}" class="module-btm customer-switch role-class-display-none">\n' +
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
  public rolesindividualrights: Observable<any>;
  public rolesmodulerights: Observable<any>;
  public ModuleRightsobj= {};
  Customers_var: any;
  Appointments_var: any;
  Sales_var: any;
  arrayofselectedmoduleobj: Array<any> = [];
  public individualRightsobj= {};
  arrayofselectedindividualobj: Array<any> = [];
  public claims= {};
  public enableCheckbox = [];
  userroleslist: any;

  constructor(public modalService: ModalService,private messageService: MessageService, public AdminService: AdminService,  private formBuilder: FormBuilder) { }
  @Input('userdetail') userlist: any;
  @Input('userrole') userroles: any;
  @Input('userrolesuccess') userrolesuccess:any;
  ngOnInit() {
    this.getrolesModuleRights();
    this.getrolesIndividualRights();
    this.getuserRoles();
    this.userroleForm = this.formBuilder.group({
        RoleList : ['']
    });
  }

  getuserRoles() {
    this.AdminService.getUserRoles().subscribe((data) => {
      this.userroleslist = data;
      console.log(this.userroleslist)
      this.userroleslist = this.userroleslist.result;
      console.log(this.userroleslist)
    });
  }

  moduleonoff(event, checkvalue, moduleright, i){
    console.log(event, moduleright)
    if(moduleright == "Customers"){
      this.Customers_var = checkvalue;
      this.ModuleRightsobj['ModuleName'] = moduleright;
      this.ModuleRightsobj['IsSelected'] = checkvalue;
      this.ModuleRightsobj['Rights'] = [{
        "View": false,
        "Update": false,
        "Create": false,
        "Delete": false
      }]
    }else if(moduleright == "Appointments"){
      this.Appointments_var = checkvalue;
      this.ModuleRightsobj['ModuleName'] = moduleright;
      this.ModuleRightsobj['IsSelected'] = checkvalue;
      this.ModuleRightsobj['Rights'] = [{
        "View": false,
        "Update": false,
        "Create": false,
        "Delete": false
      }]
    }else if(moduleright == "Sales"){
      this.Sales_var = checkvalue;
      this.ModuleRightsobj['ModuleName'] = moduleright;
      this.ModuleRightsobj['IsSelected'] = event.currentTarget.checked;
      this.ModuleRightsobj['Rights'] = [{
        "View": false,
        "Update": false,
        "Create": false,
        "Delete": false
      }]
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

  showDiv(modulename, ind, val) {
    let divn = modulename + ind;
    if (this.enableCheckbox.includes(modulename) && val ===true){
      document.querySelector('#'+divn).classList.remove('role-class-display-none')
      document.querySelector('#'+divn).classList.add('role-class-display')
    }else{
      document.querySelector('#'+divn).classList.remove('role-class-display')
      document.querySelector('#'+divn).classList.add('role-class-display-none')
    }
  }
  removeRights(modulename) {
    const index: number = this.enableCheckbox.indexOf(modulename);
    if (index !== -1) {
      this.enableCheckbox.splice(index, 1);
    }
  }

  checkRights(modulename, value) {
    this.enableCheckbox.push(modulename);
  }

  modulepermission(event, type, moduleright){
    console.log(event, type)
    for(let i=0; i < this.arrayofselectedmoduleobj.length; i++){
      if(this.arrayofselectedmoduleobj[i]['ModuleName'] == moduleright){
        if(type){
          for(let j=0; j < this.arrayofselectedmoduleobj[i]['Rights'].length; j++){
            this.arrayofselectedmoduleobj[i]['Rights'][j][type] = event.currentTarget.checked
          }
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
        this.messageService.add('User Role created successfully.')
      });
    } else {
      console.log(Admin, this.userroleForm.status);
      this.submitted = true;
      if (this.userroleForm.invalid) {
        return;
      }
    }
  }

  updateassignRoleToUser(Admin, user) {
    debugger;
    Admin.User = {
      "UserName": user.user.email,
      "Email": user.user.email,
      "Id": user.user.id
    }
    Admin.RoleList = [Admin.RoleList];
    // tslint:disable-next-line:triple-equals
    if (this.userroleForm.status == 'VALID') {
      this.AdminService.update_assign_Role_ToUser(Admin).subscribe((data) => {
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
