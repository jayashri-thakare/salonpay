import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
import {SalesService} from './sales.service';
import {MessageService} from "../message.service";

@Component({
  selector: 'salelist',
  template: '<!-- Main Container Starts -->\n' +
    '        <div class="mainContainer ml-0">\n' +
    '\n' +
    '            <div class="comm-headline-btn">\n' +
    '                <h3 class="main-comm-head m-0">\n' +
    '                    Sales\n' +
    '                    <i class="icon-question rig-icn" data-toggle="tooltip" title=""\n' +
    '                        data-original-title="Merge Sales"></i>\n' +
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
    '                            <ul class="status-list center">\n' +
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
    '                            <ul class="status-list center">\n' +
    '                                <li class="drpFil">Filters</li>\n' +
    '                                <li><a href="#">Open Sales</a></li>\n' +
    '                            </ul>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '            <div class="f-row f-3 f-1300-2 f-640-1">\n' +
    '                <div class="f-col" *ngFor="let sale of SalesList">\n' +
    '                    <!-- start -->\n' +
    '                    <div class="app-grid-box" *ngFor="let service of sale.servicesCommissionList">\n' +
    '                        <!-- start -->\n' +
    '                        <div class="app-pad-box app-pad-sales">\n' +
    '                            <div class="app-pad-top">\n' +
    '                                <!-- In order to add Badge Status you need to add (badge-box) class like below example and refer elements.html -->\n' +
    '                                <h4 class="gridhead badge-box">{{service.serviceName | slice:0:17}} <span\n' +
    '                                        class="ml-2 tech-badge inactive">Close</span>\n' +
    '                                </h4>\n' +
    '                                <p class="girdpara">{{service.technicianName}}</p>\n' +
    '                            </div>\n' +
    '                            <div class="ico-w-btn">\n' +
    '                                <a href="#" class="icon-share"></a>\n' +
    '                                <a (click)="commissionsplit(sale.saleId)" class="button line orange">Commission Split</a>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                        <!-- end -->\n' +
    '                        <!-- start -->\n' +
    '                        <div class="app-pad-box sale-fle50">\n' +
    '                            <!-- start -->\n' +
    '                            <div class="techi-user">\n' +
    '                                <i class="icon-calender"></i>\n' +
    '                                <div class="tech-usr-cont">\n' +
    '                                    <p>Date</p>\n' +
    '                                    <h3>{{sale.date | date:"M/d/yy"}}</h3>\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '                            <!-- end -->\n' +
    '                            <!-- start -->\n' +
    '                            <div class="techi-user">\n' +
    '                                <i class="icon-clock"></i>\n' +
    '                                <div class="tech-usr-cont">\n' +
    '                                    <p>Time</p>\n' +
    '                                    <h3>{{sale.time}}</h3>\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '                            <!-- end -->\n' +
    '                            <!-- start -->\n' +
    '                            <div class="techi-user">\n' +
    '                                <i class="icon-cart"></i>\n' +
    '                                <div class="tech-usr-cont">\n' +
    '                                    <p>Sales Amount</p>\n' +
    '                                    <h3>$ {{sale.salesAmount}}</h3>\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '                            <!-- end -->\n' +
    '                            <!-- start -->\n' +
    '                            <div class="techi-user">\n' +
    '                                <i class="icon-money"></i>\n' +
    '                                <div class="tech-usr-cont">\n' +
    '                                    <p>Tip Amount</p>\n' +
    '                                    <h3>$ {{sale.tipAmount}}</h3>\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '                            <!-- end -->\n' +
    '                            <!-- start -->\n' +
    '                            <div class="techi-user">\n' +
    '                                <div class="tech-user-img"><img src="assets/img/user.svg" alt=""></div>\n' +
    '                                <div class="tech-usr-cont">\n' +
    '                                    <p>Technician</p>\n' +
    '                                    <h3>{{service.technicianName}}</h3>\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '                            <!-- end -->\n' +
    '                            <!-- start -->\n' +
    '                            <div class="techi-user">\n' +
    '                                <i class="icon-reward"></i>\n' +
    '                                <div class="tech-usr-cont">\n' +
    '                                    <p>Rewards</p>\n' +
    '                                    <h3>{{sale.reward}}</h3>\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '                            <!-- end -->\n' +
    '                        </div>\n' +
    '                        <!-- end -->\n' +
    '                    </div>\n' +
    '                    <!-- end -->\n' +
    '                </div>\n' +
    '            </div>\n' +
    '\n' +
    '        </div>\n' +
    '        <!-- Main Container Ends -->'
})
export class SalesListComponent implements OnInit {
    SalesList: any;

  constructor(public salesService: SalesService, private formBuilder: FormBuilder, public router: Router, public messageService: MessageService) { }

  ngOnInit() {
    this.getSalesDetail();
  }

  getSalesDetail() {
    this.salesService.getSalesDetail().subscribe((data) => {
      this.SalesList = data;
      // this.customerProfile = this.customerProfile.result;
      console.log(this.SalesList)
      // localStorage.setItem('companyId', data['ParentCompanyID']);
    });
  }

  commissionsplit(saleid){
      localStorage.setItem('saledetailid',saleid);
      this.router.navigate(['/saleslistcommissionsplit']);
  }
}
