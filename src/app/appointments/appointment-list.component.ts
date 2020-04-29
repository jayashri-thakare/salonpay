import {Component, ElementRef, TemplateRef, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {AppointmentService} from './appointment.service';
import {Observable} from 'rxjs';
import {  CalendarView } from 'angular-calendar';
import {AbstractControl, FormControl, ValidationErrors} from "@angular/forms";
// import { ToolbarService, LinkService, ImageService, HtmlEditorService, TableService } from '@syncfusion/ej2-angular-richtexteditor';


@Component({
  selector: 'app-appointmentlist',
  templateUrl: './appointment-list.component.html'
  })
export class AppointmentListComponent {
  title = 'SalonPay';
  private servicelist: Observable<any>;
  private appointmentList: any;
  public gridview: boolean;
  public listview: boolean;
  constructor(private elementRef: ElementRef, public router: Router, public appointmentService: AppointmentService) {
  }

  ngOnInit() {
    this.gridview = true;

    this.getAppointmentList();
    // this.subscription = this.customerService.on('call-customerDetail').subscribe(() => this.getCustomerList());
  }
  gridlistview(type) {
    if (type == 'grid') {
      this.gridview = true;
      this.listview = false;
    } else if (type == 'list') {
      this.gridview = false;
      this.listview = true;
    }
  }

  getAppointmentList() {
    this.appointmentService.getAllAppointment().subscribe((data) => {
      // let service = data['result'];
      this.appointmentList = data['list'];
    });
  }
}
