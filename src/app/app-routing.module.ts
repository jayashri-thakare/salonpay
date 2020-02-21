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

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'resetpassword/:id', component: ResetpasswordComponent , pathMatch: 'full'},
  { path: 'forgot', component: ForgotComponent },
  { path: 'dashboard', component: DashboardComponent},
  { path: 'admin', component: AdminComponent},
  { path: 'customer', component: CustomerComponent},
  { path: 'addcustomer', component: AddCustomerComponent},
  { path: 'updatecustomer', component: UpdateCustomerComponent},
  { path: 'customerdashboard', component: CustomerDashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
