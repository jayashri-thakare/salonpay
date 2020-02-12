import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/_modal/modal.service';
import { Router } from '@angular/router';
import { CscService } from 'src/app/services/cscdropdown.service';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { UserdataService } from 'src/app/userdata.service';
import { MessageService } from 'src/app/message.service';
import { AdminService } from '../admin.service';
import { Subscription } from 'rxjs';
import {style} from '@angular/animations';
// import {$} from 'protractor';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})

export class AdminRolesComponent implements OnInit {
  rolesRightForm: FormGroup;
  control: FormControl;
  submitted = false;
  addform: boolean;
  updateform: boolean;
  public userroles: any;
  arrayofselectedobj: Array<any> = [];
  private subscription: Subscription;
  public rolesmodulerights: any;
  public rolesindividualrights: any;
  getrolesclaim: any;
  Customers_var: any;
  Appointments_var: any;
  Sales_var: any;
  private ModuleRightsobj = {};
  private claims = {};
  private Rightsobj = {};
  private individualRightsobj = {};
  arrayofselectedmoduleobj: Array<any>= [];
  arrayofselectedindividualobj: Array<any>= [];
  rolevar: any;
  onloadvar: boolean;
  pageinitrole: any;
  ModuleRights: FormArray;
  IndividualRights: FormArray;
  claimsuccess: any;
  getrolesindclaim: any;
  getrolesmodclaim: any;
  public enableCheckbox = [];
  getcustomerobj: any;
  getappointmentobj: any;
  getsalesobj: any;

  constructor(public AdminService: AdminService, private formBuilder: FormBuilder, private modalService: ModalService, private router: Router, private messageService: MessageService) { }

  get f() {
    return this.rolesRightForm.controls;
  }

  ngOnInit() {
    // this.rolesRightForm = this.formBuilder.group({
    //   // RoleName: '',
    //   ModuleRights: this.formBuilder.array([ this.moduleItem() ]),
    //   IndividualRights: this.formBuilder.array([ this.individualItem() ])
    // });
    this.AdminService.rolesnav = false;
    this.getuserRoles();
    this.getrolesModuleRights();
    this.getrolesIndividualRights();
    this.subscription = this.AdminService.on('call-roles').subscribe(() => this.getuserRoles());
  }

  // moduleItem(): FormGroup {
  //   return this.formBuilder.group({
  //     ModuleName: [''],
  //     IsSelected: [''],
  //     Rights: this.formBuilder.group({
  //       Create: [''],
  //       Update: [''],
  //       Delete: [''],
  //       View: ['']
  //     })
  //   });
  // }

  // individualItem(): FormGroup {
  //   return this.formBuilder.group({
  //     ModuleName: [''],
  //     IsSelected: ['']
  //   });
  // }

  // addModule(): void {
  //   this.ModuleRights = this.rolesRightForm.get('ModuleRights') as FormArray;
  //   this.ModuleRights.push(this.moduleItem());
  // }

  // addRight(): void {
  //   this.Rights = this.rolesRightForm.get('Rights') as FormArray;
  //   this.Rights.push(this.moduleRightItem());
  // }
  showr: string;

  selectroleobj(selected_obj){
    var index = this.arrayofselectedobj.indexOf(selected_obj);
    if(index<0){
      this.arrayofselectedobj.splice(index, 1);
      this.arrayofselectedobj.push(selected_obj);
    }
    console.log(this.arrayofselectedobj)
  }

  addupdateform(type){
    if(type == 'add'){
      this.updateform = false;
      this.addform = true;
    }else if(type == 'update'){
      this.updateform = true;
      this.addform = false;
    }
  }

