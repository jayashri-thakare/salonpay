import {Component, Input, OnInit, Pipe} from '@angular/core';
import {Router} from '@angular/router';
import {UserdataService} from '../../userdata.service';
import {ModalService} from '../../_modal/modal.service';
import { ToolbarService, LinkService, ImageService, HtmlEditorService, QuickToolbarService } from '@syncfusion/ej2-angular-richtexteditor';
import {Subscription} from 'rxjs';
import {DomSanitizer} from '@angular/platform-browser';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MessageService} from '../../message.service';


@Pipe({name: 'safeHtml'})
// tslint:disable-next-line:component-class-suffix
export class Safe {
  constructor(private sanitizer: DomSanitizer) {}

  transform(style) {
    return this.sanitizer.bypassSecurityTrustHtml(style);
    //return this.sanitizer.bypassSecurityTrustStyle(style);
    // return this.sanitizer.bypassSecurityTrustXxx(style); - see docs
  }
}
@Component({
  selector: 'app-emailsetting',
  templateUrl: './emailsetting.component.html',
  styleUrls: ['./emailsetting.component.css']
})


export class EmailsettingComponent implements OnInit {
  @Input('userdata') userdetail: any;
  gmailaccount: FormGroup;
  control: FormControl;
  submitted = false;
  private signature: string;
  private subscription: Subscription;
  emailsign: boolean;
  emailconnect: boolean;

  constructor(private router: Router, public userdataService: UserdataService,
              private formBuilder: FormBuilder,
              public modalService: ModalService,
              private messageService: MessageService) { }

  get f() {
    return this.gmailaccount.controls;
  }

  ngOnInit() {
    this.emailsign = true;
    this.userdataService.emailnav = false;
    this.getUserSignature();
    this.gmailaccount = this.formBuilder.group({
        username: [''],
        password: [''],
    });
    this.subscription = this.userdataService.on('call-signature').subscribe(() => this.getUserSignature());
  }

  getUserSignature() {
    this.userdataService.getUserSignature().subscribe((data) => {
      this.userdetail = data;
    });
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }
  save_account(userdata) {
    if (this.gmailaccount.status == 'VALID') {
      this.userdataService.update_signature(userdata).subscribe((data) => {
        this.userdataService.publish('call-signature');
        this.messageService.clear();
        this.messageService.add('Email signature updated successfully.')
        this.closeModal('side-menu-imap');
      });
    } else {
      console.log(userdata, this.gmailaccount.status);
      this.submitted = true;
      if (this.gmailaccount.invalid) {
        return;
      }
    }
  }
  openModal(id) {
    this.modalService.open1(id);
  }

  // addOffice() {
  //   this.userdataService.addOffice().subscribe((data) => {
  //     debugger;
  //       this.userdataService.publish('call-signature');
  //       this.messageService.clear();
  //       this.messageService.add('Email signature updated successfully.')
  //       this.closeModal('side-menu-imap');
  //     });

  // }

  mailconnectfuc(){
    if(this.emailsign == true){
      this.emailsign = false;
      this.emailconnect = true;
    }else{
      this.emailsign = true;
      this.emailconnect = false;
    }
  }
}
