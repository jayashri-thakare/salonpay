import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { ModalService } from '../../_modal/modal.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AdminService} from '../admin.service';
import {MessageService} from '../../message.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-businessinventory',
  styleUrls: ['./business.component.css'],
  template: ' <!-- Main Container Starts -->\n' +
  '  <div *ngIf="AdminService.navTab==9">\n' +
    '  <div *ngIf="AdminService.business_settingnav==3">\n' +
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
    '                            <li class="active"><a href="admin-business-settings-inventory.html">Inventory</a></li>\n' +
    '                            <li><a href="admin-business-settings-customer.html">Customer</a></li>\n' +
    '                            <li><a href="admin-business-settings-coupon.html">Coupon</a></li>\n' +
    '                            <li><a href="admin-business-settings-review.html">Review</a></li>\n' +
    '                        </ul>\n' +
    '                    </div>\n' +
    '                    <!-- end -->\n' +
    '                </div>\n' +
    '                <!-- business nav end -->\n' +
    '\n' +
    '                <h6 class="comm-subhdn">Inventory</h6>\n' +
    '\n' +
    '                <form [formGroup]="addinventoryForm" (ngSubmit)="createBusinessInventory(addinventoryForm.value)">\n' +
    '                <div class="inven-box">\n' +
    '\n' +
    '                    <!-- start -->\n' +
    '                    <div class="" *ngIf="addshow">\n' +
    '\n' +
    '                        <!-- start -->\n' +
    '                        <div class="pay-switch">\n' +
    '                            <p class="sub-med">Manage Stock</p>\n' +
    '                            <div class="switch switch--horizontal mb-0" data-name="stock-switch">\n' +
    '                                <input class="notif-radio" id="off"  type="radio" formControlName="ManageStock" value="false">\n' +
    '                                <label for="off">Off</label>\n' +
    '                                <input class="notif-radio" id="on" type="radio" formControlName="ManageStock" value="true"\n' +
    '                                    checked="checked">\n' +
    '                                <label for="on">On</label><span class="toggle-outside"><span\n' +
    '                                        class="toggle-inside"></span></span>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                        <!-- end -->\n' +
    '                        <!-- start -->\n' +
    '                        <div class="stock-switch">\n' +
    '                            <p class="sub-sml">Inventory Low Threshold</p>\n' +
    '                            <div class="form-group">\n' +
    '                                <input type="text" id="thrs-low" formControlName="LowThreshold" class="form-field" required=""\n' +
    '                                    value="10">\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                        <!-- end -->\n' +
    '                    <button class="button w30" type="submit">Add</button>\n' +
    '                    </div>\n' +
    '                    <!-- end -->\n' +
    '\n' +
    '                </div>\n' +
    '                </form>\n' +
    '                <form [formGroup]="updateinventoryForm" (ngSubmit)="updateBusinessInventory(updateinventoryForm.value)">\n' +
    '                <div class="inven-box">\n' +
    '\n' +
    '                    <!-- start -->\n' +
    '                    <div class="" *ngIf="editshow">\n' +
    '\n' +
    '                        <!-- start -->\n' +
    '                        <div class="pay-switch">\n' +
    '                            <p class="sub-med">Manage Stock</p>\n' +
    '                            <div class="switch switch--horizontal mb-0" data-name="stock-switch">\n' +
    '                                <input class="notif-radio" id="off"  type="radio" formControlName="ManageStock" value="false">\n' +
    '                                <label for="off">Off</label>\n' +
    '                                <input class="notif-radio" id="on" type="radio" [checked]="businessinventory.manageStock" formControlName="ManageStock" value="true"\n' +
    '                                    checked="checked">\n' +
    '                                <label for="on">On</label><span class="toggle-outside"><span\n' +
    '                                        class="toggle-inside"></span></span>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                        <!-- end -->\n' +
    '                        <!-- start -->\n' +
    '                        <div class="stock-switch">\n' +
    '                            <p class="sub-sml">Inventory Low Threshold</p>\n' +
    '                            <div class="form-group">\n' +
    '                                <input type="text" id="thrs-low" ngModel="{{businessinventory.lowThreshold}}" formControlName="LowThreshold" class="form-field" required=""\n' +
    '                                    value="10">\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                        <!-- end -->\n' +
    '                    <button class="button w30" type="submit">Update</button>\n' +
    '                    </div>\n' +
    '                    <!-- end -->\n' +
    '\n' +
    '                </div>\n' +
    '                </form>\n' +
    '\n' +
    '            </div>\n' +
    '\n' +
    '            <app-settingsidebar></app-settingsidebar>\n' +
    '\n' +
    '        </div>\n' +
    '\n' +
    '    </div>\n' +
    '    </div>\n' +
    '    </div>\n' +
    '    <!-- Main Container Ends -->'
})
export class BusinessInventoryComponent implements OnInit {
  addinventoryForm: FormGroup;
  updateinventoryForm: FormGroup;
  control: FormControl;
  submitted = false;
  businessinventory: any;
  businessinventorysuccess: any;
  editshow: boolean;
  addshow: boolean;

