import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { ModalService } from 'src/app/_modal/modal.service';

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.css']
})

export class AdminCouponComponent implements OnInit {

  constructor(public AdminService: AdminService, public modalService: ModalService) { }

  ngOnInit() {
  }

  openModal(id: string) {
    this.modalService.open1(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

}