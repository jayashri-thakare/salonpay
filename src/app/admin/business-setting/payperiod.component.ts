import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { ModalService } from '../../_modal/modal.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AdminService} from '../admin.service';
import {MessageService} from '../../message.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-payperiod',
  styleUrls: ['./business.component.css'],
  template: '<!-- Main Container Starts -->\n' +
  '  <div *ngIf="AdminService.navTab==9">\n' +
    '  <div *ngIf="AdminService.business_settingnav==11">\n' +
    '    <div class="mainContainer">\n' +
    '\n' +
    '        <div class="busi-set">\n' +
    '\n' +
    '            <div class="busi-set-lef">\n' +
    '                <h3 class="main-comm-head">Business Settings</h3>\n' +
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
    '                <h6 class="comm-subhdn">Pay Period</h6>\n' +
    '                <!-- start -->\n' +
    '                <button *ngIf="addbtn" class="button flg-btn side-menu" (click)="modalService.open1(\'add-payperiod\');addupdateform(\'add\')">+ Add New</button>\n' +
    '                <div *ngIf="updatebtn" class="busi-rewv">\n' +
    '                    <div class="pro-comm-fle">\n' +
    '                        <h6>Pay Period</h6>\n' +
    '                        <i class="icon-edit grd-icon side-menu delpadding" (click)="modalService.open1(\'add-payperiod\');addupdateform(\'update\');selectproductobj(businesspayperiod)"></i>\n' +
    '                    </div>\n' +
    '\n' +
    '                    <!-- start -->\n' +
    '                    <div class="prof-comm-shad">\n' +
    '                        <div class="comm-cont w100 p-0">\n' +
    '                            <p>Pay period</p>\n' +
    '                            <h6>{{businesspayperiod.payPeriodName}}</h6>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                    <div class="prof-comm-shad">\n' +
    '                        <div class="comm-cont w100 p-0">\n' +
    '                            <p>Cash\Cheque Split</p>\n' +
    '                            <h6>{{businesspayperiod.value}}</h6>\n' +
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
  '                        <li><a (click)="AdminService.showBusinessNav(9)">Turn Count</a></li>\n' +
  '                        <li ><a (click)="AdminService.showBusinessNav(10)">Experience Level</a></li>\n' +
  '                         <li class="active" ><a (click)="AdminService.showBusinessNav(11)">Pay Period</a></li>\n' +
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
    '    <addpayperiod-modal [addpayperiod]="addpayperiod" [updatepayperiod]="updatepayperiod" [payperiodobj]="arrayofselectedobj"></addpayperiod-modal>\n' +
    '    <!-- Main Container Ends -->\n' +
    '        <!-- Delete Modal Starts -->\n' +
    '        <div class="modal fade" id="deletePopup">\n' +
    '            <div class="modal-dialog medium-window">\n' +
    '                <div class="modal-content">\n' +
    '                    <div class="modalCancel" data-dismiss="modal"><i class="icon-cir-plus"></i></div>\n' +
    '\n' +
    '                    <h2 class="modal-title">Are you sure you want to delete this Review?</h2>\n' +
    '\n' +
    '                    <div class="modal-btn">\n' +
    '                        <button class="button line mr-2" data-dismiss="modal">No</button>\n' +
    '                        <button class="button red" data-dismiss="modal" (click)="deleteReviews()">Yes</button>\n' +
    '                    </div>\n' +
    '\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <!-- Delete Modal Ends -->'
})
export class PayperiodComponent implements OnInit {
  businesspayperiod: any;
  public arrayofselectedobj: Array<any>=[];
  updatepayperiod: boolean;
  addpayperiod: boolean;
  addbtn: boolean;
  updatebtn: boolean;
  subscription: Subscription;
  constructor(public AdminService: AdminService, private formBuilder: FormBuilder, public modalService: ModalService, private router: Router, private messageService: MessageService) { }

  ngOnInit() {
    this.getPayPeriod();
    this.subscription = this.AdminService.on('call-payperiod').subscribe(() => this.getPayPeriod());
  }

  getPayPeriod() {
    this.AdminService.GetPayPeriodList().subscribe((data) => {
      this.businesspayperiod = data;
      // this.businesspayperiod = this.businesspayperiod.result;
      console.log(this.businesspayperiod)
      this.addupdatefuc(this.businesspayperiod)
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
      this.updatepayperiod = false;
      this.addpayperiod = true;
    }else if(type == 'update'){
      this.updatepayperiod = true;
      this.addpayperiod = false;
    }
  }

  addupdatefuc(businesspayperiod){
    if(businesspayperiod){
        this.addbtn = false;
        this.updatebtn = true;
    }else{
        this.addbtn = true;
        this.updatebtn = false;
    }
  }

}
