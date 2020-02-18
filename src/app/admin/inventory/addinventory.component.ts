import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { ModalService } from '../../_modal/modal.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AdminService} from '../admin.service';
import {MessageService} from '../../message.service';
import { Subscription } from 'rxjs';
import { parse } from 'querystring';

@Component({
  selector: 'addproduct-modal',
  template: '<jw-modal id="add-product">\n' + 
    '    <div class="mobile-side" >\n' +
    '    <!-- common headline -->\n' +
    '    <h3 *ngIf="addProductForm" class="close-btn main-comm-head">\n' +
    '        <i class="icon-down-arrow com-arw" (click)="closeModal(\'add-product\')"></i>Add<span> Product</span>\n' +
    '    </h3>\n' +
    '    <h3 *ngIf="updateProductForm" class="close-btn main-comm-head">\n' +
    '        <i class="icon-down-arrow com-arw" (click)="closeModal(\'add-product\')"></i>Update<span> Product</span>\n' +
    '    </h3>\n' +
    '    <!-- common headline end -->\n' +
    '    <form *ngIf="addProductForm" [formGroup]="addinventoryForm" (ngSubmit)="addProduct(addinventoryForm.value)" class="popup-scrll">\n' +
    '\n' +
    '        <div class="filBox">\n' +
    '            <!-- start -->\n' +
    '            <div class="fill-box-in scrollbar">\n' +
    '                <!-- upload start -->\n' +
    '                <!-- <div class="avatar-upload inventory-image">\n' +
    '                    <div class="avatar-edit">\n' +
    '                        <input type=\'file\' id="imageUpload" accept=".png, .jpg, .jpeg" />\n' +
    '                        <label for="imageUpload"><i class="icon-uploading grd-icon"></i></label>\n' +
    '                    </div>\n' +
    '                    <div class="avatar-preview">\n' +
    '                        <div id="imagePreview" style="background-image: url(img/usr-profile.svg);">\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div> -->\n' +
    '                <!-- upload end -->\n' +
    '                <!-- start -->\n' +
    '                <div class="form-group mt-2">\n' +
    '                    <input type="text" id="serv-code" name="serv-code" formControlName="ProductName" [ngClass]="{ \'error\': submitted && f.ProductName.errors }" class="form-field"/>\n' +
    '                    <p class="form-label">Product Name</p>\n' +
    '                </div>\n' +
    '                <div class="form-group">\n' +
    '                    <input type="text" id="serv-code" name="serv-code" formControlName="SkuNo" class="form-field" [ngClass]="{ \'error\': submitted && f.SkuNo.errors }" />\n' +
    '                    <p class="form-label">SKU Number</p>\n' +
    '                </div>\n' +
    '                <div class="form-group">\n' +
    '                    <input type="text" id="serv-code" name="serv-code" formControlName="ModelNo" class="form-field"  [ngClass]="{ \'error\': submitted && f.ModelNo.errors }" />\n' +
    '                    <p class="form-label">Model Number</p>\n' +
    '                </div>\n' +
    '                <div class="form-textarea-group">\n' +
    '                    <textarea type="text" formControlName="Description" class="form-field" [ngClass]="{ \'error\': submitted && f.Description.errors }" ></textarea>\n' +
    '                    <p class="form-label">Description</p>\n' +
    '                </div>\n' +
    '                <div class="form-group">\n' +
    '                    <select id="service-name" formControlName="SupplierId" class="select-field form-field" name="service-name" [ngClass]="{ \'error\': submitted && f.SupplierId.errors }">\n' +
    '                        <option></option>\n' +
    '                        <option *ngFor="let supplier of productsuppliers" value="{{supplier.supplierId}}">{{supplier.supplierName}}</option>\n' +
    '                    </select>\n' +
    '                    <p class="form-label sel-blk">Supplier</p>\n' +
    '                </div>\n' +
    '                <div class="form-group">\n' +
    '                    <input type="number" id="def-time" formControlName="ProductCost" name="def-time" class="form-field" [ngClass]="{ \'error\': submitted && f.ProductCost.errors }" />\n' +
    '                    <p class="form-label">Product Cost</p>\n' +
    '                </div>\n' +
    '                <div class="form-group">\n' +
    '                    <input type="number" id="def-time" formControlName="QtyBought" name="def-time" class="form-field" [ngClass]="{ \'error\': submitted && f.ProductCost.errors }" />\n' +
    '                    <p class="form-label">Quantity Bought</p>\n' +
    '                </div>\n' +
    '                <div class="form-group">\n' +
    '                    <input type="number" id="def-time" formControlName="QtyInstock" name="def-time" class="form-field" [ngClass]="{ \'error\': submitted && f.ProductCost.errors }" />\n' +
    '                    <p class="form-label">Quantity InStock</p>\n' +
    '                </div>\n' +
    '                <div class="form-group">\n' +
    '                    <input type="number" id="serv-cost" name="serv-cost" formControlName="SalePrice" class="form-field" [ngClass]="{ \'error\': submitted && f.SalePrice.errors }" />\n' +
    '                    <p class="form-label">Sale Price</p>\n' +
    '                </div>\n' +
    '                <div class="form-group">\n' +
    '                    <input type="number" id="serv-cost" name="serv-cost" formControlName="ReOrderMin" class="form-field" [ngClass]="{ \'error\': submitted && f.ReOrderMin.errors }" />\n' +
    '                    <p class="form-label">Reorder Minimum</p>\n' +
    '                </div>\n' +
    '                <div class="form-group">\n' +
    '                    <select id="select-level" formControlName="Status" class="select-field form-field" name="select-level" [ngClass]="{ \'error\': submitted && f.Status.errors }">\n' +
    '                        <option></option>\n' +
    '                        <option value="true">Active</option>\n' +
    '                        <option value="false">InActive</option>\n' +
    '                    </select>\n' +
    '                    <p class="form-label sel-blk">Status</p>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '            <!-- end -->\n' +
    '        </div>\n' +
    '\n' +
    '        <div class="popBtn">\n' +
    '            <button class="button line close-btn" (click)="closeModal(\'add-product\')" type="button">Cancel</button>\n' +
    '            <button class="button" type="submit">Add</button>\n' +
    '        </div>\n' +
    '\n' +
    '    </form>\n' +
    '    <form *ngIf="updateProductForm" [formGroup]="updateinventoryForm" (ngSubmit)="updateProduct(updateinventoryForm.value)" class="popup-scrll">\n' +
    '\n' +
    '        <div class="filBox">\n' +
    '            <!-- start -->\n' +
    '            <div class="fill-box-in scrollbar" *ngFor="let product of arrayofselectedobj">\n' +
    '                <!-- upload start -->\n' +
    '                <!-- <div class="avatar-upload inventory-image">\n' +
    '                    <div class="avatar-edit">\n' +
    '                        <input type=\'file\' id="imageUpload" accept=".png, .jpg, .jpeg" />\n' +
    '                        <label for="imageUpload"><i class="icon-uploading grd-icon"></i></label>\n' +
    '                    </div>\n' +
    '                    <div class="avatar-preview">\n' +
    '                        <div id="imagePreview" style="background-image: url(img/usr-profile.svg);">\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div> -->\n' +
    '                <!-- upload end -->\n' +
    '                <!-- start -->\n' +
    '                <div class="form-group mt-2">\n' +
    '                    <input type="text" id="serv-code" name="serv-code" ngModel="{{product?.productName}}" formControlName="ProductName" class="form-field field--not-empty"/>\n' +
    '                    <p class="form-label">Product Name</p>\n' +
    '                </div>\n' +
    '                <div class="form-group">\n' +
    '                    <input type="text" id="serv-code" name="serv-code" ngModel="{{product?.skuNo}}" formControlName="SkuNo" class="form-field field--not-empty"/>\n' +
    '                    <p class="form-label">SKU Number</p>\n' +
    '                </div>\n' +
    '                <div class="form-group">\n' +
    '                    <input type="text" id="serv-code" name="serv-code" ngModel="{{product?.modelNo}}" formControlName="ModelNo" class="form-field field--not-empty" />\n' +
    '                    <p class="form-label">Model Number</p>\n' +
    '                </div>\n' +
    '                <div class="form-textarea-group">\n' +
    '                    <textarea type="text" formControlName="Description" class="form-field field--not-empty" ngModel="{{product?.description}}" ></textarea>\n' +
    '                    <p class="form-label">Description</p>\n' +
    '                </div>\n' +
    '                <div class="form-group">\n' +
    '                    <select id="service-name" ngModel="{{product?.supplierId}}" formControlName="SupplierId" class="select-field form-field field--not-empty" name="service-name" >\n' +
    '                        <option></option>\n' +
    '                        <option *ngFor="let supplier of productsuppliers" value="{{supplier.supplierId}}">{{supplier.supplierName}}</option>\n' +
    '                    </select>\n' +
    '                    <p class="form-label sel-blk">Supplier</p>\n' +
    '                </div>\n' +
    '                <div class="form-group">\n' +
    '                    <input type="number" id="def-time" formControlName="ProductCost" ngModel="{{product?.productCost}}" name="def-time" class="form-field field--not-empty" />\n' +
    '                    <p class="form-label">Product Cost</p>\n' +
    '                </div>\n' +
    '                <div class="form-group">\n' +
    '                    <input type="number" id="def-time" formControlName="QtyBought" name="def-time" ngModel="{{product?.qtyBought}}" class="form-field" [ngClass]="{ \'error\': submitted && f.ProductCost.errors }" />\n' +
    '                    <p class="form-label">Quantity Bought</p>\n' +
    '                </div>\n' +
    '                <div class="form-group">\n' +
    '                    <input type="number" id="def-time" formControlName="QtyInstock" name="def-time" ngModel="{{product?.qtyInstock}}" class="form-field" [ngClass]="{ \'error\': submitted && f.ProductCost.errors }" />\n' +
    '                    <p class="form-label">Quantity InStock</p>\n' +
    '                </div>\n' +
    '                <div class="form-group">\n' +
    '                    <input type="number" id="serv-cost" name="serv-cost" ngModel="{{product?.salePrice}}" formControlName="SalePrice" class="form-field field--not-empty" />\n' +
    '                    <p class="form-label">Sale Price</p>\n' +
    '                </div>\n' +
    '                <div class="form-group">\n' +
    '                    <input type="number" id="serv-cost" name="serv-cost" ngModel="{{product?.reOrderMin}}" formControlName="ReOrderMin" class="form-field field--not-empty"/>\n' +
    '                    <p class="form-label">Reorder Minimum</p>\n' +
    '                </div>\n' +
    '                <div class="form-group">\n' +
    '                    <select id="select-level" formControlName="Status" ngModel="{{product?.status}}" class="select-field form-field field--not-empty" name="select-level" >\n' +
    '                        <option></option>\n' +
    '                        <option value="true">Active</option>\n' +
    '                        <option value="false">InActive</option>\n' +
    '                    </select>\n' +
    '                    <p class="form-label sel-blk">Status</p>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '            <!-- end -->\n' +
    '        </div>\n' +
    '\n' +
    '        <div class="popBtn">\n' +
    '            <button class="button line close-btn" (click)="closeModal(\'add-product\')" type="button">Cancel</button>\n' +
    '            <button class="button" type="submit">Update</button>\n' +
    '        </div>\n' +
    '\n' +
    '    </form>\n' +
    '\n' +
    '</div>\n' +
    '</jw-modal>'
})
export class AddInventoryComponent implements OnInit {
  addinventoryForm: FormGroup;
  updateinventoryForm: FormGroup;
  control: FormControl;
  submitted = false;
  userroles: any;
  productsuppliers: any;
  @Input('addAdmin') addProductForm: any;
  @Input('updateAdmin') updateProductForm: any;
  @Input('productobj') arrayofselectedobj: any;
  constructor(public AdminService: AdminService, private formBuilder: FormBuilder, private modalService: ModalService, private router: Router, private messageService: MessageService) { }

