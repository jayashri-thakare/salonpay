import {Component, ElementRef, TemplateRef, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {AppointmentService} from './appointment.service';
import {Observable} from 'rxjs';
import {  CalendarView } from 'angular-calendar';
import {AbstractControl, FormControl, ValidationErrors} from "@angular/forms";
// import { ToolbarService, LinkService, ImageService, HtmlEditorService, TableService } from '@syncfusion/ej2-angular-richtexteditor';


@Component({
  selector: 'app-appointmentservice',
  templateUrl: './appointmentservice.component.html',
  styles:  ['cal-time-events {\n' +
  '    display: none !important;\n' +
  '  }\n' +
  '.cal-week-view .cal-day-headers {\n' +
  '    padding-left: 0 !important;\n' +
  '}\n' +
  '  .cal-week-view .cal-all-day-events .cal-time-label-column {\n' +
  '    display: none !important;\n' +
  '}\n' +
  '\n' +
  '.cal-week-view .cal-time-label-column {\n' +
  '    width: 0px;\n' +
  '}.cal-week-view .cal-events-row {\n' +
  '  margin-left: 0 !important;\n' +
  '}' +
  '.show-appnt{\n' +
  '  display:block !important;\n' +
  '}\n' +
  '.hide-appnt{\n' +
  '  display: none !important;\n' +
  '}' ,
  ]
})
export class AppointmentserviceComponent {
  title = 'SalonPay';
  private servicelist: Observable<any>;
  private technicianlist: Observable<any>;
  private checkedList: Array<any>;
  private techserList: Array<any>;
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Week;

  CalendarView = CalendarView;

  viewDate: Date = new Date();
  private searchServicen: string;
  private searchTech: string;
  // private jobj: { };
  public jobj: {
    serviceCost: any;
    serviceTime: any;
    serviceName: string;
    technicianName: FormControl | (string | ((control: AbstractControl) => (ValidationErrors | null))[])[];
    technician: any;
    service: any  }
//   var ob1 : {
//     service: [], //scalar value
//   tech: []
// };
  private servicechk: any;
  constructor(private elementRef: ElementRef, public router: Router, public appointmentService: AppointmentService) {
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  ngOnInit() {
    this.getAppointmentList();
    // this.subscription = this.customerService.on('call-customerDetail').subscribe(() => this.getCustomerList());
  }


  getAppointmentList() {
    this.appointmentService.getAllAppointment().subscribe((data) => {
      // let service = data['result'];
      this.appointmentList = data;
    });
  }
}
