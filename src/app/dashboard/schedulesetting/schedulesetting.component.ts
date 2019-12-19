import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UserdataService} from '../../userdata.service';

@Component({
  selector: 'app-schedulesetting',
  templateUrl: './schedulesetting.component.html',
  styleUrls: ['./schedulesetting.component.css']
})
export class SchedulesettingComponent implements OnInit {

  constructor(private router: Router, private userdataService: UserdataService) { }

  ngOnInit() {
    this.userdataService.schedulenav = false;
  }

}
