import { Component, OnInit } from '@angular/core';
import { CustomerService } from '.././customer.service';
import { FormBuilder } from '@angular/forms';
import { ModalService } from '../../_modal/modal.service';
import { Router } from '@angular/router';
import { MessageService } from '../../message.service';

@Component({
  selector: 'app-customerdashboard',
  templateUrl: './customerdashboard.component.html',
  styleUrls: ['./customerdashboard.component.css']
})

export class CustomerDashboardComponent implements OnInit {

  constructor(private customerService: CustomerService, private formBuilder: FormBuilder, private modalService: ModalService, private router: Router, private messageService: MessageService) { }

  ngOnInit() {
   
  }

}