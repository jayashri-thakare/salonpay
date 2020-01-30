import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-rewards',
  templateUrl: './rewards.component.html',
  styleUrls: ['./rewards.component.css']
})

export class AdminRewardsComponent implements OnInit {

  constructor(private AdminService: AdminService) { }

  ngOnInit() {
    this.AdminService.rewardsnav = false;
  }

}