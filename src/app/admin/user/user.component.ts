import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { ModalService } from 'src/app/_modal/modal.service';
import { MessageService } from 'src/app/message.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {
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

  constructor(private modalService: ModalService,private messageService: MessageService, public AdminService: AdminService) { }

  ngOnInit() {
    this.AdminService.usernav = true;
    this.userdetailvar = true;
    this.rolesvar = false;
    this.historyvar = false;
    this.getuserHistory();
    this.getuserRoles();
    this.getuserList();
    this.getusrRoles();
    // this.subscription = this.AdminService.on('call-user').subscribe(() => this.getuserList());
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
    if(type == 'add'){
      this.updateform = false;
      this.addform = true; 
    }else if(type == 'update'){
      this.updateform = true;
      this.addform = false;
    }
  }

  getuserHistory() {
    this.AdminService.getUserHistory().subscribe((data) => {
      this.userhistory = data;
      this.userhistory = this.userhistory.result;
    });
  }

  getuserRoles() {
    this.AdminService.getUserAdminRoles().subscribe((data) => {
      this.userroles = data;
      this.userroles = this.userroles.result;
      console.log(this.userroles, "role")
    });
  }

  getuserList() {
    this.AdminService.getUserAdminList().subscribe((data) => {
      this.userlist = data;
      this.userlist = this.userlist.result;
      console.log(this.userlist, "userlist")
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
    debugger;
    // tslint:disable-next-line:triple-equals
    if (selected_user) {
      this.AdminService.deleteUser(selected_user[0].id).subscribe((data) => {
        console.log(data)
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

  getusrRoles() {
    this.AdminService.getUserRoles().subscribe((data) => {
      this.userroles = data;
      this.userroles = this.userroles.result;
      console.log(this.userroles)
    });
  }

}