import { Component, OnInit } from '@angular/core';
import {SalesService} from '../sales.service';
import { MessageService } from 'src/app/message.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-newsales',
  templateUrl: './newsales.component.html'
})

export class NewSalesComponent implements OnInit {
  receivedChildMessage: any;
  customerProfile: any;
  orderIdOfSale: string;
  Service= {};
  createservice: any;

  constructor( private salesService: SalesService, public messageService: MessageService, public router: Router) { }

  ngOnInit() {
    this.getCustomerDetail();
    this.orderIdOfSale = localStorage.getItem('orderId');
    this.getCustomerServices();
  }

  getMessage(message) {
    this.receivedChildMessage = message;
    console.log(this.receivedChildMessage)
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
      this.receivedChildMessage = data;
      this.receivedChildMessage = this.receivedChildMessage.ordersummaryservices;
      console.log(this.receivedChildMessage)
      // localStorage.setItem('companyId', data['ParentCompanyID']);
    });
  }

  deleteSelectedServices(serviceid, addonserviceid){
    console.log(this.receivedChildMessage)
    if(serviceid){
      for(let i=0;i< this.receivedChildMessage.length;i++){
        if(this.receivedChildMessage[i]['serviceId'] == serviceid){
          this.receivedChildMessage.splice(this.receivedChildMessage.indexOf(serviceid), 1)
        }
      }
    }else if(addonserviceid){
      for(let i=0;i< this.receivedChildMessage.length;i++){
        var count=-1;
        for(let j=0;j< this.receivedChildMessage[i]['addonServices'].length;j++){
          count=count+1;
          if(this.receivedChildMessage[i]['addonServices'][j]['addOnServiceId'] == addonserviceid){
            this.receivedChildMessage[i]['addonServices'].splice(count, 1) //this.receivedChildMessage[i]['addonServices'].indexOf(addonserviceid)
            break;
          }
        }
      }
    }
  }

  createSaleService() {
    this.Service['CustomerId'] = parseInt(localStorage.getItem('customerId'));
    this.Service['SaleId'] = parseInt(localStorage.getItem('orderId'));
    this.Service['ordersummaryservices'] = this.receivedChildMessage;
    this.salesService.create_sales_service(this.Service).subscribe((data) => {
      this.router.navigate(['/transactionproduct']);
      this.messageService.clear();
      this.messageService.add('Sales Services added Successfully.')
      this.createservice = data;
    });
  }

}
