import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { ModalService } from '../../_modal/modal.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AdminService} from '../admin.service';
import {MessageService} from '../../message.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-review',
  styleUrls: ['./business.component.css'],
  template: '<!-- Main Container Starts -->\n' +
  '  <div *ngIf="AdminService.navTab==9">\n' +
    '  <div *ngIf="AdminService.business_settingnav==6">\n' +
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
    '                <h6 class="comm-subhdn">Review</h6>\n' +
    '                <!-- start -->\n' +
    '                <button *ngIf="addbtn" class="button flg-btn side-menu" (click)="modalService.open1(\'add-review\');addupdateform(\'add\')">+ Add New</button>\n' +
    '                <div *ngIf="updatebtn" class="busi-rewv">\n' +
    '                    <div class="pro-comm-fle">\n' +
    '                        <h6>Google Review URL</h6>\n' +
    '                        <i class="icon-edit grd-icon side-menu delpadding" (click)="modalService.open1(\'add-review\');addupdateform(\'update\');selectproductobj(businessreview)"></i>\n' +
    '                        <i class="icon-delete grd-icon side-menu" data-toggle="modal" data-target="#deletePopup" (click)="selectproductobj(businessreview)"></i>\n' +
    '                    </div>\n' +
    '\n' +
    '                    <!-- start -->\n' +
    '                    <div class="prof-comm-shad">\n' +
    '                        <div class="comm-cont w100 p-0">\n' +
    '                            <p>Link</p>\n' +
    '                            <h6>{{businessreview.link}}</h6>\n' +
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
  '                        <li class="active"><a (click)="AdminService.showBusinessNav(6)">Review</a></li>\n' +
  '                        <li ><a (click)="AdminService.showBusinessNav(7)">Tax Table</a></li>\n' +
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
    '    <div class="overlay"></div>\n' +
    '    <addreview-modal [addReview]="addReview" [updateReview]="updateReview" [Reviewobj]="arrayofselectedobj"></addreview-modal>\n' +
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
export class BusinessReviewComponent implements OnInit {
  businessreview: any;
  public arrayofselectedobj: Array<any>=[];
  updateReview: boolean;
  addReview: boolean;
  addbtn: boolean;
  updatebtn: boolean;
  subscription: Subscription;
  constructor(public AdminService: AdminService, private formBuilder: FormBuilder, public modalService: ModalService, private router: Router, private messageService: MessageService) { }

  ngOnInit() {
    this.getReview();
    this.subscription = this.AdminService.on('call-review').subscribe(() => this.getReview());
  }

  getReview() {
    this.AdminService.GetReviewList().subscribe((data) => {
      this.businessreview = data;
      this.businessreview = this.businessreview.result;
      console.log(this.businessreview)
      this.addupdatefuc(this.businessreview)
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
      this.updateReview = false;
      this.addReview = true;
    }else if(type == 'update'){
      this.updateReview = true;
      this.addReview = false;
    }
  }

  addupdatefuc(businessreview){
    if(businessreview){
        this.addbtn = false;
        this.updatebtn = true;
    }else{
        this.addbtn = true;
        this.updatebtn = false;
    }
  }

  deleteReviews() {
    debugger;
    // tslint:disable-next-line:triple-equals
      this.AdminService.deleteReview().subscribe((data) => {
        console.log(data)
        this.getReview();
        this.messageService.clear();
        this.messageService.add(data['result']);
      });
  }

}
