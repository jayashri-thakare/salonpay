import {Component, ElementRef, TemplateRef, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {AdmindashboardService} from './admindashboard.service';
import {Observable} from 'rxjs';
import {  CalendarView } from 'angular-calendar';
import {AbstractControl, FormControl, ValidationErrors} from "@angular/forms";
// import { ToolbarService, LinkService, ImageService, HtmlEditorService, TableService } from '@syncfusion/ej2-angular-richtexteditor';


@Component({
  selector: 'app-addashboard',
  templateUrl: './addashboard.component.html'
})
export class AddashboardComponent {
  title = 'SalonPay';
  private servicelist: Observable<any>;
  private appointmentList: any;

  constructor(private elementRef: ElementRef, public router: Router, public admindashboardService: AdmindashboardService) {
  }

  ngOnInit() {

    // this.subscription = this.customerService.on('call-customerDetail').subscribe(() => this.getCustomerList());
  }
}
