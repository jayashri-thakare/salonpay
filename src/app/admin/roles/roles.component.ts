import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/_modal/modal.service';
import { Router } from '@angular/router';
import { CscService } from 'src/app/services/cscdropdown.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { UserdataService } from 'src/app/userdata.service';
import { MessageService } from 'src/app/message.service';
import { AdminService } from '../admin.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})

export class RolesComponent implements OnInit {
  rolesRightForm: FormGroup;
  control: FormControl;
  submitted = false;
  admin: boolean;
  manager: boolean;
  employee: boolean;
  technician: boolean;
  addform: boolean;
  updateform: boolean;
  userroles: any;
  arrayofselectedobj: Array<any> = [];
  private subscription: Subscription;
  rolesmodulerights: any;
  rolesindividualrights: any;
  getrolesclaim: any;
  noclaimvar: boolean;
  claimvar: boolean;

  constructor(private AdminService: AdminService, private formBuilder: FormBuilder, private modalService: ModalService, private router: Router, private messageService: MessageService) { }

  get f() {
    return this.rolesRightForm.controls;
  }

  ngOnInit() {
    this.noclaimvar = true;
    this.rolesRightForm = this.formBuilder.group({
      
    });
    this.AdminService.rolesnav = false;
    this.admin = true;
    this.manager = false;
    this.employee = false;
    this.technician = false;
    this.getuserRoles();
    this.getrolesModuleRights();
    this.getrolesIndividualRights();
    // this.subscription = this.AdminService.on('call-roles').subscribe(() => this.getuserRoles());
  }

  selectroleobj(selected_obj){
    var index = this.arrayofselectedobj.indexOf(selected_obj);
    if(index<0){
      this.arrayofselectedobj.splice(index, 1);
      this.arrayofselectedobj.push(selected_obj);
    }
    console.log(this.arrayofselectedobj)
  }

  rolesfunction(type){
    if(type == 'manager'){
      this.admin = false;
      this.manager = true;
      this.employee = false;
      this.technician = false;
      document.querySelector('#admin').classList.remove('active');
      document.querySelector('#employee').classList.remove('active');
      document.querySelector('#technician').classList.remove('active');
      document.querySelector('#manager').classList.add('active');
    }else if(type == 'employee'){
      this.admin = false;
      this.manager = false;
      this.employee = true;
      this.technician = false;
      document.querySelector('#admin').classList.remove('active');
      document.querySelector('#technician').classList.remove('active');
      document.querySelector('#manager').classList.remove('active');
      document.querySelector('#employee').classList.add('active');
    }else if(type == 'technician'){
      this.admin = false;
      this.manager = false;
      this.employee = false;
      this.technician = true;
      document.querySelector('#admin').classList.remove('active');
      document.querySelector('#employee').classList.remove('active');
      document.querySelector('#manager').classList.remove('active');
      document.querySelector('#technician').classList.add('active');
    }else if(type == 'admin'){
      this.admin = true;
      this.manager = false;
      this.employee = false;
      this.technician = false;
      document.querySelector('#technician').classList.remove('active');
      document.querySelector('#employee').classList.remove('active');
      document.querySelector('#manager').classList.remove('active');
      document.querySelector('#admin').classList.add('active');
    }
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

  openModal(id: string, userdetail) {
    this.modalService.open(id, userdetail);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  getuserRoles() {
    this.AdminService.getUserRoles().subscribe((data) => {
      this.userroles = data;
      this.userroles = this.userroles.result;
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

  GetCompanyRolesClaims() {
    this.AdminService.GetCompanyRolesClaims().subscribe((data) => {
      this.getrolesclaim = data;
      // this.getrolesclaim = this.getrolesclaim.result;
      console.log(this.getrolesclaim)
    });
  }

  claimvarfunc(){
    if(this.noclaimvar == true){
      this.claimvar = true;
      this.noclaimvar = false;
    }else{
      this.claimvar = false;
      this.noclaimvar = true;
    }
  }

}