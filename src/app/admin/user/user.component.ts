import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {
  userdetailvar: boolean;
  rolesvar: boolean;
  historyvar: boolean;

  constructor() { }

  ngOnInit() {
    this.userdetailvar = true;
    this.rolesvar = false;
    this.historyvar = false;
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

}