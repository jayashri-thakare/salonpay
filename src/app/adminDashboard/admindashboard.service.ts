import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { map } from 'rxjs/operators';
import {Observable, of, Subject} from 'rxjs';
import {MessageService} from '../message.service';
import * as signalR from "@aspnet/signalr";
import {ChartmodelModel} from './chartmodel.model';


class User {
}
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Access-Control-Allow-Origin': '*',
    // Authorization: localStorage.getItem('Token'),
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
    'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type, Accept, Origin'
  })
};

@Injectable({
  providedIn: 'root'
})

export class AdmindashboardService {
  private weekscheduledata: ChartmodelModel[];
  constructor(private httpClient: HttpClient, private messageService: MessageService) { }

public data: ChartmodelModel[];

  private hubConnection: signalR.HubConnection

  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://172.16.0.99:8013/TodayAndUpcommingAppointments?parentCompanyId=6')
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err));
  }

  public startGraphConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://172.16.0.99:8013/TodaysQuickStatistics_SalaryCommissionTip?parentCompanyId=6&TechnicianId=cfe2e89c-8c8a-47fc-8b72-d4a9ded74079')
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err));
  }
  public startConnectionWeekly = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://172.16.0.99:8013/AppointmentWeeklySchedule?parentCompanyId=6')
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err));
  }

  public addTransferChartDataListener = () => {
    this.hubConnection.on('transferchartdata', (data) => {
      this.data = data;
      console.log(data);
    });
  }

  public addWeeklyDataListener = () => {
    this.hubConnection.on('weeklydata', (data) => {
      this.weekscheduledata = data;
      console.log("weekly====")
      console.log(data);
    });
  }
}
