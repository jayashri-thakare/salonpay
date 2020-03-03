import {Component, ComponentRef, EventEmitter, Input, OnInit, Output, ViewChild, ViewContainerRef} from '@angular/core';
import { CustomerService } from '../.././customer.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalService } from '../../../_modal/modal.service';
import { Router } from '@angular/router';
import { MessageService } from '../../../message.service';

@Component({
  selector: 'customer-addnotes-modal',
  template: ' <jw-modal id="add-new-popup">' +
    '<form id="addNote" [formGroup]="addNoteForm" (ngSubmit)="saveNote(addNoteForm.value)"> \n' +
    '   <div class="comm-note comm-popup-box" >\n' +
    '        <div class="comm-head close-desp">\n' +
    '            <h6>Add New Note</h6>\n' +
    '            <i class="icon-cir-cross" (click)="modalService.closeNote(\'add-new-popup\')"></i>\n' +
    '        </div>\n' +
    '        <div class="suprt-body">\n' +
    '            <div class="form-group">\n' +
    '                <input type="text" id="title" class="form-field" ngModel="{{customerService.note?.title}}" formControlName="Title">\n' +
    '                <p class="form-label">Title</p>\n' +
    '            </div>\n' +
    '            <div class="form-textarea-group">\n' +
    '                <textarea type="text" class="form-field" ngModel="{{customerService.note?.description}}" formControlName="Description"></textarea>\n' +
    '                <p class="form-label">Description</p>\n' +
    '            </div>\n' +
    '            <div class="text-center">\n' +
    '                <button class="button">Save</button>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '    </form>\n' +
    '</jw-modal>'
})
export class CustomerAddNotesComponent implements OnInit {
  addNoteForm: FormGroup;
  control: FormControl;
  submitted = false;
  // @Input('userdata') customerdetail: any;
  private Title: string[];
  constructor(private modalService: ModalService, private router: Router, private formBuilder: FormBuilder,
              public customerService: CustomerService, private messageService: MessageService) { }
  //
  private msg: string;
  get f() {
    return this.addNoteForm.controls;
  }

  ngOnInit() {
    this.addNoteForm = this.formBuilder.group({
      Title: [''],
      Description: [''],
    });
  }

  saveNote(note){
    note['ClientType'] = 'Customer';
    note['ClientId'] = localStorage.getItem('Arrayofcustomer');
    // tslint:disable-next-line:triple-equals
    // @ts-ignore
    if (this.customerService.note != '') {
      note['Id'] = this.customerService.note['id'];
      this.msg = "Note updated successfully."
    } else{
      this.msg = "Note created successfully."
    }
    this.customerService.addNote(note).subscribe((data) => {
      this.messageService.clear();
      if(data['success']==0){
        this.messageService.add("You are not authorize to update this note.")
      }else {
        this.customerService.publish('call-notes');
        this.messageService.add(this.msg);
      }
      this.modalService.closeNote('add-new-popup')
    });
  }
}
