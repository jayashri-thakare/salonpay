import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {UserdataService} from '../../userdata.service';
import {ModalService} from '../../_modal/modal.service';

@Component({
  selector: 'app-accountsetting',
  templateUrl: './accountsetting.component.html',
  styleUrls: ['./accountsetting.component.css']
})
export class AccountsettingComponent implements OnInit {
  useraccountdetail: any;

  constructor( private router: Router, private userdataService: UserdataService, private modalService: ModalService) { }

  ngOnInit() {
    this.getuserAccount();
    this.userdataService.accountnav = false;
  }


  private modals: any[] = [];

  openModal(id: string, userdetail) {
    this.modalService.open(id, userdetail);
  }

  closeModal(id: string) {
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
