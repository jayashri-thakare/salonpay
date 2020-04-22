import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { AdminService } from 'src/app/admin/admin.service';
import { SalesService } from '../sales.service';
import { MessageService } from 'src/app/message.service';
import { triggerAsyncId } from 'async_hooks';
import { CustomerService } from 'src/app/customer/customer.service';

@Component({
  selector: 'tip-adjustmentsales',
  template:'<!-- Main Container Starts -->\n' +
    '        <div class="mainContainer m-0">\n' +
    '            <h3 class="main-comm-head">\n' +
    '                <a href="./transaction-customer-cart.html"><i class="icon-down-arrow com-arw"></i></a>\n' +
    '                Existing <span>Customer</span>\n' +
    '            </h3>\n' +
    '            <div class="row">\n' +
    '                <div class="w20 w-990-30 w-640-40 w-480-100">\n' +
    '                    <h6 class="poptile">Order</h6>\n' +
    '\n' +
    '                    <!-- start -->\n' +
    '                    <div class="prof-comm-shad pad-2 mb-3">\n' +
    '                        <div class="comm-cont w100 p-0">\n' +
    '                            <h6>{{orderIdOfSale}}</h6>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                    <!-- end -->\n' +
    '                </div>\n' +
    '                <div class="w30 w-990-40 w-640-60 w-480-100">\n' +
    '                    <h6 class="poptile">customer</h6>\n' +
    '\n' +
    '                    <!-- start -->\n' +
    '                    <div class="prof-comm-shad pad-2 mb-3">\n' +
    '                        <div class="comm-cont w100 p-0">\n' +
    '                            <h6>{{customerProfile?.firstName}} {{customerProfile?.lastName}}   </h6>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                    <!-- end -->\n' +
    '                </div>\n' +
    '            </div>\n' +
    '            <!-- Gap -->\n' +
    '            <div class="row mb-4"></div>\n' +
    '\n' +
    '            <div class="container p-0">\n' +
    '                <div class="row mb-5">\n' +
    '                    <div class="col-12">\n' +
    '                        <h3 class="hdn2 text-center">Tip Adjustment</h3>\n' +
    '                    </div>\n' +
    '                    <div class="col-12 tip-adj-btn-box">\n' +
    '                        <div class="tip-cash-btns">\n' +
    '                            <h6 class="poptile">Tip in Cash</h6>\n' +
    '                            <div class="radio-toggle">\n' +
    '                                <input id="emailTog1" type="radio" name="togl-radio" (click)="tipModefunc(\'cash\')" />\n' +
    '                                <label for="emailTog1">Yes</label>\n' +
    '                                <input id="emailTog11" type="radio" name="togl-radio" (click)="tipModefunc(\'card\')"/>\n' +
    '                                <label for="emailTog11">No</label>\n' +
    '                                <span class="toggle-outside"></span>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                        <div class="split-tip-btns">\n' +
    '                            <h6 class="poptile">Split Tip Evenly</h6>\n' +
    '                            <div class="radio-container">\n' +
    // '                                <div class="radio-box radio-box-2">\n' +
    // '                                    <input type="radio" id="ste-1" name="ste-radio" required>\n' +
    // '                                    <label for="ste-1">15%</label>\n' +
    // '                                </div>\n' +
    // '                                <div class="radio-box radio-box-2">\n' +
    // '                                    <input type="radio" id="ste-2" name="ste-radio" required>\n' +
    // '                                    <label for="ste-2">18%</label>\n' +
    // '                                </div>\n' +
    '                                <div class="radio-box radio-box-2">\n' +
    '                                    <input type="radio" id="ste-3" name="ste-radio" required checked>\n' +
    '                                    <label for="ste-3">20%</label>\n' +
    '                                </div>\n' +
    // '                                <div class="radio-box radio-box-2">\n' +
    // '                                    <input type="radio" id="ste-4" name="ste-radio" required>\n' +
    // '                                    <label for="ste-4">22%</label>\n' +
    // '                                </div>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                    <div class="col-12 mb-3">\n' +
    '                        <!-- Starts -->\n' +
    '                        <div class="tip-flex tip-flex-hdn">\n' +
    '                            <h4>Item Description</h4>\n' +
    '                            <h4>Technician</h4>\n' +
    '                            <div class="tip-flex-other">\n' +
    '                                <div class="tip-input">\n' +
    '                                    <h4>Tip</h4>\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                        <!-- Ends -->\n' +
    '                        <!-- Starts -->\n' +
    '                        <div class="tip-flex" *ngFor="let tip of customerTipData">\n' +
    '                            <div class="user-det">\n' +
    '                                <i class="icon-haircut prodt-ico"></i>\n' +
    '                                <div class="usr-name">\n' +
    '                                    <h3>{{tip.serviceName}}<span>Add On Services :</span><span *ngFor="let addontip of tip.addonServicesTip"> {{addontip.serviceName}}</span></h3>\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '                            <div class="user-det">\n' +
    '                                <div class="user-img"><img src="img/user.svg" alt=""></div>\n' +
    '                                <div class="usr-name">\n' +
    '                                    <h3>{{tip.technicianName}}<span>{{tip.serviceName}}</span></h3>\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '                            <div class="tip-flex-other">\n' +
    '                                <div class="tip-input">\n' +
    '                                    <div class="form-group m-0">\n' +
    '                                        <input type="text" id="full-name" (input)="tipvaluefunc($event.target.value, tip.serviceId)" name="full-name" class="form-field" required\n' +
    '                                             />\n' +
    '                                    </div>\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                        <!-- Ends -->\n' +
    '                    </div>\n' +
    '                    <div class="col-12">\n' +
    '                        <div class="tip-payment-container">\n' +
    '                            <div class="tip-payment-box">\n' +
    '                                <h6 class="poptile">Payment Method</h6>\n' +
    '                                <div class="payment-card-box">\n' +
    '                                    <div class="pay-card"><img src="../assets/img/visa.jpg" alt="card" /></div>\n' +
    '                                    <h5>Card Number</h5>\n' +
    '                                    <p>**** **** **** <span>1234</span></p>\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '                            <div class="tip-total-box">\n' +
    '                                <div class="tipb tipb-hdn">\n' +
    '                                    <h5>Tip</h5>\n' +
    '                                    <h6>${{tipvalue}}</h6>\n' +
    '                                </div>\n' +
    '                                <div class="tipb">\n' +
    '                                    <h5>Tip</h5>\n' +
    '                                    <h6>${{tipvalue}}</h6>\n' +
    '                                </div>\n' +
    '                                <div class="tipb">\n' +
    '                                    <h5>Order Total</h5>\n' +
    '                                    <h6>${{totalamount}}</h6>\n' +
    '                                </div>\n' +
    '                                <hr>\n' +
    '                                <div *ngIf="tipcashbool" class="tipb">\n' +
    '                                    <h5>Cash Total</h5>\n' +
    '                                    <h6>${{totaltip}}</h6>\n' +
    '                                </div>\n' +
    '                                <div *ngIf="tipcardbool" class="tipb">\n' +
    '                                    <h5>Card Total</h5>\n' +
    '                                    <h6>${{totaltip}}</h6>\n' +
    '                                </div>\n' +
    // '                                <div class="tipb">\n' +
    // '                                    <h5>Card Total 2</h5>\n' +
    // '                                    <h6>$257</h6>\n' +
    // '                                </div>\n' +
    '                                <button class="button button--block mt-3 succe-msg-slide" type="submit" (click)="finalSaleTip()">Finalize</button>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <!-- Main Container Ends -->'
})
export class TipAdjustmentSalesComponent implements OnInit {
    customerProfile: any;
    orderIdOfSale: string;
  customerTipData: any;
  tipvalue: any;
  totalamount: any;
  finalSaleTipData= {};
  createsaletip: any;
  tipmode: any;
  tipcardbool: boolean;
  tipcashbool: boolean;
  totaltip: any;

