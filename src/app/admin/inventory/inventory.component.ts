import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { ModalService } from 'src/app/_modal/modal.service';
import { Subscription } from 'rxjs';
import { MessageService } from 'src/app/message.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})

export class AdminInventoryComponent implements OnInit {
  adminproduct: any;
  private subscription: Subscription;
  listview: boolean;
  gridview: boolean;
  arrayofselectedobj: Array<any>= [];
  updateProductForm: boolean;
  addProductForm: boolean;

  constructor(private messageService: MessageService, public AdminService: AdminService, public modalService: ModalService) { }

  ngOnInit() {
    this.gridview = true;
    this.getProduct();
    this.subscription = this.AdminService.on('call-product').subscribe(() => this.getProduct());
  }

  openModal(id: string) {
    this.modalService.open1(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  gridlistview(type){
    if(type == 'grid'){
      this.gridview = true;
      this.listview = false;
    }else if(type == 'list'){
      this.gridview = false;
      this.listview = true;
    }
  }

  getProduct() {
    this.AdminService.GetProductList().subscribe((data) => {
      this.adminproduct = data;
      this.AdminService.productData = this.adminproduct ;
    //   this.getsuppliers = this.userroles.result;
      console.log(this.adminproduct)
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
      this.updateProductForm = false;
      this.addProductForm = true;
    }else if(type == 'update'){
      this.updateProductForm = true;
      this.addProductForm = false;
    }
  }

  deleteProduct(selected_product) {
    debugger;
    // tslint:disable-next-line:triple-equals
    if (selected_product) {
      this.AdminService.deleteProduct(selected_product[0].productId).subscribe((data) => {
        console.log(data)
        this.getProduct();
        this.messageService.clear();
        this.messageService.add(data['result']);
      });
    }
  }

}
