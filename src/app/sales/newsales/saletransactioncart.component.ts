import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { AdminService } from 'src/app/admin/admin.service';
import { SalesService } from '../sales.service';
import { ModalService } from 'src/app/_modal/modal.service';
import { MessageService } from 'src/app/message.service';
import { CustomerService } from 'src/app/customer/customer.service';

@Component({
  selector: 'app-transactioncart',
  template: ' <!-- Main Container Starts -->\n' +
    '    <div class="mainContainer m-0">\n' +
    '        <h3 class="main-comm-head">\n' +
    '            <a href="./transaction-customer-existing-product.html"><i class="icon-down-arrow com-arw"></i></a>\n' +
    '            Existing <span>Customer</span>\n' +
    '        </h3>\n' +
    '        <!-- Customer 1 Starts -->\n' +
    '        <div class="row">\n' +
    '            <div class="w20 w-990-30 w-640-40 w-480-100">\n' +
    '                <h6 class="poptile">Order</h6>\n' +
    '\n' +
    '                <!-- start -->\n' +
    '                <div class="prof-comm-shad pad-2 mb-3">\n' +
    '                    <div class="comm-cont w100 p-0">\n' +
    '                        <h6>{{orderIdOfSale}}</h6>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <!-- end -->\n' +
    '            </div>\n' +
    '            <div class="w30 w-990-40 w-640-60 w-480-100">\n' +
    '                <h6 class="poptile">customer</h6>\n' +
    '\n' +
    '                <!-- start -->\n' +
    '                <div class="prof-comm-shad pad-2 mb-3">\n' +
    '                    <div class="comm-cont w100 p-0">\n' +
    '                        <h6>{{customerProfile?.firstName}} {{customerProfile?.lastName}}</h6>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <!-- end -->\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <!-- Gap -->\n' +
    '        <div class="row mb-4"></div>\n' +
    '        <div class="row">\n' +
    '            <div class="col-12">\n' +
    '                <div class="main-head-flx">\n' +
    '                    <h3 class="hdn2 mb-0 mr-3">One Technician for all Services</h3>\n' +
    '                    <div class="radio-toggle m-0">\n' +
    '                        <input id="emailTog01" type="radio" name="togl-radio-0" (click)="technicianonoff(\'yes\')" checked="checked" />\n' +
    '                        <label for="emailTog01">Yes</label>\n' +
    '                        <input id="emailTog02" type="radio" (click)="technicianonoff(\'no\')" name="togl-radio-0" />\n' +
    '                        <label for="emailTog02">No</label>\n' +
    '                        <span class="toggle-outside"></span>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <div class="row">\n' +
    '            <div class="col-12 mb-3 tech-cart-box">\n' +
    '                <!-- Starts -->\n' +
    '                <div class="tip-flex tip-flex-hdn">\n' +
    '                    <h4>Item Description</h4>\n' +
    '                    <h4>Technician</h4>\n' +
    '                    <div class="tip-flex-other">\n' +
    '                        <div class="order-price">\n' +
    '                            <h4>Price</h4>\n' +
    '                        </div>\n' +
    '                        <div class="order-total">\n' +
    '                            <h4>Total</h4>\n' +
    '                        </div>\n' +
    '                        <div class="order-cancel"></div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <!-- Ends -->\n' +
    '                <!-- Starts -->\n' +
    '                <div class="tip-flex" *ngFor="let service of arrayofservices">\n' +
    '                    <div class="user-det">\n' +
    '                        <i class="icon-haircut prodt-ico"></i>\n' +
    '                        <div class="usr-name">\n' +
    '                            <h3>{{service.serviceName}}<span>Add On Services :</span><span *ngFor="let addon of service.addonServices">{{addon.serviceName}}</span></h3>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                    <div class="user-det curPointer" >\n' +
    '                        <div class="user-img"><img src="../assets/img/user.svg" alt=""></div>\n' +
    '                        <div class="usr-name">\n' +
    '                            <h3>{{service.technicianName}}<span>{{service.serviceName}}</span></h3>\n' +
    '                        </div>\n' +
    '                        <i class="icon-down-arrow1 ml-3" *ngIf="techniciantrue" data-toggle="modal" data-target="#suggestedTechPopup"></i>\n' +
    '                    </div>\n' +
    '                    <div class="tip-flex-other">\n' +
    '                        <div class="order-price">\n' +
    '                            <p>${{service.serviceCost |number:\'1.2-2\'}}</p>\n' +
    '                        </div>\n' +
    '                        <div class="order-total">\n' +
    '                            <p>${{service.totalServiceCost|number:\'1.2-2\'}}</p>\n' +
    '                        </div>\n' +
    '                        <div class="order-cancel"></div>\n' +
    '                    </div>\n' +
    '                    <div class="trs-cart-cancel" data-toggle="modal" data-target="#removePopup" (click)="selectserviceproductobj(service)"><i\n' +
    '                            class="icon-cir-plus"></i></div>\n' +
    '                </div>\n' +
    '                <!-- Ends -->\n' +
    '\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <!-- Gap -->\n' +
    '        <div class="row mb-4"></div>\n' +
    '        <!-- Customer 1 Ends -->\n' +
    '\n' +
    '        <!-- Gap -->\n' +
    '        <div class="row mb-4"></div>\n' +
    '        <div class="row">\n' +
    '            <div class="col-12">\n' +
    '                <div class="main-head-flx">\n' +
    '                    <h3 class="hdn2 mb-0 mr-3">All Products</h3>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <div class="row">\n' +
    '            <div class="col-12 mb-3 tech-cart-box">\n' +
    '                <!-- Starts -->\n' +
    '                <div class="tip-flex tip-flex-hdn">\n' +
    '                    <h4>Item Description</h4>\n' +
    '                    <div class="tip-flex-other">\n' +
    '                        <div class="order-qty">\n' +
    '                            <h4>Qty</h4>\n' +
    '                        </div>\n' +
    '                        <div class="order-price">\n' +
    '                            <h4>Price</h4>\n' +
    '                        </div>\n' +
    '                        <div class="order-total">\n' +
    '                            <h4>Total</h4>\n' +
    '                        </div>\n' +
    '                        <div class="order-cancel"></div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <!-- Ends -->\n' +
    '                <!-- Starts -->\n' +
    '                <div class="tip-flex" *ngFor="let product of customerProductCart">\n' +
    '                    <div class="user-det">\n' +
    '                        <i class="icon-haircut prodt-ico"></i>\n' +
    '                        <div class="usr-name">\n' +
    '                            <h3>{{product.productName}}</h3>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                    <div class="tip-flex-other">\n' +
    '                        <div class="order-qty">\n' +
    '                            <p>{{product.quantity}}</p>\n' +
    '                        </div>\n' +
    '                        <div class="order-price">\n' +
    '                            <p>${{product.productCost|number:\'1.2-2\'}}</p>\n' +
    '                        </div>\n' +
    '                        <div class="order-total">\n' +
    '                            <p>${{product.totalProductCost|number:\'1.2-2\'}}</p>\n' +
    '                        </div>\n' +
    '                        <div class="order-cancel"></div>\n' +
    '                    </div>\n' +
    '                    <div class="trs-cart-cancel" data-toggle="modal" data-target="#removePopup" (click)="selectserviceproductobj(product)"><i\n' +
    '                            class="icon-cir-plus"></i></div>\n' +
    '                </div>\n' +
    '                <!-- Ends -->\n' +
    '\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <!-- Customer 2 Ends -->\n' +
    '\n' +
    '        <div class="row">\n' +
    '            <div class="col-12">\n' +
    '                <a (click)="mergesalesfunc()" class="button custom-btn">Merge Sales</a>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <!-- Gap -->\n' +
    '        <div class="row mb-4"></div>\n' +
    '\n' +
    '        <div class="row">\n' +
    '            <div class="col-12">\n' +
    '                <form action="./transaction-customer-tip-adjustment.html">\n' +
    '                    <div class="tip-payment-container">\n' +
    '                        <div class="tip-payment-box">\n' +
    '                            <h6 class="poptile">Payment Method</h6>\n' +
    '                            <div class="payment-card-box">\n' +
    '                                <div class="pay-card"><img src="../assets/img/visa.jpg" alt="card" /></div>\n' +
    '                                <h5>Card Name</h5>\n' +
    '                                <p>Harsh Metha</p>\n' +
    '                                <div class="p-card-ht"></div>\n' +
    '                                <h5>Card Number</h5>\n' +
    '                                <p>**** **** **** <span>1234</span></p>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                        <div class="tip-total-box">\n' +
    '                            <div class="tipb tipb-hdn">\n' +
    '                                <h5>Sub Total</h5>\n' +
    '                                <h6>${{finalamount|number:\'1.2-2\'}}</h6>\n' +
    '                            </div>\n' +
    '                            <div class="tipb">\n' +
    '                                <h5>Coupon</h5>\n' +
    '                                <form [formGroup]="addcouponForm">\n' +
    '                                <div class="cart-inp-box">\n' +
    '                                    <div class="form-group m-0">\n' +
    '                                        <input type="text" id="full-name" formControlName="CouponCode" name="full-name" class="form-field" required\n' +
    '                                            value="1.50">\n' +
    '                                    </div>\n' +
    '                                    <button class="button" type="button" (click)="addcoupon(addcouponForm.value);">Apply</button>\n' +
    '                                </div>\n' +
    '                                </form>\n' +
    '                            </div>\n' +
    '                                <div *ngIf="couponbool" class="rew-gain-box pad-left">\n' +
    '                                    <p class="greencol">Coupon Applied Successfully! <i class="icon-cir-plus remove-custom" (click)="removecouponapplied()"></i></p>\n' +
    '                                    <p class="greencol">Coupon Discount: <span>${{couponcodevalue.value|number:\'1.2-2\'}}</span></p>\n' +
    '                                </div>\n' +
    '                            <hr>\n' +
    '                            <div class="tipb">\n' +
    '                                <div class="rew-gain-box">\n' +
    '                                    <h6>Rewards Gained: $0</h6>\n' +
    '                                    <p>Cash Rewards Available: <span>${{customerReward?.balance|number:\'1.2-2\'}}</span></p>\n' +
    '                                </div>\n' +
    '                                <form [formGroup]="addrewardForm">\n' +
    '                                <div class="cart-inp-box">\n' +
    '                                    <div class="form-group m-0">\n' +
    '                                        <input type="text" id="full-name" formControlName="RewardValue" class="form-field" required\n' +
    '                                            >\n' +
    '                                    </div>\n' +
    '                                    <button class="button" type="button" (click)="addreward(addrewardForm.value)">Apply</button>\n' +
    '                                </div>\n' +
    '                              </form>\n' +
    '                            </div>\n' +
    '                            <hr>\n' +
    '                            <div class="tipb">\n' +
    '                                <h5>Cash</h5>\n' +
    '                                <div class="cart-inp-box">\n' +
    '                                    <div class="form-group m-0">\n' +
    '                                        <input type="text" id="full-name" name="full-name" [(ngModel)]="cashamount" class="form-field" required\n' +
    '                                            >\n' +
    '                                    </div>\n' +
    '                                    <button class="button" type="button" (click)="calculatepayment(\'cash\', cashamount)">Apply</button>\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '                            <hr>\n' +
    '                            <div class="tipb">\n' +
    '                                <h5>Card 1</h5>\n' +
    '                                <div class="cart-inp-box">\n' +
    '                                    <div class="form-group m-0">\n' +
    '                                        <input type="text" id="full-name" name="full-name" [(ngModel)]="cardamount" class="form-field" required\n' +
    '                                            >\n' +
    '                                    </div>\n' +
    '                                    <button class="button" type="button" (click)="calculatepayment(\'card\', cardamount)">Apply</button>\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '                            <div class="tipb">\n' +
    '                                <h5>New Card</h5>\n' +
    '                                <div class="cart-inp-box">\n' +
    '                                    <button class="button line" type="button">Add</button>\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '                            <hr>\n' +
    '                            <div class="tipb tipbTax">\n' +
    '                                <h5>Tax</h5>\n' +
    '                                <h6 class="cartPriceWidth">${{totaltax|number:\'1.2-2\'}}</h6>\n' +
    '                            </div>\n' +
    '\n' +
    '                            <div class="tipbGray">\n' +
    '                                <div class="tipb">\n' +
    '                                    <h5>Cash Total</h5>\n' +
    '                                    <h6 class="cartPriceWidth">${{cashamountvalue|number:\'1.2-2\'}}</h6>\n' +
    '                                </div>\n' +
    '                                <div class="tipb">\n' +
    '                                    <h5>Card Total</h5>\n' +
    '                                    <h6 class="cartPriceWidth">${{cardamountvalue|number:\'1.2-2\'}}</h6>\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '\n' +
    '                            <button type="button" (click)="finalSaleService()" class="button button--block mt-3 succe-msg-slide">Pay</button>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </form>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <button (click)="backtoproduct()" type="button" class="button line btn-lin-cust">Back</button>\n' +
    '\n' +
    '        <!-- Gap -->\n' +
    '        <div class="row mb-5"></div>\n' +
    '    </div>\n' +
    '    <!-- Main Container Ends -->\n' +
    ' <modal-technician></modal-technician>\n' +
    '<!--  Remove Modal Starts -->\n' +
    '    <div class="modal fade" id="removePopup">\n' +
    '        <div class="modal-dialog medium-window modal-dialog-centered">\n' +
    '            <div class="modal-content">\n' +
    '                <h2 class="modal-title">Are you sure you want to Remove?</h2>\n' +
    '                <div class="modal-btn">\n' +
    '                    <button class="button line mr-2" data-dismiss="modal">Cancel</button>\n' +
    '                    <button class="button red" data-dismiss="modal" (click)="deleteSelectedServicesProducts(arrayofselectedobj)">Remove</button>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '    <!-- Remove Modal Ends -->'
})
export class SalesTransactionCartComponent implements OnInit {
  addrewardForm: FormGroup;
  addcouponForm: FormGroup;
  control: FormControl;
  submitted = false;
  orderIdOfSale: string;
  customerProfile: any;
  customerProductCart: any;
  arrayofservices: any;
  techniciantrue: boolean;
  totalservicecost: any;
  customerReward: any;
  couponcodevalue: any;
  arrayofselectedobj: Array<any> =[];
  couponbool: boolean;
  arrayofselectedsaleobj: Array<any> = [];
  finalamount: number;
  createsale: any;
  finalSale = {};
  cardamountvalue: any;
  cashamountvalue: any;
  businesstaxtable: any;
  totalproductcost: any;
  totalservicecosttax: number;
  totalproductcosttax: number;
  totaltax: number;
  total: number;

