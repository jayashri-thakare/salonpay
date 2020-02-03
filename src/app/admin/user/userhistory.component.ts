import {Component, Input, OnInit} from '@angular/core';
import {ModalService} from '../../_modal/modal.service';
import {MessageService} from '../../message.service';
import {AdminService} from '../admin.service';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-userhistory',
  template: ' <section id="second-tab-group" class="tabgroup">\n' +

    '                           <div id="inner-tab3" *ngIf="adminService.showTab == 3">\n' +
    '                                <!-- History start -->\n' +
    '                                <!-- start -->\n' +
    '                                <div class="comm-headline-btn">\n' +
    '                                    <h3 class="main-comm-head m-0">\n' +
    '                                        History\n' +
    '                                        <i class="icon-question rig-icn" data-toggle="tooltip" data-placement="right"\n' +
    '                                            title="Merge Sales"></i>\n' +
    '                                    </h3>\n' +
    '                                    <div class="filter-container-up filter-container-grid">\n' +
    '                                        <div class="filter-container">\n' +
    '                                            <div class="form-group mb-0 mr-2">\n' +
    '                                                <!-- <form> -->\n' +
    '                                                    <input class="form-field" type="text" name="filter-searh" required>\n' +
    '                                                    <p class="form-label">Search</p>\n' +
    '                                                    <button class="search icon-search" type="submit"></button>\n' +
    '                                                <!-- </form> -->\n' +
    '                                            </div>\n' +
    '                                            <div class="yur-mail-rig filtdrp-status">\n' +
    '                                                <button type="button" class="button line grey status mr-2">\n' +
    '                                                    <i class="icon-fliter-list"></i>\n' +
    '                                                    <span>Sort by</span>\n' +
    '                                                </button>\n' +
    '                                                <ul class="status-list center">\n' +
    '                                                    <li class="drpFil">Sort by</li>\n' +
    '                                                    <li><a href="#">Ascending</a></li>\n' +
    '                                                    <li><a href="#">Descending</a></li>\n' +
    '                                                </ul>\n' +
    '                                            </div>\n' +
    '                                            <div class="yur-mail-rig filtdrp-status">\n' +
    '                                                <button type="button" class="button line grey status">\n' +
    '                                                    <i class="icon-filter"></i>\n' +
    '                                                    <span>Fliters</span>\n' +
    '                                                </button>\n' +
    '                                                <ul class="status-list center">\n' +
    '                                                    <li class="drpFil">Filters</li>\n' +
    '                                                    <li><a href="#">Upcoming</a></li>\n' +
    '                                                    <li><a href="#">Cancelled</a></li>\n' +
    '                                                </ul>\n' +
    '                                            </div>\n' +
    '\n' +
    '                                        </div>\n' +
    '                                    </div>\n' +
    '                                </div>\n' +
    '                                <!-- end -->\n' +
    '                                <div class="admin-comm-rig-scroll scrollbar">\n' +
    '                                    <!-- start -->\n' +
    '                                    <div class="table-bdy" *ngFor="let history of userhistory">\n' +
    '                                        <!-- start -->\n' +
    '                                        <div class="tab-top-head" >\n' +
    '                                            <h4 class="gridhead mb-0">{{history.eventName}}</h4>\n' +
    // '                                            <div class="yur-mail-rig">\n' +
    // '                                                <i class="icon-status1 status"></i>\n' +
    // '                                                <ul class="status-list">\n' +
    // '                                                    <li><i class="icon-edit"></i> Edit</li>\n' +
    // '                                                    <li class="delt"><i class="icon-delete"></i> Delete</li>\n' +
    // '                                                </ul>\n' +
    // '                                            </div>\n' +
    '                                        </div>\n' +
    '                                        <!-- end -->\n' +
    '\n' +
    '                                        <ul class="table-rw">\n' +
    '                                            <!-- start -->\n' +
    '                                            <!-- <li class="table-dta mr-0 w33 w-1440-50">\n' +
    '                                                <span>Service</span>\n' +
    '                                                <div class="table-prodt-list">\n' +
    '                                                    <p>Nail Polish, Pedicure</p> <i class="icon-info"\n' +
    '                                                        data-toggle="tooltip" data-placement="bottom" data-html="true"\n' +
    '                                                        title="<ul class=\'tooltip-list\'> <li>Face Cream</li> <li>Skin Toner</li> <li>Hair Lotion</li> </ul>"></i>\n' +
    '                                                </div>\n' +
    '                                            </li> -->\n' +
    '                                            <!-- end -->\n' +
    '                                            <!-- start -->\n' +
    '                                            <li class="table-dta mr-0 w33 w-1440-50">\n' +
    '                                                <span>Event Category</span>\n' +
    '                                                {{history.eventCategory}}\n' +
    '                                            </li>\n' +
    '                                            <!-- end -->\n' +
    '                                            <!-- start -->\n' +
    '                                            <li class="table-dta mr-0 w33 w-1440-50">\n' +
    '                                                <span>Date</span>\n' +
    '                                                {{history.date | date: \'M/d/yyyy\'}}\n' +
    '                                            </li>\n' +
    '                                            <!-- end -->\n' +
    '                                            <!-- start -->\n' +
    '                                            <li class="table-dta mr-0 w33 w-1440-50">\n' +
    '                                                <span>Time</span>\n' +
    '                                                {{history.time}}\n' +
    '                                            </li>\n' +
    '                                            <!-- end -->\n' +
    '                                            <!-- start -->\n' +
    '                                            <li class="table-dta mr-0 w33 w-1440-50">\n' +
    '                                                <span>Description</span>\n' +
    '                                                <p class="txt-elips">{{history.description}}</p>\n' +
    '                                            </li>\n' +
    '                                            <!-- end -->\n' +
    '                                            <!-- start -->\n' +
    '                                            <li class="table-dta mr-0 w33 w-1440-50">\n' +
    '                                                <div class="techi-user">\n' +
    '                                                    <div class="tech-user-img"><img src="../../../assets/img/histry-user.svg" alt="">\n' +
    '                                                    </div>\n' +
    '                                                    <div class="tech-usr-cont">\n' +
    '                                                        <p>User</p>\n' +
    '                                                        <h3>{{history.userName}}</h3>\n' +
    '                                                    </div>\n' +
    '                                                </div>\n' +
    '                                            </li>\n' +
    '                                            <!-- end -->\n' +
    '                                        </ul>\n' +
    '                                    </div>\n' +
    '                                    <!-- end -->\n' +
    '                                </div>\n' +
    '                                <!-- History end -->\n' +
    '                            </div>\n' +
    '                        </section>'
})

export class UserHistoryComponent implements OnInit {

  constructor(private modalService: ModalService,private messageService: MessageService, public adminService: AdminService,  private formBuilder: FormBuilder) { }
  @Input('userdetail') userlist: any;
  @Input('userhistory') userhistory: any;
  ngOnInit() {
    console.log(this.userlist);
  }
 }
