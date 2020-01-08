import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {UserdataService} from '../../userdata.service';
import {ModalService} from '../../_modal/modal.service';
import {Observable} from 'rxjs';

// class timeZonesList {
// }

@Component({
  selector: 'app-accountsetting',
  templateUrl: './accountsetting.component.html',
  styleUrls: ['./accountsetting.component.css']
})
export class AccountsettingComponent implements OnInit {
  useraccountdetail: any;

  private modals: any[ ] = [];
  timeZonesList: {};
  userLanguageList: {}
  constructor( private router: Router, private userdataService: UserdataService, private modalService: ModalService) { }

  ngOnInit() {
    this.getuserAccount();
    this.userdataService.accountnav = false;

  }


  openModal(id, userdetail) {
    this.modalService.open(id, userdetail);
  }

  closeModal(id) {
    this.modalService.close(id);
  }

  getuserAccount() {
    this.userdataService.getUpdateUserAccount().subscribe((data) => {
      this.useraccountdetail = data;
      console.log(this.useraccountdetail)
      localStorage.setItem('companyId', data['ParentCompanyID']);
    });
  }

}
