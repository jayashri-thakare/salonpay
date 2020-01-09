import { Component, OnInit, Input } from '@angular/core';
import {Router} from '@angular/router';
import {UserdataService} from '../../userdata.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { ModalService } from 'src/app/_modal/modal.service';
import { MessageService } from 'src/app/message.service';

@Component({
  selector: 'app-schedulesetting',
  templateUrl: './schedulesetting.component.html',
  styleUrls: ['./schedulesetting.component.css']
})
export class SchedulesettingComponent implements OnInit {
  scheduleForm: FormGroup;
  timeoffForm: FormGroup;
  control: FormControl;
  submitted = false;
  private requesttimevar: boolean;
  private schedulevar: boolean;
  private arrayofdays: Array<string> = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  private arrayofselecteddays: Array<string> = [];
  // private arrayofselectedobj: Array<string> = [];
  public currentDate: Date = new Date ();
  public dateValue: Date = new Date ();
  // public maxDate: Date = new Date (this.currentDate)
  userschedule: any;
  customday: boolean;
  @Input('userdata') arrayofselectedobj: Array<string> = [];
  private addStartAMMessage = "add_StartAM";
  private addStartPMMessage = "add_StartPM";
  private addEndAMMessage = "add_EndAM";
  private addEndPMMessage = "add_EndPM";
  private schedule = {};

  constructor(private modalService: ModalService,private messageService: MessageService, private formBuilder: FormBuilder, private router: Router, private userdataService: UserdataService) { }

  get f() {
    return this.scheduleForm.controls;
  }

  ngOnInit() {
    this.userdataService.schedulenav = false;
    this.requesttimevar = false;
    this.schedulevar = true;
    this.customday = true;
    this.getuserSchedule();
    this.scheduleForm = this.formBuilder.group({
      DayName: [''],
      StartTimeHour: [''],
      StartTimeMinute: [''],
      StartTimeMeridian: [''],
      EndTimeHour: [''],
      EndTimeMinute: [''],
      EndTimeMeridian: ['']
    });
    this.timeoffForm = this.formBuilder.group({
      StartDate: [''],
      StartTimeHour: [''],
      StartTimeMinute: [''],
      StartTimeMeridian: [''],
      EndTimeHour: [''],
      EndTimeMinute: [''],
      EndTimeMeridian: [''],
      EndDate: ['']
    });
  }

  requesttimefunction(){
    if (this.requesttimevar == false && this.schedulevar == true){
      this.requesttimevar = true;
      this.schedulevar = false;
    }else {
      this.requesttimevar = false;
      this.schedulevar = true;
    }
  }

  selectedDays(selected_day){
    var index = this.arrayofselecteddays.indexOf(selected_day);
    if(index<0){
      this.arrayofselecteddays.push(selected_day);
    }else{
      this.arrayofselecteddays.splice(index, 1);
    }
  }

  selectdayobj(selected_obj){
    var index = this.arrayofselectedobj.indexOf(selected_obj);
    if(index<0){
      this.arrayofselectedobj.splice(index, 1);
      this.arrayofselectedobj.push(selected_obj);
    }
  }

  customtime(){
    if(this.customday === true){
      this.customday = false;
    }else{
      this.customday = true;
    }
  }

  openModal(id: string, userdetail) {
    this.modalService.open(id, userdetail);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  updateSchedule(userdata) {
    debugger;
    console.log(userdata, this.scheduleForm)
    userdata.DayName = this.arrayofselecteddays;
    // tslint:disable-next-line:triple-equals
    if (this.scheduleForm.status == 'VALID') {
      this.userdataService.add_schedule(userdata).subscribe((data) => {
        this.getuserSchedule();
        this.schedule = {};
        this.messageService.clear();
        this.messageService.add('Schedule added succesfully.');
      });
    } else {
      console.log(userdata, this.scheduleForm.status);
      this.submitted = true;
      if (this.scheduleForm.invalid) {
        return;
      }
    }
  }

  updateTimeoff(userdata) {
    console.log(userdata, this.timeoffForm)
    // tslint:disable-next-line:triple-equals
    if (this.timeoffForm.status == 'VALID') {
      this.userdataService.update_timeoff(userdata).subscribe((data) => {
        this.messageService.clear();
        this.messageService.add('Time Off added succesfully.');
      });
    } else {
      console.log(userdata, this.timeoffForm.status);
      this.submitted = true;
      if (this.timeoffForm.invalid) {
        return;
      }
    }
  }

  getuserSchedule() {
    this.userdataService.getUserSchedule().subscribe((data) => {
      this.userschedule = data;
      console.log(this.userschedule)
      // localStorage.setItem('companyId', data['ParentCompanyID']);
    });
  }

}
