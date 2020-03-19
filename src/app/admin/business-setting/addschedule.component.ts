import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { ModalService } from '../../_modal/modal.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AdminService} from '../admin.service';
import {MessageService} from '../../message.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'addschedule-modal',
  template: '<jw-modal id="add-schedule">\n' +
    '    <!-- Edit Salon Timing Menu -->\n' +
    '    <div class="mobile-side">\n' +
    '        <!-- common headline -->\n' +
    '        <h3 *ngIf="addSchedule" class="close-btn main-comm-head" (click)="closeModal(\'add-schedule\');">\n' +
    '            <i class="icon-down-arrow com-arw"></i>Add<span> Salon Timing</span>\n' +
    '        </h3>\n' +
    '        <h3 *ngIf="updateSchedule" class="close-btn main-comm-head" (click)="closeModal(\'add-schedule\');">\n' +
    '            <i class="icon-down-arrow com-arw"></i>Update<span> Salon Timing</span>\n' +
    '        </h3>\n' +
    '        <!-- common headline end -->\n' +
    '        <form *ngIf="addSchedule" id="editsalontim" [formGroup]="addscheduleForm" (ngSubmit)="createSchedule(addscheduleForm.value)" class="popup-scrll">\n' +
    '\n' +
    '            <div class="filBox">\n' +
    '                <!-- start -->\n' +
    '                <div class="fill-box-in scrollbar">\n' +
    '                    <!-- start -->\n' +
    '                      <!-- start -->\n' +
    '                    <h6 class="poptile">Days</h6>\n' +
    '                      <div class="radio-box radio-box-2" *ngFor="let days of arrayofdays">\n' +
    '                        <input type="checkbox" id="{{days}}" formControlName="DayName" (click)="selectedDays(days)">\n' +
    '                        <label for="{{days}}">{{days}}</label>\n' +
    '                      </div>\n' +
    '                      <!-- end -->\n' +
    '                    <!-- start -->\n' +
    '                    <h6 class="poptile">Working Start Time</h6>\n' +
    '                    <div class="start-time-input time-input-sidebar">\n' +
    '                        <!-- start -->\n' +
    '                        <div class="form-group mb-0">\n' +
    '                            <select class="select-field form-field field--not-empty" formControlName="StartTimeHour" name="start-hr-fld" required="">\n' +
    '                                <option *ngFor="let hour of arrayofhours">{{hour}}</option>\n' +
    '                            </select>\n' +
    '                            <p class="form-label sel-blk">Hr.</p>\n' +
    '                        </div>\n' +
    '                        <!-- end -->\n' +
    '                        <!-- start -->\n' +
    '                        <div class="form-group mb-0">\n' +
    '                            <select class="select-field form-field field--not-empty" formControlName="StartTimeMinute" name="start-min-fld" required="">\n' +
    '                                <option></option>\n' +
    '                                <option *ngFor="let minute of arrayofminute">{{minute}}</option>\n' +
    '                            </select>\n' +
    '                            <p class="form-label sel-blk">Min.</p>\n' +
    '                        </div>\n' +
    '                        <!-- end -->\n' +
    '                        <!-- start -->\n' +
    '                        <div class="radio-box radio-box-2 mb-0">\n' +
    '                            <input type="radio" id="chk-start1" value="AM" formControlName="StartTimeMeridian">\n' +
    '                            <label for="chk-start1">AM</label>\n' +
    '                        </div>\n' +
    '                        <!-- end -->\n' +
    '                        <!-- start -->\n' +
    '                        <div class="radio-box radio-box-2 mb-0">\n' +
    '                            <input type="radio" id="chk-start2" value="PM" formControlName="StartTimeMeridian">\n' +
    '                            <label for="chk-start2">PM</label>\n' +
    '                        </div>\n' +
    '                        <!-- end -->\n' +
    '                    </div>\n' +
    '\n' +
    '                    <!-- End Time -->\n' +
    '                    <h6 class="poptile">Working End Time</h6>\n' +
    '                    <div class="start-time-input time-input-sidebar">\n' +
    '                        <!-- start -->\n' +
    '                        <div class="form-group mb-0">\n' +
    '                            <select class="select-field form-field field--not-empty" formControlName="EndTimeHour" name="end-hr-fld" required="">\n' +
    '                                <option></option>\n' +
    '                                <option *ngFor="let hour1 of arrayofhours">{{hour1}}</option>\n' +
    '                            </select>\n' +
    '                            <p class="form-label sel-blk">Hr.</p>\n' +
    '                        </div>\n' +
    '                        <!-- end -->\n' +
    '                        <!-- start -->\n' +
    '                        <div class="form-group mb-0">\n' +
    '                            <select class="select-field form-field field--not-empty" formControlName="EndTimeMinute" name="end-min-fld" required="">\n' +
    '                                <option></option>\n' +
    '                                <option *ngFor="let minute1 of arrayofminute">{{minute1}}</option>\n' +
    '                            </select>\n' +
    '                            <p class="form-label sel-blk">Min.</p>\n' +
    '                        </div>\n' +
    '                        <!-- end -->\n' +
    '                        <!-- start -->\n' +
    '                        <div class="radio-box radio-box-2 mb-0">\n' +
    '                            <input type="radio" id="chk-end1" value="AM" formControlName="EndTimeMeridian">\n' +
    '                            <label for="chk-end1">AM</label>\n' +
    '                        </div>\n' +
    '                        <!-- end -->\n' +
    '                        <!-- start -->\n' +
    '                        <div class="radio-box radio-box-2 mb-0">\n' +
    '                            <input type="radio" id="chk-end2" value="PM" formControlName="EndTimeMeridian">\n' +
    '                            <label for="chk-end2">PM</label>\n' +
    '                        </div>\n' +
    '                        <!-- end -->\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <!-- end -->\n' +
    '            </div>\n' +
    '\n' +
    '            <div class="popBtn">\n' +
    '                <button class="button line close-btn" type="button" (click)="closeModal(\'add-schedule\');">Cancel</button>\n' +
    '                <button class="button" type="submit">Update</button>\n' +
    '            </div>\n' +
    '\n' +
    '        </form>\n' +
    '        <form *ngIf="updateSchedule" [formGroup]="updatescheduleForm" (ngSubmit)="updateSchedulefunc(updatescheduleForm.value)" class="popup-scrll">\n' +
    '\n' +
    '            <div class="filBox">\n' +
    '                <!-- start -->\n' +
    '                <div class="fill-box-in scrollbar">\n' +
    '                    <!-- start -->\n' +
    '                      <!-- start -->\n' +
    '                    <h6 class="poptile">Days</h6>\n' +
    '                      <div class="radio-box radio-box-2" *ngFor="let days of arrayofselectedobj">\n' +
    '                        <input type="checkbox" id="{{days.dayName}}" [checked]="days.dayName" formControlName="DayName" (click)="selectedDays(days)">\n' +
    '                        <label for="{{days.dayName}}">{{days.dayName}}</label>\n' +
    '                      </div>\n' +
    '                      <!-- end -->\n' +
    '                    <!-- start -->\n' +
    '                    <h6 class="poptile">Working Start Time</h6>\n' +
    '                    <div class="start-time-input time-input-sidebar">\n' +
    '                        <!-- start -->\n' +
    '                        <div class="form-group mb-0">\n' +
    '                            <select class="select-field form-field field--not-empty" formControlName="StartTimeHour" name="start-hr-fld" required="">\n' +
    '                                <option *ngFor="let hour of arrayofhours">{{hour}}</option>\n' +
    '                            </select>\n' +
    '                            <p class="form-label sel-blk">Hr.</p>\n' +
    '                        </div>\n' +
    '                        <!-- end -->\n' +
    '                        <!-- start -->\n' +
    '                        <div class="form-group mb-0">\n' +
    '                            <select class="select-field form-field field--not-empty" formControlName="StartTimeMinute" name="start-min-fld" required="">\n' +
    '                                <option></option>\n' +
    '                                <option *ngFor="let minute of arrayofminute">{{minute}}</option>\n' +
    '                            </select>\n' +
    '                            <p class="form-label sel-blk">Min.</p>\n' +
    '                        </div>\n' +
    '                        <!-- end -->\n' +
    '                        <!-- start -->\n' +
    '                        <div class="radio-box radio-box-2 mb-0">\n' +
    '                            <input type="radio" id="chk-start1" value="AM" formControlName="StartTimeMeridian">\n' +
    '                            <label for="chk-start1">AM</label>\n' +
    '                        </div>\n' +
    '                        <!-- end -->\n' +
    '                        <!-- start -->\n' +
    '                        <div class="radio-box radio-box-2 mb-0">\n' +
    '                            <input type="radio" id="chk-start2" value="PM" formControlName="StartTimeMeridian">\n' +
    '                            <label for="chk-start2">PM</label>\n' +
    '                        </div>\n' +
    '                        <!-- end -->\n' +
    '                    </div>\n' +
    '\n' +
    '                    <!-- End Time -->\n' +
    '                    <h6 class="poptile">Working End Time</h6>\n' +
    '                    <div class="start-time-input time-input-sidebar">\n' +
    '                        <!-- start -->\n' +
    '                        <div class="form-group mb-0">\n' +
    '                            <select class="select-field form-field field--not-empty" formControlName="EndTimeHour" name="end-hr-fld" required="">\n' +
    '                                <option></option>\n' +
    '                                <option *ngFor="let hour1 of arrayofhours">{{hour1}}</option>\n' +
    '                            </select>\n' +
    '                            <p class="form-label sel-blk">Hr.</p>\n' +
    '                        </div>\n' +
    '                        <!-- end -->\n' +
    '                        <!-- start -->\n' +
    '                        <div class="form-group mb-0">\n' +
    '                            <select class="select-field form-field field--not-empty" formControlName="EndTimeMinute" name="end-min-fld" required="">\n' +
    '                                <option></option>\n' +
    '                                <option *ngFor="let minute1 of arrayofminute">{{minute1}}</option>\n' +
    '                            </select>\n' +
    '                            <p class="form-label sel-blk">Min.</p>\n' +
    '                        </div>\n' +
    '                        <!-- end -->\n' +
    '                        <!-- start -->\n' +
    '                        <div class="radio-box radio-box-2 mb-0">\n' +
    '                            <input type="radio" id="chk-end1" value="AM" formControlName="EndTimeMeridian">\n' +
    '                            <label for="chk-end1">AM</label>\n' +
    '                        </div>\n' +
    '                        <!-- end -->\n' +
    '                        <!-- start -->\n' +
    '                        <div class="radio-box radio-box-2 mb-0">\n' +
    '                            <input type="radio" id="chk-end2" value="PM" formControlName="EndTimeMeridian">\n' +
    '                            <label for="chk-end2">PM</label>\n' +
    '                        </div>\n' +
    '                        <!-- end -->\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <!-- end -->\n' +
    '            </div>\n' +
    '\n' +
    '            <div class="popBtn">\n' +
    '                <button class="button line close-btn" type="button" (click)="closeModal(\'add-schedule\');">Cancel</button>\n' +
    '                <button class="button" type="submit">Update</button>\n' +
    '            </div>\n' +
    '\n' +
    '        </form>\n' +
    '\n' +
    '    </div>\n' +
    '    <!-- Edit Salon Timing Menu End -->' +
    '    </jw-modal>'
})
export class AddScheduleComponent implements OnInit {
  addscheduleForm: FormGroup;
  updatescheduleForm: FormGroup;
  control: FormControl;
  submitted = false;
  public arrayofdays: Array<string> = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  arrayofhours: Array<any>=[];
  arrayofminute: Array<any>=[];
  arrayofselecteddays: Array<any>=[];
  @Input('addSchedule') addSchedule: any;
  @Input('updateSchedule') updateSchedule: any;
  @Input('Schedulesobj') arrayofselectedobj: Array<any>=[];