  constructor(public AdminService: AdminService, public messageService: MessageService, public modalService: ModalService, private salesService: SalesService, public adminService:AdminService, private formBuilder: FormBuilder, private router: Router) { }

  get f() {
    return this.addrewardForm.controls;
  }
  get f1() {
    return this.addcouponForm.controls;
  }
  ngOnInit() {
    this.addrewardForm = this.formBuilder.group({
      RewardValue: ['']
    });
    this.addcouponForm = this.formBuilder.group({
      CouponCode: ['']
    });
    this.cashamountvalue = 0;
    this.cardamountvalue = 0;
    this.finalamount = 0;
    this.totalservicecost = 0;
    this.totalproductcost = 0;
    this.totalservicecosttax = 0;
    this.totalproductcosttax = 0;
    this.totaltax = 0;
    this.couponcodevalue = 0;
    this.getCustomerDetail();
    this.orderIdOfSale = localStorage.getItem('orderId');
    this.arrayofselectedsaleobj = this.salesService.arrayofselectedobj;
    this.getCustomerProductCart();
    this.getCustomerServices();
    this.getCustomerReward();
    this.getTaxTable();
  }

  getCustomerDetail() {
    this.salesService.getCustomerDetails().subscribe((data) => {
      this.customerProfile = data;
      // this.customerProfile = this.customerProfile.result;
      console.log(this.customerProfile)
      // localStorage.setItem('companyId', data['ParentCompanyID']);
    });
  }

