import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-frequentlyservices',
  template: '<div class="row mb-5">\n' +
    '              <div class="col-12">\n' +
    '                  <div class="comm-headline-btn">\n' +
    '                      <h4 class="hdn2 m-0">Frequently Used Services</h4>\n' +
    '                      <div class="form-group search-group mb-0">\n' +
    '                          <form>\n' +
    '                              <input class="form-field" type="text" name="filter-searh" required>\n' +
    '                              <p class="form-label">Search</p>\n' +
    '                              <button class="search icon-search" type="submit"></button>\n' +
    '                          </form>\n' +
    '                      </div>\n' +
    '                  </div>\n' +
    '              </div>\n' +
    '              <div class="col-12">\n' +
    '                  <div class="f-row f-3 f-1300-2 f-640-1">\n' +
    '                      <div class="f-col">\n' +
    '                          <!-- start -->\n' +
    '                          <div class="techi-box">\n' +
    '                              <div class="techi-top">\n' +
    '                                  <div class="user-det">\n' +
    '                                      <i class="icon-haircut prodt-ico"></i>\n' +
    '                                      <div class="usr-name">\n' +
    '                                          <h3><span>Haircut</span>$ 150</h3>\n' +
    '                                      </div>\n' +
    '                                  </div>\n' +
    '                                  <div class="main-selt">\n' +
    '                                      <input type="checkbox" id="feq-1" name="feq-1" required>\n' +
    '                                      <label for="feq-1">Select</label>\n' +
    '                                  </div>\n' +
    '                              </div>\n' +
    '                              <div class="techi-top center">\n' +
    '                                  <a href="#" data-toggle="modal" data-target="#addonServicePopup">\n' +
    '                                      <h5 class="prodt-ct"> <i class="icon-cir-plus mr-1"></i> Select Add On\n' +
    '                                          Services\n' +
    '                                      </h5>\n' +
    '                                  </a>\n' +
    '                              </div>\n' +
    '                          </div>\n' +
    '                          <!-- end -->\n' +
    '                      </div>\n' +
    '                  </div>\n' +
    '              </div>\n' +
    '          </div>'
})
export class SalesFrequentlyServicesComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {

  }
}
