import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { CustomerService } from '../../customer.service';

@Component({
  selector: 'app-salesdetail',
  template: ' <!-- Main Container Starts -->\n' +
    '    <div class="mainContainer m-0">\n' +
    '        <div class="comm-headline-btn">\n' +
    '            <h3 class="main-comm-head m-0">\n' +
    '                <a href="customer-sales.html"><i class="icon-down-arrow com-arw"></i></a>\n' +
    '                Sales <span>Detail</span>\n' +
    '            </h3>\n' +
    '            <div class="filter-container-up">\n' +
    '                <i class="icon-share filter-up-ico"></i>\n' +
    '                <button class="button">Print</button>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <!-- Customer 1 Starts -->\n' +
    '        <div class="row">\n' +
    '            <div class="w20 w-1440-33 w-990-50 w-640-100">\n' +
    '                <h6 class="poptile">Invoice No</h6>\n' +
    '\n' +
    '                <!-- start -->\n' +
    '                <div class="prof-comm-shad pad-2 mb-3">\n' +
    '                    <div class="comm-cont w100 p-0">\n' +
    '                        <h6>#987542</h6>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <!-- end -->\n' +
    '            </div>\n' +
    '            <div class="w20 w-1440-33 w-990-50 w-640-100">\n' +
    '                <h6 class="poptile">Date & Time</h6>\n' +
    '\n' +
    '                <!-- start -->\n' +
    '                <div class="prof-comm-shad pad-2 mb-3">\n' +
    '                    <div class="comm-cont w100 p-0">\n' +
    '                        <h6>5 Aug 2019, 2:30PM</h6>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <!-- end -->\n' +
    '            </div>\n' +
    '            <div class="w20 w-1440-33 w-990-50 w-640-100">\n' +
    '                <h6 class="poptile">Name</h6>\n' +
    '\n' +
    '                <!-- start -->\n' +
    '                <div class="prof-comm-shad pad-2 mb-3">\n' +
    '                    <div class="comm-cont w100 p-0">\n' +
    '                        <h6>Maya Didas</h6>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <!-- end -->\n' +
    '            </div>\n' +
    '            <div class="w20 w-1440-33 w-990-50 w-640-100">\n' +
    '                <h6 class="poptile">email</h6>\n' +
    '\n' +
    '                <!-- start -->\n' +
    '                <div class="prof-comm-shad pad-2 mb-3">\n' +
    '                    <div class="comm-cont w100 p-0">\n' +
    '                        <h6>mayadidas@salescorp.com</h6>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <!-- end -->\n' +
    '            </div>\n' +
    '            <div class="w20 w-1440-33 w-990-50 w-640-100">\n' +
    '                <h6 class="poptile">mobile</h6>\n' +
    '\n' +
    '                <!-- start -->\n' +
    '                <div class="prof-comm-shad pad-2 mb-3">\n' +
    '                    <div class="comm-cont w100 p-0">\n' +
    '                        <h6>+ 1-541-754-3010</h6>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <!-- end -->\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <!-- Gap -->\n' +
    '        <div class="row mb-4"></div>\n' +
    '        <div class="row">\n' +
    '            <div class="col-12 mb-3 tech-cart-box tip-last-txt">\n' +
    '                <!-- Starts -->\n' +
    '                <div class="tip-flex tip-flex-hdn">\n' +
    '                    <h4>Item Description</h4>\n' +
    '                    <h4>Technician</h4>\n' +
    '                    <div class="tip-flex-other">\n' +
    '                        <div class="order-tip">\n' +
    '                            <h4>Tip</h4>\n' +
    '                        </div>\n' +
    '                        <div class="order-qty">\n' +
    '                            <h4>Qty</h4>\n' +
    '                        </div>\n' +
    '                        <div class="order-price">\n' +
    '                            <h4>Price</h4>\n' +
    '                        </div>\n' +
    '                        <div class="order-total">\n' +
    '                            <h4>Total</h4>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <!-- Ends -->\n' +
    '                <!-- Starts -->\n' +
    '                <div class="tip-flex">\n' +
    '                    <div class="user-det">\n' +
    '                        <i class="icon-dye prodt-ico"></i>\n' +
    '                        <div class="usr-name">\n' +
    '                            <h3>Hair Color<span>Add On Services : Massage, Hair Spa</span></h3>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                    <div class="user-det">\n' +
    '                        <div class="user-img"><img src="img/user.svg" alt=""></div>\n' +
    '                        <div class="usr-name">\n' +
    '                            <h3>Ira Membrit<span>Haircut</span></h3>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                    <div class="tip-flex-other">\n' +
    '                        <div class="order-tip">\n' +
    '                            <p>$2</p>\n' +
    '                        </div>\n' +
    '                        <div class="order-qty">\n' +
    '                            <p>-</p>\n' +
    '                        </div>\n' +
    '                        <div class="order-price">\n' +
    '                            <p>$15</p>\n' +
    '                        </div>\n' +
    '                        <div class="order-total">\n' +
    '                            <p>$17</p>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <!-- Ends -->\n' +
    '                <!-- Starts -->\n' +
    '                <div class="tip-flex">\n' +
    '                    <div class="user-det">\n' +
    '                        <i class="icon-dye prodt-ico"></i>\n' +
    '                        <div class="usr-name">\n' +
    '                            <h3>Hair Color<span>Add On Services : Massage, Hair Spa</span></h3>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                    <div class="user-det">\n' +
    '                        <div class="user-img"><img src="img/user.svg" alt=""></div>\n' +
    '                        <div class="usr-name">\n' +
    '                            <h3>Ira Membrit<span>Haircut</span></h3>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                    <div class="tip-flex-other">\n' +
    '                        <div class="order-tip">\n' +
    '                            <p>$2</p>\n' +
    '                        </div>\n' +
    '                        <div class="order-qty">\n' +
    '                            <p>2</p>\n' +
    '                        </div>\n' +
    '                        <div class="order-price">\n' +
    '                            <p>$15</p>\n' +
    '                        </div>\n' +
    '                        <div class="order-total">\n' +
    '                            <p>$17</p>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <!-- Ends -->\n' +
    '                <!-- Starts -->\n' +
    '                <div class="tip-flex">\n' +
    '                    <div class="user-det">\n' +
    '                        <i class="icon-dye prodt-ico"></i>\n' +
    '                        <div class="usr-name">\n' +
    '                            <h3>Hair Color<span>Add On Services : Massage, Hair Spa</span></h3>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                    <div class="user-det">\n' +
    '                        <div class="user-img"><img src="img/user.svg" alt=""></div>\n' +
    '                        <div class="usr-name">\n' +
    '                            <h3>Ira Membrit<span>Haircut</span></h3>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                    <div class="tip-flex-other">\n' +
    '                        <div class="order-tip">\n' +
    '                            <p>$2</p>\n' +
    '                        </div>\n' +
    '                        <div class="order-qty">\n' +
    '                            <p>-</p>\n' +
    '                        </div>\n' +
    '                        <div class="order-price">\n' +
    '                            <p>$15</p>\n' +
    '                        </div>\n' +
    '                        <div class="order-total">\n' +
    '                            <p>$17</p>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <!-- Ends -->\n' +
    '                <!-- Starts -->\n' +
    '                <div class="tip-flex">\n' +
    '                    <div class="user-det">\n' +
    '                        <i class="icon-dye prodt-ico"></i>\n' +
    '                        <div class="usr-name">\n' +
    '                            <h3>Hair Color<span>Add On Services : Massage, Hair Spa</span></h3>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                    <div class="user-det">\n' +
    '                        <div class="user-img"><img src="img/user.svg" alt=""></div>\n' +
    '                        <div class="usr-name">\n' +
    '                            <h3>Ira Membrit<span>Haircut</span></h3>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                    <div class="tip-flex-other">\n' +
    '                        <div class="order-tip">\n' +
    '                            <p>$2</p>\n' +
    '                        </div>\n' +
    '                        <div class="order-qty">\n' +
    '                            <p>2</p>\n' +
    '                        </div>\n' +
    '                        <div class="order-price">\n' +
    '                            <p>$15</p>\n' +
    '                        </div>\n' +
    '                        <div class="order-total">\n' +
    '                            <p>$17</p>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <!-- Ends -->\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <!-- Gap -->\n' +
    '\n' +
    '        <div class="row mb-4"></div>\n' +
    '\n' +
    '        <div class="row">\n' +
    '            <div class="col-12">\n' +
    '                <form action="">\n' +
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
    '                                <h6 class="cupn-reward">- $5</h6>\n' +
    '                            </div>\n' +
    '                            <hr>\n' +
    '                            <div class="tipb">\n' +
    '                                <div class="rew-gain-box">\n' +
    '                                    <h6>Rewards Gained: $1.63</h6>\n' +
    '                                    <p>Cash Rewards Available: <span>$7.87</span></p>\n' +
    '                                </div>\n' +
    '                                <h6 class="reward-gain">+ $5</h6>\n' +
    '                            </div>\n' +
    '                            <hr>\n' +
    '                            <div class="tipb">\n' +
    '                                <h5>Cash</h5>\n' +
    '                                <h6 class="cartPriceWidth">$20</h6>\n' +
    '                            </div>\n' +
    '                            <hr>\n' +
    '                            <div class="tipb">\n' +
    '                                <h5>Card</h5>\n' +
    '                                <h6 class="cartPriceWidth">$50</h6>\n' +
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
    '                                    <h6 class="cartPriceWidth">$30</h6>\n' +
    '                                </div>\n' +
    '                                <div class="tipb">\n' +
    '                                    <h5>Card Total</h5>\n' +
    '                                    <h6 class="cartPriceWidth">$235</h6>\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '\n' +
    '                            <div class="tipb tipb-hdn">\n' +
    '                                <h5>Sub Total</h5>\n' +
    '                                <h6>$369</h6>\n' +
    '                            </div>\n' +
    '\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </form>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '\n' +
    '        <!-- Gap -->\n' +
    '        <div class="row mb-5"></div>\n' +
    '    </div>\n' +
    '    <!-- Main Container Ends -->'
})
export class SalesDetailsComponent implements OnInit {
  saleDetails: any;

  constructor(public customerService: CustomerService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.getCustomerSalesDetails(localStorage.getItem('saledetailid'))
  }

  getCustomerSalesDetails(saleid) {
    this.customerService.getCustomerSalesDetails(saleid).subscribe((data) => {
      this.saleDetails = data;
      // this.receivedChildMessage = this.receivedChildMessage.ordersummaryservices;
      console.log(this.saleDetails)
      // localStorage.setItem('companyId', data['ParentCompanyID']);
    });
  }
}
