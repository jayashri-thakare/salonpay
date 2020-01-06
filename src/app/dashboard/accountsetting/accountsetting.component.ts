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

  private modals: any[ ] = [];
  timeZonesList: {};
  userLanguageList: {}
  constructor( private router: Router, private userdataService: UserdataService, private modalService: ModalService) { }

  ngOnInit() {
    this.userdataService.accountnav = false;

  }


  openModal(id, userdetail) {
    this.modalService.open(id, userdetail);
  }

  closeModal(id) {
    this.modalService.close(id);
  }

}