  getCustomerServices() {
    this.salesService.getCustomerServices(this.orderIdOfSale).subscribe((data) => {
      this.arrayofservices = data;
      this.arrayofservices = this.arrayofservices.ordersummaryservices;
      if(this.arrayofselectedsaleobj.length > 0){
        this.arrayofservices = this.arrayofservices.concat(this.arrayofselectedsaleobj[0]['ordersummaryservices'])
      }
      this.singletotalpriceofserviceandproduct('service');
      this.totalpriceofserviceandproduct('service');
      console.log(this.arrayofservices)
      // localStorage.setItem('companyId', data['ParentCompanyID']);
    });
  }

  getCustomerProductCart() {
    this.salesService.getCustomerProductCart(this.orderIdOfSale).subscribe((data) => {
      this.customerProductCart = data;
      this.customerProductCart = this.customerProductCart[0]['products'];
      if(this.arrayofselectedsaleobj.length > 0){
        this.customerProductCart = this.customerProductCart.concat(this.arrayofselectedsaleobj[0]['products'])
      }
      console.log(this.customerProductCart)
      this.singletotalpriceofserviceandproduct('product');
      this.totalpriceofserviceandproduct('product');
      // localStorage.setItem('companyId', data['ParentCompanyID']);
    });
  }

  getCustomerReward() {
    this.salesService.getCustomerReward(localStorage.getItem('customerId')).subscribe((data) => {
      this.customerReward = data;
      // localStorage.setItem('companyId', data['ParentCompanyID']);
    });
  }