  constructor(public customerService: CustomerService,public messageService: MessageService, private salesService: SalesService, public adminService:AdminService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    document.body.classList.remove('succe-overlay-in')
    this.tipcashbool = true;
    this.tipmode = 'Cash';
    this.tipvalue = 0;
    this.totaltip = 0;
    this.getCustomerDetail();
    this.orderIdOfSale = localStorage.getItem('orderId');
    this.getTipData();
  }

  getCustomerDetail() {
    this.salesService.getCustomerDetails().subscribe((data) => {
      this.customerProfile = data;
      // this.customerProfile = this.customerProfile.result;
      console.log(this.customerProfile)
      // localStorage.setItem('companyId', data['ParentCompanyID']);
    });
  }

  getTipData() {
    this.orderIdOfSale = localStorage.getItem('orderId');
    this.salesService.getTipData(this.orderIdOfSale).subscribe((data) => {
      this.customerTipData = data;
      this.totalamount = this.customerTipData.totalAmount;
      this.customerTipData = this.customerTipData.ordersummaryservicesTip;
      console.log(this.customerTipData)
      // localStorage.setItem('companyId', data['ParentCompanyID']);
    });
  }

  tipvaluefunc(event, serviceid){
    debugger;
      for(let i=0;i<this.customerTipData.length;i++){
        if(event && serviceid == this.customerTipData[i].serviceId){
          this.customerTipData[i]['tip'] = parseInt(event);
          this.tipvalue = this.tipvalue + this.customerTipData[i]['tip'];
          this.tipvalue = this.tipvalue * 0.2;
          this.totaltip = this.tipvalue + this.totalamount;
        }else if(event == '' && serviceid == this.customerTipData[i].serviceId){
          if(event == ''){
            this.tipvalue = this.tipvalue - this.customerTipData[i]['tip'];
          }else{
            this.customerTipData[i]['tip'] = parseInt(event);
            this.tipvalue = this.tipvalue - this.customerTipData[i]['tip'];
            this.tipvalue = this.tipvalue * 0.2;
            this.totaltip = this.totalamount - this.tipvalue;
          }
        }
      }
  }

