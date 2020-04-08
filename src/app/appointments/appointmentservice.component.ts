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
    var myDiv = this.elementRef.nativeElement.querySelector('#appnt1');
    var myDiv1 = this.elementRef.nativeElement.querySelector('#appnt2');
    var datediv = this.elementRef.nativeElement.querySelector('#chdate');
    myDiv.style.display = 'none'
    myDiv1.style.display = 'none'
    datediv.style.display = 'block'
    this.getServiceList();
    this.checkedList = [];
    // @ts-ignore
    this.jobj={};
    this.techserList = [];
    // this.jobj = [];
    // this.subscription = this.customerService.on('call-customerDetail').subscribe(() => this.getCustomerList());
  }
  selectTec(tec) {
    debugger;
    // this.jobj.service.technicianName = tec.firstName
    // this.jobj.service.serviceName = this.servicechk.serviceName;
    // this.jobj.service.serviceTime = this.servicechk.serviceTime
    // this.jobj.service.serviceCost = this.servicechk.serviceCost

    this.jobj.technicianName = tec.firstName
    this.jobj.serviceName = this.servicechk.serviceName;
    this.jobj.serviceTime = this.servicechk.serviceTime
    this.jobj.serviceCost = this.servicechk.serviceCost
    this.techserList.push(this.jobj);
    console.log(this.techserList);
  }
  ;
  selectService(event, serviceId, service) {
    var obj = {};
    if(event.target.checked) {
      this.checkedList.push(serviceId);
      this.servicechk = service;
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

  getTechnicianList() {
    this.appointmentService.getServiceTechnician(this.checkedList).subscribe((data) => {
      this.technicianlist = data['result'][0];
      this.technicianlist = this.technicianlist['technicians'];
      debugger;
      // this.customerlist = this.customerlist.list;
      // console.log(this.customerlist)
      // localStorage.setItem('Arrayofcustomer', JSON.stringify(this.customerlist[this.customerlist.length - 1].id))
      // // localStorage.setItem('companyId', data['ParentCompanyID']);
    });
  }

}
