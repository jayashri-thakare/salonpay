import {Component, Input, OnInit, EventEmitter, Output} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { AppointmentService } from './appointment.service';
import { ModalService } from '../_modal/modal.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-appointmentlist',
  template: '<!-- Main Container Starts -->\n' +
    '    <div class="mainContainer m-0 main-container-flg">\n' +
    '        <div class="comm-headline-btn">\n' +
    '            <h3 class="main-comm-head m-0">Appointments<i class="icon-question rig-icn" data-toggle="tooltip"\n' +
    '                    title="Merge Sales"></i>\n' +
    '            </h3>\n' +
    '            <div class="filter-container-up filter-container-grid">\n' +
    '                <div class="filter-container">\n' +
    '                    <a href="./appointment" class="button flg-btn">+ Add New</a>\n' +
    '                    <div class="form-group mb-0 mr-2">\n' +
    '                        <form>\n' +
    '                            <input class="form-field" type="text" name="filter-searh" required>\n' +
    '                            <p class="form-label">Search</p>\n' +
    '                            <button class="search icon-search" type="submit"></button>\n' +
    '                        </form>\n' +
    '                    </div>\n' +
    '                    <div class="yur-mail-rig filtdrp-status">\n' +
    '                        <button type="button" class="button line grey status mr-2">\n' +
    '                            <i class="icon-fliter-list"></i>\n' +
    '                            <span>Sort by</span>\n' +
    '                        </button>\n' +
    '                        <ul class="status-list center">\n' +
    '                            <li class="drpFil">Sort by</li>\n' +
    '                            <li><a href="#">Ascending</a></li>\n' +
    '                            <li><a href="#">Descending</a></li>\n' +
    '                        </ul>\n' +
    '                    </div>\n' +
    '                    <div class="yur-mail-rig filtdrp-status">\n' +
    '                        <button type="button" class="button line grey status mr-2">\n' +
    '                            <i class="icon-filter"></i>\n' +
    '                            <span>Fliters</span>\n' +
    '                        </button>\n' +
    '                        <ul class="status-list center">\n' +
    '                            <li class="drpFil">Filters</li>\n' +
    '                            <li><a href="#">Upcoming</a></li>\n' +
    '                            <li><a href="#">Cancelled</a></li>\n' +
    '                        </ul>\n' +
    '                    </div>\n' +
    '\n' +
    '                    <div class="radio-box radio-box-2 rad-org flg-grid-btn">\n' +
    '                        <input type="radio" class="listCheck" id="grid" name="list-view" value="grid" checked>\n' +
    '                        <label for="grid"><i class="icon-gird"></i></label>\n' +
    '                    </div>\n' +
    '\n' +
    '                    <div class="radio-box radio-box-2 rad-org flg-list-btn">\n' +
    '                        <input type="radio" class="listCheck" id="list" name="list-view" value="list">\n' +
    '                        <label for="list"><i class="icon-list"></i></label>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '\n' +
    '        <div id="gridView">\n' +
    '            <!-- start -->\n' +
    '            <div class="f-row f-4 f-1600-3 f-900-2 f-640-1">\n' +
    '                <div class="f-col" *ngFor="let appointment of appointmentlist">\n' +
    '                    <!-- Main App grid Starts -->\n' +
    '                    <div class="app-grid-box">\n' +
    '                        <!-- start -->\n' +
    '                        <div class="app-pad-box">\n' +
    '                            <div class="app-pad-top" *ngFor="let technician of appointment.technicianList">\n' +
    '                                <h4 class="gridhead">{{technician.serviceName}}</h4>\n' +
    '                                <div class="techi-user">\n' +
    '                                    <div class="tech-user-img"><img src="assets/img/profile.svg" alt=""></div>\n' +
    '                                    <div class="tech-usr-cont">\n' +
    '                                        <h3>{{technician.technicianName}}</h3>\n' +
    '                                        <p>Technician</p>\n' +
    '                                    </div>\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '                            <div class="yur-mail-rig">\n' +
    '                                <i class="icon-status1 status"></i>\n' +
    '                                <ul class="status-list">\n' +
    '                                    <li class="side-menu" (click)="selectappointmentobj(appointment)"><i class="icon-edit"></i>\n' +
    '                                        Edit\n' +
    '                                    </li>\n' +
    '                                    <li class="delt" data-toggle="modal" data-target="#deletePopup" (click)="selectappointmentdelobj(appointment)"\n' +
    '                                        data-backdrop="static" data-keyboard="false"><i class="icon-delete"></i>\n' +
    '                                        Delete</li>\n' +
    '                                </ul>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                        <!-- end -->\n' +
    '                        <!-- start -->\n' +
    '                        <div class="app-pad-box">\n' +
    '                            <div class="cust-rig">\n' +
    '                                <h6>{{appointment.customerDetails.firstName}}{{appointment.customerDetails.lastName}}</h6>\n' +
    '                                <div class="usr-pho">\n' +
    '                                    <div class="flag-img"><img src="assets/img/usa.svg" alt=""></div>\n' +
    '                                    <p>{{appointment.customerDetails.mobileContact}}</p>\n' +
    '                                </div>\n' +
    '                                <div class="usr-pho">\n' +
    '                                    <i class="icon-envelope"></i>\n' +
    '                                    <p>{{appointment.customerDetails.email}}</p>\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                        <!-- end -->\n' +
    '                        <!-- start -->\n' +
    '                        <div class="app-pad-box app-pad-date-box">\n' +
    '                            <div class="techi-user">\n' +
    '                                <i class="icon-calender"></i>\n' +
    '                                <div class="tech-usr-cont">\n' +
    '                                    <p>Date</p>\n' +
    '                                    <h3>{{appointment.appointmentDate}}</h3>\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '                            <div class="techi-user">\n' +
    '                                <i class="icon-clock"></i>\n' +
    '                                <div class="tech-usr-cont">\n' +
    '                                    <p>Time</p>\n' +
    '                                    <h3>{{appointment.time}}</h3>\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                        <!-- end -->\n' +
    '                    </div>\n' +
    '                    <!-- Main App grid Ends -->\n' +
    '                </div>\n' +
    '            </div>\n' +
    '            <!-- end -->\n' +
    '        </div>\n' +
    '\n' +
    '        <div id="listView">\n' +
    '            <!-- Main App List Starts -->\n' +
    '            <div class="table-bdy">\n' +
    '                <!-- start -->\n' +
    '                <div class="tab-top-head">\n' +
    '                    <h4 class="gridhead m-0">Haircut</h4>\n' +
    '                    <div class="yur-mail-rig">\n' +
    '                        <i class="icon-status1 status"></i>\n' +
    '                        <ul class="status-list">\n' +
    '                            <li class="side-menu" data-name="side-menu-logininfo"><i class="icon-edit"></i>\n' +
    '                                Edit\n' +
    '                            </li>\n' +
    '                            <li class="delt" data-toggle="modal" data-target="#deletePopup" data-backdrop="static"\n' +
    '                                data-keyboard="false"><i class="icon-delete"></i>\n' +
    '                                Delete</li>\n' +
    '                        </ul>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <!-- end -->\n' +
    '\n' +
    '                <ul class="table-rw">\n' +
    '                    <!-- start -->\n' +
    '                    <li>\n' +
    '                        <span>Technician</span>\n' +
    '                        <div class="techi-user">\n' +
    '                            <div class="tech-user-img"><img src="assets/img/user.svg" alt=""></div>\n' +
    '                            <div class="tech-usr-cont">\n' +
    '                                <h3 class="ellipsis">Ira Membrit (Ira-Membrit)</h3>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                    </li>\n' +
    '                    <!-- end -->\n' +
    '                    <!-- start -->\n' +
    '                    <li>\n' +
    '                        <span>Customer</span>\n' +
    '                        <b>Nick R. Bocker</b>\n' +
    '                    </li>\n' +
    '                    <!-- end -->\n' +
    '                    <!-- start -->\n' +
    '                    <li>\n' +
    '                        <span>Mobile</span>\n' +
    '                        <b>1-541-754-3010</b>\n' +
    '                    </li>\n' +
    '                    <!-- end -->\n' +
    '                    <!-- start -->\n' +
    '                    <li>\n' +
    '                        <span>Email</span>\n' +
    '                        <b>nickbocker@salescorp.com</b>\n' +
    '                    </li>\n' +
    '                    <!-- end -->\n' +
    '                    <!-- start -->\n' +
    '                    <li>\n' +
    '                        <span>Date</span>\n' +
    '                        <b>29 Oct, 2019</b>\n' +
    '                    </li>\n' +
    '                    <!-- end -->\n' +
    '                    <!-- start -->\n' +
    '                    <li>\n' +
    '                        <span>Time</span>\n' +
    '                        <b>5:00 - 05:30 PM</b>\n' +
    '                    </li>\n' +
    '                    <!-- end -->\n' +
    '                </ul>\n' +
    '            </div>\n' +
    '            <!-- Main App List Ends -->\n' +
    '        </div>\n' +
    '    </div>\n' +
    '    <!-- Main Container Ends -->\n' +
    '<!-- Delete Modal Starts -->\n' +
    '<div class="modal fade" id="deletePopup">\n' +
    '    <div class="modal-dialog medium-window">\n' +
    '        <div class="modal-content">\n' +
    '            <div class="modalCancel" data-dismiss="modal"><i class="icon-cir-plus"></i></div>\n' +
    '\n' +
    '            <h2 class="modal-title">Are you sure to cancel appointment?</h2>\n' +
    '            <div class="modal-btn">\n' +
    '                <button class="button line mr-2" data-dismiss="modal">No</button>\n' +
    '                <button class="button red" data-dismiss="modal" (click)="getAppointmentDelete(arrayofselectedobj[0][\'appointmentId\'])">Yes</button>\n' +
    '           </div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</div>\n' +
    '<!-- Delete Modal Ends -->\n' 
})
export class AppointmentListComponent implements OnInit {
  frequentlyServices: any;
    appointmentlist: any;
  arrayofselectedobj:Array<any>=[];
  appointmentdelete: any;