  technicianonoff(type){
    if(type == 'yes'){
      this.techniciantrue = false;
    }else if(type == 'no'){
      this.techniciantrue = true;
    }
  }

  backtoproduct(){
    this.getCustomerProductCart();
    this.router.navigate(['/transactionproduct']);
  }

  mergesalesfunc(){
    this.router.navigate(['/mergesalescart']);
  }

  totalpriceofserviceandproduct(type){
    debugger;
    if(type == 'service'){
      this.totalservicecost = 0;
      for(let i=0;i<this.arrayofservices.length;i++){
        this.totalservicecost = this.totalservicecost + this.arrayofservices[i]['totalServiceCost']
        // for(let j=0;j<this.arrayofservices[i]['addonServices'].length;j++){
        //   this.totalservicecost = this.totalservicecost + this.arrayofservices[i]['addonServices'][j]['serviceCost']
        // }
      }
      this.finalamount = this.totalservicecost;
    }else if(type == 'product'){
      this.totalproductcost = 0;
      for(let i=0;i<this.customerProductCart.length;i++){
        this.totalproductcost = this.totalproductcost + (this.customerProductCart[i]['quantity'] * this.customerProductCart[i]['productCost'])
      }
    }
    this.finalamount = this.totalservicecost + this.totalproductcost;
    console.log(this.totalservicecost, this.totalproductcost, this.finalamount)
  }

