import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { ModalService } from '../../_modal/modal.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AdminService} from '../admin.service';
import {MessageService} from '../../message.service';
import { Subscription } from 'rxjs';
import { parse } from 'querystring';

@Component({
  selector: 'addrewards-modal',
  template: '<jw-modal id="add-reward">\n' +
    '        <div class="mobile-side">\n' +
    '        <!-- common headline -->\n' +
    '        <h3 *ngIf="addrewards" class="close-btn main-comm-head">\n' +
    '            <i class="icon-down-arrow com-arw" (click)="modalService.close(\'add-reward\')"></i>Generate <span>Rewards Program</span>\n' +
    '        </h3>\n' +
    '        <h3 *ngIf="updaterewards" class="close-btn main-comm-head">\n' +
    '            <i class="icon-down-arrow com-arw" (click)="modalService.close(\'add-reward\')"></i>Edit <span>Rewards Program</span>\n' +
    '        </h3>\n' +
    '        <!-- common headline end -->\n' +
    '        <form *ngIf="addrewards" id="addrewardsForm" [formGroup]="addrewardsForm" (ngSubmit)="addRewards(addrewardsForm.value)" class="popup-scrll">\n' +
    '\n' +
    '            <div class="filBox">\n' +
    '                <!-- start -->\n' +
    '                <div class="fill-box-in scrollbar">\n' +
    '                    <!-- start -->\n' +
    '                    <div class="form-group mt-2">\n' +
    '                        <input type="text" formControlName="ProgramName" id="prog-name" name="prog-name" class="form-field" [ngClass]="{ \'error\': submitted && f.ProgramName.errors }" />\n' +
    '                        <p class="form-label">Program Name</p>\n' +
    '                    </div>\n' +
    '                    <div class="form-textarea-group">\n' +
    '                        <textarea type="text" formControlName="Description" class="form-field"></textarea>\n' +
    '                        <p class="form-label">Message</p>\n' +
    '                    </div>\n' +
    '                    <div class="form-group">\n' +
    '                        <input type="text" formControlName="RewardPercentage" id="rewd-prec" name="rewd-prec" class="form-field" [ngClass]="{ \'error\': submitted && f.RewardPercentage.errors }" />\n' +
    '                        <p class="form-label">Rewards Percentage</p>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <!-- end -->\n' +
    '            </div>\n' +
    '\n' +
    '            <div class="popBtn">\n' +
    '                <button class="button line close-btn" (click)="modalService.close(\'add-reward\')" type="button">Cancel</button>\n' +
    '                <button class="button" type="submit">Add</button>\n' +
    '            </div>\n' +
    '\n' +
    '        </form>\n' +
    '        <form *ngIf="updaterewards" id="updaterewardsForm" [formGroup]="updaterewardsForm" (ngSubmit)="updateRewards(updaterewardsForm.value)" class="popup-scrll">\n' +
    '\n' +
    '            <div class="filBox" *ngFor="let reward of arrayofselectedobj">\n' +
    '                <!-- start -->\n' +
    '                <div class="fill-box-in scrollbar">\n' +
    '                    <!-- start -->\n' +
    '                    <div class="form-group mt-2">\n' +
    '                        <input type="text" formControlName="ProgramName" ngModel="{{reward.programName}}" id="prog-name" name="prog-name" class="form-field field--not-empty" required />\n' +
    '                        <p class="form-label">Program Name</p>\n' +
    '                    </div>\n' +
    '                    <div class="form-textarea-group">\n' +
    '                        <textarea type="text" formControlName="Description" ngModel="{{reward.description}}" class="form-field field--not-empty"></textarea>\n' +
    '                        <p class="form-label">Message</p>\n' +
    '                    </div>\n' +
    '                    <div class="form-group">\n' +
    '                        <input type="text" id="rewd-prec" ngModel="{{reward.rewardPercent}}" formControlName="RewardPercentage" name="rewd-prec" class="form-field field--not-empty" required />\n' +
    '                        <p class="form-label">Rewards Percentage</p>\n' +
    '                    </div>\n' +
    '                    <div class="form-group mt-2">\n' +
    '                        <select id="service-name" formControlName="IsActive" ngModel="{{reward.isActive}}" class="select-field form-field field--not-empty" name="status-name" required>\n' +
    '                            <option></option>\n' +
    '                            <option value="true">Active</option>\n' +
    '                            <option value="false">InActive</option>\n' +
    '                        </select>\n' +
    '                        <p class="form-label sel-blk">Status</p>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <!-- end -->\n' +
    '            </div>\n' +
    '\n' +
    '            <div class="popBtn">\n' +
    '                <button class="button line close-btn" (click)="modalService.close(\'add-reward\')" type="button">Cancel</button>\n' +
    '                <button class="button" type="submit">Update</button>\n' +
    '            </div>\n' +
    '\n' +
    '        </form>\n' +
    '\n' +
    '    </div>\n' +
    '    </jw-modal>'
})
export class AddRewardsComponent implements OnInit {
    addrewardsForm: FormGroup;
  updaterewardsForm: FormGroup;
  control: FormControl;
  submitted = false;
  @Input('addreward') addrewards: any;
  @Input('updatereward') updaterewards: any;
  @Input('rewardsobj') arrayofselectedobj: any;
  constructor(public AdminService: AdminService, private formBuilder: FormBuilder, private modalService: ModalService, private router: Router, private messageService: MessageService) { }

  get f() {
    return this.addrewardsForm.controls;
  }
  get f1() {
    return this.updaterewardsForm.controls;
  }
  ngOnInit() {
    this.addrewardsForm = this.formBuilder.group({
        ProgramName: ['', [Validators.required]],
        Description: [''],
        RewardPercentage: ['', [Validators.required]]
    });
    this.updaterewardsForm = this.formBuilder.group({
        ProgramName: ['', [Validators.required]],
        Description: [''],
        RewardPercentage: ['', [Validators.required]],
        IsActive: ['']
    });
  }

  addRewards(Admin) {
    debugger;
    Admin.RewardPercentage = parseFloat(Admin.RewardPercentage)
    // tslint:disable-next-line:triple-equals
    if (this.addrewardsForm.status == 'VALID') {
      this.AdminService.add_rewards(Admin).subscribe((data) => {
        this.AdminService.publish('call-reward');
        this.messageService.clear();
        this.messageService.add('Reward added successfully.')
        this.modalService.close('add-reward');
      });
    } else {
      console.log(Admin, this.addrewardsForm.status);
      this.submitted = true;
      if (this.addrewardsForm.invalid) {
        return;
      }
    }
  }

  updateRewards(Admin) {
    debugger;
    Admin.RewardId = parseInt(this.arrayofselectedobj[0].rewardId)
    Admin.RewardPercentage = parseFloat(Admin.RewardPercentage)
    Admin.IsActive = Boolean(Admin.IsActive)
    // tslint:disable-next-line:triple-equals
    if (this.updaterewardsForm.status == 'VALID') {
      this.AdminService.update_rewards(Admin).subscribe((data) => {
        this.AdminService.publish('call-reward');
        this.messageService.clear();
        this.messageService.add('Reward updated successfully.')
        this.modalService.close('add-reward');
      });
    } else {
      console.log(Admin, this.updaterewardsForm.status);
      this.submitted = true;
      if (this.updaterewardsForm.invalid) {
        return;
      }
    }
  }

}