  constructor(public AdminService: AdminService, private formBuilder: FormBuilder, private modalService: ModalService, private router: Router, private messageService: MessageService) { }
  get f() {
    return this.addscheduleForm.controls;
  }
  get f1() {
    return this.updatescheduleForm.controls;
  }
  closeModal(id: string) {
    this.modalService.close(id);
  }
  ngOnInit() {
    var H = 13; this.arrayofhours = Array.apply(null, {length: H}).map(Number.call, Number)
    var M = 60; this.arrayofminute = Array.apply(null, {length: M}).map(Number.call, Number)
    this.addscheduleForm = this.formBuilder.group({
        DayName: [''],
        StartTimeHour: [''],
        StartTimeMinute: [''],
        StartTimeMeridian: [''],
        EndTimeHour: [''],
        EndTimeMinute: [''],
        EndTimeMeridian: ['']
    });
    this.updatescheduleForm = this.formBuilder.group({
      DayName: [''],
      StartTimeHour: [''],
      StartTimeMinute: [''],
      StartTimeMeridian: [''],
      EndTimeHour: [''],
      EndTimeMinute: [''],
      EndTimeMeridian: ['']
  });
  }

  selectedDays(selected_day){
    var index = this.arrayofselecteddays.indexOf(selected_day);
    if(index<0){
      this.arrayofselecteddays.push(selected_day);
    }else{
      this.arrayofselecteddays.splice(index, 1);
    }
    console.log(this.arrayofselecteddays)
  }

