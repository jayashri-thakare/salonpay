import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  ViewChild
} from '@angular/core';
import {Router} from '@angular/router';
import {AdmindashboardService} from './admindashboard.service';
import {Observable, Subject} from 'rxjs';
import {CalendarEvent, CalendarView} from 'angular-calendar';
import {AbstractControl, FormControl, ValidationErrors} from "@angular/forms";
import {WeekDay} from "calendar-utils";
import {addMinutes, isSameDay, isSameMonth, startOfDay} from "date-fns";
// import { ToolbarService, LinkService, ImageService, HtmlEditorService, TableService } from '@syncfusion/ej2-angular-richtexteditor';


@Component({
  selector: 'app-dashboardcalendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dashboardcalendar.component.html',
  styles: [' .cal-day-view .cal-hour-segment.cal-after-hour-start .cal-time {\n' +
  '        display: block;\n' +
  '      }']
})
export class DashboardcalendarComponent {
  title = 'SalonPay';
  private servicelist: Observable<any>;
  private appointmentList: any;
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;
  // @Input() refresh: Subject<any>;
  @Input() dayStartHour: number = 8;
  @Input() hourSegments: number = 2;

  view: CalendarView = CalendarView.Day;

  CalendarView = CalendarView;
  // viewDate: Date = new Date();
  viewDate: Date = new Date();
  selectedDay: WeekDay;
  refresh: Subject<any> = new Subject();
  // events: CalendarEvent[] = [];
  selectedDate1: Date = new Date()
  activeDayIsOpen: boolean = true;

  @Output() viewChange: EventEmitter<string> = new EventEmitter();

  @Output() viewDateChange: EventEmitter<Date> = new EventEmitter();
  events = [{
    title: 'title',
    start: addMinutes(startOfDay(new Date()), 30),
  }]
  constructor(private elementRef: ElementRef, public router: Router, public admindashboardService: AdmindashboardService) {
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }
  ngOnInit() {

    // this.subscription = this.customerService.on('call-customerDetail').subscribe(() => this.getCustomerList());
  }
  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

}
