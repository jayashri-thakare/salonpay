import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { AdminService } from 'src/app/admin/admin.service';
import { SalesService } from '../sales.service';

@Component({
  selector: 'app-frequentlyproduct',
  template: '<div class="row mb-5">\n' +
    '                    <div class="col-12">\n' +
    '                        <div class="comm-headline-btn">\n' +
    '                            <h4 class="hdn2 m-0">Frequently Purchased Products</h4>\n' +
    '                            <div class="form-group search-group mb-0">\n' +
    '                                <form>\n' +
    '                                    <input class="form-field" type="text" name="filter-searh" required>\n' +
    '                                    <p class="form-label">Search</p>\n' +
    '                                    <button class="search icon-search" type="submit"></button>\n' +
    '                                </form>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                    <div class="col-12">\n' +
    '                        <div class="f-row f-3 f-1300-2 f-640-1">\n' +
    '                            <div class="f-col">\n' +
    '                                <!-- start -->\n' +
    '                                <div class="techi-box">\n' +
    '                                    <div class="techi-top">\n' +
    '                                        <div class="user-det">\n' +
    '                                            <i class="icon-haircut prodt-ico"></i>\n' +
    '                                            <div class="usr-name">\n' +
    '                                                <h3><span>Haircut</span>$ 150</h3>\n' +
    '                                            </div>\n' +
    '                                        </div>\n' +
    '                                        <div class="main-selt">\n' +
    '                                            <input type="checkbox" id="feq-1" name="feq-1" required>\n' +
    '                                            <label for="feq-1">Select</label>\n' +
    '                                        </div>\n' +
    '                                    </div>\n' +
    '                                    <div class="techi-top techi-top-qty">\n' +
    '                                        <h5 class="prodt-ct">Quantity</h5>\n' +
    '                                        <div class="container-count-box">\n' +
    '                                            <button class="count-down">-</button>\n' +
    '                                            <span class="container-count">00</span>\n' +
    '                                            <button class="count-up">+</button>\n' +
    '                                        </div>\n' +
    '                                    </div>\n' +
    '                                </div>\n' +
    '                                <!-- end -->\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>'
})
export class FrequentlyAddedProductComponent implements OnInit {

  constructor(private salesService: SalesService, public adminService:AdminService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {

  }
}
