import {Component, Input, OnInit} from '@angular/core';
import {ModalService} from '../../_modal/modal.service';
import {MessageService} from '../../message.service';
import {FormBuilder} from '@angular/forms';
import {AdminService} from '../admin.service';
import { UserdataService } from 'src/app/userdata.service';

@Component({
  selector: 'app-userdetail',
  styleUrls: ['./user.component.css'],
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
    '                                    <a class="button addbtncol" (click)="modalService.open1(\'add-tax-table1\');adminService.publish(\'call-user-update\');selectroleobj(userdetail.user)">Update</a>\n' +
    '                                </div>\n' +
    '                                <!-- end -->\n' +
    '                                <div class="admin-comm-rig-scroll scrollbar" >\n' +
    '                                    <!-- start -->\n' +
    '                                      <div class="avatar-upload">\n' +
    '                                        <div class="avatar-edit">\n' +
    '                                          <label class="hoverable" for="fileInput">\n' +
    '                                            <img [src]="userdataService.imagepath!=null ? userdataService.imagepath : \'https://www.w3schools.com/howto/img_avatar.png\'">\n' +
    '                                            <div class="hover-text">Choose file</div>\n' +
    '                                            <div class="background"></div>\n' +
    '                                          </label>\n' +
    '                                          <input id="fileInput" type=\'file\' (change)="userdataService.upload_profile_image($event.target.files)">\n' +
    '                                          <label for="imageUpload"><i class="icon-uploading grd-icon"></i></label>\n' +
    // '                                          {{userdataService.imagepath}}\n' +
    '                                        </div>\n' +
    '                                      </div>\n' +
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
  arrayofselectedobj: Array<any>=[];
  public url;

  constructor(public userdataService: UserdataService,public modalService: ModalService,private messageService: MessageService, public adminService: AdminService,  private formBuilder: FormBuilder) { }
  @Input('userdetail') userlist: any;
  ngOnInit() {
  }

  selectroleobj(selected_obj){
    console.log(selected_obj)
    var index = this.arrayofselectedobj.indexOf(selected_obj.user);
    this.adminService.arrayofselectedobj = this.arrayofselectedobj
    if(index<0){
      this.arrayofselectedobj.splice(index, 1);
      this.arrayofselectedobj.push(selected_obj);
    }
    // this.arrayofselectedobj.push(selected_obj.user);
  }

  upload_profile_image(event) {
    debugger;
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      // this.userdataService.upload_profile_image(event.target.files).subscribe((data) => {
      //   this.userdetail.profilePicPath = data['profilePicPath'];
      // });
      // tslint:disable-next-line:no-shadowed-variable
      reader.onload = (event) => { // called once readAsDataURL is completed
        if (!event.target) {
          console.log("in if");
        } else {
          // @ts-ignore
          const {result} = event.target;
          this.url = result;
        }
      };
    }
  }
}
