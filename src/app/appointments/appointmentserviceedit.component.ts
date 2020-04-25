import {Component, ElementRef, Input, Output, TemplateRef, ViewChild, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {AppointmentService} from './appointment.service';
import {Observable} from 'rxjs';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
  isSameWeek
} from 'date-fns';
import { Subject } from 'rxjs';
import { CalendarEvent, CalendarView, CalendarEventAction,
  CalendarEventTimesChangedEvent, CalendarMonthViewDay
} from 'angular-calendar';
import {AbstractControl, FormControl, ValidationErrors} from "@angular/forms";
import {DatePipe} from '@angular/common';
import {MessageService} from '../message.service';
import { WeekDay } from 'calendar-utils';
import { debounceTime, distinctUntilChanged, switchMap, catchError  } from 'rxjs/operators';

// import { ToolbarService, LinkService, ImageService, HtmlEditorService, TableService } from '@syncfusion/ej2-angular-richtexteditor';


class ErrorInfo {
  parseObservableResponseError: any;
}

@Component({
  selector: 'app-appointmentservice',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './appointmentserviceedit.component.html',
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
  '}.radio-box-2 .booked-time {\n' +
  '    color: #fff;\n' +
  '    border-color: transparent;\n' +
  '    background: red;\n' +
  '}.cal-day-selected,\n' +
  '    .cal-day-selected:hover {\n' +
  '      background-color: deeppink !important;\n' +
  '    }.cal-today{\n' +
  '      color: #fff;\n' +
  '      border-color: transparent;\n' +
  '      background: linear-gradient(90deg, #2ecbaa 0, #358fd0 100%) !important;\n' +
  '    }' ,
  ],
  encapsulation: ViewEncapsulation.None
})export class AppointmentServiceEditComponent {
  title = 'SalonPay';
  private servicelist: Observable<any>;
   technicianlist: Array<any>=[];
  private checkedList: Array<any>;
  private techserList: Array<any>;
  searchTechList: any;

  @Input('preference') preference1: any;
  @Input('bookedTime') bookedTime: any;
  @Input() activeDay: Date;
  activeDayIsOpen: boolean = true;

  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;
  @Input() refresh: Subject<any>;

  view: CalendarView = CalendarView.Week;

  CalendarView = CalendarView;
  // viewDate: Date = new Date();
  viewDate: Date = new Date();
  selectedDay: WeekDay;

  events: CalendarEvent[] = [];


  // @Input() viewDate: Date;

  selectedDate1: Date = new Date()
  @Output() viewChange: EventEmitter<string> = new EventEmitter();

  @Output() viewDateChange: EventEmitter<Date> = new EventEmitter();
  private searchServicen: string;
  private searchTech: string;
  // private jobj: { };
  evnVar: any;
  event: any
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
  date: Date;
  preference: any;
  private serviceBind: Array<any>;
  arrayofselectedobj: Array<any>=[];
  // private bookedTime: any;
  private objIndex: any;
  private customerEmail: string;
  private customerId: number;
  technicians: Array<any>=[];
  techlist: Observable<any>;
  private tecSearch: boolean= false;
  technicianobj= {};
  editappointment= {};
  appointmenteditobj= {};
  editAppointmentData: any;

  constructor(private elementRef: ElementRef, public router: Router, public appointmentService: AppointmentService, public datePipe: DatePipe, public messageService: MessageService) {
  }

  setView(view: CalendarView) {
    this.view = view;
  }
  ngOnInit() {
    this.getServiceList();
    this.checkedList = [];
    this.serviceBind =[];
    // @ts-ignore
    this.jobj={};
    this.appointmentService.appObj = {}
    this.appointmentService.techserList = [];
    this.arrayofselectedobj = this.appointmentService.arrayofselectedappointment;
    if(this.arrayofselectedobj.length>0){
        this.getTechnicianList();
        this.technicianobj = this.arrayofselectedobj[0]['technicianList'][0];
        this.appointmentService.techserList = this.arrayofselectedobj[0]['technicianList']
        console.log(this.technicianobj)
        var myDiv = this.elementRef.nativeElement.querySelector('#appnt1');
        var myDiv1 = this.elementRef.nativeElement.querySelector('#appnt2');
        var datediv = this.elementRef.nativeElement.querySelector('#chdate');

        myDiv.style.display = 'block'
        datediv.style.display = 'none'
        myDiv1.style.display = 'none'
    }else{
        var myDiv = this.elementRef.nativeElement.querySelector('#appnt1');
        var myDiv1 = this.elementRef.nativeElement.querySelector('#appnt2');
        var datediv = this.elementRef.nativeElement.querySelector('#chdate');
    
        myDiv.style.display = 'none'
        datediv.style.display = 'none'
        myDiv1.style.display = 'block'
    }
    this.customerEmail = localStorage.getItem('appoointmentCustEmail')
    this.customerId = parseInt(localStorage.getItem('appoointmentCustId'));
    // this.jobj = [];
    // this.subscription = this.customerService.on('call-customerDetail').subscribe(() => this.getCustomerList());
  }
  selectTec(tec) {
    debugger;
   this.jobj.technicianName = tec.firstName
    // this.jobj.serviceName = this.serviceBind.slice(-1)[0].serviceName;
    // this.jobj.serviceTime = this.serviceBind.slice(-1)[0].serviceTime
    // this.jobj.serviceCost = this.serviceBind.slice(-1)[0].serviceCost
    this.serviceBind.slice(-1)[0].technicianName = tec.firstName;
    this.serviceBind.slice(-1)[0].technicianId = tec.id;
    this.serviceBind.slice(-1)[0].technicianEmailId = tec.email;
    this.serviceBind.slice(-1)[0].defaultTime = this.serviceBind.slice(-1)[0].serviceTime;
    this.appointmentService.techserList.push(this.serviceBind.slice(-1)[0]);
    console.log(this.appointmentService.techserList);
  }
  ;

  dayClicked(day: WeekDay): void {
    this.viewDate = day.date;
    if (this.selectedDay) {
      delete this.selectedDay.cssClass;
    }
    let  ele = document.getElementsByClassName("cal-today");
    if(ele[0]!=undefined){
      ele[0].classList.remove('cal-today')
    }
    day.cssClass = 'cal-today';
    this.selectedDay = day;
  }

  beforeViewRender({header}: {header: WeekDay[]}): void {
    if(this.viewDate > new Date()){
      let  ele = document.getElementsByClassName("cal-today");
      if(ele[0]!=undefined) {
        ele[0].classList.remove('cal-today')
      }
    }
    header.forEach((day) => {
      if (this.selectedDay && day.date.getTime() === this.selectedDay.date.getTime()) {
        day.cssClass = 'cal-today';
        this.selectedDay = day;
      }
    });
  }
  selectService(event, serviceId, service) {
    var obj = {};
    if(event.target.checked) {
      this.checkedList.push(serviceId);
      debugger;
      this.servicechk = service;
      this.serviceBind.push(service);
      this.getTechnicianList();
      console.log(this.jobj)
    } else {
      for(var i=0 ; i < this.checkedList.length; i++) {
        if(this.checkedList[i] == serviceId) {
          this.checkedList.splice(i,1);
        }
      }
    }
    console.log(this.checkedList);
  }

  selectPref(val){
    debugger;
    this.preference = val;
  }

  onSearchChange(searchValue: string): void {
    console.log(searchValue);

  }
  //Funtion to getselected week date
  dayHeaderClicked(evn){
// console.log(evn);
    debugger;
    if(this.evnVar!=undefined){
        this.evnVar.style.backgroundColor = 'white';
    }
    this.viewDate = evn.day.date; // finally get the clicked date value
    this.selectedDay = evn.day;
    this.selectedDate1 = this.viewDate;
    evn.sourceEvent.target.classList.add('cal-today')
    this.evnVar = evn.sourceEvent.target.parentElement;
    let  ele = document.getElementsByClassName("cal-today");
    ele[0].classList.remove('cal-today')
    // ele[2].classList.remove('cal-today')
    // ele[1].classList.remove('cal-today')
    this.event = evn;
    evn.sourceEvent.target.parentElement.style.color ='#fff'
    evn.sourceEvent.target.parentElement.style.borderColor ='transparent'
    evn.sourceEvent.target.parentElement.style.background ='linear-gradient(90deg, #2ecbaa 0, #358fd0 100%)'
  }

  nextScreen1(){
    debugger;
    var myDiv = this.elementRef.nativeElement.querySelector('#appnt1');
    var myDiv1 = this.elementRef.nativeElement.querySelector('#appnt2');
    var datediv = this.elementRef.nativeElement.querySelector('#chdate');

    myDiv.style.display = 'block'
    datediv.style.display = 'none'
    myDiv1.style.display = 'none'
    ;  }

  nextScreen(){
    // tslint:disable-next-line:prefer-const
      var myDiv = this.elementRef.nativeElement.querySelector('#appnt1');
      var myDiv1 = this.elementRef.nativeElement.querySelector('#appnt2');
    var datediv = this.elementRef.nativeElement.querySelector('#chdate');

    myDiv.style.display = 'none'
    datediv.style.display = 'none'
    myDiv1.style.display = 'block'
;  }

  searchService(searchVal){
    this.appointmentService.getSearchService(searchVal).subscribe((data) => {
      this.servicelist = data['result'];
    });
    console.log(this.servicelist)
  }

  searchTechnician(searchtech){
    this.appointmentService.getSearchTechnician(searchtech).subscribe((data) => {
      this.tecSearch = true;
      this.searchTechList = data['result'];
    });
  }

    getServiceList() {
    this.appointmentService.getAllServices().subscribe((data) => {
      let service = data['result'];
      this.servicelist = service.list;
      console.log(this.servicelist)
    });
   
  }

  tecBookTime(tech, i){
    tech['appointmentDate'] = this.datePipe.transform(this.viewDate, 'MM/dd/yyyy')
    this.appointmentService.objIndex = i ;
    this.appointmentService.tecBookTime(tech).subscribe((data) => {
      this.bookedTime = data['result'];
      this.appointmentService.bookedTime = this.bookedTime['bookedTime'];
    });
  }

  // selectedDate(){
  // this.viewDate = this.selectedDate1;
  // }


  // @ts-ignore
  search = (text$: Observable<string>) => {
    return text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      // switchMap allows returning an observable rather than maps array
      switchMap( (searchText) =>  this.appointmentService.getSearchService(searchText) ),
      catchError(new ErrorInfo().parseObservableResponseError)
    );
  }


  /**
   * Used to format the result data from the lookup into the
   * display and list values. Maps `{name: "band", id:"id" }` into a string
   */
  resultFormatBandListValue(value: any) {
    return value.name;
  }
  /**
   * Initially binds the string value and then after selecting
   * an item by checking either for string or key/value object.
   */
  inputFormatBandListValue(value: any)   {
    if(value.name)
      return value.name
    return value;
  }

  editAppointment(){
    this.editappointment['Id'] = this.appointmentService.arrayofselectedappointment[0]['appointmentId']
    this.editappointment['AppointmentDate'] = this.datePipe.transform(this.viewDate, 'MM/dd/yyyy')
    this.editappointment['ServicePreference'] = this.preference
    this.editappointment['StartTime'] = this.appointmentService.techserList[0]['startTime'];
    this.editappointment['CustomerId'] = this.appointmentService.arrayofselectedappointment[0]['customerDetails']['customerId']
    this.editappointment['customeremailid'] = this.appointmentService.arrayofselectedappointment[0]['customerDetails']['email']
    this.editappointment['Appointments'] = [this.appointmenteditobj]
    this.appointmenteditobj['StartTime'] = this.appointmentService.techserList[0]['startTime'];
    this.appointmenteditobj['DefaultTime'] = "45 00"
    this.appointmenteditobj['ServiceId'] = this.appointmentService.arrayofselectedappointment[0]['technicianList'][0]['serviceId']
    this.appointmenteditobj['TechnicianId'] = this.appointmentService.arrayofselectedappointment[0]['technicianList'][0]['technicianId']
    this.appointmentService.editAppointment(this.editappointment).subscribe((data) => {
      this.editAppointmentData = data;
      this.router.navigate(['/appointmentlist']);
      this.messageService.clear();
      this.messageService.add('Sales Completed Successfully.')
      // this.appointmentService.bookedTime = this.bookedTime['bookedTime'];
    });
  }

  getTechnicianList() {
    debugger;
    this.appointmentService.getServiceTechnician(this.checkedList).subscribe((data) => {
      this.techlist = data;
      this.technicianlist = data['result'];
      this.technicians = this.technicianlist['technicians'];
    });
    console.log(this.technicianlist, this.techlist);
    console.log(this.technicians);
  }

}
