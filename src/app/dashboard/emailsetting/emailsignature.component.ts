import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { ModalService } from '../../_modal/modal.service';
import {UserdataService} from '../..//userdata.service';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {Observable} from 'rxjs';
import {MessageService} from '../../message.service';
import {parseJsonSchemaToCommandDescription} from '@angular/cli/utilities/json-schema';
// import { ToolbarService, LinkService, ImageService, HtmlEditorService, TableService } from '@syncfusion/ej2-angular-richtexteditor';

@Component({
  selector: 'email-modal',
  template: '<!-- Edit Profile Menu -->\n' +
    '<jw-modal id="side-menu-imap">\n' +
    '<div class="mobile-side">\n' +
    '  <h3 class="close-btn main-comm-head">\n' +
    '    <i class="icon-down-arrow com-arw"></i>{{\'Email\' | translate}}  <span>{{\'Signature\' | translate}}</span>\n' +
    '  </h3>\n' +
    '<form class="popup-scrll" [formGroup]="accountForm" (ngSubmit)="update_account(accountForm.value)">\n' +
    '<ejs-richtexteditor formControlName="EmailSignature" ngModel="{{userdetail.emailSignature}}"></ejs-richtexteditor>\n' +
    // '   <ejs-richtexteditor id=\'iframeRTE\' [(value)]=\'value\' [toolbarSettings]=\'tools\'></ejs-richtexteditor>\n' +
    '\n' +
    '    <div class="popBtn">\n' +
    '      <button class="button line close-btn" type="button" (click)="modalService.close(\'side-menu-imap\')">{{\'Cancel\' | translate}}</button>\n' +
    '      <button class="button" type="submit">{{\'Add\' | translate}}</button>\n' +
    '    </div>\n' +
    '\n' +
    ' </form>\n' +
    '\n' +
    '</div>' +
    '</jw-modal>\n' +
    '<!-- Edit Profile Menu End -->',
  // providers: [ToolbarService, LinkService, ImageService, HtmlEditorService, TableService]
})
export class EmailEditComponent implements OnInit {
  accountForm: FormGroup;
  control: FormControl;
  submitted = false;
  public tools: object = {
    items: [
      'Bold', 'Italic', 'Underline', 'StrikeThrough', '|',
      'FontName', 'FontSize', 'FontColor', 'BackgroundColor', '|',
      'LowerCase', 'UpperCase', '|', 'Undo', 'Redo', '|',
      'Formats', 'Alignments', '|', 'OrderedList', '|',
      'Indent', 'Outdent', '|', 'CreateLink','CreateTable',
      'Image', '|', 'ClearFormat', 'Print', 'SourceCode', '|', 'FullScreen']
  };
  // private userdetail: Observable< object >;
  // private signature: Observable<any>;
  @Input('userdata') userdetail: any;
  private signature: string;
  constructor(public translate: TranslateService, private userdataService: UserdataService,
              private formBuilder: FormBuilder, public modalService: ModalService, private router: Router,
              private userdataservice: UserdataService, private messageService: MessageService) {
  }
  get f() {
    return this.accountForm.controls;
  }
  ngOnInit() {
    this.accountForm = this.formBuilder.group({
      EmailSignature: ['']
    });
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  update_account(userdata) {
    if (this.accountForm.status == 'VALID') {
      this.userdataservice.update_signature(userdata).subscribe((data) => {
        this.userdataService.publish('call-signature');
        this.messageService.clear();
        this.messageService.add('Email signature updated successfully.')
        this.closeModal('side-menu-imap');
      });
    } else {
      console.log(userdata, this.accountForm.status);
      this.submitted = true;
      if (this.accountForm.invalid) {
        return;
      }
    }
  }
}