  createSchedule(Admin) {
    console.log(Admin)
    Admin.DayName = this.arrayofselecteddays;
    // tslint:disable-next-line:triple-equals
    if (this.addscheduleForm.status == 'VALID') {
      this.AdminService.add_schedulebusiness(Admin).subscribe((data) => {
        this.AdminService.publish('call-schedule');
        this.addscheduleForm.reset();
        this.messageService.clear();
        this.messageService.add('Schedule Setting added successfully.')
        this.modalService.close('add-schedule');
      });
    } else {
      console.log(Admin, this.addscheduleForm.status);
      this.submitted = true;
      if (this.addscheduleForm.invalid) {
        return;
      }
    }
  }

  updateSchedulefunc(Admin) {
    console.log(Admin)
    Admin.DayName = [this.arrayofselectedobj[0]['dayName']];
    // tslint:disable-next-line:triple-equals
    if (this.updatescheduleForm.status == 'VALID') {
      this.AdminService.add_schedulebusiness(Admin).subscribe((data) => {
        this.AdminService.publish('call-schedule');
        this.updatescheduleForm.reset();
        this.messageService.clear();
        this.messageService.add('Schedule Setting updated successfully.')
        this.modalService.close('add-schedule');
      });
    } else {
      console.log(Admin, this.updatescheduleForm.status);
      this.submitted = true;
      if (this.updatescheduleForm.invalid) {
        return;
      }
    }
  }

}
