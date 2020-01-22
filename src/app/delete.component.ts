import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { ModalService } from './_modal/modal.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AdminService} from './admin/admin.service';
import {MessageService} from '../app/message.service';

@Component({
  selector: 'delete-modal',
  template: '<div class="modal fade" id="deletePopup">\n'+
    '<div class="modal-dialog medium-window">\n'+
    '    <div class="modal-content">\n'+
    '        <div class="modalCancel" data-dismiss="modal"><i class="icon-cir-plus"></i></div>\n'+

    '        <h2 class="modal-title">Are you sure you want to delete this Template?</h2>\n'+

    '        <div class="modal-btn">\n'+
    '            <button class="button line mr-2" data-dismiss="modal">No</button>\n'+
    '            <button class="button red" data-dismiss="modal">Yes</button>\n'+
    '        </div>\n'+

    '    </div>\n'+
    '</div>\n'+
'</div>'
})
export class DeleteComponent implements OnInit {

  constructor(private AdminService: AdminService, private formBuilder: FormBuilder, private modalService: ModalService, private router: Router, private messageService: MessageService) { }
  
  ngOnInit() {
  }

}