  openModal(id: string) {
    this.modalService.open1(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  checkRights(modulename, value) {
    this.enableCheckbox.push(modulename);
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
  moduleonoff(event, checkvalue, moduleright, i){
    // if(checkvalue===true){
    //   this.showr = moduleright;
    // }
    // else{
    //   this.showr = 'checkvalue_false';
    // }
    console.log(this.showr);
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
    console.log(this.arrayofselectedmoduleobj)
  }

  modulepermission(event, type, moduleright){
    console.log(event, type, moduleright)
    for(let i=0; i < this.arrayofselectedmoduleobj.length; i++){
      if(this.arrayofselectedmoduleobj[i]['ModuleName'] == moduleright){
        if(type){
          for(let j=0; j < this.arrayofselectedmoduleobj[i]['Rights'].length; j++){
            this.arrayofselectedmoduleobj[i]['Rights'][j][type] = event.currentTarget.checked
          }
        }
      }
    }
    console.log(this.arrayofselectedmoduleobj)
  }

  rightsupdate(mirights, event, type){
    debugger;
    if(type){
      event = event.currentTarget.checked;
    }
    for(let i=0; i < this.getrolesmodclaim.length; i++){
      if(this.getrolesmodclaim[i]['moduleName'] == mirights){
        if(type){
          for(let j=0; j < this.getrolesmodclaim[i]['rights'].length; j++){
            this.getrolesmodclaim[i]['rights'][j][type] = event;
          }
        }else{
          this.getrolesmodclaim[i]['isSelected'] = event;
        }
      }
    }
    this.getrolesModuleRights = this.getrolesmodclaim
    console.log(this.getrolesModuleRights)
  }

  irightsupdate(mirights, event){
    debugger;
    if(event){
      for(let i=0; i < this.getrolesindclaim.length; i++){
        if(this.getrolesindclaim[i]['moduleName'] == mirights){
          if(mirights){
            this.getrolesindclaim[i]['isSelected'] = event;
          }
        }
      }
    }
    console.log(this.getrolesindclaim)
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
    console.log(this.arrayofselectedindividualobj)
  }

  getuserRoles() {
    this.AdminService.getUserRoles().subscribe((data) => {
      this.userroles = data;
      console.log(this.userroles)
      this.userroles = this.userroles.result;
      this.GetCompanyRolesClaims(this.userroles[0]['id'])
      this.getrolefunc(this.userroles[0]['id']);
      console.log(this.userroles)
    });
  }

  deleteRole(selected_role) {
    debugger;
    selected_role.RoleId = selected_role[0]['id'];
    // tslint:disable-next-line:triple-equals
    if (selected_role) {
      this.AdminService.deleteUserRoles(selected_role.RoleId).subscribe((data) => {
        console.log(data)
        this.getuserRoles();
        this.messageService.clear();
        this.messageService.add(data['result']);
      });
    }
  }

  getrolesModuleRights() {
    this.AdminService.getrolesModuleRights().subscribe((data) => {
      this.rolesmodulerights = data;
      this.rolesmodulerights = this.rolesmodulerights.result;
      console.log(this.rolesmodulerights, "module")
    });
  }

  getrolesIndividualRights() {
    this.AdminService.getrolesIndividualRights().subscribe((data) => {
      this.rolesindividualrights = data;
      this.rolesindividualrights = this.rolesindividualrights.result;
      console.log(this.rolesindividualrights)
    });
  }

  GetCompanyRolesClaims(roleid) {
    this.getcustomerobj = {};
    this.getappointmentobj = {};
    this.getsalesobj = {};
    debugger;
    this.AdminService.GetCompanyRolesClaims(roleid).subscribe((data) => {
      this.getrolesclaim = data;
      console.log(this.getrolesclaim)
      this.claimsuccess = this.getrolesclaim.success;
      this.getrolesmodclaim = this.getrolesclaim.result[0].claim.moduleRights;
      for(let i =0; i< this.getrolesmodclaim.length; i++){
        if(this.getrolesmodclaim[i]['moduleName'] == 'Customers'){
          this.getcustomerobj = this.getrolesmodclaim[i];
        } 
        if(this.getrolesmodclaim[i]['moduleName'] == 'Appointments'){
          this.getappointmentobj = this.getrolesmodclaim[i];
        } 
        if(this.getrolesmodclaim[i]['moduleName'] == 'Sales'){
          this.getsalesobj = this.getrolesmodclaim[i];
        } 
      }
      this.getrolesindclaim = this.getrolesclaim.result[0].claim.individualRights;
      console.log(this.getcustomerobj, this.getappointmentobj, this.getsalesobj)
    });
  }

  getrolefunc(userrole){
    debugger;
    if(userrole){
      this.rolevar = userrole;
      this.onloadvar = false;
    }
  }

  pageviewrolefunc(userrole){
    if(userrole){
      this.pageinitrole = userrole[0].email;
      this.onloadvar = true;
    }
  }

  addupdateroleclaims(Admin) {
    debugger;
    this.claims['ModuleRights'] = this.arrayofselectedmoduleobj;
    this.claims['IndividualRights'] = this.arrayofselectedindividualobj;
    this.claims['RoleName'] = Admin.name;
    this.claims['RoleId'] = Admin.id;
    // tslint:disable-next-line:triple-equals
    if (this.claims['IndividualRights'].length == 0 && this.claims['ModuleRights'].length == 0 ) {
      this.messageService.clear();
      this.messageService.add('Please add Rights of the User.')
    }else{
      this.AdminService.addUpdateRoleClaims(this.claims).subscribe((data) => {
        // this.AdminService.publish('call-user');
        this.claims = {};
        this.arrayofselectedindividualobj = [];
        this.arrayofselectedmoduleobj = [];
        this.messageService.clear();
        this.messageService.add('Claims Created successfully.')
      });
    }
  }

  updateroleclaims(Admin) {
    debugger;
    this.claims['ModuleRights'] = this.getrolesmodclaim;
    this.claims['IndividualRights'] = this.getrolesindclaim;
    this.claims['RoleName'] = Admin.name;
    this.claims['RoleId'] = Admin.id;
    // tslint:disable-next-line:triple-equals
    if (this.claims['IndividualRights'].length == 0 && this.claims['ModuleRights'].length == 0 ) {
      this.messageService.clear();
      this.messageService.add('Please add Rights of the User.')
    }else{
      this.AdminService.addUpdateRoleClaims(this.claims).subscribe((data) => {
        // this.AdminService.publish('call-user');
        this.claims = {};
        this.arrayofselectedindividualobj = [];
        this.arrayofselectedmoduleobj = [];
        this.messageService.clear();
        this.messageService.add('Claims Created successfully.')
      });
    }
  }

}
