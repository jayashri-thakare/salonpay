import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { ModalService } from '../../_modal/modal.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AdminService} from '../admin.service';
import {MessageService} from '../../message.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-settingsidebar',
  template: '            <div class="busi-set-rig">\n' +
  '                <!-- start -->\n' +
  '                <div class="busi-affix">\n' +
  '                    <ul>\n' +
  '                        <li [ngClass]="{ \'active\': AdminService.business_settingnav==1 }" ><a (click)="AdminService.showBusinessNav(1)">Tip Adjustment</a></li>\n' +
'                        <li [ngClass]="{ \'active\': AdminService.business_settingnav==2 }"><a (click)="AdminService.showBusinessNav(2)">Staff</a></li>\n' +
'                        <li [ngClass]="{ \'active\': AdminService.business_settingnav==3 }"><a (click)="AdminService.showBusinessNav(3)">Inventory</a></li>\n' +
'                        <li [ngClass]="{ \'active\': AdminService.business_settingnav==4 }"><a (click)="AdminService.showBusinessNav(4)">Customer</a></li>\n' +
'                        <li [ngClass]="{ \'active\': AdminService.business_settingnav==5 }"><a (click)="AdminService.showBusinessNav(5)">Coupon</a></li>\n' +
'                        <li [ngClass]="{ \'active\': AdminService.business_settingnav==6 }"><a (click)="AdminService.showBusinessNav(6)">Review</a></li>\n' +
'                        <li [ngClass]="{ \'active\': AdminService.business_settingnav==7 }"><a (click)="AdminService.showBusinessNav(7)">Tax Table</a></li>\n' +
'                        <li [ngClass]="{ \'active\': AdminService.business_settingnav==8 }"><a (click)="AdminService.showBusinessNav(8)">Services Category</a></li>\n' +
'                        <li [ngClass]="{ \'active\': AdminService.business_settingnav==9 }"><a (click)="AdminService.showBusinessNav(9)">Turn Count</a></li>\n' +
'                        <li [ngClass]="{ \'active\': AdminService.business_settingnav==10 }"><a (click)="AdminService.showBusinessNav(10)">Experience Level</a></li>\n' +
'                         <li [ngClass]="{ \'active\': AdminService.business_settingnav==11 }"><a (click)="AdminService.showBusinessNav(11)">Pay Period</a></li>\n' +
'                         <li [ngClass]="{ \'active\': AdminService.business_settingnav==12 }"><a (click)="AdminService.showBusinessNav(12)">Schedule</a></li>\n' +
'                         <li [ngClass]="{ \'active\': AdminService.business_settingnav==13 }"><a (click)="AdminService.showBusinessNav(13)">Supplier</a></li>\n' +
'                         <li [ngClass]="{ \'active\': AdminService.business_settingnav==14 }"><a (click)="AdminService.showBusinessNav(14)">Products Category</a></li>\n' +
'                    </ul>\n' +
  '                </div>\n' +
  '                <!-- end -->\n' +
  '            </div>\n'
})
export class BusinessSidebarComponent implements OnInit {

  constructor(public AdminService: AdminService, private formBuilder: FormBuilder, private modalService: ModalService, private router: Router, private messageService: MessageService) { }

  ngOnInit() {
  }

}
