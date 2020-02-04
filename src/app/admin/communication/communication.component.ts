import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-communication',
  templateUrl: './communication.component.html',
  styleUrls: ['./communication.component.css']
})

export class AdminCommunicationComponent implements OnInit {
  emailvar: boolean;
  smsvar: boolean;
  addemail: boolean;
  addsms: boolean;
  smstemp: boolean;
  emailtemp: boolean;
  subscription: any;
  adminsms: any;
  adminemail: any;
  adminemailandsms: any;
  arrayofselectedobj: Array<any> = [];
  updateemail: boolean;
  addemailvar: boolean;

  constructor(public AdminService: AdminService) { }

  ngOnInit() {
    this.emailvar = true;
    this.emailtemp = true;
    this.smstemp = true;
    this.getEmailAndSmsTemplateList();
    this.subscription = this.AdminService.on('back-email').subscribe(() => this.addnewemail(''));
    this.subscription = this.AdminService.on('call-email').subscribe(() => this.getEmailAndSmsTemplateList());
  }

  emailsms(){
    if(this.emailvar){
      this.emailvar = false;
      this.smsvar = true;
    }else{
      this.emailvar = true;
      this.smsvar = false;
    }
  }

  addnewemail(type){
    if(type == 'addemail'){
      this.addemail = true;
      this.emailtemp = false;
    }else{
      this.addemail = false;
      this.emailtemp = true;
    }
    if(type == 'addsms'){
      this.addsms = true;
      this.smstemp = false;
    }else{
      this.addsms = false;
      this.smstemp = true;
    }
  }

  selectproductobj(selected_obj){
    var index = this.arrayofselectedobj.indexOf(selected_obj);
    if(index<0){
      this.arrayofselectedobj.splice(index, 1);
      this.arrayofselectedobj.push(selected_obj);
    }
    console.log(this.arrayofselectedobj)
  }

  addupdateform(type){
    if(type == 'add'){
      this.updateemail = false;
      this.addemailvar = true;
    }else if(type == 'update'){
      this.updateemail = true;
      this.addemailvar = false;
    }
  }

  getEmailAndSmsTemplateList() {
    this.AdminService.GetEmailAndSmsTemplateList().subscribe((data) => {
      this.adminemailandsms = data;
      this.adminemail = this.adminemailandsms[0].masterEmailTemplates;
      this.adminsms = this.adminemailandsms[0].masterSmsTemplates;
      console.log(this.adminemailandsms, this.adminemail, this.adminsms)
      // localStorage.setItem('companyId', data['ParentCompanyID']);
    });
  }

}