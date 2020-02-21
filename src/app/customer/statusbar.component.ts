import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { ModalService } from '../_modal/modal.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomerService} from '../customer/customer.service';
import {MessageService} from '../message.service';

@Component({
  selector: 'app-statusbar',
  template: '<div class="filter-container-up filter-container-grid" *ngIf="router.url === \'/customer\'">\n' +
    '            <div class="filter-container">\n' +
    '                <a href="addcustomer" class="button flg-btn">+ Add New</a>\n' +
    '                <div class="form-group mb-0 mr-2">\n' +
    '                    <form>\n' +
    '                        <input class="form-field" type="text" name="filter-searh" required>\n' +
    '                        <p class="form-label">Search</p>\n' +
    '                        <button class="search icon-search" type="submit"></button>\n' +
    '                    </form>\n' +
    '                </div>\n' +
    '                <div class="yur-mail-rig filtdrp-status">\n' +
    '                    <button type="button" class="button line grey status mr-2">\n' +
    '                        <i class="icon-fliter-list"></i>\n' +
    '                        <span>Sort by</span>\n' +
    '                    </button>\n' +
    '                    <ul class="status-list center">\n' +
    '                        <li class="drpFil">Sort by</li>\n' +
    '                        <li><a href="#">Ascending</a></li>\n' +
    '                        <li><a href="#">Descending</a></li>\n' +
    '                    </ul>\n' +
    '                </div>\n' +
    '                <div class="yur-mail-rig filtdrp-status">\n' +
    '                    <button type="button" class="button line grey status mr-2">\n' +
    '                        <i class="icon-filter"></i>\n' +
    '                        <span>Fliters</span>\n' +
    '                    </button>\n' +
    '                    <ul class="status-list center">\n' +
    '                        <li class="drpFil">Filters</li>\n' +
    '                        <li><a href="#">Upcoming</a></li>\n' +
    '                        <li><a href="#">Cancelled</a></li>\n' +
    '                    </ul>\n' +
    '                </div>\n' +
    '                <div class="yur-mail-rig">\n' +
    '                    <a href="updatecustomer" class="button line grey mr-2">\n' +
    '                        <i class="icon-reset"></i>\n' +
    '                        <span>Update</span>\n' +
    '                    </a>\n' +
    '                </div>\n' +
    '\n' +
    '                <div class="radio-box radio-box-2 rad-org flg-grid-btn">\n' +
    '                    <input type="radio" class="listCheck" id="grid" name="list-view" value="grid" (click)="gridlistview(\'grid\')">\n' +
    '                    <label for="grid"><i class="icon-gird"></i></label>\n' +
    '                </div>\n' +
    '\n' +
    '                <div class="radio-box radio-box-2 rad-org flg-list-btn">\n' +
    '                    <input type="radio" class="listCheck" id="list" name="list-view" value="list" (click)="gridlistview(\'list\')">\n' +
    '                    <label for="list"><i class="icon-list"></i></label>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '            <div class="filter-container-up filter-container-grid" *ngIf="router.url === \'/updatecustomer\'">\n' +
    '                <div class="filter-container">\n' +
    '                <a href="addcustomer" class="button flg-btn">+ Add New</a>\n' +
    '\n' +
    '                    <div class="checkbox-box checkbox-box-button select-all-btn mb-0 mr-2">\n' +
    '                        <input class="selected-all" type="checkbox" id="select-all" name="select-all" required>\n' +
    '                        <label for="select-all"><span>Select</span> All</label>\n' +
    '                    </div>\n' +
    '\n' +
    '                    <div class="form-group mb-0 mr-2">\n' +
    '                        <form>\n' +
    '                            <input class="form-field" type="text" name="filter-searh" required>\n' +
    '                            <p class="form-label">Search</p>\n' +
    '                            <button class="search icon-search" type="submit"></button>\n' +
    '                        </form>\n' +
    '                    </div>\n' +
    '                    <div class="yur-mail-rig">\n' +
    '                        <button type="button" class="button line grey side-menu mr-2" (click)="modalService.open1(\'side-menu-updateData\')">\n' +
    '                            <i class="icon-edit"></i>\n' +
    '                            <span>Edit</span>\n' +
    '                        </button>\n' +
    '                    </div>\n' +
    '                    <div class="yur-mail-rig">\n' +
    '                        <button type="button" class="button line grey" data-toggle="modal" data-target="#deletePopup"\n' +
    '                            data-backdrop="static" data-keyboard="false">\n' +
    '                            <i class="icon-delete"></i>\n' +
    '                            <span>Delete</span>\n' +
    '                        </button>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        <editbulk-modal></editbulk-modal>'
})
export class CustomerStatusBarComponent implements OnInit {
  gridview: boolean;
  listview: boolean;

  constructor(public customerService: CustomerService, private formBuilder: FormBuilder, private modalService: ModalService, private router: Router, private messageService: MessageService) { }

  ngOnInit() {

  }

  gridlistview(type){
    if(type == 'grid'){
      this.gridview = true;
      this.listview = false;
    }else if(type == 'list'){
      this.gridview = false;
      this.listview = true;
    }
  }

}
