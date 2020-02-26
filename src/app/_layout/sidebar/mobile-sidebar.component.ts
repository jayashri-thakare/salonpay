import {Component, ElementRef, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {element} from 'protractor';
import {UserdataService} from '../../userdata.service';
import { AdminService } from 'src/app/admin/admin.service';
import { CustomerService } from 'src/app/customer/customer.service';

@Component({
  selector: 'app-mobile-sidebar',
  styleUrls: ['./sidebar.component.css'],
  template: '<div class="sidebar-btn"><i class="icon-gird"></i></div> \n' +
    '<div class="time-track" *ngIf="router.url === \'/dashboard\'">\n' +
    '        <div class="time-hed">\n' +
    '            <h6>Time Tracker</h6>\n' +
    '            <i class="icon-minus trk-minus"></i>\n' +
    '            <i class="icon-cross trk-plus"></i>\n' +
    '        </div>\n' +
    '\n' +
    '        <div class="trak-sld">\n' +
    '\n' +
    '            <div class="trk-prof">\n' +
    '                <div class="trk-det">\n' +
    '                    <div class="user-img"><img src="img/profile.svg" alt=""></div>\n' +
    '                    <div class="trk-name">\n' +
    '                        <h3>Maya Didas<span>Technician</span></h3>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <div id="stopWatch">\n' +
    '                    <h6 id="time">00:00</h6>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '\n' +
    '            <div class="trk-btn">\n' +
    '                <button class="button" id="start">Start</button>\n' +
    '                <button class="button blue" id="stop">Stop</button>\n' +
    '            </div>\n' +
    '\n' +
    '            <div class="form-group">\n' +
    '                <select class="select-field form-field valid" name="select-fld" id="select-fld" required="" aria-invalid="false">\n' +
    '                    <option></option>\n' +
    '                    <option>Option 1</option>\n' +
    '                    <option>Option 2</option>\n' +
    '                    <option>Option 3</option>\n' +
    '                    <option>Option 4</option>\n' +
    '                    <option>Option 5</option>\n' +
    '                </select>\n' +
    '                <p class="form-label sel-blk">Task</p>\n' +
    '            </div>\n' +
    '\n' +
    '       </div>\n' +
    '    </div>\n' +
    '     <div class="time-track-btn" *ngIf="router.url === \'/dashboard\'"><i class="icon-clock"></i></div>'
})
export class MobileSidebarComponent implements OnInit {

  constructor(public customerService: CustomerService, public AdminService: AdminService, public router: Router, private el: ElementRef, private userdataService: UserdataService) {}

  ngOnInit() {
  }

}
