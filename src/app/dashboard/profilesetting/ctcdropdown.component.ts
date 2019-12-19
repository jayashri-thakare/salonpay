import { OnInit, Component } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {CscService} from '../../services/cscdropdown.service';

@Component({
  selector: 'csc-app',
  templateUrl: '<form [formGroup]="createAccountForm">\n' +
    '        <div class="form-group">\n' +
    '          <select formControlName="country" class="form-control" (change)="onChangeCountry($event.target.value)">\n' +
    '            <option value="">Select country...</option>\n' +
    '            <option *ngFor="let country of countries" [value]="country.id">{{country.country_name}}</option>\n' +
    '          </select>\n' +
    '        </div>\n' +
    '        <div class="form-group">\n' +
    '          <select formControlName="state" class="form-control" (change)="onChangeState($event.target.value)">\n' +
    '            <option value="">Select state...</option>\n' +
    '            <option *ngFor="let state of states" [value]="state.id">{{state.state_name}}</option>\n' +
    '          </select>\n' +
    '        </div>\n' +
    '        <div class="form-group">\n' +
    '          <select formControlName="city" class="form-control">\n' +
    '            <option value="">Select city...</option>\n' +
    '            <option *ngFor="let city of cities" [value]="city.id">{{city.city_name}}</option>\n' +
    '          </select>\n' +
    '        </div>\n' +
    '      </form>'
})
export class CscComponent implements OnInit {
  createCountryForm: FormGroup;
  countries: {};
  states: {};
  cities: {};
  constructor(private cscService: CscService) {}

  ngOnInit() {
    this.cscService.getCountries().subscribe(
      data => this.countries = data
    );
    this.createCountryForm = new FormGroup({
      country: new FormControl(''),
      state: new FormControl(''),
      city: new FormControl('')
    });
  }

  onChangeCountry(countryId: number) {
    if (countryId) {
      this.cscService.getStates(countryId).subscribe(
        data => {
          this.states = data;
          this.cities = null;
        }
      );
    } else {
      this.states = null;
      this.cities = null;
    }
  }

  onChangeState(stateId: number) {
    if (stateId) {
      this.cscService.getCities(stateId).subscribe(
        data => this.cities = data
      );
    } else {
      this.cities = null;
    }
  }

}
