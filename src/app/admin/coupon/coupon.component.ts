import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { ModalService } from 'src/app/_modal/modal.service';
import {Subscription} from 'rxjs';
import {MessageService} from '../../message.service';

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.css']
})

export class AdminCouponComponent implements OnInit {
  public couponList: any;
  private subscription: Subscription;
  arrayofselectedobj: Array<any> = [];
  public grid: boolean;
  public gridview: boolean;
  public listview: boolean;

  constructor(public adminService: AdminService, public modalService: ModalService, public messageService: MessageService) { }

  ngOnInit() {
    this.getCouponList();
    this.grid = true;
    this.gridview = true;
    this.subscription = this.adminService.on('call-coupon').subscribe(() => this.getCouponList());
  }
  gridlistview(type) {
    if (type == 'grid') {
      this.gridview = true;
      this.listview = false;
    } else if (type == 'list') {
      this.gridview = false;
      this.listview = true;
    }
  }
    showGrid() {
    this.grid = !this.grid;
  }

  selectproductobj(selected_obj){
    var index = this.arrayofselectedobj.indexOf(selected_obj);
    if(index<0){
      this.arrayofselectedobj.splice(index, 1);
      this.arrayofselectedobj.push(selected_obj);
    }
    console.log(this.arrayofselectedobj)
  }
  getCouponList() {
    this.adminService.getCouponList().subscribe((data) => {
      this.couponList = data['list'];
    });
  }
  openModal(id: string) {
    this.modalService.open1(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  deleteCoupon(coupon) {
    this.adminService.deleteCoupon(coupon[0].couponId).subscribe((data) => {
      this.getCouponList();
      this.messageService.clear();
      this.messageService.add('Coupon deleted successfully.');
    });
  }

}
