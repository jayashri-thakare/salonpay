import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/_modal/modal.service';
import { Router } from '@angular/router';
import { CscService } from 'src/app/services/cscdropdown.service';
import { FormBuilder } from '@angular/forms';
import { UserdataService } from 'src/app/userdata.service';
import { MessageService } from 'src/app/message.service';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})

export class RolesComponent implements OnInit {
  admin: boolean;
  manager: boolean;
  employee: boolean;
  technician: boolean;
  addform: boolean;
  updateform: boolean;

  constructor(private AdminService: AdminService, private modalService: ModalService, private router: Router, private formBuilder: FormBuilder,
    private userdataService: UserdataService, private cscService: CscService,
    private messageService: MessageService) { }

  ngOnInit() {
    this.AdminService.rolesnav = false;
    this.admin = true;
    this.manager = false;
    this.employee = false;
    this.technician = false;
  }

  rolesfunction(type){
    if(type == 'manager'){
      this.admin = false;
      this.manager = true;
      this.employee = false;
      this.technician = false;
      document.querySelector('#admin').classList.remove('active');
      document.querySelector('#employee').classList.remove('active');
      document.querySelector('#technician').classList.remove('active');
      document.querySelector('#manager').classList.add('active');
    }else if(type == 'employee'){
      this.admin = false;
      this.manager = false;
      this.employee = true;
      this.technician = false;
      document.querySelector('#admin').classList.remove('active');
      document.querySelector('#technician').classList.remove('active');
      document.querySelector('#manager').classList.remove('active');
      document.querySelector('#employee').classList.add('active');
    }else if(type == 'technician'){
      this.admin = false;
      this.manager = false;
      this.employee = false;
      this.technician = true;
      document.querySelector('#admin').classList.remove('active');
      document.querySelector('#employee').classList.remove('active');
      document.querySelector('#manager').classList.remove('active');
      document.querySelector('#technician').classList.add('active');
    }else if(type == 'admin'){
      this.admin = true;
      this.manager = false;
      this.employee = false;
      this.technician = false;
      document.querySelector('#technician').classList.remove('active');
      document.querySelector('#employee').classList.remove('active');
      document.querySelector('#manager').classList.remove('active');
      document.querySelector('#admin').classList.add('active');
    }
  }

  addupdateform(type){
    if(type == 'add'){
      this.updateform = false;
      this.addform = true; 
    }else if(type == 'update'){
      this.updateform = true;
      this.addform = false;
    }
  }

  openModal(id: string, userdetail) {
    this.modalService.open(id, userdetail);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

}