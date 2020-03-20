import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { AdminService } from 'src/app/admin/admin.service';
import { SalesService } from '../sales.service';

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
    '                        <h6>849086</h6>\n' +
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
    '                        <h6>Nick R. Bocker</h6>\n' +
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
    '                        <input id="emailTog01" type="radio" name="togl-radio-0" checked="checked" />\n' +
    '                        <label for="emailTog01">Yes</label>\n' +
    '                        <input id="emailTog02" type="radio" name="togl-radio-0" />\n' +
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
    '                <div class="tip-flex">\n' +
    '                    <div class="user-det">\n' +
    '                        <i class="icon-haircut prodt-ico"></i>\n' +
    '                        <div class="usr-name">\n' +
    '                            <h3>Haircut<span>Add On Services : Massage, Hair Spa</span></h3>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                    <div class="user-det curPointer" data-toggle="modal" data-target="#suggestedTechPopup">\n' +
    '                        <div class="user-img"><img src="img/user.svg" alt=""></div>\n' +
    '                        <div class="usr-name">\n' +
    '                            <h3>Ira Membrit<span>Haircut</span></h3>\n' +
    '                        </div>\n' +
    '                        <i class="icon-down-arrow1 ml-3"></i>\n' +
    '                    </div>\n' +
    '                    <div class="tip-flex-other">\n' +
    '                        <div class="order-price">\n' +
    '                            <p>$15</p>\n' +
    '                        </div>\n' +
    '                        <div class="order-total">\n' +
    '                            <p>$17</p>\n' +
    '                        </div>\n' +
    '                        <div class="order-cancel"></div>\n' +
    '                    </div>\n' +
    '                    <div class="trs-cart-cancel" data-toggle="modal" data-target="#removePopup"><i\n' +
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
    '                    <h3 class="hdn2 mb-0 mr-3">One Technician for all Services</h3>\n' +
    '                    <div class="radio-toggle m-0">\n' +
    '                        <input id="emailTog11" type="radio" name="togl-radio-1" checked="checked" />\n' +
    '                        <label for="emailTog11">Yes</label>\n' +
    '                        <input id="emailTog12" type="radio" name="togl-radio-1" />\n' +
    '                        <label for="emailTog12">No</label>\n' +
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
    '                <div class="tip-flex">\n' +
    '                    <div class="user-det">\n' +
    '                        <i class="icon-haircut prodt-ico"></i>\n' +
    '                        <div class="usr-name">\n' +
    '                            <h3>Haircut<span>Add On Services : Massage, Hair Spa</span></h3>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                    <div class="tip-flex-other">\n' +
    '                        <div class="order-qty">\n' +
    '                            <p>02</p>\n' +
    '                        </div>\n' +
    '                        <div class="order-price">\n' +
    '                            <p>$15</p>\n' +
    '                        </div>\n' +
    '                        <div class="order-total">\n' +
    '                            <p>$17</p>\n' +
    '                        </div>\n' +
    '                        <div class="order-cancel"></div>\n' +
    '                    </div>\n' +
    '                    <div class="trs-cart-cancel" data-toggle="modal" data-target="#removePopup"><i\n' +
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
    '                <a href="./transaction-customer-merge-sales.html" class="button">Merge Sales</a>\n' +
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
    '                                <div class="pay-card"><img src="./img/visa.jpg" alt="card" /></div>\n' +
    '                                <h5>Card Name</h5>\n' +
    '                                <p>Harsh Metha</p>\n' +
    '                                <div class="p-card-ht"></div>\n' +
    '                                <h5>Card Number</h5>\n' +
    '                                <p>**** **** **** <span>1234</span></p>\n' +
    '                            </div>\n' +
    '                            <div class="payment-card-box">\n' +
    '                                <div class="pay-card"><img src="./img/visa.jpg" alt="card" /></div>\n' +
    '                                <h5>Card Name</h5>\n' +
    '                                <p>Pratik Karkera</p>\n' +
    '                                <div class="p-card-ht"></div>\n' +
    '                                <h5>Card Number</h5>\n' +
    '                                <p>**** **** **** <span>1234</span></p>\n' +
    '                            </div>\n' +
    '                            <div class="payment-card-box">\n' +
    '                                <div class="pay-card"><img src="./img/visa.jpg" alt="card" /></div>\n' +
    '                                <h5>Card Name</h5>\n' +
    '                                <p>Atmiya Malviya</p>\n' +
    '                                <div class="p-card-ht"></div>\n' +
    '                                <h5>Card Number</h5>\n' +
    '                                <p>**** **** **** <span>1234</span></p>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                        <div class="tip-total-box">\n' +
    '                            <div class="tipb tipb-hdn">\n' +
    '                                <h5>Sub Total</h5>\n' +
    '                                <h6>$100</h6>\n' +
    '                            </div>\n' +
    '                            <div class="tipb">\n' +
    '                                <h5>Coupon</h5>\n' +
    '                                <div class="cart-inp-box">\n' +
    '                                    <div class="form-group m-0">\n' +
    '                                        <input type="text" id="full-name" name="full-name" class="form-field" required\n' +
    '                                            value="1.50">\n' +
    '                                    </div>\n' +
    '                                    <button class="button">Apply</button>\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '                            <hr>\n' +
    '                            <div class="tipb">\n' +
    '                                <div class="rew-gain-box">\n' +
    '                                    <h6>Rewards Gained: $1.63</h6>\n' +
    '                                    <p>Cash Rewards Available: <span>$7.87</span></p>\n' +
    '                                </div>\n' +
    '                                <div class="cart-inp-box">\n' +
    '                                    <div class="form-group m-0">\n' +
    '                                        <input type="text" id="full-name" name="full-name" class="form-field" required\n' +
    '                                            value="1.50">\n' +
    '                                    </div>\n' +
    '                                    <button class="button">Apply</button>\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '                            <hr>\n' +
    '                            <div class="tipb">\n' +
    '                                <h5>Cash</h5>\n' +
    '                                <div class="cart-inp-box">\n' +
    '                                    <div class="form-group m-0">\n' +
    '                                        <input type="text" id="full-name" name="full-name" class="form-field" required\n' +
    '                                            value="1.50">\n' +
    '                                    </div>\n' +
    '                                    <button class="button">Apply</button>\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '                            <hr>\n' +
    '                            <div class="tipb">\n' +
    '                                <h5>Card 1</h5>\n' +
    '                                <div class="cart-inp-box">\n' +
    '                                    <div class="form-group m-0">\n' +
    '                                        <input type="text" id="full-name" name="full-name" class="form-field" required\n' +
    '                                            value="1.50">\n' +
    '                                    </div>\n' +
    '                                    <button class="button">Apply</button>\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '                            <div class="tipb">\n' +
    '                                <h5>New Card</h5>\n' +
    '                                <div class="cart-inp-box">\n' +
    '                                    <button class="button line">Add</button>\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '                            <hr>\n' +
    '                            <div class="tipb tipbTax">\n' +
    '                                <h5>Tax</h5>\n' +
    '                                <h6 class="cartPriceWidth">$40</h6>\n' +
    '                            </div>\n' +
    '\n' +
    '                            <div class="tipbGray">\n' +
    '                                <div class="tipb">\n' +
    '                                    <h5>Cash Total</h5>\n' +
    '                                    <h6 class="cartPriceWidth">$50</h6>\n' +
    '                                </div>\n' +
    '                                <div class="tipb">\n' +
    '                                    <h5>Card Total</h5>\n' +
    '                                    <h6 class="cartPriceWidth">$195</h6>\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '\n' +
    '                            <button class="button button--block mt-3 succe-msg-slide">Pay</button>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </form>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <a href="./transaction-customer-existing-product.html" class="button line cart-back">Back</a>\n' +
    '\n' +
    '        <!-- Gap -->\n' +
    '        <div class="row mb-5"></div>\n' +
    '    </div>\n' +
    '    <!-- Main Container Ends -->'
})
export class SalesTransactionCartComponent implements OnInit {

  constructor(private salesService: SalesService, public adminService:AdminService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
  }

}
