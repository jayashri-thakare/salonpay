import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {UserdataService} from '../../userdata.service';

@Component({
  selector: 'app-accountsetting',
  templateUrl: './accountsetting.component.html',
  styleUrls: ['./accountsetting.component.css']
})
export class AccountsettingComponent implements OnInit {

  constructor( private router: Router, private userdataService: UserdataService) { }

  ngOnInit() {
    this.userdataService.accountnav = false;
  }

}
