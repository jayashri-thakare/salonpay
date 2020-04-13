import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { AppointmentService } from './appointment.service';

@Component({
  selector: 'modal-appointmentedit',
  template: '<jw-modal id="edit-appointment">\n' +
    '        <div class="mobile-side" >\n' +
    '        <!-- common headline -->\n' +
    '        <h3 class="close-btn main-comm-head">\n' +
    '            <i class="icon-down-arrow com-arw"></i>Edit<span> Appointment</span>\n' +
    '        </h3>\n' +
    '        <!-- common headline end -->\n' +
    '        <form id="editAppt" class="popup-scrll">\n' +
    '\n' +
    '            <div class="filBox">\n' +
    '                <!-- start -->\n' +
    '                <div class="fill-box-in scrollbar">\n' +
    '                    <div class="form-group mt-2">\n' +
    '                        <select class="select-field form-field field--not-empty" name="service" id="service" required>\n' +
    '                            <option selected>Haircut</option>\n' +
    '                            <option>Option 2</option>\n' +
    '                            <option>Option 3</option>\n' +
    '                            <option>Option 4</option>\n' +
    '                            <option>Option 5</option>\n' +
    '                        </select>\n' +
    '                        <p class="form-label sel-blk">Service</p>\n' +
    '                    </div>\n' +
    '                    <div class="form-group">\n' +
    '                        <select class="select-field form-field field--not-empty" name="technician" id="technician"\n' +
    '                            required>\n' +
    '                            <option selected>Ira Membrit</option>\n' +
    '                            <option>Option 2</option>\n' +
    '                            <option>Option 3</option>\n' +
    '                            <option>Option 4</option>\n' +
    '                            <option>Option 5</option>\n' +
    '                        </select>\n' +
    '                        <p class="form-label sel-blk">Technician</p>\n' +
    '                    </div>\n' +
    '                    <div class="form-group">\n' +
    '                        <select class="select-field form-field field--not-empty" name="customer" id="customer" required>\n' +
    '                            <option selected>Nick R. Bocker</option>\n' +
    '                            <option>Option 1</option>\n' +
    '                            <option>Option 2</option>\n' +
    '                            <option>Option 3</option>\n' +
    '                            <option>Option 4</option>\n' +
    '                            <option>Option 5</option>\n' +
    '                        </select>\n' +
    '                        <p class="form-label sel-blk">Customer</p>\n' +
    '                    </div>\n' +
    '                    <div class="form-group">\n' +
    '                        <input type="text" class="form-field field--not-empty datetimepicker-input" id="date1"\n' +
    '                            name="date1" value="12/25/2019" autocomplete="off" />\n' +
    '                        <i class="icon-calender"></i>\n' +
    '                        <p class="form-label">Date</p>\n' +
    '                    </div>\n' +
    '                    <h6 class="poptile">Start Time</h6>\n' +
    '                    <div class="start-time-input time-input-sidebar">\n' +
    '                        <!-- start -->\n' +
    '                        <div class="form-group mb-0">\n' +
    '                            <select class="select-field form-field field--not-empty" name="start-hr-fld" required="">\n' +
    '                                <option>00</option>\n' +
    '                                <option>01</option>\n' +
    '                                <option>02</option>\n' +
    '                                <option>03</option>\n' +
    '                                <option>04</option>\n' +
    '                                <option selected>05</option>\n' +
    '                                <option>06</option>\n' +
    '                                <option>07</option>\n' +
    '                                <option>08</option>\n' +
    '                                <option>09</option>\n' +
    '                                <option>10</option>\n' +
    '                                <option>11</option>\n' +
    '                                <option>12</option>\n' +
    '                            </select>\n' +
    '                            <p class="form-label sel-blk">Hr.</p>\n' +
    '                        </div>\n' +
    '                        <!-- end -->\n' +
    '                        <!-- start -->\n' +
    '                        <div class="form-group mb-0">\n' +
    '                            <select class="select-field form-field field--not-empty" name="start-min-fld" required="">\n' +
    '                                <option selected>00</option>\n' +
    '                                <option>01</option>\n' +
    '                                <option>02</option>\n' +
    '                                <option>03</option>\n' +
    '                                <option>04</option>\n' +
    '                                <option>05</option>\n' +
    '                                <option>06</option>\n' +
    '                                <option>07</option>\n' +
    '                                <option>08</option>\n' +
    '                                <option>09</option>\n' +
    '                                <option>10</option>\n' +
    '                                <option>11</option>\n' +
    '                                <option>12</option>\n' +
    '                            </select>\n' +
    '                            <p class="form-label sel-blk">Min.</p>\n' +
    '                        </div>\n' +
    '                        <!-- end -->\n' +
    '                        <!-- start -->\n' +
    '                        <div class="radio-box radio-box-2 mb-0">\n' +
    '                            <input type="radio" id="chk-start1" name="chk-start" required="">\n' +
    '                            <label for="chk-start1">AM</label>\n' +
    '                        </div>\n' +
    '                        <!-- end -->\n' +
    '                        <!-- start -->\n' +
    '                        <div class="radio-box radio-box-2 mb-0">\n' +
    '                            <input type="radio" id="chk-start2" name="chk-start" required="" checked>\n' +
    '                            <label for="chk-start2">PM</label>\n' +
    '                        </div>\n' +
    '                        <!-- end -->\n' +
    '                    </div>\n' +
    '\n' +
    '                    <!-- End Time -->\n' +
    '                    <h6 class="poptile">End Time</h6>\n' +
    '                    <div class="start-time-input time-input-sidebar">\n' +
    '                        <!-- start -->\n' +
    '                        <div class="form-group mb-0">\n' +
    '                            <select class="select-field form-field field--not-empty" name="end-hr-fld" required="">\n' +
    '                                <option></option>\n' +
    '                                <option>00</option>\n' +
    '                                <option>01</option>\n' +
    '                                <option>02</option>\n' +
    '                                <option>03</option>\n' +
    '                                <option>04</option>\n' +
    '                                <option selected>05</option>\n' +
    '                                <option>06</option>\n' +
    '                                <option>07</option>\n' +
    '                                <option>08</option>\n' +
    '                                <option>09</option>\n' +
    '                                <option>10</option>\n' +
    '                                <option>11</option>\n' +
    '                                <option>12</option>\n' +
    '                            </select>\n' +
    '                            <p class="form-label sel-blk">Hr.</p>\n' +
    '                        </div>\n' +
    '                        <!-- end -->\n' +
    '                        <!-- start -->\n' +
    '                        <div class="form-group mb-0">\n' +
    '                            <select class="select-field form-field field--not-empty" name="end-min-fld" required="">\n' +
    '                                <option></option>\n' +
    '                                <option>00</option>\n' +
    '                                <option>01</option>\n' +
    '                                <option>02</option>\n' +
    '                                <option>03</option>\n' +
    '                                <option>04</option>\n' +
    '                                <option>05</option>\n' +
    '                                <option>06</option>\n' +
    '                                <option>07</option>\n' +
    '                                <option>08</option>\n' +
    '                                <option>09</option>\n' +
    '                                <option>10</option>\n' +
    '                                <option>11</option>\n' +
    '                                <option>12</option>\n' +
    '                                <option selected>30</option>\n' +
    '                            </select>\n' +
    '                            <p class="form-label sel-blk">Min.</p>\n' +
    '                        </div>\n' +
    '                        <!-- end -->\n' +
    '                        <!-- start -->\n' +
    '                        <div class="radio-box radio-box-2 mb-0">\n' +
    '                            <input type="radio" id="chk-end1" name="chk-end" required="">\n' +
    '                            <label for="chk-end1">AM</label>\n' +
    '                        </div>\n' +
    '                        <!-- end -->\n' +
    '                        <!-- start -->\n' +
    '                        <div class="radio-box radio-box-2 mb-0">\n' +
    '                            <input type="radio" id="chk-end2" name="chk-end" required="" checked>\n' +
    '                            <label for="chk-end2">PM</label>\n' +
    '                        </div>\n' +
    '                        <!-- end -->\n' +
    '                    </div>\n' +
    '\n' +
    '\n' +
    '                    <div class="email-edit-radio-box">\n' +
    '                        <div class="comm-cont">\n' +
    '                            <p>Email</p>\n' +
    '                            <div class="switch switch--horizontal m-0">\n' +
    '                                <input id="email-rim-off" type="radio" name="email-switch">\n' +
    '                                <label for="email-rim-off">Off</label>\n' +
    '                                <input id="email-rim-on" type="radio" name="email-switch" checked="checked">\n' +
    '                                <label for="email-rim-on">On</label><span class="toggle-outside"><span\n' +
    '                                        class="toggle-inside"></span></span>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                        <div class="comm-cont">\n' +
    '                            <p>SMS</p>\n' +
    '                            <div class="switch switch--horizontal m-0">\n' +
    '                                <input id="sms-rim-off" type="radio" name="sms-switch" checked="checked">\n' +
    '                                <label for="sms-rim-off">Off</label>\n' +
    '                                <input id="sms-rim-on" type="radio" name="sms-switch">\n' +
    '                                <label for="sms-rim-on">On</label><span class="toggle-outside"><span\n' +
    '                                        class="toggle-inside"></span></span>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '\n' +
    '                </div>\n' +
    '                <!-- end -->\n' +
    '            </div>\n' +
    '\n' +
    '            <div class="popBtn">\n' +
    '                <button class="button line close-btn" type="button">Cancel</button>\n' +
    '                <button class="button" type="submit">Update</button>\n' +
    '            </div>\n' +
    '\n' +
    '        </form>\n' +
    '\n' +
    '    </div>\n' +
    '   </jw-modal>'
})
export class AppointmentEditComponent implements OnInit {
  frequentlyServices: any;
    appointmentlist: any;

  constructor(public appointmentService: AppointmentService,private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {

  }
}
