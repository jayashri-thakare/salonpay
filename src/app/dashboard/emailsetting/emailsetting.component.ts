import {Component, Input, OnInit, Pipe} from '@angular/core';
import {Router} from '@angular/router';
import {UserdataService} from '../../userdata.service';
import {ModalService} from '../../_modal/modal.service';
import { ToolbarService, LinkService, ImageService, HtmlEditorService, QuickToolbarService } from '@syncfusion/ej2-angular-richtexteditor';
import {Subscription} from 'rxjs';
import {DomSanitizer} from '@angular/platform-browser';

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
  private signature: string;
  private subscription: Subscription;

  constructor(private router: Router, private userdataService: UserdataService, private modalService: ModalService) { }

  ngOnInit() {
    this.userdataService.emailnav = false;
    this.getUserSignature();
    this.subscription = this.userdataService.on('call-signature').subscribe(() => this.getUserSignature());
  }

  getUserSignature() {
    this.userdataService.getUserSignature().subscribe((data) => {
      this.userdetail = data;
    });
  }
}