  singletotalpriceofserviceandproduct(type){
    if(type == 'service'){
        for(let i=0;i<this.arrayofservices.length;i++){
          this.totalservicecost = this.totalservicecost + this.arrayofservices[i]['serviceCost']
          for(let j=0;j<this.arrayofservices[i]['addonServices'].length;j++){
            this.arrayofservices[i]['totalServiceCost'] = this.arrayofservices[i]['serviceCost'] + this.arrayofservices[i]['addonServices'][j]['serviceCost']
          }
        }
    }else if(type == 'product'){
        for(let i=0;i<this.customerProductCart.length;i++){
          this.customerProductCart[i]['totalProductCost'] = this.customerProductCart[i]['quantity'] * this.customerProductCart[i]['productCost']
        }
      }
    console.log(this.totalservicecost)
  }

  removecouponapplied(){
    this.couponcodevalue = {};
    this.couponbool = false;
    this.addcouponForm = this.formBuilder.group({
      CouponCode: ['']
    });
  }

  selectserviceproductobj(selected_obj){
    var index = this.arrayofselectedobj.indexOf(selected_obj);
    if(index<0){
      this.arrayofselectedobj.splice(index, 1);
      this.arrayofselectedobj.push(selected_obj);
    }
    console.log(this.arrayofselectedobj)
  }

