import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { ModalService } from 'src/app/_modal/modal.service';
import { MessageService } from 'src/app/message.service';
import { Subscription } from 'rxjs';
import { UserdataService } from 'src/app/userdata.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {
  userrolesuccess: any;

  // tslint:disable-next-line:no-shadowed-variable
  constructor(public userdataService: UserdataService, private modalService: ModalService,private messageService: MessageService, public AdminService: AdminService,  private formBuilder: FormBuilder) { }
  userrightForm: FormGroup;
  control: FormControl;
  submitted = false;
  userdetailvar: boolean;
  rolesvar: boolean;
  historyvar: boolean;
  updateform: boolean;
  addform: boolean;
  userhistory: any;
  userroles: any;
  userlist: any;
  arrayofselectedobj: Array<any> = [];
  emailvar: any;
  pageinitemail: any;
  onloadvar: boolean;
  private subscription: Subscription;
  admincheck: any;
  managercheck: any;
  employeecheck: any;
  techniciancheck: any;
  rolesmodulerights: any;
  rolesindividualrights: any;

  ngOnInit() {
    this.AdminService.usernav = true;
    this.AdminService.navTab = 1;
    // this.userdetailvar = true;
    // this.rolesvar = false;
    // this.historyvar = false;
    this.getuserList();

    this.subscription = this.AdminService.on('call-user').subscribe(() => this.getuserList());
    this.subscription = this.AdminService.on('call-user-update').subscribe(() => this.addupdateform('update'));
  }

  userdetailsctive(type){
    if(type == 'roles'){
      this.rolesvar = true;
      this.userdetailvar = false;
      this.historyvar = false;
      document.querySelector('#userdetail').classList.remove('active');
      document.querySelector('#history').classList.remove('active');
      document.querySelector('#roles').classList.add('active');
    }else if(type == 'userdetail'){
      this.rolesvar = false;
      this.userdetailvar = true;
      this.historyvar = false;
      document.querySelector('#history').classList.remove('active');
      document.querySelector('#roles').classList.remove('active');
      document.querySelector('#userdetail').classList.add('active');
    }else if(type == 'history'){
      this.rolesvar = false;
      this.userdetailvar = false;
      this.historyvar = true;
      document.querySelector('#userdetail').classList.remove('active');
      document.querySelector('#roles').classList.remove('active');
      document.querySelector('#history').classList.add('active');
    }
  }


  openModal(id: string) {
    this.modalService.open1(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  addupdateform(type){
    debugger;
    if(type == 'add'){
      this.updateform = false;
      this.addform = true;
    }else if(type == 'update'){
      this.updateform = true;
      this.addform = false;
    }
  }

  getuserHistory(user) {
    this.AdminService.getUserHistory(user).subscribe((data) => {
      this.userhistory = data;
      this.userhistory = this.userhistory.list;
    });
  }

  getuserRoles(user) {
    this.AdminService.getUserAdminRoles(user).subscribe((data) => {
      this.userroles = data;
      this.userrolesuccess = this.userroles['success']
      this.userroles = this.userroles.result;
      console.log(this.userroles, "role")
    });
  }

  getuserList() {
    this.AdminService.getUserAdminList().subscribe((data) => {
      this.userlist = data;
      this.userlist = this.userlist.list;
      this.AdminService.setIndex(0,  this.userlist[0].user.id);
      this.userdataService.getProfilePic(this.userlist[0].user.id);
      this.getuserRoles(this.userlist[0])
      this.pageviewemailfunc(this.userlist);
    });
  }

  selectroleobj(selected_obj){
    console.log(selected_obj)
    var index = this.arrayofselectedobj.indexOf(selected_obj.user);
    if(index<0){
      this.arrayofselectedobj.splice(index, 1);
      this.arrayofselectedobj.push(selected_obj);
    }
    // this.arrayofselectedobj.push(selected_obj.user);
  }

  deleteUser(selected_user) {
    // tslint:disable-next-line:triple-equals
    if (selected_user) {
      this.AdminService.deleteUser(selected_user[0].id).subscribe((data) => {
        console.log(data)
        this.getuserList();
        this.messageService.clear();
        this.messageService.add(data['result']);
      });
    }
  }

  getemailfunc(user){
    if(user){
      this.emailvar = user.user.email;
      this.onloadvar = false;
    }
  }

  pageviewemailfunc(userlist){
    if(userlist){
      this.pageinitemail = userlist[0].user.email;
      this.onloadvar = true;
    }
  }

}
