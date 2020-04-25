import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { AdminService } from 'src/app/admin/admin.service';
import { SalesService } from '../sales.service';

@Component({
  selector: 'app-frequentlyproduct',
  template: '<div class="row mb-5">\n' +
    '                    <div class="col-12">\n' +
    '                        <div class="comm-headline-btn">\n' +
    '                            <h4 class="hdn2 m-0">Frequently Purchased Products</h4>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                    <div class="col-12">\n' +
    '                        <div class="f-row f-3 f-1300-2 f-640-1">\n' +
    '                            <div class="f-col" *ngFor="let product of frequentlyProduct">\n' +
    '                                <!-- start -->\n' +
    '                                <div class="techi-box">\n' +
    '                                    <div class="techi-top">\n' +
    '                                        <div class="user-det">\n' +
    '                                            <i class="icon-haircut prodt-ico"></i>\n' +
    '                                            <div class="usr-name">\n' +
    '                                                <h3><span>{{product.productName}}</span>$ {{product.productCost | number:\'1.2-2\'}}</h3>\n' +
    '                                            </div>\n' +
    '                                        </div>\n' +
    '                                        <div class="main-selt">\n' +
    '                                            <input type="checkbox" id="freq-{{product?.productId}}" name="freq-{{product?.productId}}" (click)="selectedServices(product, $event)" required>\n' +
    '                                            <label for="freq-{{product?.productId}}">Select</label>\n' +
    '                                        </div>\n' +
    '                                    </div>\n' +
    '                                    <div class="techi-top techi-top-qty">\n' +
    '                                        <h5 class="prodt-ct">Quantity</h5>\n' +
    '                                        <div class="container-count-box">\n' +
    '                                            <button class="count-down" (click)="productquantity(\'count-down\');quantityselectionofproduct(product.productId)">-</button>\n' +
    '                                            <span class="container-count">00</span>\n' +
    '                                            <button class="count-up" (click)="productquantity(\'count-up\');quantityselectionofproduct(product.productId)">+</button>\n' +
    '                                        </div>\n' +
    '                                    </div>\n' +
    '                                </div>\n' +
    '                                <!-- end -->\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>'
})
export class FrequentlyAddedProductComponent implements OnInit {
  frequentlyProduct: any;
  arrayofselectedproduct: Array<any>=[];
  quantity: any;
  @Output() messageToEmit = new EventEmitter<string>();

  constructor(private salesService: SalesService, public adminService:AdminService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.quantity = 0;
    this.getFrequentlyProductDetail();
  }

  getFrequentlyProductDetail() {
    this.salesService.getFrequentlyProductDetails().subscribe((data) => {
      this.frequentlyProduct = data;
      // this.customerProfile = this.customerProfile.result;
      console.log(this.frequentlyProduct)
      // localStorage.setItem('companyId', data['ParentCompanyID']);
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