  constructor(public messageService: MessageService, public appointmentService: AppointmentService,private formBuilder: FormBuilder, private router: Router, public modalServices: ModalService) { }

  ngOnInit() {
    this.getAppointmentList();
  }

  getAppointmentList() {
    this.appointmentService.getAppointmentList().subscribe((data) => {
      this.appointmentlist = data;
      this.appointmentlist = this.appointmentlist.list;
      console.log(this.appointmentlist)
      // localStorage.setItem('companyId', data['ParentCompanyID']);
    });
  }
  
  selectappointmentobj(selected_obj){
    var index = this.arrayofselectedobj.indexOf(selected_obj);
    if(index<0){
      this.arrayofselectedobj.splice(index, 1);
      this.arrayofselectedobj.push(selected_obj);
      this.appointmentService.arrayofselectedappointment = this.arrayofselectedobj;
      this.router.navigate(['appointmentedit']);
    }
    console.log(this.arrayofselectedobj)
  }

  selectappointmentdelobj(selected_obj){
    var index = this.arrayofselectedobj.indexOf(selected_obj);
    if(index<0){
      this.arrayofselectedobj.splice(index, 1);
      this.arrayofselectedobj.push(selected_obj);
    }
    console.log(this.arrayofselectedobj)
  }

  getAppointmentDelete(appointment) {
    this.appointmentService.getAppointmentDelete(appointment).subscribe((data) => {
      this.appointmentdelete = data;
      this.messageService.clear();
      this.messageService.add(data['message'])
      this.getAppointmentList();
      // localStorage.setItem('companyId', data['ParentCompanyID']);
    });
  }
}
