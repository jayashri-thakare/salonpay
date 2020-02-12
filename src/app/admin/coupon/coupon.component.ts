import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { ModalService } from 'src/app/_modal/modal.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.css']
})

export class AdminCouponComponent implements OnInit {
  private couponList: any;
  private subscription: Subscription;

  constructor(public adminService: AdminService, public modalService: ModalService) { }

  ngOnInit() {
    this.getCouponList();
    this.subscription = this.adminService.on('call-coupon').subscribe(() => this.getCouponList());
  }

  getCouponList() {
    this.adminService.getCouponList().subscribe((data) => {
      this.couponList = data['list'];
    });
  }
  openModal(id: string) {
    debugger
    this.modalService.open1(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

}
