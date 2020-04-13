import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SignUpComponent} from './sign-up/sign-up.component';
import {LoginComponent} from './login/login.component';
import {ResetpasswordComponent} from './resetpassword/resetpassword.component';
import {ProfilesettingComponent} from './dashboard/profilesetting/profilesetting.component';
import {EmailsettingComponent} from './dashboard/emailsetting/emailsetting.component';
import {NotificationsettingComponent} from './dashboard/notificationsetting/notificationsetting.component';
import {AccountsettingComponent} from './dashboard/accountsetting/accountsetting.component';
import {BanksettingComponent} from './dashboard/banksetting/banksetting.component';
import {SchedulesettingComponent} from './dashboard/schedulesetting/schedulesetting.component';
import {ForgotComponent } from './login/forgot.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {AdminComponent} from './admin/admin.component'
import { CustomerComponent } from './customer/customer.component';
import { AddCustomerComponent } from './customer/addcustomer.component';
import { UpdateCustomerComponent } from './customer/updatecustomer.component';
import { CustomerDashboardComponent } from './customer/customer-dashboard/customerdashboard.component';
import {SalesComponent} from './sales/sales.component';
import {AllcustomerComponent} from './sales/allcustomer.component';
import {CustomerSaleComponent} from './sales/customerdetail.component';
import { NewSalesComponent } from './sales/newsales/newsales.component';
import { NewSalesProductComponent } from './sales/newsales/newsalesproduct.component';
import {AppointmentserviceComponent} from './appointments/appointmentservice.component';
import { SalesTransactionCartComponent } from './sales/newsales/saletransactioncart.component';
import { MeregeSalesCartComponent } from './sales/newsales/mergesalescart.component';
import { TipAdjustmentSalesComponent } from './sales/newsales/salestipadjustment.component';
import { ReviewSalesComponent } from './sales/newsales/salestransactionreview.component';
import { AppointmentListComponent } from './appointments/appointmentlist.component';
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'resetpassword/:id', component: ResetpasswordComponent , pathMatch: 'full'},
  { path: 'forgot', component: ForgotComponent },
  { path: 'dashboard', component: DashboardComponent},
  { path: 'admin', component: AdminComponent},
  { path: 'customer', component: CustomerComponent},
  { path: 'appointment', component: AppointmentserviceComponent},
  { path: 'newsales', component: SalesComponent},
  { path: 'transactionnewsales', component: NewSalesComponent},
  { path: 'allcustomer', component: AllcustomerComponent},
  { path: 'getcustomer', component: CustomerSaleComponent},
  { path: 'customerappointment', component: SalesComponent},
  { path: 'allcustomerappointment', component: AllcustomerComponent},
  { path: 'getcustomerappointment', component: CustomerSaleComponent},
  { path: 'addcustomer', component: AddCustomerComponent},
  { path: 'updatecustomer', component: UpdateCustomerComponent},
  { path: 'customerdashboard', component: CustomerDashboardComponent},
  { path: 'transactionproduct', component: NewSalesProductComponent},
  { path: 'transactioncart', component: SalesTransactionCartComponent},
  { path: 'mergesalescart', component: MeregeSalesCartComponent },
  { path: 'transactiontipadjustment', component: TipAdjustmentSalesComponent },
  { path: 'transactionreview', component: ReviewSalesComponent },
  { path: 'appointmentlist', component: AppointmentListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
