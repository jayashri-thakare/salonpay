import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {Router} from '@angular/router';
import { ModalService } from '../../_modal/modal.service';
import {UserdataService} from '../..//userdata.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {Observable} from 'rxjs';
import {MessageService} from '../../message.service';

@Component({
  selector: 'IMAP-modal',
  template:  '<jw-modal id="other-edit">\n' +
  '<div class="mobile-side">\n' +
  '<!-- common headline -->\n'+
  '<h3 class="close-btn main-comm-head" (click)="closeModal(\'other-edit\');">\n'+
     ' <i class="icon-down-arrow com-arw"></i>Add IMAP 1234<span>settings</span>\n'+
  '</h3>\n'+
  '<!-- common headline end -->\n'+
  '<form id="edit-imap" [formGroup]="IMAPForm" class="popup-scrll">\n'+

      '<div class="filBox">\n'+
          '<!-- start -->\n'+
          '<div class="fill-box-in scrollbar">\n'+
              '<!-- start -->\n'+
              '<h6 class="poptile">Domain</h6>\n'+
              '<div class="form-group">\n'+
                  '<input type="text" id="domain-name" name="domain-name" class="form-field" required=""\n'+
                      'aria-invalid="false" />\n'+
                  '<p class="form-label">Domain Name*</p>\n'+
              '</div>\n'+
              '<!-- end -->\n'+
              '<!-- start -->\n'+
              '<h6 class="poptile">Incoming Mail (IMAP)</h6>\n'+
              '<div class="ser-port">\n'+
                  '<div class="form-group server mb-0">\n'+
                      '<input type="text" id="server1" name="server1" class="form-field" required=""\n'+
                          'aria-invalid="false" />\n'+
                      '<p class="form-label">Server*</p>\n'+
                  '</div>\n'+
                  '<div class="form-group port rem-err mb-0">\n'+
                      '<input type="number" id="Port1" name="Port1" class="form-field" required=""\n'+
                          'aria-invalid="false" />\n'+
                      '<p class="form-label">Port*</p>\n'+
                  '</div>\n'+
              '</div>\n'+
              '<!-- end -->\n'+
              '<!-- start -->\n'+
              '<h6 class="poptile">Outgoing Mail (IMAP)</h6>\n'+
              '<div class="ser-port">\n'+
                  '<div class="form-group server mb-0">\n'+
                      '<input type="text" id="server2" name="server2" class="form-field" required=""\n'+
                          'aria-invalid="false" />\n'+
                      '<p class="form-label">Server*</p>\n'+
                  '</div>\n'+
                  '<div class="form-group port rem-err mb-1">\n'+
                      '<input type="number" id="Port2" name="Port2" class="form-field" required=""\n'+
                          'aria-invalid="false" />\n'+
                      '<p class="form-label">Port*</p>\n'+
                  '</div>\n'+
              '</div>\n'+
              '<!-- end -->\n'+
              '<!-- start -->\n'+
              '<h6 class="poptile">Server Security</h6>\n'+
              '<div class="checkbox-box">\n'+
                  '<input type="checkbox" id="serv-security" name="serv-security" required="">\n'+
                  '<label for="serv-security">Allow Non-Secure Certificate</label>\n'+
              '</div>\n'+
              '<!-- end -->\n'+
          '</div>\n'+
         ' <!-- end -->\n'+
      '</div>\n'+

      '<div class="popBtn">\n'+
          '<button class="button line close-btn" type="button" (click)="closeModal(\'other-edit\');">Cancel</button>\n'+
          '<button class="button" type="submit">Add</button>\n'+
      '</div>\n'+

  '</form>\n'+

'</div>\n'+
'</jw-modal>\n'+
'<!-- Edit Profile Menu End -->\n'
})
export class IMAPSettingComponent implements OnInit {
    IMAPForm: FormGroup;
  control: FormControl;
  submitted = false;
  private userdetail: Observable< object >;

  constructor(public translate: TranslateService, private userdataService: UserdataService,
              private formBuilder: FormBuilder, private modalService: ModalService, private router: Router,
              private userdataservice: UserdataService, private messageService: MessageService) {
  }
  get f() {
    return this.IMAPForm.controls;
  }
  ngOnInit() {
    this.IMAPForm = this.formBuilder.group({

    });
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }
}
