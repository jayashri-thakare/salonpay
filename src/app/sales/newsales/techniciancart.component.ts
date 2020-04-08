import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { AdminService } from 'src/app/admin/admin.service';
import { SalesService } from '../sales.service';

@Component({
  selector: 'modal-technician',
  template:' <!--  Modal Starts -->\n' +
    '    <div class="modal fade" id="suggestedTechPopup">\n' +
    '        <div class="modal-dialog big-window">\n' +
    '            <div class="modal-content">\n' +
    '                <div class="modalCancel" data-dismiss="modal"><i class="icon-cir-plus"></i></div>\n' +
    '\n' +
    '                <div class="scrollbar addon-service-box">\n' +
    '                    <h2 class="modal-title mb-4">Suggested Technicians</h2>\n' +
    '                    <div class="f-row f-3 f-1200-2 f-640-1">\n' +
    '                        <div class="f-col">\n' +
    '                            <!-- start -->\n' +
    '                            <div class="techi-box">\n' +
    '                                <div class="techi-top">\n' +
    '                                    <div class="techi-cont">\n' +
    '                                        <p>Last Service</p>\n' +
    '                                        <h3>Monday 21st @ 1:50 PM</h3>\n' +
    '                                    </div>\n' +
    '                                    <span class="tech-prio">1<sup>st</sup> In Line</span>\n' +
    '                                </div>\n' +
    '                                <div class="techi-top">\n' +
    '                                    <div class="techi-user">\n' +
    '                                        <div class="tech-user-img"><img src="img/user2.svg" alt=""></div>\n' +
    '                                        <div class="tech-usr-cont">\n' +
    '                                            <p>Technician</p>\n' +
    '                                            <h3>Ira Membrit</h3>\n' +
    '                                        </div>\n' +
    '                                    </div>\n' +
    '                                    <div class="main-selt">\n' +
    '                                        <input type="checkbox" id="technician-1" name="technician-1" required>\n' +
    '                                        <label for="technician-1">Select</label>\n' +
    '                                    </div>\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '                            <!-- end -->\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '\n' +
    '                    <div class="search-tech-box">\n' +
    '                        <h2 class="modal-title mb-4">Select Technicians</h2>\n' +
    '                        <div class="form-group">\n' +
    '                            <form>\n' +
    '                                <input class="form-field" type="text" name="filter-searh" required>\n' +
    '                                <p class="form-label">Search</p>\n' +
    '                                <button class="search icon-search" type="submit"></button>\n' +
    '                            </form>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '\n' +
    '                    <div class="f-row f-3 f-1200-2 f-640-1">\n' +
    '                        <div class="f-col" *ngFor="let tech of technicianlist">\n' +
    '                            <!-- start -->\n' +
    '                            <div class="com-shad">\n' +
    '                                <div class="user-det">\n' +
    '                                    <div class="user-img"><img src="img/user.svg" alt=""></div>\n' +
    '                                    <div class="usr-name">\n' +
    '                                        <h3>{{tech.firstName}}{{tech.lastName}}<span>Haircut</span></h3>\n' +
    '                                    </div>\n' +
    '                                </div>\n' +
    '                                <div class="main-selt">\n' +
    '                                    <input type="checkbox" id="technician-4" name="technician-4" required>\n' +
    '                                    <label for="technician-4">Select</label>\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '                            <!-- end -->\n' +
    '                        </div>\n' +
    '\n' +
    '                    </div>\n' +
    '\n' +
    '                </div>\n' +
    '\n' +
    '                <div class="popBtn">\n' +
    '                    <button class="button line" type="button" class="modalCancel" data-dismiss="modal">Cancel</button>\n' +
    '                    <button class="button" type="submit" class="modalCancel" data-dismiss="modal">Apply</button>\n' +
    '                </div>\n' +
    '\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '    <!--  Modal Ends -->\n'
})
export class TechnicianCartComponent implements OnInit {
  technicianlist: any;
    orderIdOfSale: string;

  constructor(private salesService: SalesService, public adminService:AdminService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.orderIdOfSale = localStorage.getItem('orderId');
    this.getCustomerServiceTechnicians();
  }

  getCustomerServiceTechnicians() {
    this.salesService.getCustomerServiceTechnicians(this.orderIdOfSale).subscribe((data) => {
      this.technicianlist = data;
      // this.technicianlist = this.technicianlist[0]['technicians'];
      console.log(this.technicianlist)
      // localStorage.setItem('companyId', data['ParentCompanyID']);
    });
  }

}