  get f() {
    return this.addinventoryForm.controls;
  }
  get f1() {
    return this.updateinventoryForm.controls;
  }
  ngOnInit() {
    this.getSuppliers();
    this.addinventoryForm = this.formBuilder.group({
        ProductName: ['', [Validators.required]],
        SkuNo:['', [Validators.required]],
        ModelNo:['', [Validators.required]],
        Description: ['', [Validators.required]],
        SupplierId: ['', [Validators.required]],
        ProductCost: ['', [Validators.required]],
        SalePrice: ['', [Validators.required]],
        ReOrderMin: ['', [Validators.required]],
        Status: ['', [Validators.required]],
        QtyBought: ['', [Validators.required]],
        QtyInstock: ['', [Validators.required]]
    });
    this.updateinventoryForm = this.formBuilder.group({
      ProductName: [''],
      SkuNo:[''],
      ModelNo:[''],
      Description: [''],
      SupplierId: [''],
      ProductCost: [''],
      SalePrice: [''],
      ReOrderMin: [''],
      Status: [''],
      QtyBought: [''],
      QtyInstock: ['']
  });
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  getSuppliers() {
    this.AdminService.GetSupplierList().subscribe((data) => {
      this.productsuppliers = data;
    //   this.getsuppliers = this.userroles.result;
      console.log(this.productsuppliers)
      // localStorage.setItem('companyId', data['ParentCompanyID']);
    });
  }

  addProduct(Admin) {
    debugger;
    console.log(Admin)
    Admin.SupplierId = parseInt(Admin.SupplierId)
    Admin.Status = JSON.parse(Admin.Status)
    // tslint:disable-next-line:triple-equals
    if (this.addinventoryForm.status == 'VALID') {
      this.AdminService.add_inventory(Admin).subscribe((data) => {
        this.AdminService.publish('call-product');
        this.messageService.clear();
        this.messageService.add('Product added successfully.')
        this.closeModal('add-product');
      });
    } else {
      console.log(Admin, this.addinventoryForm.status);
      this.submitted = true;
      if (this.addinventoryForm.invalid) {
        return;
      }
    }
  }

  updateProduct(Admin) {
    debugger;
    console.log(Admin)
    Admin.SupplierId = parseInt(Admin.SupplierId)
    Admin.ProductCost = parseInt(Admin.ProductCost)
    Admin.SalePrice = parseInt(Admin.SalePrice)
    Admin.ReOrderMin = parseInt(Admin.ReOrderMin)
    Admin.Status = JSON.parse(Admin.Status)
    Admin.ProductId = parseInt(this.arrayofselectedobj[0].productId)
    // tslint:disable-next-line:triple-equals
    if (this.updateinventoryForm.status == 'VALID') {
      this.AdminService.add_inventory(Admin).subscribe((data) => {
        this.AdminService.publish('call-product');
        this.messageService.clear();
        this.messageService.add('Product updated successfully.')
        this.closeModal('add-product');
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
