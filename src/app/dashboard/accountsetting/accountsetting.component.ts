import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {UserdataService} from '../../userdata.service';
import {ModalService} from '../../_modal/modal.service';
import {Observable} from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

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
  subscription: any;
  constructor(private translate: TranslateService, private router: Router, private userdataService: UserdataService, private modalService: ModalService) {
   
   }

  ngOnInit() {
    this.getuserAccount();
    this.userdataService.accountnav = false;
    this.subscription = this.userdataService.on('call-account').subscribe(() => this.getuserAccount());
  }

  translatelanguage(){
    this.translate.addLangs(['English', 'Vietnamese']);
    this.translate.setDefaultLang(this.useraccountdetail.language);
    console.log(this.useraccountdetail.language)

    const browserLang = this.translate.getBrowserLang();
    this.translate.use(browserLang.match(/English|Vietnamese/) ? browserLang : this.useraccountdetail.language)
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
      this.translatelanguage();
      // localStorage.setItem('companyId', data['ParentCompanyID']);
    });
  }

}