  deleteSelectedServicesProducts(arrayofselectedobj){
    if(arrayofselectedobj.length > 0){
      for(let i=0;i< this.arrayofservices.length;i++){
        if(this.arrayofservices[i]['serviceId'] == arrayofselectedobj[0]['serviceId']){
          this.arrayofservices.splice(this.arrayofservices.indexOf(arrayofselectedobj[0]['serviceId']), 1)
        }
      }
      for(let i=0;i< this.customerProductCart.length;i++){
        if(this.customerProductCart[i]['productId'] == arrayofselectedobj[0]['productId']){
          this.customerProductCart.splice(this.customerProductCart.indexOf(arrayofselectedobj[0]['productId']), 1)
        }
      }
    }
  }

  getTaxTable() {
    this.AdminService.GetTaxTableList().subscribe((data) => {
      this.businesstaxtable = data;
      this.businesstaxtable = this.businesstaxtable.result;
      console.log(this.businesstaxtable)
      if(this.businesstaxtable.productTaxRate || this.businesstaxtable.serviceTaxRate){
        this.totalservicecosttax = this.totalservicecost * (this.businesstaxtable.serviceTaxRate/100); 
        this.totalproductcosttax = this.totalproductcost * (this.businesstaxtable.productTaxRate/100); 
        this.totaltax = this.totalservicecosttax + this.totalproductcosttax;
      }
      // localStorage.setItem('companyId', data['ParentCompanyID']);
    });
  }

  addreward(reward) {
    console.log(reward)
    // tslint:disable-next-line:triple-equals
    if (this.addrewardForm.status == 'VALID') {
      this.salesService.add_reward(reward).subscribe((data) => {
        if(data['success'] == 0){
          this.messageService.clear();
          this.messageService.add(data['message'])
        }else if(data['success'] == 1){
          this.messageService.clear();
          this.messageService.add(data['message'])
        }
        
      });
    } else {
      console.log(reward, this.addrewardForm.status);
      this.submitted = true;
      if (this.addrewardForm.invalid) {
        return;
      }
    }
  }

  addcoupon(coupon) {
    console.log(coupon)
    // tslint:disable-next-line:triple-equals
    if (this.addcouponForm.status == 'VALID') {
      this.salesService.add_coupon(coupon).subscribe((data) => {
        if(data['success'] == 0){
          this.messageService.clear();
          this.messageService.add(data['message'])
        }else{
          this.couponbool = true;
          this.couponcodevalue = data;
          this.calculatepayment('coupon', data['value']);
        }
      });
    } else {
      console.log(coupon, this.addcouponForm.status);
      this.submitted = true;
      if (this.addcouponForm.invalid) {
        return;
      }
    }
  }

