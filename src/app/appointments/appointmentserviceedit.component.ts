import {Component, ElementRef, Input, TemplateRef, ViewChild} from '@angular/core';
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
  '}.radio-box-2 .booked-time {\n' +
  '    color: #fff;\n' +
  '    border-color: transparent;\n' +
  '    background: red;\n' +
  '}' ,
  ]
})
export class AppointmentserviceEditComponent {
  title = 'SalonPay';
  private servicelist: Observable<any>;
  private technicianlist: Observable<any>;
  private checkedList: Array<any>;
  private techserList: Array<any>;
  @Input('bookedTime') bookedTime: any;

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
  date: Date;
  preference: any;
  private serviceBind: Array<any>;
  arrayofselectedobj: Array<any>=[];
    technicianobj= {};
  // private bookedTime: any;
  constructor(private elementRef: ElementRef, public router: Router, public appointmentService: AppointmentService) {
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
    this.techserList = [];
    this.arrayofselectedobj = this.appointmentService.arrayofselectedappointment;
    if(this.arrayofselectedobj.length>0){
        this.technicianobj = this.arrayofselectedobj[0]['technicianList'][0];
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
    // this.jobj = [];
    // this.subscription = this.customerService.on('call-customerDetail').subscribe(() => this.getCustomerList());
  }
  selectTec(tec) {
   this.jobj.technicianName = tec.firstName
    // this.jobj.serviceName = this.serviceBind.slice(-1)[0].serviceName;
    // this.jobj.serviceTime = this.serviceBind.slice(-1)[0].serviceTime
    // this.jobj.serviceCost = this.serviceBind.slice(-1)[0].serviceCost
    this.serviceBind.slice(-1)[0].technicianName = tec.firstName;
    this.techserList.push(this.serviceBind.slice(-1)[0]);
    console.log(this.techserList);
  }
  ;
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

  nextScreen1(){
    // tslint:disable-next-line:prefer-const
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

  searchService(){
    this.appointmentService.getSearchService(this.searchServicen).subscribe((data) => {
      this.servicelist = data['result'];
    });
  }

  searchTechnician(){
    this.appointmentService.getSearchTechnician(this.searchTech).subscribe((data) => {
      this.technicianlist = data['result'];
    });
  }

    getServiceList() {
    this.appointmentService.getAllServices().subscribe((data) => {
      let service = data['result'];
      this.servicelist = service.list;
    });
  }

  tecBookTime(tech){
    tech['appointmentDate'] = this.viewDate
    this.appointmentService.tecBookTime(tech).subscribe((data) => {
      this.bookedTime = data['result'];
      this.appointmentService.bookedTime = this.bookedTime['bookedTime'];
    });
  }

  getTechnicianList() {
    this.appointmentService.getServiceTechnician(this.checkedList).subscribe((data) => {
      this.technicianlist = data['result'][0];
      this.technicianlist = this.technicianlist['technicians'];
    });
  }

}
