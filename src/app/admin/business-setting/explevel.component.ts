import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { ModalService } from '../../_modal/modal.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AdminService} from '../admin.service';
import {MessageService} from '../../message.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-explevel',
  styleUrls: ['./business.component.css'],
  template: '<!-- Main Container Starts -->\n' +
  '  <div *ngIf="AdminService.navTab==9">\n' +
    '  <div *ngIf="AdminService.business_settingnav==10">\n' +
    '    <div class="mainContainer">\n' +
    '\n' +
    '        <div class="busi-set">\n' +
    '\n' +
    '            <div class="busi-set-lef">\n' +
    '                    <div class="pro-comm-fle">\n' +
    '                       <h3 class="main-comm-head">Business Settings</h3>\n' +
    '                       <button class="button flg-btn side-menu" (click)="modalService.open1(\'add-explevel\');addupdateform(\'add\')">+ Add New</button>\n' +
    '                    </div>\n' +
    '\n' +
    '                <!-- business nav start -->\n' +
    '                <div class="busi-lis-swipe">\n' +
    '                    <!-- start -->\n' +
    '                    <div class="busi-affix busi-nav">\n' +
    '                        <ul>\n' +
    '                            <li><a href="admin-business-settings-tip.html">Tip Adjustment</a></li>\n' +
    '                            <li><a href="admin-business-settings-staff.html">Staff</a></li>\n' +
    '                            <li><a href="admin-business-settings-inventory.html">Inventory</a></li>\n' +
    '                            <li><a href="admin-business-settings-customer.html">Customer</a></li>\n' +
    '                            <li><a href="admin-business-settings-coupon.html">Coupon</a></li>\n' +
    '                            <li class="active"><a href="admin-business-settings-review.html">Review</a></li>\n' +
    '                        </ul>\n' +
    '                    </div>\n' +
    '                    <!-- end -->\n' +
    '                </div>\n' +
    '                <!-- business nav end -->\n' +
    '\n' +
    '                <h6 class="comm-subhdn">Experience Level</h6>\n' +
    '                <!-- start -->\n' +
    '                <div *ngIf="updatebtn" class="busi-rewv">\n' +
    '\n' +
    '                    <!-- start -->\n' +
    '                       <div class="f-row f-6 f-1440-5 f-1200-4 f-768-3 f-640-2 f-400-1">\n' +
    '                           <div class="f-col f-col-width" *ngFor="let explevel of businessexplevel">\n' +
    '                           <!-- start -->\n' +
    '                               <div class="admin-mail-box">\n' +
    '                               <h6 class="promo-head">{{explevel?.serviceLevelName}}</h6>\n' +
    '                               <div class="yur-mail-rig">\n' +
    '                                   <i class="icon-edit grd-icon side-menu" (click)="modalService.open1(\'add-explevel\');addupdateform(\'update\');selectproductobj(explevel)"></i>\n' +
    '                               </div>\n' +
    '                           </div>\n' +
    '                           <!-- end -->\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                    <!-- end -->\n' +
    '                </div>\n' +
    '                <!-- end -->\n' +
    '            </div>\n' +
    '\n' +
    '            <div class="busi-set-rig">\n' +
    '                <!-- start -->\n' +
    '                <div class="busi-affix">\n' +
    '                    <ul>\n' +
    '                        <li ><a (click)="AdminService.showBusinessNav(1)">Tip Adjustment</a></li>\n' +
  '                        <li><a (click)="AdminService.showBusinessNav(2)">Staff</a></li>\n' +
  '                        <li><a (click)="AdminService.showBusinessNav(3)">Inventory</a></li>\n' +
  '                        <li><a (click)="AdminService.showBusinessNav(4)">Customer</a></li>\n' +
  '                        <li><a (click)="AdminService.showBusinessNav(5)">Coupon</a></li>\n' +
  '                        <li ><a (click)="AdminService.showBusinessNav(6)">Review</a></li>\n' +
  '                        <li ><a (click)="AdminService.showBusinessNav(7)">Tax Table</a></li>\n' +
  '                        <li ><a (click)="AdminService.showBusinessNav(8)">Services Category</a></li>\n' +
  '                        <li ><a (click)="AdminService.showBusinessNav(9)">Turn Count</a></li>\n' +
  '                        <li class="active"><a (click)="AdminService.showBusinessNav(10)">Experience Level</a></li>\n' +
  '                         <li ><a (click)="AdminService.showBusinessNav(11)">Pay Period</a></li>\n' +
  '                         <li ><a (click)="AdminService.showBusinessNav(12)">Schedule</a></li>\n' +
  '                    </ul>\n' +
    '                </div>\n' +
    '                <!-- end -->\n' +
    '            </div>\n' +
    '\n' +
    '        </div>\n' +
    '\n' +
    '    </div>\n' +
    '    </div>\n' +
    '    </div>\n' +
    '    <addexplevel-modal [addexplevel]="addexplevel" [updateexplevel]="updateexplevel" [explevelobj]="arrayofselectedobj"></addexplevel-modal>\n' +
    '    <!-- Main Container Ends -->\n'
})
export class BusinessExpLevelComponent implements OnInit {
  businessexplevel: any;
  public arrayofselectedobj: Array<any>=[];
  updateexplevel: boolean;
  addexplevel: boolean;
  addbtn: boolean;
  updatebtn: boolean;
  subscription: Subscription;
  constructor(public AdminService: AdminService, private formBuilder: FormBuilder, public modalService: ModalService, private router: Router, private messageService: MessageService) { }

  ngOnInit() {
    this.getExpLevel();
    this.subscription = this.AdminService.on('call-explevel').subscribe(() => this.getExpLevel());
  }

  getExpLevel() {
    this.AdminService.GetExpLevelList().subscribe((data) => {
      this.businessexplevel = data;
      this.businessexplevel = this.businessexplevel.result;
      console.log(this.businessexplevel)
      this.addupdatefuc(this.businessexplevel)
      // localStorage.setItem('companyId', data['ParentCompanyID']);
    });
  }

  selectproductobj(selected_obj){
    var index = this.arrayofselectedobj.indexOf(selected_obj);
    if(index<0){
      this.arrayofselectedobj.splice(index, 1);
      this.arrayofselectedobj.push(selected_obj);
    }
    console.log(this.arrayofselectedobj)
  }

  addupdateform(type){
    if(type == 'add'){
      this.updateexplevel = false;
      this.addexplevel = true;
    }else if(type == 'update'){
      this.updateexplevel = true;
      this.addexplevel = false;
    }
  }

  addupdatefuc(businessServices){
    if(businessServices){
        this.addbtn = false;
        this.updatebtn = true;
    }else{
        this.addbtn = true;
        this.updatebtn = false;
    }
  }

}
