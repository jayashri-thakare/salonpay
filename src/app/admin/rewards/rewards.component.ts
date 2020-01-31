import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { ModalService } from 'src/app/_modal/modal.service';
import { MessageService } from 'src/app/message.service';

@Component({
  selector: 'app-rewards',
  templateUrl: './rewards.component.html',
  styleUrls: ['./rewards.component.css']
})

export class AdminRewardsComponent implements OnInit {
  arrayofselectedobj: Array<any> = [];
  updaterewards: boolean;
  addrewards: boolean;
  subscription: any;
  adminrewards: any;

  constructor(private messageService: MessageService, private AdminService: AdminService, private modalService: ModalService) { }

  ngOnInit() {
    this.getRewards();
    this.subscription = this.AdminService.on('call-reward').subscribe(() => this.getRewards());
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
      this.updaterewards = false;
      this.addrewards = true; 
    }else if(type == 'update'){
      this.updaterewards = true;
      this.addrewards = false;
    }
  }

  getRewards() {
    this.AdminService.GetRewardsList().subscribe((data) => {
      this.adminrewards = data;
      this.adminrewards = this.adminrewards.list;
      console.log(this.adminrewards)
      // localStorage.setItem('companyId', data['ParentCompanyID']);
    });
  }

  deleteRewards(selected_product) {
    debugger;
    // tslint:disable-next-line:triple-equals
    if (selected_product) {
      this.AdminService.deleteReward(selected_product[0].rewardId).subscribe((data) => {
        console.log(data)
        this.getRewards();
        this.messageService.clear();
        this.messageService.add(data['result']);
      });
    }
  }

}