import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { ModalService } from '../../_modal/modal.service';
import {UserdataService} from '../..//userdata.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {Observable} from 'rxjs';
import {MessageService} from '../../message.service';
// import { ToolbarService, LinkService, ImageService, HtmlEditorService, TableService } from '@syncfusion/ej2-angular-richtexteditor';

@Component({
  selector: 'email-modal',
  template: '<!-- Edit Profile Menu -->\n' +
    '<jw-modal id="side-menu-imap">\n' +
    '<div class="mobile-side">\n' +
    '  <!-- common headline -->\n' +
    '  <h3 class="close-btn main-comm-head">\n' +
    '    <i class="icon-down-arrow com-arw"></i>Add IMAP <span>settings</span>\n' +
    '  </h3>\n' +
    '  <!-- common headline end -->\n' +
    '<!--  <form id="editProfile" class="popup-scrll">-->\n' +
    // '<ejs-richtexteditor></ejs-richtexteditor>\n' +
    // '   <ejs-richtexteditor id=\'iframeRTE\' [(value)]=\'value\' [toolbarSettings]=\'tools\'></ejs-richtexteditor>\n' +
    '\n' +
    '    <div class="popBtn">\n' +
    '      <button class="button line close-btn" type="button" (click)="modalService.close(\'side-menu-imap\')">Cancel</button>\n' +
    '      <button class="button" type="submit">Add</button>\n' +
    '    </div>\n' +
    '\n' +
    '<!--  </form>-->\n' +
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
  // public tools: object = {
  //   items: [
  //     'Bold', 'Italic', 'Underline', 'StrikeThrough', '|',
  //     'FontName', 'FontSize', 'FontColor', 'BackgroundColor', '|',
  //     'LowerCase', 'UpperCase', '|', 'Undo', 'Redo', '|',
  //     'Formats', 'Alignments', '|', 'OrderedList', 'UnorderedList', '|',
  //     'Indent', 'Outdent', '|', 'CreateLink','CreateTable',
  //     'Image', '|', 'ClearFormat', 'Print', 'SourceCode', '|', 'FullScreen']
  // };
  private userdetail: Observable< object >;

  constructor(public translate: TranslateService, private userdataService: UserdataService,
              private formBuilder: FormBuilder, private modalService: ModalService, private router: Router,
              private userdataservice: UserdataService, private messageService: MessageService) {
  }
  // get f() {
  //   return this.accountForm.controls;
  // }
  ngOnInit() {
    // this.accountForm = this.formBuilder.group({
    //   TimezoneId: ['', [Validators.required]],
    //   LanguageId: ['',  [Validators.required]],
    // });
    // this.getUserAccount();
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  getUserAccount() {
    this.userdataService.getUserAccount().subscribe((data) => {
      // this.timeZonesList = data["timeZonesList"];
      this.userdetail = data[0];
    });
  }

  update_account(userdata) {
    console.log(userdata, this.accountForm)
    // tslint:disable-next-line:triple-equals
    if (this.accountForm.status == 'VALID') {
      this.userdataservice.update_account_edit(userdata).subscribe((data) => {
        this.getUserAccount();
        this.messageService.clear();
        this.messageService.add('User account updated successfully.')
        this.closeModal('account-setting');
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