  constructor(public AdminService: AdminService, private formBuilder: FormBuilder, private modalService: ModalService, private router: Router, private messageService: MessageService) { }
  get f() {
    return this.addinventoryForm.controls;
  }
  get f1() {
    return this.updateinventoryForm.controls;
  }
  ngOnInit() {
    this.addshow = true;
    this.getBusinessInventory();
    this.addinventoryForm = this.formBuilder.group({
      ManageStock: [''],
      LowThreshold: ['']
    });
    this.updateinventoryForm = this.formBuilder.group({
      ManageStock: [''],
      LowThreshold: ['']
    });
  }

  createBusinessInventory(Admin) {
    debugger;
    console.log(Admin)
    // tslint:disable-next-line:triple-equals
    Admin.LowThreshold = parseInt(Admin.LowThreshold)
    Admin.ManageStock = JSON.parse(Admin.ManageStock)
    if (this.addinventoryForm.status == 'VALID') {
      this.AdminService.add_business_inventory(Admin).subscribe((data) => {
        this.getBusinessInventory();
        this.addinventoryForm.reset();
        this.messageService.clear();
        this.messageService.add('Inventory Stock Created successfully.')
      });
    } else {
      console.log(Admin, this.addinventoryForm.status);
      this.submitted = true;
      if (this.addinventoryForm.invalid) {
        return;
      }
    }
  }

  showhide(){
    if(this.businessinventory){
      this.editshow = true;
      this.addshow = false;
    }else{
      this.editshow = false;
      this.addshow = true;
    }
  }

  getBusinessInventory() {
    this.AdminService.GetBusinessInventory().subscribe((data) => {
      this.businessinventory = data;
      this.showhide();
      // this.businessinventory = this.businessinventory.result;
      console.log(this.businessinventory)
      // localStorage.setItem('companyId', data['ParentCompanyID']);
    });
  }

  updateBusinessInventory(Admin) {
    debugger;
    console.log(Admin)
    // tslint:disable-next-line:triple-equals
    Admin.LowThreshold = parseInt(Admin.LowThreshold)
    if(this.businessinventory.manageStock){
      Admin.ManageStock = this.businessinventory.manageStock
    }
    Admin.ManageStock = JSON.parse(Admin.ManageStock)
    if (this.updateinventoryForm.status == 'VALID') {
      this.AdminService.add_business_inventory(Admin).subscribe((data) => {
        this.getBusinessInventory();
        this.messageService.clear();
        this.messageService.add('Inventory Stock Updated successfully.')
      });
    } else {
      console.log(Admin, this.updateinventoryForm.status);
      this.submitted = true;
      if (this.updateinventoryForm.invalid) {
        return;
      }
    }
  }
}