  calculatepayment(type, value){
    if(type == 'card'){
      this.cardamountvalue = value;
    }else if(type == 'cash'){
      this.cashamountvalue = value;
    }else if(type == 'coupon'){
      this.finalamount = this.finalamount - value;
    }
  }

  finalSaleService() {
    if(this.arrayofservices.length > 0){
      for(let i=0;i<this.arrayofservices;i++){
        this.arrayofservices[i]['technicianId'] = "cfe2e89c-8c8a-47fc-8b72-d4a9ded74079";
        this.arrayofservices[i]['technicianName'] = "Jaya Test Test"
      }
      console.log(this.arrayofservices)
    }
    this.total = this.finalamount + this.totaltax;
      this.finalSale = {
        "SaleId": parseInt(localStorage.getItem('orderId')),
        "CustomerId": parseInt(localStorage.getItem('customerId')),
      "Currency":"$",
      "TotalAmount":this.total,
      "ReceivedAmount":this.total,
      "IsFullPaymentComplete":true,
      "ParentCompanyId":parseInt(localStorage.getItem('companyId')),
      "PaymentType":[
              {
              "Type":"COUPON",
              "TypeDescription":"coupon001",
              "Amount":parseFloat(this.cardamountvalue)
              },
              {
              "Type":"REWARD",
              "Amount":2.0
              },
              {
              "Type":"CASH",
              "Amount":parseFloat(this.cashamountvalue)
              },
              {
              "Type":"TAX",
              "Amount":this.totaltax
              }
      ],
      "Card":[
              {
              "Type":"CARD",
              "CardDescription":"1264-2536-4523-5689",
              "CardAmount":parseFloat(this.cardamountvalue)
              }
      ],
        "ordersummaryservicesUpdate": this.arrayofservices,
                "productsUpdate": this.customerProductCart
            }
      // this.finalSale['SaleId'] = parseInt(localStorage.getItem('orderId'));
      // this.finalSale['ParentComapnyId'] = parseInt(localStorage.getItem('companyId'));
      // this.finalSale['Currency'] = '$';
      // this.finalSale['TotalAmount'] = 100.00;
      // this.finalSale['ReceivedAmount'] = 100.00;
      // this.finalSale['IsFullPaymentComplete'] = true;
      // this.finalSale['productsUpdate'] = [
      //     {
      //         "productCost": 600.00,
      //         "productId": 19,
      //         "productName": "Nail Polish",
      //         "quantity": 5
      //     },
      //     {
      //         "productCost": 122.00,
      //         "productId": 20,
      //         "productName": "Nykaa Matte Nail Enamel",
      //         "quantity": 5
      //     }
      // ];
      // this.finalSale['ordersummaryservicesUpdate'] = this.arrayofservices;
      // this.finalSale['PaymentType']=[
      //       {
      //       "Type":"COUPON",
      //       "TypeDescription":"coupon001",
      //       "Amount":100.0
      //       },
      //       {
      //       "Type":"REWARD",
      //       "Amount":10.0
      //       },
      //       {
      //       "Type":"CASH",
      //       "Amount":100.0
      //       },
      //       {
      //       "Type":"TAX",
      //       "Amount":10.0
      //       }
      // ],
      // this.finalSale['Card']=[
      //       {
      //       "Type":"CARD",
      //       "CardDescription":"1264-2536-4523-5689",
      //       "CardAmount":200.0
      //       },
      //       {
      //       "Type":"CARD",
      //       "CardDescription":"1264-2536-4523-5689",
      //       "CardAmount":100.0
      //       }
      // ],
      if(this.cardamountvalue == 0 && this.cashamountvalue == 0){
        this.messageService.clear();
          this.messageService.add('Please add card and cash amount value.')
      }else{
        this.salesService.create_final_sales(this.finalSale).subscribe((data) => {
          this.router.navigate(['/transactiontipadjustment']);
          this.messageService.clear();
          this.messageService.add('Sales Completed Successfully.')
          this.createsale = data;
        });
      }
  }
}
