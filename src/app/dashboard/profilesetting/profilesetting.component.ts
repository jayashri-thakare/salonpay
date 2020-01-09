import {Component, ComponentFactoryResolver, ComponentRef, OnDestroy, Input, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {Router} from '@angular/router';
import {UserdataService} from '../../userdata.service';
import {ModalService} from '../../_modal/modal.service';
import {Subscription} from 'rxjs';
import {CscService} from '../../services/cscdropdown.service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: 'profilesetting.component.html'
  // styleUrls: ['./profilesetting.component.css']
})
export class ProfilesettingComponent implements OnInit {
  subscription: Subscription;
  // private userdetail;
  // userdata = this.userdetail;
  @Input('userdata') userdetail: any;

  // private subscription: any;
  private form: string;
  constructor( private router: Router, private userdataService: UserdataService, private modalService: ModalService,
               private cscService: CscService) {

  }


  ngOnInit() {
    this.userdataService.profilenav = true;
    this.getUserDetails();
    this.subscription = this.userdataService.on('call-parent').subscribe(() => this.getUserDetails());
  }

  OnChanges() {
    this.userdetail = this.userdetail;
  }

  openModal(id: string, userdetail) {
    this.modalService.open(id, userdetail);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  getUserDetails() {
    this.userdataService.getUserDetail().subscribe((data) => {
      this.userdetail = data;
    });
  }

  ngOnDestroy() {
    this.userdetail.unsubscribe();
    this.subscription.unsubscribe();
  }


  update_profile(form, user) {
    console.log(user);
    // tslint:disable-next-line:triple-equals

    // if (this.userprofileForm.status == 'VALID') {
    //   this.userdataService.update_profile_Users(userdata).subscribe((data) => {
    //     this.closeModal('side-menu-userprofile');
    //     this.userdataService.getUserDetail();
    //     console.log(data);
    //   });
    // } else {
    //   console.log(userdata, this.userprofileForm.status);
    //   this.submitted = true;
    //   if (this.userprofileForm.invalid) {
    //     return;
    //   }
    // }
  }
}
