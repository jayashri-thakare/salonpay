import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { ModalService } from '../../_modal/modal.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AdminService} from '../admin.service';
import {MessageService} from '../../message.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'addreview-modal',
  template: '<jw-modal id="add-review">\n' +
  '        <div class="mobile-side">\n' +
  '        <!-- common headline -->\n' +
  '        <h3 class="close-btn main-comm-head" >\n' +
  '            <i class="icon-down-arrow com-arw"></i>Google <span>Review URL</span>\n' +
  '        </h3>\n' +
  '        <!-- common headline end -->\n' +
  '        <form *ngIf="addReview" [formGroup]="addreviewForm" (ngSubmit)="createReviews(addreviewForm.value)" id="addProfile" class="popup-scrll">\n' +
  '\n' +
  '            <div class="filBox">\n' +
  '                <!-- start -->\n' +
  '                <div class="fill-box-in scrollbar">\n' +
  '                    <!-- start -->\n' +
  '                    <div class="form-group mt-2">\n' +
  '                        <input type="text" id="first-name" formControlName="Link" name="first-name" class="form-field"\n' +
  '                            required value="shorturl.at/bgxEY" />\n' +
  '                        <p class="form-label">Link</p>\n' +
  '                    </div>\n' +
  '                    <!-- end -->\n' +
  '                </div>\n' +
  '                <!-- end -->\n' +
  '            </div>\n' +
  '\n' +
  '            <div class="popBtn">\n' +
  '                <button class="button line close-btn" type="button" (click)="closeModal(\'add-review\');">Cancel</button>\n' +
  '                <button class="button" type="submit">Create</button>\n' +
  '            </div>\n' +
  '\n' +
  '        </form>\n' +
  '        <form *ngIf="updateReview" [formGroup]="updatereviewForm" (ngSubmit)="updateReviews(updatereviewForm.value)" id="editProfile" class="popup-scrll">\n' +
  '\n' +
  '            <div class="filBox">\n' +
  '                <!-- start -->\n' +
  '                <div class="fill-box-in scrollbar" *ngFor="let review of arrayofselectedobj">\n' +
  '                    <!-- start -->\n' +
  '                    <div class="form-group mt-2">\n' +
  '                        <input type="text" id="first-name" formControlName="Link" ngModel="{{review.link}}" name="first-name" class="form-field field--not-empty"\n' +
  '                            required value="shorturl.at/bgxEY" />\n' +
  '                        <p class="form-label">Link</p>\n' +
  '                    </div>\n' +
  '                    <!-- end -->\n' +
  '                </div>\n' +
  '                <!-- end -->\n' +
  '            </div>\n' +
  '\n' +
  '            <div class="popBtn">\n' +
  '                <button class="button line close-btn" type="button" (click)="closeModal(\'add-review\');">Cancel</button>\n' +
  '                <button class="button" type="submit">Update</button>\n' +
  '            </div>\n' +
  '\n' +
  '        </form>\n' +
  '\n' +
  '    </div>\n' +
  '    </jw-modal>'
})
export class AddReviewComponent implements OnInit {
    addreviewForm: FormGroup;
  updatereviewForm: FormGroup;
  control: FormControl;
  submitted = false;
  @Input('addReview') addReview: any;
  @Input('updateReview') updateReview: any;
  @Input('Reviewobj') arrayofselectedobj: Array<any>=[];
  constructor(public AdminService: AdminService, private formBuilder: FormBuilder, private modalService: ModalService, private router: Router, private messageService: MessageService) { }


  get f() {
    return this.addreviewForm.controls;
  }
  get f1() {
    return this.updatereviewForm.controls;
  }
  closeModal(id: string) {
    this.modalService.close(id);
  }
  ngOnInit() {
    this.addreviewForm = this.formBuilder.group({
        Link: ['']
    });
    this.updatereviewForm = this.formBuilder.group({
        Link: ['']
    });
  }

  createReviews(Admin) {
    console.log(Admin)
    // tslint:disable-next-line:triple-equals
    if (this.addreviewForm.status == 'VALID') {
      this.AdminService.add_review(Admin).subscribe((data) => {
        this.AdminService.publish('call-review');
        this.messageService.clear();
        this.messageService.add('Review added successfully.')
        this.modalService.close('add-review');
      });
    } else {
      console.log(Admin, this.addreviewForm.status);
      this.submitted = true;
      if (this.addreviewForm.invalid) {
        return;
      }
    }
  }

  updateReviews(Admin) {
    console.log(Admin)
    // tslint:disable-next-line:triple-equals
    if (this.updatereviewForm.status == 'VALID') {
      this.AdminService.update_review(Admin).subscribe((data) => {
        this.AdminService.publish('call-review');
        this.messageService.clear();
        this.messageService.add('Review updated successfully.')
        this.modalService.close('add-review');
      });
    } else {
      console.log(Admin, this.updatereviewForm.status);
      this.submitted = true;
      if (this.updatereviewForm.invalid) {
        return;
      }
    }
  }

}
