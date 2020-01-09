import { Component, OnInit, Input } from '@angular/core';
import {Router} from '@angular/router';
import { ModalService } from '../../_modal/modal.service';
import {UserdataService} from '../..//userdata.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {Observable} from 'rxjs';
import {MessageService} from '../../message.service';

@Component({
  selector: 'schedule-modal',
  template: '<!-- Edit Profile Menu -->\n' +
    '<jw-modal id="schedule-edit">\n' +
    '<div class="mobile-side" >\n' +
    '  <!-- common headline -->\n' +
    '  <h3 class="close-btn main-comm-head" (click)="closeModal(\'schedule-edit\');">\n' +
    '    <i class="icon-down-arrow com-arw"></i>Update <span>Schedule</span>\n' +
    '  </h3>\n' +
    '  <!-- common headline end -->\n' +
    ' <form [formGroup]="scheduleeditForm" (ngSubmit)="updateSchedule(scheduleeditForm.value)" class="popup-scrll">'+
   ' <div class="common-row-box">'+
      '<!-- left side starts -->'+
     ' <div class="common-left-box">'+
       ' <h6 class="poptile">Working Days</h6>'+
       ' <div class="">'+
          '<!-- start -->'+
         ' <div class="radio-box radio-box-2" *ngFor="let weekdays of arrayofselectedobj">'+
           ' <input type="checkbox" [disabled]="isdisable" id="edit_{{weekdays.dayName}}" [checked]="weekdays.dayName" value="arrayofselecteddays" formControlName="editedDayName" (click)="selectedWeekDays(weekdays)">'+
           ' <label for="edit_{{weekdays.dayName}}">{{weekdays.dayName}}</label>'+
          '</div>'+
         ' <!-- end -->'+
       ' </div>'+
       ' <app-customTimePicker [customTimePicker]= "scheduleeditForm" [userdata]="arrayofselectedobj" addchildAMMessage="edit"></app-customTimePicker>'+
        // '<button class="button" type="submit">Update</button>'+
      '</div>'+
    '</div>'+
    '<!-- Main Container Ends -->'+
    '    <div class="popBtn">\n' +
    '      <button class="button line close-btn" type="button" (click)="closeModal(\'schedule-edit\');">Cancel</button>\n' +
    '      <button class="button" type="submit">Update</button>\n' +
    '    </div>\n' +
  '</form>' +
    '\n' +
    '</div>\n' +
    '</jw-modal>\n' +
    '<!-- Edit Profile Menu End -->'
})
export class ScheduleEditComponent implements OnInit {
  scheduleeditForm: FormGroup;
  control: FormControl;
  submitted = false;
  @Input('userdata') arrayofselectedobj: Array<string> = [];
  private arrayofdays: Array<string> = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  private arrayofselecteddays: Array<string> = [];
  private userdetail: Observable< object >;

  constructor(public translate: TranslateService, private userdataService: UserdataService,
              private formBuilder: FormBuilder, private modalService: ModalService, private router: Router,
              private userdataservice: UserdataService, private messageService: MessageService) {
  }
  get f() {
    return this.scheduleeditForm.controls;
  }
  ngOnInit() {
    const isdisable = true;
    this.scheduleeditForm = this.formBuilder.group({
        editedDayName: [''],
        StartTimeHour: [''],
        StartTimeMinute: [''],
        StartTimeMeridian: [''],
        EndTimeHour: [''],
        EndTimeMinute: [''],
        EndTimeMeridian: ['']
    });
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  selectedWeekDays(selected_day){
    var index = this.arrayofselecteddays.indexOf(selected_day);
    if(index<0){
      this.arrayofselecteddays.push(selected_day);
      console.log(this.arrayofselecteddays)
    }else{
      this.arrayofselecteddays.splice(index, 1);
      console.log(this.arrayofselecteddays)
    }
  }

  updateSchedule(userdata) {
    console.log(userdata, this.scheduleeditForm)
    userdata.editedDayName = [this.arrayofselectedobj[0]['dayName']];
    // tslint:disable-next-line:triple-equals
    if (this.scheduleeditForm.status == 'VALID') {
      this.userdataService.update_schedule(userdata).subscribe((data) => {
        this.userdataService.publish('call-parent');
        this.closeModal('schedule-edit');
        this.messageService.clear();
        this.messageService.add('Schedule Updated succesfully.');
      });
    } else {
      console.log(userdata, this.scheduleeditForm.status);
      this.submitted = true;
      if (this.scheduleeditForm.invalid) {
        return;
      }
    }
  }

}
