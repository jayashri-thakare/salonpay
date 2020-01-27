import {Component, Input, OnInit} from '@angular/core';
import {ModalService} from '../../_modal/modal.service';
import {MessageService} from '../../message.service';
import {FormBuilder} from '@angular/forms';
import {AdminService} from '../admin.service';

@Component({
  selector: 'app-userdetail',
  template: '<div id="inner-tab1" *ngIf="adminService.showTab == 1" > \n' +
    '                                <div *ngFor="let userdetail of userlist" >\n' +
    '                                    <div *ngIf="adminService.selecteduserid==userdetail.user.id">\n' +
    '                                <!-- user details start -->\n' +
    '                                <!-- start -->\n' +
    '                                <div class="comm-headline-btn comm-headline-btn-admin">\n' +
    '                                    <h3 class="main-comm-head m-0">\n' +
    '                                        User <span>Details</span>\n' +
    '                                        <i class="icon-question rig-icn" data-toggle="tooltip" data-placement="right"\n' +
    '                                            title="Merge Sales"></i>\n' +
    '                                    </h3>\n' +
    '                                    <a class="button addbtncol" (click)="openModal(\'add-tax-table1\');updateform(\'update\');">Update</a>\n' +
    '                                </div>\n' +
    '                                <!-- end -->\n' +
    '                                <div class="admin-comm-rig-scroll scrollbar" >\n' +
    '                                    <!-- start -->\n' +
    '                                    <div class="avatar-upload inventory-image">\n' +
    '                                        <div class="avatar-edit">\n' +
    '                                            <input type="file" id="imageUpload" accept=".png, .jpg, .jpeg">\n' +
    '                                            <label for="imageUpload"><i class="icon-uploading grd-icon"></i></label>\n' +
    '                                        </div>\n' +
    '                                        <div class="avatar-preview">\n' +
    '                                            <div id="imagePreview" style="background-image: url(../../../assets/img/usr-profile.svg);">\n' +
    '                                            </div>\n' +
    '                                        </div>\n' +
    '                                    </div>\n' +
    '                                    <!-- end -->\n' +
    '\n' +
    '                                    <!-- start -->\n' +
    '                                    <div class="row">\n' +
    '                                        <div class="w100">\n' +
    '                                            <!-- start -->\n' +
    '                                            <h6 class="poptile">Personal Info</h6>\n' +
    '                                            <div class="prof-comm-shad mb-4">\n' +
    '                                                <div class="comm-cont w33 w-1200-50 mb-1200-10 p-0">\n' +
    '                                                    <p>First Name</p>\n' +
    '                                                    <h6>{{userdetail.user.firstName}}</h6>\n' +
    '                                                </div>\n' +
    '                                                <div class="comm-cont w33 w-1200-50 mb-1200-10 p-0">\n' +
    '                                                    <p>Last Name</p>\n' +
    '                                                    <h6>{{userdetail.user.lastName}}</h6>\n' +
    '                                                </div>\n' +
    '                                                <div class="comm-cont w33 w-1200-50 p-0">\n' +
    '                                                    <p>Gender</p>\n' +
    '                                                    <h6>{{userdetail.user.gender}}</h6>\n' +
    '                                                </div>\n' +
    '                                            </div>\n' +
    '                                            <!-- end -->\n' +
    '                                        </div>\n' +
    '                                        <div class="w100">\n' +
    '                                            <!-- start -->\n' +
    '                                            <h6 class="poptile">contact info</h6>\n' +
    '                                            <div class="prof-comm-shad mb-4">\n' +
    '                                                <div class="comm-cont w33 w-1200-100 mb-1200-10 p-0">\n' +
    '                                                    <p>Mobile</p>\n' +
    '                                                    <h6>{{userdetail.user.phoneNumber}}</h6>\n' +
    '                                                </div>\n' +
    '                                                <div class="comm-cont w33 w-1200-100 mb-1200-0 p-0">\n' +
    '                                                    <p>Email</p>\n' +
    '                                                    <h6>{{userdetail.user.email}}</h6>\n' +
    '                                                </div>\n' +
    '                                            </div>\n' +
    '                                            <!-- end -->\n' +
    '                                        </div>\n' +
    '                                        <div class="w100">\n' +
    '                                            <!-- start -->\n' +
    '                                            <h6 class="poptile">Service(s) Associated</h6>\n' +
    '                                            <div class="prof-comm-shad mb-4">\n' +
    '                                                <div class="comm-cont w100 p-0">\n' +
    '                                                    <p>Service(s)</p>\n' +
    '                                                    <h6>{{userdetail.serviceAssociatedList}}</h6>\n' +
    '                                                </div>\n' +
    '                                            </div>\n' +
    '                                            <!-- end -->\n' +
    '                                        </div>\n' +
    '                                        <div class="w50">\n' +
    '                                            <!-- start -->\n' +
    '                                            <h6 class="poptile">Experience</h6>\n' +
    '                                            <div class="prof-comm-shad mb-4">\n' +
    '                                                <div class="comm-cont w100 p-0">\n' +
    '                                                    <p>Experience Level</p>\n' +
    '                                                    <h6>{{userdetail.levelType}}</h6>\n' +
    '                                                </div>\n' +
    '                                            </div>\n' +
    '                                            <!-- end -->\n' +
    '                                        </div>\n' +
    '                                        <div class="w50">\n' +
    '                                            <!-- start -->\n' +
    '                                            <h6 class="poptile">Track Hours</h6>\n' +
    '                                            <div class="prof-comm-shad mb-4">\n' +
    '                                                <div class="comm-cont w100 p-0">\n' +
    '                                                    <p>Track Hours</p>\n' +
    '                                                    <h6>{{userdetail.user.timeTrack}}</h6>\n' +
    '                                                </div>\n' +
    '                                            </div>\n' +
    '                                            <!-- end -->\n' +
    '                                        </div>\n' +
    '                                    </div>\n' +
    '                                    <!-- end -->\n' +
    '                                </div>\n' +
    '                                <!-- user details end -->\n' +
    '                                </div>\n' +
    '                                </div>\n' +
    '                            </div>'
})

export class UserDetailsComponent implements OnInit {
  private addform: boolean;

  constructor(private modalService: ModalService,private messageService: MessageService, public adminService: AdminService,  private formBuilder: FormBuilder) { }
  @Input('userdetail') userlist: any;
  ngOnInit() {
  }

  openModal(id: string) {
    this.modalService.open1(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  updateform(type) {
    if(type == 'add'){
      // @ts-ignore
      this.updateform = false;
      this.addform = true;
    }else if(type == 'update'){
      // @ts-ignore
      this.updateform = true;
      this.addform = false;
    }
  }
}
