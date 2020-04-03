import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { ModalService } from '../../_modal/modal.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AdminService} from '../admin.service';
import {MessageService} from '../../message.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'addservices-modal',
  template: '<jw-modal id="add-services">\n' +
  '        <div class="mobile-side">\n' +
  '        <!-- common headline -->\n' +
  '        <h3 *ngIf="addServices" class="close-btn main-comm-head" (click)="closeModal(\'add-services\');">\n' +
  '            <i class="icon-down-arrow com-arw"></i>Add <span>services category</span>\n' +
  '        </h3>\n' +
  '        <h3 *ngIf="updateServices" class="close-btn main-comm-head" (click)="closeModal(\'add-services\');">\n' +
  '            <i class="icon-down-arrow com-arw"></i>Update <span>services category</span>\n' +
  '        </h3>\n' +
  '        <!-- common headline end -->\n' +
  '        <form *ngIf="addServices" [formGroup]="addservicesForm" (ngSubmit)="createServices(addservicesForm.value)" id="addProfile" class="popup-scrll">\n' +
  '\n' +
  '            <div class="filBox">\n' +
  '                <!-- start -->\n' +
  '                <div class="fill-box-in scrollbar">\n' +
  '                    <!-- start -->\n' +
  '                    <div class="form-group mt-2">\n' +
  '                        <input type="text" id="first-name" formControlName="CategoryType" name="first-name" class="form-field"\n' +
  '                            required />\n' +
  '                        <p class="form-label">Category Type</p>\n' +
  '                    </div>\n' +
  '                    <!-- end -->\n' +
  '                </div>\n' +
  '                <!-- end -->\n' +
  '            </div>\n' +
  '\n' +
  '            <div class="popBtn">\n' +
  '                <button class="button line close-btn" type="button" (click)="closeModal(\'add-services\');">Cancel</button>\n' +
  '                <button class="button" type="submit">Create</button>\n' +
  '            </div>\n' +
  '\n' +
  '        </form>\n' +
  '        <form *ngIf="updateServices" [formGroup]="updateservicesForm" (ngSubmit)="updateService(updateservicesForm.value)" id="editProfile" class="popup-scrll">\n' +
  '\n' +
  '            <div class="filBox">\n' +
  '                <!-- start -->\n' +
  '                <div class="fill-box-in scrollbar" *ngFor="let CategoryType of arrayofselectedobj">\n' +
  '                    <!-- start -->\n' +
  '                    <div class="form-group mt-2">\n' +
  '                        <input type="text" id="first-name" formControlName="CategoryType" ngModel="{{CategoryType?.categoryType}}" name="first-name" class="form-field field--not-empty"\n' +
  '                            required value="shorturl.at/bgxEY" />\n' +
  '                        <p class="form-label">Category Type</p>\n' +
  '                    </div>\n' +
  '                    <!-- end -->\n' +
  '                </div>\n' +
  '                <!-- end -->\n' +
  '            </div>\n' +
  '\n' +
  '            <div class="popBtn">\n' +
  '                <button class="button line close-btn" type="button" (click)="closeModal(\'add-services\');">Cancel</button>\n' +
  '                <button class="button" type="submit">Update</button>\n' +
  '            </div>\n' +
  '\n' +
  '        </form>\n' +
  '\n' +
  '    </div>\n' +
  '    </jw-modal>'
})
export class AddServicesComponent implements OnInit {
    addservicesForm: FormGroup;
    updateservicesForm: FormGroup;
  control: FormControl;
  submitted = false;
  @Input('addServices') addServices: any;
  @Input('updateServices') updateServices: any;
  @Input('Servicesobj') arrayofselectedobj: Array<any>=[];
  constructor(public AdminService: AdminService, private formBuilder: FormBuilder, private modalService: ModalService, private router: Router, private messageService: MessageService) { }


  get f() {
    return this.addservicesForm.controls;
  }
  get f1() {
    return this.updateservicesForm.controls;
  }
  closeModal(id: string) {
    this.modalService.close(id);
  }
  ngOnInit() {
    this.addservicesForm = this.formBuilder.group({
        CategoryType: ['']
    });
    this.updateservicesForm = this.formBuilder.group({
        CategoryType: ['']
    });
  }

  createServices(Admin) {
    console.log(Admin)
    // tslint:disable-next-line:triple-equals
    if (this.addservicesForm.status == 'VALID') {
      this.AdminService.add_services(Admin).subscribe((data) => {
        this.AdminService.publish('call-services');
        this.messageService.clear();
        this.messageService.add('Service Category added successfully.')
        this.modalService.close('add-services');
      });
    } else {
      console.log(Admin, this.addservicesForm.status);
      this.submitted = true;
      if (this.addservicesForm.invalid) {
        return;
      }
    }
  }

  updateService(Admin) {
    console.log(Admin)
    Admin.ServiceCategoryId = this.arrayofselectedobj[0].serviceCategoryId;
    // tslint:disable-next-line:triple-equals
    if (this.updateservicesForm.status == 'VALID') {
      this.AdminService.update_services(Admin).subscribe((data) => {
        this.AdminService.publish('call-services');
        this.messageService.clear();
        this.messageService.add('Service Category updated successfully.')
        this.modalService.close('add-services');
      });
    } else {
      console.log(Admin, this.updateservicesForm.status);
      this.submitted = true;
      if (this.updateservicesForm.invalid) {
        return;
      }
    }
  }

}
