import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { ModalService } from '../../_modal/modal.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AdminService} from '../admin.service';
import {MessageService} from '../../message.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-taxtable',
  styleUrls: ['./business.component.css'],
  template: '<!-- Main Container Starts -->\n' +
  '  <div *ngIf="AdminService.navTab==9">\n' +
    '  <div *ngIf="AdminService.business_settingnav==7">\n' +
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
    '                <h6 class="comm-subhdn">Tax Table</h6>\n' +
    '                <!-- start -->\n' +
    '                <button *ngIf="addbtn" class="button flg-btn side-menu" (click)="openModal(\'add-taxtable\');addupdateform(\'add\')">+ Add New</button>\n' +
    '                <div class="busi-rewv" *ngIf="updatebtn">\n' +
    '                    <div class="pro-comm-fle">\n' +
    '                        <h6>Tax Detail</h6>\n' +
    '                        <i class="icon-edit grd-icon side-menu delpadding1" (click)="modalService.open1(\'add-taxtable\');addupdateform(\'update\');selectproductobj(businesstaxtable)"></i>\n' +
    '                        <i class="icon-delete grd-icon side-menu" data-toggle="modal" data-target="#deletePopuptaxtable" (click)="selectproductobj(businesstaxtable)"></i>\n' +
    '                    </div>\n' +
    '\n' +
    '                    <!-- start -->\n' +
    '                    <div class="prof-comm-shad">\n' +
    '                        <div class="comm-cont w100 p-0">\n' +
    '                            <p>Product Tax Rate</p>\n' +
    '                            <h6>{{businesstaxtable?.productTaxRate}}%</h6>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                    <div class="prof-comm-shad">\n' +
    '                        <div class="comm-cont w100 p-0">\n' +
    '                            <p>Service Tax Rate</p>\n' +
    '                            <h6>{{businesstaxtable?.serviceTaxRate}}%</h6>\n' +
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
  '                        <li><a (click)="AdminService.showBusinessNav(6)">Review</a></li>\n' +
  '                        <li class="active"><a (click)="AdminService.showBusinessNav(7)">Tax Table</a></li>\n' +
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
    '    <addtaxtable-modal [addTax]="addTax" [updateTax]="updateTax" [Taxobj]="arrayofselectedobj"></addtaxtable-modal>\n' +
    '    <!-- Main Container Ends -->\n' +
    '        <!-- Delete Modal Starts -->\n' +
    '        <div class="modal fade" id="deletePopuptaxtable">\n' +
    '            <div class="modal-dialog medium-window">\n' +
    '                <div class="modal-content">\n' +
    '                    <div class="modalCancel" data-dismiss="modal"><i class="icon-cir-plus"></i></div>\n' +
    '\n' +
    '                    <h2 class="modal-title">Are you sure you want to delete this Tax Detail?</h2>\n' +
    '\n' +
    '                    <div class="modal-btn">\n' +
    '                        <button class="button line mr-2" data-dismiss="modal">No</button>\n' +
    '                        <button class="button red" data-dismiss="modal" (click)="deleteTax(arrayofselectedobj)">Yes</button>\n' +
    '                    </div>\n' +
    '\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <!-- Delete Modal Ends -->'
})
export class BusinessTaxTableComponent implements OnInit {
    businesstaxtable: any;
    subscription: Subscription;
    arrayofselectedobj: Array<any>=[];
    updateTax: boolean;
    addTax: boolean;
    addbtn: boolean;
    updatebtn: boolean;
  constructor(public AdminService: AdminService, private formBuilder: FormBuilder, public modalService: ModalService, private router: Router, private messageService: MessageService) { }

  ngOnInit() {
    this.getTaxTable();
    this.subscription = this.AdminService.on('call-taxtable').subscribe(() => this.getTaxTable());
  }

  openModal(id: string) {
    this.modalService.open1(id);
  }

  getTaxTable() {
    this.AdminService.GetTaxTableList().subscribe((data) => {
      this.businesstaxtable = data;
      this.businesstaxtable = this.businesstaxtable.result;
      console.log(this.businesstaxtable)
      this.addupdatefuc(this.businesstaxtable);
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
      this.updateTax = false;
      this.addTax = true; 
    }else if(type == 'update'){
      this.updateTax = true;
      this.addTax = false;
    }
  }

  deleteTax(selected_tax) {
    debugger;
    // tslint:disable-next-line:triple-equals
    if (selected_tax) {
      this.AdminService.deleteTax(selected_tax[0].taxId).subscribe((data) => {
        console.log(data)
        this.getTaxTable();
        this.messageService.clear();
        this.messageService.add(data['result']);
      });
    }
  }

  addupdatefuc(businesstaxtable){
    if(businesstaxtable){
        this.addbtn = false;
        this.updatebtn = true;
        console.log(businesstaxtable, "update")
    }else{
        this.addbtn = true;
        this.updatebtn = false;
        console.log(businesstaxtable, "add")
    }
  }

}