  tipModefunc(type){
    if(type == 'card'){
      this.tipmode = 'Card'
      this.tipcardbool = true;
      this.tipcashbool = false;
    }else if(type == 'cash'){
      this.tipmode = 'Cash'
      this.tipcardbool = false;
      this.tipcashbool = true;
    }
  }

  finalSaleTip() {
    this.finalSaleTipData = {
      "saleId": parseInt(localStorage.getItem('orderId')),
      "customerId": parseInt(localStorage.getItem('customerId')),
      "parentCompanyId": 6,
      "totalAmount": 200.20,
      "receivedAmount": 200.20,
      "isFullPaymentComplete": true,
      "tipMode": "CASH",
      "ordersummaryservicesTip": this.customerTipData 
  }
    // this.finalSaleTipData['saleId'] = parseInt(localStorage.getItem('orderId'));
    // this.finalSaleTipData['customerId'] = parseInt(localStorage.getItem('customerId'));
    // this.finalSaleTipData['totalAmount'] = this.totalamount;
    // this.finalSaleTipData['receivedAmount'] = this.totalamount;
    // this.finalSaleTipData['isFullPaymentComplete'] = true;
    // this.finalSaleTipData['ordersummaryservicesTip'] = this.customerTipData;
    // this.finalSaleTipData['tipMode'] = this.tipmode;
    this.salesService.create_final_sales_tip(this.finalSaleTipData).subscribe((data) => {
      this.router.navigate(['/customerdashboard']);
      this.customerService.showNav(4);
      this.messageService.clear();
      this.messageService.add('Sales Tip Completed Successfully.')
      this.createsaletip = data;
    });
  }

}
