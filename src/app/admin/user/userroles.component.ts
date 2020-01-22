import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { ModalService } from '../../_modal/modal.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AdminService} from '../admin.service';
import {MessageService} from '../../message.service';

@Component({
  selector: 'userroles-modal',
  template: '<div id="inner-tab2" *ngIf="rolesvar">\n' +
    '                                <div *ngFor="let userdet of userlist">\n' +
    '                                    <div *ngIf="userdet.user.email == emailvar || (userdet.user.email == pageinitemail && onloadvar)">\n' +
    '                                <!-- roles start -->\n' +
    '                                <!-- start -->\n' +
    '                                <div class="comm-headline-btn comm-headline-btn-admin">\n' +
    '                                    <h3 class="main-comm-head m-0">\n' +
    '                                        Roles\n' +
    '                                        <i class="icon-question rig-icn" data-toggle="tooltip" data-placement="right"\n' +
    '                                            title="Merge Sales"></i>\n' +
    '                                    </h3>\n' +
    '                                    <div class="filter-container">\n' +
    '                                        <a href="#" class="button mr-2">Save</a>\n' +
    '                                        <a href="#" class="button line mr-2">Cancel</a>\n' +
    '                                        <a href="#" class="button line orange">Reset</a>\n' +
    '                                    </div>\n' +
    '                                </div>\n' +
    '                                <!-- end -->\n' +
    '                                <div class="admin-comm-rig-scroll scrollbar">\n' +
    '                                    <!-- start -->\n' +
    '                                    <h6 class="comm-subhdn">{{userdet.user.firstName}}\'s Role</h6>\n' +
    '                                    <div class="row">\n' +
    '                                        <div class="w50 w-1200-100">\n' +
    '                                            <!-- start -->\n' +
    '                                            <div class="yur-mail-box">\n' +
    '                                                <h6 class="promo-head">Administrator</h6>\n' +
    '                                                <div class="switch switch--horizontal only-switch">\n' +
    '                                                    <input id="admin1" type="radio" [value]="admin" (click)="usersroles($event, \'Admin\')" name="admi-radio1" />\n' +
    '                                                    <label for="admin1"></label>\n' +
    '                                                    <input id="admin12" type="radio" [value]="true" (click)="usersroles($event, \'Admin\')" name="admi-radio1" />\n' +
    '                                                    <label for="admin12"></label><span class="toggle-outside"><span\n' +
    '                                                            class="toggle-inside"></span></span>\n' +
    '                                                </div>\n' +
    '                                            </div>\n' +
    '                                            <!-- end -->\n' +
    '                                        </div>\n' +
    '                                        <div class="w50 w-1200-100">\n' +
    '                                            <!-- start -->\n' +
    '                                            <div class="yur-mail-box">\n' +
    '                                                <h6 class="promo-head">Manager</h6>\n' +
    '                                                <div class="switch switch--horizontal only-switch">\n' +
    '                                                    <input id="admin2" type="radio" [value]="false" (click)="usersroles($event, \'Manager\')" name="admi-radio2"\n' +
    '                                                        checked="checked" />\n' +
    '                                                    <label for="admin2"></label>\n' +
    '                                                    <input id="admin22" type="radio" [value]="true" (click)="usersroles($event, \'Manager\')" name="admi-radio2" />\n' +
    '                                                    <label for="admin22"></label><span class="toggle-outside"><span\n' +
    '                                                            class="toggle-inside"></span></span>\n' +
    '                                                </div>\n' +
    '                                            </div>\n' +
    '                                            <!-- end -->\n' +
    '                                        </div>\n' +
    '                                        <div class="w50 w-1200-100">\n' +
    '                                            <!-- start -->\n' +
    '                                            <div class="yur-mail-box">\n' +
    '                                                <h6 class="promo-head">Employee</h6>\n' +
    '                                                <div class="switch switch--horizontal only-switch">\n' +
    '                                                    <input id="admin3" type="radio" [value]="false" (click)="usersroles($event, \'Employee\')" name="admi-radio3"\n' +
    '                                                        checked="checked" />\n' +
    '                                                    <label for="admin3"></label>\n' +
    '                                                    <input id="admin32" type="radio" [value]="true" (click)="usersroles($event, \'Employee\')" name="admi-radio3" />\n' +
    '                                                    <label for="admin32"></label><span class="toggle-outside"><span\n' +
    '                                                            class="toggle-inside"></span></span>\n' +
    '                                                </div>\n' +
    '                                            </div>\n' +
    '                                            <!-- end -->\n' +
    '                                        </div>\n' +
    '                                        <div class="w50 w-1200-100">\n' +
    '                                            <!-- start -->\n' +
    '                                            <div class="yur-mail-box">\n' +
    '                                                <h6 class="promo-head">Technician</h6>\n' +
    '                                                <div class="switch switch--horizontal only-switch">\n' +
    '                                                    <input id="admin4" type="radio" [value]="false" (click)="usersroles($event, \'Technician\')" name="admi-radio4"\n' +
    '                                                        checked="checked" />\n' +
    '                                                    <label for="admin4"></label>\n' +
    '                                                    <input id="admin42" type="radio" [value]="true" (click)="usersroles($event, \'Technician\')" name="admi-radio4" />\n' +
    '                                                    <label for="admin42"></label><span class="toggle-outside"><span\n' +
    '                                                            class="toggle-inside"></span></span>\n' +
    '                                                </div>\n' +
    '                                            </div>\n' +
    '                                            <!-- end -->\n' +
    '                                        </div>\n' +
    '                                    </div>\n' +
    '                                    <!-- end -->\n' +
    '\n' +
    '                                    <!-- start -->\n' +
    '                                    <h6 class="comm-subhdn">Module Rights</h6>\n' +
    '                                    <div class="row">\n' +
    '                                        <div class="w100">\n' +
    '                                            <!-- start -->\n' +
    '                                            <div class="module-role-box">\n' +
    '                                                <div class="module-rig">\n' +
    '                                                    <h6 class="promo-head">Customers</h6>\n' +
    '                                                    <div class="switch switch--horizontal only-switch"\n' +
    '                                                        data-name="customer-switch">\n' +
    '                                                        <input class="notif-radio" id="module1" type="radio"\n' +
    '                                                            name="module-radio1" value="off" />\n' +
    '                                                        <label for="module1"></label>\n' +
    '                                                        <input class="notif-radio" id="module12" type="radio"\n' +
    '                                                            name="module-radio1" value="on" checked="checked" />\n' +
    '                                                        <label for="module12"></label><span class="toggle-outside"><span\n' +
    '                                                                class="toggle-inside"></span></span>\n' +
    '                                                    </div>\n' +
    '                                                </div>\n' +
    '                                                <div class="module-btm customer-switch">\n' +
    '                                                    <div class="checkbox-box">\n' +
    '                                                        <input type="checkbox" id="mod-chk1" name="mod-chk1"\n' +
    '                                                            required="">\n' +
    '                                                        <label for="mod-chk1">View</label>\n' +
    '                                                    </div>\n' +
    '                                                    <div class="checkbox-box">\n' +
    '                                                        <input type="checkbox" id="mod-chk2" name="mod-chk2"\n' +
    '                                                            required="">\n' +
    '                                                        <label for="mod-chk2">Create</label>\n' +
    '                                                    </div>\n' +
    '                                                    <div class="checkbox-box">\n' +
    '                                                        <input type="checkbox" id="mod-chk3" name="mod-chk3"\n' +
    '                                                            required="">\n' +
    '                                                        <label for="mod-chk3">Update</label>\n' +
    '                                                    </div>\n' +
    '                                                    <div class="checkbox-box">\n' +
    '                                                        <input type="checkbox" id="mod-chk4" name="mod-chk4"\n' +
    '                                                            required="">\n' +
    '                                                        <label for="mod-chk4">Delete</label>\n' +
    '                                                    </div>\n' +
    '                                                </div>\n' +
    '                                            </div>\n' +
    '                                            <!-- end -->\n' +
    '                                        </div>\n' +
    '                                        <div class="w100">\n' +
    '                                            <!-- start -->\n' +
    '                                            <div class="yur-mail-box">\n' +
    '                                                <h6 class="promo-head">Appointments</h6>\n' +
    '                                                <div class="switch switch--horizontal only-switch">\n' +
    '                                                    <input id="module2" type="radio" name="module-radio2"\n' +
    '                                                        checked="checked" />\n' +
    '                                                    <label for="module2"></label>\n' +
    '                                                    <input id="module22" type="radio" name="module-radio2" />\n' +
    '                                                    <label for="module22"></label><span class="toggle-outside"><span\n' +
    '                                                            class="toggle-inside"></span></span>\n' +
    '                                                </div>\n' +
    '                                            </div>\n' +
    '                                            <!-- end -->\n' +
    '                                        </div>\n' +
    '                                        <div class="w100">\n' +
    '                                            <!-- start -->\n' +
    '                                            <div class="module-role-box">\n' +
    '                                                <div class="module-rig">\n' +
    '                                                    <h6 class="promo-head">Sales</h6>\n' +
    '                                                    <div class="switch switch--horizontal only-switch"\n' +
    '                                                        data-name="sale-switch">\n' +
    '                                                        <input class="notif-radio" id="module3" type="radio"\n' +
    '                                                            name="module-radio3" value="off" />\n' +
    '                                                        <label for="module3"></label>\n' +
    '                                                        <input class="notif-radio" id="module32" type="radio"\n' +
    '                                                            name="module-radio3" value="on" checked="checked" />\n' +
    '                                                        <label for="module32"></label><span class="toggle-outside"><span\n' +
    '                                                                class="toggle-inside"></span></span>\n' +
    '                                                    </div>\n' +
    '                                                </div>\n' +
    '                                                <div class="module-btm sale-switch">\n' +
    '                                                    <div class="checkbox-box">\n' +
    '                                                        <input type="checkbox" id="sale-chk1" name="sale-chk1"\n' +
    '                                                            required="">\n' +
    '                                                        <label for="sale-chk1">View</label>\n' +
    '                                                    </div>\n' +
    '                                                    <div class="checkbox-box">\n' +
    '                                                        <input type="checkbox" id="sale-chk2" name="sale-chk2"\n' +
    '                                                            required="">\n' +
    '                                                        <label for="sale-chk2">Create</label>\n' +
    '                                                    </div>\n' +
    '                                                    <div class="checkbox-box">\n' +
    '                                                        <input type="checkbox" id="sale-chk3" name="sale-chk3"\n' +
    '                                                            required="">\n' +
    '                                                        <label for="sale-chk3">Update</label>\n' +
    '                                                    </div>\n' +
    '                                                    <div class="checkbox-box">\n' +
    '                                                        <input type="checkbox" id="sale-chk4" name="sale-chk4"\n' +
    '                                                            required="">\n' +
    '                                                        <label for="sale-chk4">Delete</label>\n' +
    '                                                    </div>\n' +
    '                                                </div>\n' +
    '                                            </div>\n' +
    '                                            <!-- end -->\n' +
    '                                        </div>\n' +
    '                                    </div>\n' +
    '                                    <!-- end -->\n' +
    '\n' +
    '                                    <!-- start -->\n' +
    '                                    <h6 class="comm-subhdn">Individual Rights</h6>\n' +
    '                                    <div class="row">\n' +
    '                                        <div class="w100">\n' +
    '                                            <!-- start -->\n' +
    '                                            <div class="module-role-box">\n' +
    '                                                <div class="module-rig">\n' +
    '                                                    <h6 class="promo-head">Create New Sale</h6>\n' +
    '                                                    <div class="switch switch--horizontal only-switch">\n' +
    '                                                        <input id="indiv1" type="radio" name="indiv-radio1" />\n' +
    '                                                        <label for="indiv1"></label>\n' +
    '                                                        <input id="indiv12" type="radio" name="indiv-radio1"\n' +
    '                                                            checked="checked" />\n' +
    '                                                        <label for="indiv12"></label><span class="toggle-outside"><span\n' +
    '                                                                class="toggle-inside"></span></span>\n' +
    '                                                    </div>\n' +
    '                                                </div>\n' +
    '                                                <p class="role-para">If this right is given then the user will be\n' +
    '                                                    able to see\n' +
    '                                                    the New\n' +
    '                                                    Sale button\n' +
    '                                                    and will\n' +
    '                                                    be able to create sales and use the point of sale portion of the\n' +
    '                                                    application.</p>\n' +
    '                                            </div>\n' +
    '                                            <!-- end -->\n' +
    '                                        </div>\n' +
    '                                        <div class="w100">\n' +
    '                                            <!-- start -->\n' +
    '                                            <div class="module-role-box">\n' +
    '                                                <div class="module-rig">\n' +
    '                                                    <h6 class="promo-head">Create New Appointment</h6>\n' +
    '                                                    <div class="switch switch--horizontal only-switch">\n' +
    '                                                        <input id="indiv2" type="radio" name="indiv-radio2" />\n' +
    '                                                        <label for="indiv2"></label>\n' +
    '                                                        <input id="indiv22" type="radio" name="indiv-radio2"\n' +
    '                                                            checked="checked" />\n' +
    '                                                        <label for="indiv22"></label><span class="toggle-outside"><span\n' +
    '                                                                class="toggle-inside"></span></span>\n' +
    '                                                    </div>\n' +
    '                                                </div>\n' +
    '                                                <p class="role-para">If this right is given then the user will be\n' +
    '                                                    able to see\n' +
    '                                                    the New\n' +
    '                                                    Appointment button and will be able to create appointments.</p>\n' +
    '                                            </div>\n' +
    '                                            <!-- end -->\n' +
    '                                        </div>\n' +
    '                                        <div class="w100">\n' +
    '                                            <!-- start -->\n' +
    '                                            <div class="module-role-box">\n' +
    '                                                <div class="module-rig">\n' +
    '                                                    <h6 class="promo-head">Manage Sales Commissions, Tips and Turns\n' +
    '                                                    </h6>\n' +
    '                                                    <div class="switch switch--horizontal only-switch">\n' +
    '                                                        <input id="indiv3" type="radio" name="indiv-radio3" />\n' +
    '                                                        <label for="indiv3"></label>\n' +
    '                                                        <input id="indiv32" type="radio" name="indiv-radio3"\n' +
    '                                                            checked="checked" />\n' +
    '                                                        <label for="indiv32"></label><span class="toggle-outside"><span\n' +
    '                                                                class="toggle-inside"></span></span>\n' +
    '                                                    </div>\n' +
    '                                                </div>\n' +
    '                                                <p class="role-para">If this right is given then the user will have\n' +
    '                                                    the ability\n' +
    '                                                    override\n' +
    '                                                    and manage the commissions, tip allocation and turn allocation\n' +
    '                                                    for any\n' +
    '                                                    completed\n' +
    '                                                    sale.</p>\n' +
    '                                            </div>\n' +
    '                                            <!-- end -->\n' +
    '                                        </div>\n' +
    '                                        <div class="w100">\n' +
    '                                            <!-- start -->\n' +
    '                                            <div class="module-role-box">\n' +
    '                                                <div class="module-rig">\n' +
    '                                                    <h6 class="promo-head">Cancel Appointments</h6>\n' +
    '                                                    <div class="switch switch--horizontal only-switch">\n' +
    '                                                        <input id="indiv4" type="radio" name="indiv-radio4" />\n' +
    '                                                        <label for="indiv4"></label>\n' +
    '                                                        <input id="indiv42" type="radio" name="indiv-radio4"\n' +
    '                                                            checked="checked" />\n' +
    '                                                        <label for="indiv42"></label><span class="toggle-outside"><span\n' +
    '                                                                class="toggle-inside"></span></span>\n' +
    '                                                    </div>\n' +
    '                                                </div>\n' +
    '                                                <p class="role-para">If this right is given then the user will have\n' +
    '                                                    access to\n' +
    '                                                    the cancel\n' +
    '                                                    appointment function.</p>\n' +
    '                                            </div>\n' +
    '                                            <!-- end -->\n' +
    '                                        </div>\n' +
    '                                        <div class="w100">\n' +
    '                                            <!-- start -->\n' +
    '                                            <div class="module-role-box">\n' +
    '                                                <div class="module-rig">\n' +
    '                                                    <h6 class="promo-head">Bulk Edit</h6>\n' +
    '                                                    <div class="switch switch--horizontal only-switch">\n' +
    '                                                        <input id="indiv5" type="radio" name="indiv-radio5" />\n' +
    '                                                        <label for="indiv5"></label>\n' +
    '                                                        <input id="indiv52" type="radio" name="indiv-radio5"\n' +
    '                                                            checked="checked" />\n' +
    '                                                        <label for="indiv52"></label><span class="toggle-outside"><span\n' +
    '                                                                class="toggle-inside"></span></span>\n' +
    '                                                    </div>\n' +
    '                                                </div>\n' +
    '                                                <p class="role-para">If this right is given then the user will be\n' +
    '                                                    able to bulk\n' +
    '                                                    edit,\n' +
    '                                                    customers, appointments and sales.</p>\n' +
    '                                            </div>\n' +
    '                                            <!-- end -->\n' +
    '                                        </div>\n' +
    '                                        <div class="w100">\n' +
    '                                            <!-- start -->\n' +
    '                                            <div class="module-role-box">\n' +
    '                                                <div class="module-rig">\n' +
    '                                                    <h6 class="promo-head">Communicate with Customers</h6>\n' +
    '                                                    <div class="switch switch--horizontal only-switch">\n' +
    '                                                        <input id="indiv6" type="radio" name="indiv-radio6" />\n' +
    '                                                        <label for="indiv6"></label>\n' +
    '                                                        <input id="indiv62" type="radio" name="indiv-radio6"\n' +
    '                                                            checked="checked" />\n' +
    '                                                        <label for="indiv62"></label><span class="toggle-outside"><span\n' +
    '                                                                class="toggle-inside"></span></span>\n' +
    '                                                    </div>\n' +
    '                                                </div>\n' +
    '                                                <p class="role-para">If this right is given then the user will have\n' +
    '                                                    access to\n' +
    '                                                    the\n' +
    '                                                    customers communication menu and will be able to view emails and\n' +
    '                                                    communicate\n' +
    '                                                    with\n' +
    '                                                    customers via email and text messages.</p>\n' +
    '                                            </div>\n' +
    '                                            <!-- end -->\n' +
    '                                        </div>\n' +
    '                                        <div class="w100">\n' +
    '                                            <!-- start -->\n' +
    '                                            <div class="module-role-box">\n' +
    '                                                <div class="module-rig">\n' +
    '                                                    <h6 class="promo-head">Add Customer Notes</h6>\n' +
    '                                                    <div class="switch switch--horizontal only-switch">\n' +
    '                                                        <input id="indiv7" type="radio" name="indiv-radio7" />\n' +
    '                                                        <label for="indiv7"></label>\n' +
    '                                                        <input id="indiv72" type="radio" name="indiv-radio7"\n' +
    '                                                            checked="checked" />\n' +
    '                                                        <label for="indiv72"></label><span class="toggle-outside"><span\n' +
    '                                                                class="toggle-inside"></span></span>\n' +
    '                                                    </div>\n' +
    '                                                </div>\n' +
    '                                                <p class="role-para">If this right is given then the user will have\n' +
    '                                                    the ability\n' +
    '                                                    to add\n' +
    '                                                    notes to the customers profile.</p>\n' +
    '                                            </div>\n' +
    '                                            <!-- end -->\n' +
    '                                        </div>\n' +
    '                                    </div>\n' +
    '                                    <!-- end -->\n' +
    '\n' +
    '                                </div>\n' +
    '                                <!-- roles end -->\n' +
    '                                </div>\n' +
    '                                </div>\n' +
    '                            </div>'
})
export class UserRolesComponent implements OnInit {

  constructor(private AdminService: AdminService, private formBuilder: FormBuilder, private modalService: ModalService, private router: Router, private messageService: MessageService) { }

  ngOnInit() {
  }

}
