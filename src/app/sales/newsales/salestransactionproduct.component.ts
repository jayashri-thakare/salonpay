import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { AdminService } from 'src/app/admin/admin.service';
import { SalesService } from '../sales.service';

@Component({
  selector: 'app-transactionproduct',
  template: '<div class="row mb-5">\n' +
  '              <div class="col-12">\n' +
  '                  <div class="comm-headline-btn">\n' +
  '                      <h4 class="hdn2 m-0">Select Products</h4>\n' +
  '                      <div class="form-group search-group mb-0">\n' +
  '                          <form>\n' +
  '                              <input class="form-field" type="text" name="filter-searh" required>\n' +
  '                              <p class="form-label">Search</p>\n' +
  '                              <button class="search icon-search" type="submit"></button>\n' +
  '                          </form>\n' +
  '                      </div>\n' +
  '                  </div>\n' +
  '              </div>\n' +
  '              <div class="col-12">\n' +
  '                  <div class="tab-2">\n' +
  '                      <div class="service-nav-box mCustomScrollbar _mCS_1">\n' +
  '                        <div id="mCSB_1" class="mCustomScrollBox mCS-dark mCSB_horizontal mCSB_inside" style="max-height: none;" tabindex="0">\n' +
  '                            <div id="mCSB_1_container" class="mCSB_container" dir="ltr">\n' +
  '                                <ul class="nav nav-pills">\n' +
  '                              <li class="nav-item" *ngFor="let productlist of productList">\n' +
  '                                  <a class="nav-link" data-toggle="pill" (click)="getAddedProductList(productlist.productCategoryId)" href="#tab1">{{productlist?.productCategoryType}}</a>\n' +
  '                              </li>\n' +
  '                                </ul>\n' +
  '                            </div>\n' +
  '                        </div>\n' +
  '                      </div>\n' +
  '\n' +
  '                      <!-- Tab panes -->\n' +
  '                      <div class="service-nav-pane-box">\n' +
  '                          <div class="tab-content">\n' +
  '                              <div class="tab-pane fade show active" id="tab1">\n' +
  '                                  <!-- Tab 1 Starts -->\n' +
  '                                  <div class="f-row f-3 f-1300-2 f-640-1">\n' +
  '                                      <div class="f-col" *ngFor="let addedproduct of addedproductList">\n' +
  '                                          <!-- start -->\n' +
  '                                          <div class="techi-box">\n' +
  '                                              <div class="techi-top">\n' +
  '                                                  <div class="user-det">\n' +
  '                                                      <i class="icon-haircut prodt-ico"></i>\n' +
  '                                                      <div class="usr-name">\n' +
  '                                                          <h3><span>{{addedproduct?.productName}}</span>$ {{addedproduct?.productCost}}</h3>\n' +
  '                                                      </div>\n' +
  '                                                  </div>\n' +
  '                                                  <div class="main-selt">\n' +
  '                                                      <input type="checkbox" id="{{addedproduct?.productId}}" name="{{addedproduct?.productId}}" (click)="selectedServices(addedproduct, $event)" required>\n' +
  '                                                      <label for="{{addedproduct?.productId}}">Select</label>\n' +
  '                                                  </div>\n' +
  '                                              </div>\n' +
  '                                        <div class="techi-top techi-top-qty">\n' +
    '                                            <h5 class="prodt-ct">Quantity</h5>\n' +
    '                                            <div class="container-count-box">\n' +
    '                                                <button class="count-down" (click)="productquantity(\'count-down\');quantityselectionofproduct(addedproduct.productId)">-</button>\n' +
    '                                                <span class="container-count">{{this.quantity}}</span>\n' +
    '                                                <button class="count-up" (click)="productquantity(\'count-up\');quantityselectionofproduct(addedproduct.productId)">+</button>\n' +
    '                                            </div>\n' +
    '                                        </div>\n' +
  '                                          </div>\n' +
  '                                          <!-- end -->\n' +
  '                                      </div>\n' +
  '                                  </div>\n' +
  '                                  <!-- Tab 1 Ends -->\n' +
  '                              </div>\n' +
  '                          </div>\n' +
  '                      </div>\n' +
  '                  </div>\n' +
  '              </div>\n' +
  '\n' +
  '          </div>'
})
export class SalesTransactionProductComponent implements OnInit {
    quantity: any;
    result: any;
    productList: any;
    addedproductList: any;
    arrayofselectedproduct: Array<any>=[];
    @Output() messageToEmit = new EventEmitter<string>();
  constructor(private salesService: SalesService, public adminService:AdminService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.quantity = 0;
    this.getProductList();
  }

  getProductList() {
    this.salesService.GetProductList().subscribe((res) => {
      this.result = res ;
      this.productList = this.result;
      console.log(this.productList)
      this.getAddedProductList(this.result[0]['productCategoryId']);
    });
  }

  getAddedProductList(productid) {
    this.salesService.getProductByCategoryId(productid).subscribe((res) => {
      this.addedproductList = res;
      console.log(this.addedproductList)
    });
  }

  selectedServices(selected_product, event){
    var index = this.arrayofselectedproduct.indexOf(selected_product);
    if(index<0 && event.currentTarget.checked){
      this.arrayofselectedproduct.push(selected_product);
    }else{
      this.arrayofselectedproduct.splice(index, 1);
    }
    console.log(this.arrayofselectedproduct)
    this.sendMessageToParent(this.arrayofselectedproduct)
  }

  quantityselectionofproduct(productid){
    for(let i=0; i<this.arrayofselectedproduct.length;i++){
      if(productid == this.arrayofselectedproduct[i]['productId']){
        this.arrayofselectedproduct[i]['quantity'] = this.quantity;
      }
    }
    console.log(this.arrayofselectedproduct)
    this.sendMessageToParent(this.arrayofselectedproduct)
  }
  sendMessageToParent(message) {
    console.log(message)
    this.messageToEmit.emit(message)
  }

  productquantity(type){
    if(type == 'count-down'){
      this.quantity--;
    }else if(type == 'count-up'){
      this.quantity++;
    }
    console.log(this.quantity)
  }

}
