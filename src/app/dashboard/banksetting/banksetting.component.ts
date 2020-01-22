import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {UserdataService} from '../../userdata.service';

@Component({
  selector: 'app-banksetting',
  templateUrl: './banksetting.component.html',
  styleUrls: ['./banksetting.component.css']
})
export class BanksettingComponent implements OnInit {

  constructor(private router: Router, public userdataService: UserdataService) { }

  ngOnInit() {
    this.userdataService.banknav = false;
  }

}
