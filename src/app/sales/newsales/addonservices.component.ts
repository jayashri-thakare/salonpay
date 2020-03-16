import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { AdminService } from 'src/app/admin/admin.service';
import { SalesService } from '../sales.service';
import { MessageService } from 'src/app/message.service';

@Component({
  selector: 'addonservice-modal',
  template: '  <!--  Modal Starts -->\n' +
    '    <div class="modal fade" id="addonServicePopup">\n' +
    '        <div class="modal-dialog big-window">\n' +
    '            <div class="modal-content">\n' +
    '                <div class="modalCancel" data-dismiss="modal"><i class="icon-cir-plus"></i></div>\n' +
    '\n' +
    '                <h2 class="modal-title mb-4">Add On Services</h2>\n' +
    '                <div class="scrollbar addon-service-box">\n' +
    '                    <div class="f-row f-3 f-1300-2 f-640-1">\n' +
    '                        <div class="f-col" *ngFor="let addon of addonService">\n' +
    '                            <!-- start -->\n' +
    '                            <div class="techi-box">\n' +
    '                                <div class="techi-top">\n' +
    '                                    <div class="user-det">\n' +
    '                                        <i class="icon-haircut prodt-ico"></i>\n' +
    '                                        <div class="usr-name">\n' +
    '                                            <h3><span>{{addon?.serviceName}}</span>$ {{addon?.serviceCost}}</h3>\n' +
    '                                        </div>\n' +
    '                                    </div>\n' +
    '                                    <div class="main-selt">\n' +
    '                                        <input type="checkbox" id="{{addon?.serviceName}}" name="{{addon?.serviceName}}" (click)="selectedaddonServices(addon, $event)" required>\n' +
    '                                        <label for="{{addon?.serviceName}}">Select</label>\n' +
    '                                    </div>\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '                            <!-- end -->\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '\n' +
    '                <div class="popBtn">\n' +
    '                    <button class="button line" type="button" data-dismiss="modal">Cancel</button>\n' +
    '                    <button class="button" type="submit" data-dismiss="modal" (click)="selectedservicesofsales()">Apply</button>\n' +
    '                </div>\n' +
    '\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '    <!--  Modal Ends -->'
})
export class AddonServicesComponent implements OnInit {
    @Input('addonService') addonService: any;
    arrayofaddonservices: Array<any>=[];
    @Output() addonsertoparent = new EventEmitter<string>();

  constructor(public messageService:MessageService, private salesService: SalesService, public adminService:AdminService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {

  }

  selectedaddonServices(selectedaddonservices, event){
    var index = this.arrayofaddonservices.indexOf(selectedaddonservices);
    if(index<0 && event.currentTarget.checked){
      this.arrayofaddonservices.push(selectedaddonservices);
    }else{
      this.arrayofaddonservices.splice(index, 1);
    }
    console.log(this.arrayofaddonservices)
  }

  selectedservicesofsales(){
    if(this.arrayofaddonservices.length == 0){
      this.messageService.clear();
      this.messageService.add('Please add the Addon Services.')
    }else{
      this.sendMessageToParent(this.arrayofaddonservices)
      this.arrayofaddonservices = [];
    }
  }

  sendMessageToParent(addonservice) {
    this.addonsertoparent.emit(addonservice)
  }
}
