import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { CustomerService } from '../../customer.service';
import { ModalService } from 'src/app/_modal/modal.service';
import { MessageService } from 'src/app/message.service';

@Component({
  selector: 'email-template',
  template: '<!-- Add email start -->\n' +
  ' <jw-modal id="add-new-email-popup">' +
    '   <form id="addEmail" [formGroup]="addEmailForm" (ngSubmit)="saveEmail(addEmailForm.value)"> \n' +
    '        <div class="comm-note mail-compose-box comm-popup-box">\n' +
    '            <div class="comm-head close-desp">\n' +
    '                <h6>Compose New Email</h6>\n' +
    '                <i class="icon-cir-cross" (click)="modalService.closeEmail(\'add-new-email-popup\')"></i>\n' +
    '            </div>\n' +
    '            <div class="suprt-body">\n' +
    '\n' +
    '                <div id="mail-app">\n' +
    '                    <div id="recipient-section">\n' +
    // '                        <div id="recipients" class="pt-0">\n' +
    // '                            Recipients\n' +
    // '                        </div>\n' +
    '                        <div id="to" class="mt-0" style="display:inline-flex">\n' +
    '                            <span id="to-label">To</span>\n' +
    '                            <div id="to-input" contenteditable="true"></div>\n' +
    // '                            <button id="cc-button">Cc</button>\n' +
    // '                            <button id="bcc-button">Bcc</button>\n' +
    '                        </div>\n' +
    // '                        <div id="cc">\n' +
    // '                            <span id="to-label">Cc</span>\n' +
    // '                            <div id="cc-input" contenteditable="true"></div>\n' +
    // '                        </div>\n' +
    // '                        <div id="bcc">\n' +
    // '                            <span id="to-label">Bcc</span>\n' +
    // '                            <div id="bcc-input" contenteditable="true"></div>\n' +
    // '                        </div>\n' +
    '                    </div>\n' +
    '                    <hr>\n' +
    '                    <div id="subject">\n' +
    '                        <span id="subject-label">Subject</span>\n' +
    '                        <div id="subject-input" contenteditable="true">\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                    <hr>\n' +
    '                    <div id="subject">\n' +
    '                        <span id="subject-label">Template</span>\n' +
    '                        <div id="subject-input" contenteditable="true">\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                    <hr>\n' +
    '                    <div id="body">\n' +
    '                        <textarea id="body-content"></textarea>\n' +
    '                    </div>\n' +
    '                    <div class="mail-btn-box m-0">\n' +
    '                        <button class="button" type="button" (click)="sendNewMail()">Send</button>\n' +
    '                        <ul class="mail-list">\n' +
    '                            <li><i class="icon-txt-underline"></i></li>\n' +
    '                            <li><i class="icon-attach"></i></li>\n' +
    '                            <li><i class="icon-link"></i></li>\n' +
    '                            <li><i class="icon-smiling"></i></li>\n' +
    '                            <li><i class="icon-picture"></i></li>\n' +
    '                            <li><i class="icon-schedule" data-toggle="modal" data-target="#mailPopup"></i></li>\n' +
    '                            <li class="mail-del-icon"><i class="icon-delete del"></i></li>\n' +
    '                        </ul>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '   </form>\n' +
    ' </jw-modal>' +
    '        <!-- Add email end -->'
})
export class NewEmailComponent implements OnInit {
  tokenaccess: any;
    token= {};
    newMail= {};
    savesentmaildata: any;
    sentmail={};
  constructor(public messageService: MessageService ,public modalService: ModalService ,public customerService: CustomerService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.saveEmailToken();
  }

  saveEmailToken(){
    this.customerService.saveEmailToken().subscribe((data) => {
      this.tokenaccess = data;
      localStorage.setItem('emailToken',data['access_token']);
    });
  }

  sendNewMail(){
    this.newMail = {
        "message": {	
          "subject": "Conversation Thread 1",
          "body": {
            "contentType": "text",
            "content": "New Email Testing."
          },
          "toRecipients": [
            {
              "emailAddress": {
                "address": "swatit@leotechnosoft.net"
              }
            }
          ],
          "from": {
            "emailAddress": {
              "address": "kapil@payzli.com"
            }
          }
          
        }
      }
    this.customerService.sendNewMail(this.newMail).subscribe((data) => {
      this.tokenaccess = data;
      this.messageService.clear();
      this.messageService.add("Mail Sent.")
      this.modalService.closeEmail('add-new-email-popup')
      this.customerService.publish('call-getemail');
      this.savesentmail();
    });
  }

  savesentmail(){
      this.sentmail = {
        "messageSend": {
          "subject": "Conversation Thread 1",
          "body": {
            "contentType": "text",
            "content": "New Email Testing."
          },
          "toRecipientsEmail": [
            "rohans@leotechnosoft.net"
          ]
        },
        "customerId": parseInt(localStorage.getItem('customerId')),
        "parentCompanyId": parseInt(localStorage.getItem('companyId')),
        "userId": localStorage.getItem('userId'),
        "senderEmail": "kapil@payzli.com"
      }
    this.customerService.savesentmail(this.sentmail).subscribe((data) => {
        this.savesentmaildata = data;
      });
  }
}
