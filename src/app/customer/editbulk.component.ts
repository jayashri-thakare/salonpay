import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { ModalService } from '../_modal/modal.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomerService} from '../customer/customer.service';
import {MessageService} from '../message.service';

@Component({
  selector: 'editbulk-modal',
  template: '  <jw-modal id="side-menu-updateData">\n' + 
    '    <div class="mobile-side">\n' +
    '        <!-- common headline -->\n' +
    '        <h3 class="close-btn main-comm-head">\n' +
    '            <i class="icon-down-arrow com-arw"></i>Bulk <span>Edit</span>\n' +
    '        </h3>\n' +
    '        <!-- common headline end -->\n' +
    '        <form id="editProfile" class="popup-scrll">\n' +
    '\n' +
    '            <div class="filBox">\n' +
    '                <!-- start -->\n' +
    '                <div class="fill-box-in scrollbar">\n' +
    '                    <!-- start -->\n' +
    '                    <div class="form-group mt-2">\n' +
    '                        <select class="select-field form-field" name="select-fld" id="select-fld" required="">\n' +
    '                            <option></option>\n' +
    '                            <option>Option 1</option>\n' +
    '                            <option>Option 2</option>\n' +
    '                            <option>Option 3</option>\n' +
    '                            <option>Option 4</option>\n' +
    '                            <option>Option 5</option>\n' +
    '                        </select>\n' +
    '                        <p class="form-label sel-blk">Rewards</p>\n' +
    '                    </div>\n' +
    '                    <div class="form-group form-group-var">\n' +
    '                        <input type="number" id="variance" name="variance" class="form-field" required="">\n' +
    '                        <span class="var-chart">$</span>\n' +
    '                        <p class="form-label">Variance</p>\n' +
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
    '  </jw-modal>'
})
export class EditBulkCustomerComponent implements OnInit {

  constructor(private customerService: CustomerService, private formBuilder: FormBuilder, private modalService: ModalService, private router: Router, private messageService: MessageService) { }

  ngOnInit() {

  }

}
