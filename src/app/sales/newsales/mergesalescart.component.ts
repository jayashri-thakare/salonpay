import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { AdminService } from 'src/app/admin/admin.service';
import { SalesService } from '../sales.service';
import { MessageService } from 'src/app/message.service';

@Component({
  selector: 'merege-sales',
  template:' <!-- Main Container Starts -->\n' +
    '        <div class="mainContainer m-0">\n' +
    '            <div class="comm-headline-btn">\n' +
    '                <h3 class="main-comm-head m-0">\n' +
    '                    <a href="./transaction-customer-cart.html"><i class="icon-down-arrow com-arw"></i></a>\n' +
    '                    Merge <span>Sales</span>\n' +
    '                    <i class="icon-question rig-icn" data-toggle="tooltip" title="Merge Sales"></i>\n' +
    '                </h3>\n' +
    '                <div class="filter-container-up">\n' +
    '                    <div class="filter-container">\n' +
    '                        <div class="form-group mb-0 mr-2">\n' +
    '                            <form>\n' +
    '                                <input class="form-field" type="text" name="filter-searh" required>\n' +
    '                                <p class="form-label">Search</p>\n' +
    '                                <button class="search icon-search" type="submit"></button>\n' +
    '                            </form>\n' +
    '                        </div>\n' +
    '                        <div class="yur-mail-rig filtdrp-status">\n' +
    '                            <button type="button" class="button line grey status mr-2">\n' +
    '                                <i class="icon-fliter-list"></i>\n' +
    '                                <span>Sort by</span>\n' +
    '                            </button>\n' +
    '                            <ul class="status-list">\n' +
    '                                <li class="drpFil">Sort by</li>\n' +
    '                                <li><a href="#">Ascending</a></li>\n' +
    '                                <li><a href="#">Descending</a></li>\n' +
    '                            </ul>\n' +
    '                        </div>\n' +
    '                        <div class="yur-mail-rig filtdrp-status">\n' +
    '                            <button type="button" class="button line grey status">\n' +
    '                                <i class="icon-filter"></i>\n' +
    '                                <span>Fliters</span>\n' +
    '                            </button>\n' +
    '                            <ul class="status-list">\n' +
    '                                <li class="drpFil">Filters</li>\n' +
    '                                <li><a href="#">Upcoming</a></li>\n' +
    '                                <li><a href="#">Cancelled</a></li>\n' +
    '                            </ul>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '\n' +
    '            <div class="mergeSalesBox scrollbar">\n' +
    '                <div class="f-row f-3 f-1200-2 f-640-1">\n' +
    '                    <div class="f-col" *ngFor="let sales of mergesalecart;let i=index;">\n' +
    '                        <!-- start -->\n' +
    '                        <div class="techi-box" *ngFor="let services of mergesalecart[i].ordersummaryservices">\n' +
    '                            <div class="techi-top">\n' +
    '                                <div class="user-det">\n' +
    '                                    <i class="icon-haircut prodt-ico"></i>\n' +
    '                                    <div class="usr-name">\n' +
    '                                        <h3><span>{{services.serviceName}}</span>$ {{services.serviceCost}}</h3>\n' +
    '                                    </div>\n' +
    '                                </div>\n' +
    '                                <div class="main-selt">\n' +
    '                                    <input type="checkbox" (click)="mergesale(sales, $event)" id="{{services.serviceId}}" name="{{services.serviceId}}" required>\n' +
    '                                    <label for="{{services.serviceId}}">Select</label>\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '                            <div class="techi-top">\n' +
    '                                <h5 class="prodt-ct">{{sales.saleId}}</h5>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                        <!-- end -->\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '\n' +
    '            </div>\n' +
    '            <div class="popBtn mb-4">\n' +
    '                <a (click)="movetotransactioncart()" class="button line">Cancel</a>\n' +
    '                <a (click)="movetotransactioncart();mergesaletocurrent();" class="button">Merge Sales</a>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <!-- Main Container Ends -->'
})
export class MeregeSalesCartComponent implements OnInit {
     mergesalecart: any;
    arrayofselectedobj: Array<any> = [];
    mergesaleobj= {};
    arrayofsaleid: Array<any> = [];

  constructor(public messageService: MessageService , private salesService: SalesService, public adminService:AdminService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.getCustomerMergeSales();
  }

  getCustomerMergeSales() {
    this.salesService.getCustomerMergeSales().subscribe((data) => {
      this.mergesalecart = data;
      this.mergesalecart = this.mergesalecart.listroot;
      // localStorage.setItem('companyId', data['ParentCompanyID']);
    });
  }

  mergesale(sale, event){
      debugger;
    var index = this.arrayofselectedobj.indexOf(sale);
    if(index<0 && event.currentTarget.checked == true){
        this.arrayofselectedobj.push(sale);
        this.arrayofsaleid.push(sale.saleId);
    }else if(event.currentTarget.checked == false){
        this.arrayofselectedobj.splice(index, 1);
        this.arrayofsaleid.splice(index, 1);
    }
    this.salesService.arrayofselectedobj = this.arrayofselectedobj;
    console.log(this.arrayofselectedobj)
  }

  movetotransactioncart(){
      if(this.arrayofselectedobj.length == 0){
        this.router.navigate(['/transactioncart']);
        this.messageService.clear();
        // this.messageService.add('No Sale Merged')
      }else if(this.arrayofselectedobj.length > 0){
        this.router.navigate(['/transactioncart']);
        this.messageService.clear();
        this.messageService.add('Sales Merged Successfully.')
      }
  }

  mergesaletocurrent(){
      this.mergesaleobj['currentsaleid'] = parseInt(localStorage.getItem('orderId'));
      this.mergesaleobj['saleid'] = this.arrayofsaleid;
      this.salesService.create_merge_sales(this.mergesaleobj).subscribe((data) => {
        // this.router.navigate(['/transactiontipadjustment']);
        this.messageService.clear();
        // this.messageService.add('Sales Completed Successfully.')
      });
    }

}
