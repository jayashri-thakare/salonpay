import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { ModalService } from '../../_modal/modal.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AdminService} from '../admin.service';
import {MessageService} from '../../message.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'addpayperiod-modal',
  styleUrls: ['./business.component.css'],
  template: '<jw-modal id="add-payperiod">\n' +
  '        <div class="mobile-side">\n' +
  '        <!-- common headline -->\n' +
  '        <h3 class="close-btn main-comm-head">\n' +
  '            <i class="icon-down-arrow com-arw"></i>Pay <span>Period</span>\n' +
  '        </h3>\n' +
  '        <!-- common headline end -->\n' +
  '        <form *ngIf="addpayperiod" [formGroup]="addpayperiodForm" (ngSubmit)="createpayperiod(addpayperiodForm.value)" id="addProfile" class="popup-scrll">\n' +
  '\n' +
  '            <div class="filBox">\n' +
  '                <!-- start -->\n' +
  '                <div class="fill-box-in scrollbar scroll-padding">\n' +
  '                    <!-- start -->\n' +
  '                    <div class="form-group">\n' +
  '                        <select class="select-field form-field field--not-empty" formControlName="PayPeriodId" id="select-fld" required>\n' +
  '                            <option></option>\n' +
  '                            <option value="1">Weekly</option>\n' +
  '                            <option value="2">Every Other Week</option>\n' +
  '                            <option value="3">Once A Month</option>\n' +
  '                            <option value="4">Twice A Month</option>\n' +
  '                        </select>\n' +
  '                        <p class="form-label sel-blk">Pay Period</p>\n' +
  '                    </div>\n' +
  '                 <h6 class="poptile">Pay Period Date</h6>\n' +
  '                 <div class="form-group form-field field--not-empty">\n' +
  '                      <ejs-datetimepicker id=\'datetimepicker\' formControlName="PayPeriodDate" placeholder=\'PayPeriod Date\' format =\'M/dd/yyyy\'></ejs-datetimepicker>' +
  '                 </div>\n' +
  '                 <div class="form-group form-field field--not-empty">\n' +
  '                        <ejs-daterangepicker id=\'DateRangePicker\' placeholder=\'Select Date Range\' [(ngModel)]="DateRangePicker" formControlName="StartDate" format="M/dd/yyyy"></ejs-daterangepicker>\n' +
  '                 </div>\n' +         
  '                    <div class="form-group mt-2">\n' +
  '                        <input type="text" id="first-name" formControlName="Value" name="first-name" class="form-field field--not-empty"\n' +
  '                            required value="shorturl.at/bgxEY" />\n' +
  '                        <p class="form-label">Cash\Cheque Split</p>\n' +
  '                    </div>\n' +
  '                    <!-- end -->\n' +
  '                </div>\n' +
  '                <!-- end -->\n' +
  '            </div>\n' +
  '\n' +
  '            <div class="popBtn">\n' +
  '                <button class="button line close-btn" type="button">Cancel</button>\n' +
  '                <button class="button" type="submit">Create</button>\n' +
  '            </div>\n' +
  '\n' +
  '        </form>\n' +
  '        <form *ngIf="updatepayperiod" [formGroup]="updatepayperiodForm" (ngSubmit)="updatepayperiodfunc(updatepayperiodForm.value)" id="editProfile" class="popup-scrll">\n' +
  '\n' +
  '            <div class="filBox">\n' +
  '                <!-- start -->\n' +
  '                <div class="fill-box-in scrollbar scroll-padding" *ngFor="let payperiod of arrayofselectedobj">\n' +
  '                    <!-- start -->\n' +
  '                    <div class="form-group">\n' +
  '                        <select class="select-field form-field" ngModel="{{payperiod.payPeriodId}}" formControlName="PayPeriodId" id="select-fld" required>\n' +
  '                            <option></option>\n' +
  '                            <option value="0">Weekly</option>\n' +
  '                            <option value="1">Every Other Week</option>\n' +
  '                            <option value="2">Once A Month</option>\n' +
  '                            <option value="3">Twice A Month</option>\n' +
  '                        </select>\n' +
  '                        <p class="form-label sel-blk">Pay Period</p>\n' +
  '                    </div>\n' +
  '                 <h6 class="poptile">Pay Period Date</h6>\n' +
  '                 <div class="form-group form-field field--not-empty">\n' +
  '                      <ejs-datetimepicker id=\'datetimepicker\' ngModel="{{payperiod.payPeriodDate}}" formControlName="PayPeriodDate" placeholder=\'PayPeriod Date\' format =\'M/dd/yyyy\'></ejs-datetimepicker>' +
  '                 </div>\n' +
  '                 <div class="form-group form-field field--not-empty">\n' +
  '                        <ejs-daterangepicker id=\'DateRangePicker\' placeholder=\'Select Date Range\' [(ngModel)]="DateRangePicker" formControlName="StartDate" format="M/dd/yyyy"></ejs-daterangepicker>\n' +
  '                 </div>\n' + 
  '                    <div class="form-group mt-2">\n' +
  '                        <input type="text" id="first-name" ngModel="{{payperiod.value}}" formControlName="Value" name="first-name" class="form-field"\n' +
  '                            required />\n' +
  '                        <p class="form-label">Cash or Cheque Split</p>\n' +
  '                    </div>\n' +
  '                    <!-- end -->\n' +
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
  '    </jw-modal>'
})
export class AddPayPeriodComponent implements OnInit {
    addpayperiodForm: FormGroup;
  updatepayperiodForm: FormGroup;
  control: FormControl;
  submitted = false;
  @Input('addpayperiod') addpayperiod: any;
  @Input('updatepayperiod') updatepayperiod: any;
  @Input('payperiodobj') arrayofselectedobj: Array<any>=[];
  constructor(public AdminService: AdminService, private formBuilder: FormBuilder, private modalService: ModalService, private router: Router, private messageService: MessageService) { }

  
  get f() {
    return this.addpayperiodForm.controls;
  }
  get f1() {
    return this.updatepayperiodForm.controls;
  }  

