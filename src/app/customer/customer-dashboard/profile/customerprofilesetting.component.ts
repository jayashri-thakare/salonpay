import { Component, OnInit, Input } from '@angular/core';
import { CustomerService } from '../../customer.service';
import { FormBuilder } from '@angular/forms';
import { ModalService } from '../../../_modal/modal.service';
import { Router } from '@angular/router';
import { MessageService } from '../../../message.service';

@Component({
  selector: 'app-customer-profilesetting',
  template: '<!-- start -->\n' +
    '        <div class="row mb-5">\n' +
    '            <div class="usr-pro-box-flex usr-pro-box-flex-4">\n' +
    '                <div class="pro-comm-fle mt-4">\n' +
    '                    <h6>Reminder</h6>\n' +
    '                </div>\n' +
    '                <!-- start -->\n' +
    '                <div class="prof-comm-shad cust-reminder">\n' +
    '                    <div class="comm-cont">\n' +
    '                        <p>Email</p>\n' +
    '                        <div class="switch switch--horizontal m-0">\n' +
    '                            <input id="email-rim-off" type="radio" name="email-switch" (click)="updateStatus(false, \'emailReminder\')">\n' +
    '                            <label for="email-rim-off">Off</label>\n' +
    '                            <input id="email-rim-on" type="radio" name="email-switch" (click)="updateStatus(true, \'emailReminder\')" [checked]="customerProfile?.emailReminder">\n' +
    '                            <label for="email-rim-on">On</label><span class="toggle-outside"><span\n' +
    '                                    class="toggle-inside"></span></span>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                    <div class="comm-cont">\n' +
    '                        <p>SMS</p>\n' +
    '                        <div class="switch switch--horizontal m-0">\n' +
    '                            <input id="sms-rim-off" type="radio" name="sms-switch" (click)="updateStatus(false, \'smsReminder\')">\n' +
    '                            <label for="sms-rim-off">Off</label>\n' +
    '                            <input id="sms-rim-on" type="radio" name="sms-switch" (click)="updateStatus(true, \'smsReminder\')" [checked]="customerProfile?.smsReminder">\n' +
    '                            <label for="sms-rim-on">On</label><span class="toggle-outside"><span\n' +
    '                                    class="toggle-inside"></span></span>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <!-- end -->\n' +
    '            </div>\n' +
    '\n' +
    '            <div class="usr-pro-box-flex usr-pro-box-flex-4">\n' +
    '                <div class="pro-comm-fle mt-4">\n' +
    '                    <h6>others</h6>\n' +
    '                </div>\n' +
    '                <!-- start -->\n' +
    '                <div class="prof-comm-shad cust-reminder">\n' +
    '                    <div class="comm-cont">\n' +
    '                        <p>Category</p>\n' +
    '                        <div class="switch switch--horizontal m-0">\n' +
    '                            <input id="cate-rim-off" type="radio" name="cate-switch">\n' +
    '                            <label for="cate-rim-off">New</label>\n' +
    '                            <input id="cate-rim-on" type="radio" name="cate-switch" >\n' +
    '                            <label for="cate-rim-on">Existing</label><span class="toggle-outside"><span\n' +
    '                                    class="toggle-inside"></span></span>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                    <div class="comm-cont">\n' +
    '                        <p>Status</p>\n' +
    '                        <div class="switch switch--horizontal m-0">\n' +
    '                            <input id="status-rim-off" type="radio" name="status-switch" (click)="updateStatus(false, \'status\')" >\n' +
    '                            <label for="status-rim-off">Inactive</label>\n' +
    '                            <input id="status-rim-on" type="radio" name="status-switch" (click)="updateStatus(true, \'status\')" [checked]="customerProfile?.isActive">\n' +
    '                            <label for="status-rim-on">Active</label><span class="toggle-outside"><span\n' +
    '                                    class="toggle-inside"></span></span>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <!-- end -->\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <!-- end -->'
})

export class CustomerProfileSettingComponent implements OnInit {
  
  @Input('customerProfile') customerProfile: any;
  status: {};

  constructor(private customerService: CustomerService, private formBuilder: FormBuilder, private modalService: ModalService, private router: Router, private messageService: MessageService) { }

  ngOnInit() {

  }

  updateStatus(customer, type) {
    debugger;
    if(type == 'status'){
      this.status = {}
      this.status['isActive'] = JSON.parse(customer)
      this.customerService.update_status(this.status).subscribe((data) => {
        this.customerService.publish('call-profileDetail');
        this.status = {};
        this.messageService.clear();
        this.messageService.add(data['message'])
      });
    }else if(type == 'emailReminder'){
      this.status = {}
      this.status['emailReminder'] = JSON.parse(customer)
      this.customerService.update_emailRemainder(this.status).subscribe((data) => {
        this.customerService.publish('call-profileDetail');
        this.status = {};
        this.messageService.clear();
        this.messageService.add(data['message'])
      });
    }else if(type == 'smsReminder'){
      this.status = {}
      this.status['smsReminder'] = JSON.parse(customer)
      this.customerService.update_smsRemainder(this.status).subscribe((data) => {
        this.customerService.publish('call-profileDetail');
        this.status = {};
        this.messageService.clear();
        this.messageService.add(data['message'])
      });
    }
  }

}
