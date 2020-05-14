import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
import {SalesService} from './sales.service';
import {MessageService} from "../message.service";

@Component({
  selector: 'salecommissionsplit',
  template: '<!-- Main Container Starts -->\n' +
    '    <div class="mainContainer m-0">\n' +
    '        <h3 class="main-comm-head">\n' +
    '            <a href="./sales.html"><i class="icon-down-arrow com-arw"></i></a>Sales\n' +
    '        </h3>\n' +
    '\n' +
    '        <div class="row">\n' +
    '            <div class="col-12 mb-3 tech-cart-box">\n' +
    '                <!-- Starts -->\n' +
    '                <div class="tip-flex tip-flex-hdn">\n' +
    '                    <h4>Item Description</h4>\n' +
    '                    <h4>Technician</h4>\n' +
    '                    <div class="tip-flex-other">\n' +
    '                        <div class="tip-input">\n' +
    '                            <h4>Commission</h4>\n' +
    '                        </div>\n' +
    '                        <div class="tip-input">\n' +
    '                            <h4>Tip</h4>\n' +
    '                        </div>\n' +
    '                        <div class="tip-input">\n' +
    '                            <h4>Turns</h4>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <!-- Ends -->\n' +
    '                <!-- Starts -->\n' +
    '                <div class="tip-flex" *ngFor="let split of SalesCommission">\n' +
    '                    <div class="user-det">\n' +
    '                        <i class="icon-haircut prodt-ico"></i>\n' +
    '                        <div class="usr-name">\n' +
    '                            <h3>{{split.serviceName}}<span>Add On Services :</span> <span *ngFor="let addon of split.addonServicesCommission">{{addon.serviceName}}</span></h3>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                    <div class="user-det curPointer" data-toggle="modal" data-target="#suggestedTechPopup">\n' +
    '                        <div class="user-img"><img src="../assets/img/user.svg" alt=""></div>\n' +
    '                        <div class="usr-name">\n' +
    '                            <h3>{{split.technicianName}}<span>{{split.serviceName}}</span></h3>\n' +
    '                        </div>\n' +
    '                        <i class="icon-down-arrow1 ml-3"></i>\n' +
    '                    </div>\n' +
    '                    <div class="tip-flex-other">\n' +
    '                        <div class="tip-input">\n' +
    '                            <div class="form-group m-0">\n' +
    '                                <input type="text" class="form-field" (input)="totalofsplitamount($event.target.value)" required ngModel="{{split.commission}}" />\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                        <div class="tip-input">\n' +
    '                            <div class="form-group m-0">\n' +
    '                                <input type="text" class="form-field" required ngModel="{{split.tipAmount}}" />\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                        <div class="tip-input">\n' +
    '                            <div class="form-group m-0">\n' +
    '                                <select class="select-field form-field">\n' +
    '                                    <option disabled selected>Turns</option>\n' +
    '                                    <option value="1">quaterly</option>\n' +
    '                                    <option value="2">monthly</option>\n' +
    '                                </select>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <!-- Ends -->\n' +
    '\n' +
    '            </div>\n' +
    '        </div>\n' +
    '\n' +
    '        <!-- start -->\n' +
    '        <div class="proTot">\n' +
    '            <span>Total</span>\n' +
    '            <span>${{totalsplit}}</span>\n' +
    '        </div>\n' +
    '        <!-- end -->\n' +
    '\n' +
    '        <div class="popBtn mb-4">\n' +
    '            <a href="#" class="button line">Cancel</a>\n' +
    '            <button class="button succe-msg-slide" (click)="finalSaleCommission()">Save</button>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '    <!-- Main Container Ends -->'
})
export class SalesCommissionSplitComponent implements OnInit {
  SalesCommission: any;
    commissionsplit= {};
  totalsplit: number;

  constructor(public salesService: SalesService, private formBuilder: FormBuilder, public router: Router, public messageService: MessageService) { }

  ngOnInit() {
    this.totalsplit = 0;
    this.getSalesCommissionSplit(localStorage.getItem('saledetailid'));
  }

  getSalesCommissionSplit(saleid) {
    this.salesService.getSalesCommissionSplit(saleid).subscribe((data) => {
      this.SalesCommission = data;
      this.SalesCommission = this.SalesCommission['servicesCommission'];
      console.log(this.SalesCommission)
      // localStorage.setItem('companyId', data['ParentCompanyID']);
    });
  }

  totalofsplitamount(event){
    if(event){
      this.totalsplit = this.totalsplit + parseInt(event);
    }
    for(let i=0;i<this.SalesCommission.length;i++){
      if(this.SalesCommission[i]['commission']){
        this.SalesCommission[i]['commission'] = this.totalsplit
      }
    }
    console.log(this.SalesCommission)
  }

  finalSaleCommission() {
    this.commissionsplit['saleId'] = parseInt(localStorage.getItem('saledetailid'));
    this.commissionsplit['servicesCommission'] = this.SalesCommission;
    this.salesService.finalSaleCommission(this.commissionsplit).subscribe((data) => {
      this.router.navigate(['/saleslist']);
      this.messageService.clear();
      this.messageService.add('Sales Commission Split Completed Successfully.')
    });
  }
}