  ngOnInit() {
    this.addpayperiodForm = this.formBuilder.group({
        Value: [''],
        PayPeriodId: [''],
        PayPeriodDate: ['']
    });
    this.updatepayperiodForm = this.formBuilder.group({
        Value: [''],
        PayPeriodId: [''],
        PayPeriodDate: ['']
    });
  }

  createpayperiod(Admin) {
    debugger;
    console.log(Admin)
    Admin.PayPeriodDate = Admin.PayPeriodDate.toDateString();
    Admin.PayPeriodId = parseInt(Admin.PayPeriodId);
    // tslint:disable-next-line:triple-equals
    if (this.addpayperiodForm.status == 'VALID') {
      this.AdminService.add_payperiod(Admin).subscribe((data) => {
        this.AdminService.publish('call-payperiod');
        this.messageService.clear();
        this.messageService.add('Pay Period added successfully.')
        this.modalService.close('add-payperiod');
      });
    } else {
      console.log(Admin, this.addpayperiodForm.status);
      this.submitted = true;
      if (this.addpayperiodForm.invalid) {
        return;
      }
    }
  }

  updatepayperiodfunc(Admin) {
    debugger;
    console.log(Admin)
    Admin.PayPeriodDate = Admin.PayPeriodDate.toDateString();
    Admin.PayPeriodId = parseInt(Admin.PayPeriodId);
    // tslint:disable-next-line:triple-equals
    if (this.updatepayperiodForm.status == 'VALID') {
      this.AdminService.add_payperiod(Admin).subscribe((data) => {
        this.AdminService.publish('call-payperiod');
        this.messageService.clear();
        this.messageService.add('Pay Period updated successfully.')
        this.modalService.close('add-payperiod');
      });
    } else {
      console.log(Admin, this.updatepayperiodForm.status);
      this.submitted = true;
      if (this.updatepayperiodForm.invalid) {
        return;
      }
    }
  }

}
