import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../.././customer.service';
import { FormBuilder } from '@angular/forms';
import { ModalService } from '../../../_modal/modal.service';
import { Router } from '@angular/router';
import { MessageService } from '../../../message.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-customer-notes',
  templateUrl: './notes.component.html'
})

export class CustomerNotesComponent implements OnInit {
  private notes: Observable<any>;

  constructor(private customerService: CustomerService, private formBuilder: FormBuilder, private modalService: ModalService, private router: Router, private messageService: MessageService) { }

  ngOnInit() {
    this.getNotes();
  }

  getNotes(){
    this.customerService.getNotes().subscribe((data) => {
      this.notes = data['list'];
    });
  }
}
