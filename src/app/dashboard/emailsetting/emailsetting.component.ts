import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UserdataService} from '../../userdata.service';
import {ModalService} from '../../_modal/modal.service';

@Component({
  selector: 'app-emailsetting',
  templateUrl: './emailsetting.component.html',
  styleUrls: ['./emailsetting.component.css']
})
export class EmailsettingComponent implements OnInit {

  constructor(private router: Router, private userdataService: UserdataService, private modalService: ModalService) { }

  ngOnInit() {
    this.userdataService.emailnav = false;
  }

}
