import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { ControlErrorContainerDirective } from './control-error-container.directive';
import { ControlErrorsDirective } from './control-errors.directive';
import { FormSubmitDirective } from './form-submit.directive';
import { ControlErrorComponent } from './control-error/control-error.component';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {MessagesComponent} from './messages/messages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { ProfilesettingComponent } from './dashboard/profilesetting/profilesetting.component';
import {EmailsettingComponent, Safe} from './dashboard/emailsetting/emailsetting.component';
import { AccountsettingComponent } from './dashboard/accountsetting/accountsetting.component';
import { BanksettingComponent } from './dashboard/banksetting/banksetting.component';
import { SchedulesettingComponent } from './dashboard/schedulesetting/schedulesetting.component';
import { SidebarComponent } from './_layout/sidebar/sidebar.component';
import { HeaderComponent } from './_layout/header/header.component';
// import { GlobalErrorHandler } from './_errorlogging/global-error-handler';
// import { ServerErrorInterceptor } from './_errorlogging/server-error.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import {ModalModule} from './_modal/modal.module';
import {ModalComponent} from './_modal/modal.component';
import {ProfileEditComponent} from './dashboard/profilesetting/profile-edit.component';
import {AddressEditComponent} from './dashboard/profilesetting/address-edit.component';
import {ContactEditComponent} from './dashboard/profilesetting/contact-edit.component';
import {ProfileinfoEditComponent} from './dashboard/profilesetting/profileinfo-edit.component';
import {UserdataService} from './userdata.service';
import {CscComponent} from './dashboard/profilesetting/ctcdropdown.component';
import {InternationalTelNoDirective} from './international-tel-no.directive';
import { ForgotComponent } from './login/forgot.component';
import {DateTimePickerModule} from '@syncfusion/ej2-angular-calendars';
import {AccountEditComponent} from './dashboard/accountsetting/account-edit.component';
import { RichTextEditorAllModule } from '@syncfusion/ej2-angular-richtexteditor';
import {EmailEditComponent} from './dashboard/emailsetting/emailsignature.component';
import {CustomTimePickerComponent} from './dashboard/schedulesetting/customtimepicker.component';
import { ScheduleEditComponent } from './dashboard/schedulesetting/schedule-edit.component';
import { DateRangePickerModule } from '@syncfusion/ej2-angular-calendars';
import { DatePipe } from '@angular/common';
import {IMAPSettingComponent} from './dashboard/emailsetting/imapsetting.component'
import {AdminComponent} from './admin/admin.component'
import {UserComponent} from './admin/user/user.component'
import {AdminRolesComponent} from './admin/roles/roles.component'
import {AddRolesComponent} from './admin/roles/addroles.component'
import { AdminService } from './admin/admin.service';
import { DeleteComponent } from './delete.component'
import { AddUserComponent } from './admin/user/adduser.component'
import { MultiSelectAllModule } from '@syncfusion/ej2-angular-dropdowns'
import {TimerComponent} from './timetracker.component'
import {UserDetailsComponent} from './admin/user/userdetails.component';
import {UserRightsComponent} from './admin/user/userroles.component';
import {UserHistoryComponent} from './admin/user/userhistory.component';
import {AdminInventoryComponent} from './admin/inventory/inventory.component'
import {AddInventoryComponent} from './admin/inventory/addinventory.component'
import {AdminCouponComponent} from './admin/coupon/coupon.component';
import {AddCouponComponent} from './admin/coupon/addcoupon.component';
import { AdminServiceComponent} from './admin/services/service.component';
import {AddServiceComponent} from './admin/services/addservice.component';
import {AdminRewardsComponent} from './admin/rewards/rewards.component';
import {AddRewardsComponent} from './admin/rewards/addrewards.component';
import {AdminBusinessSettingComponent} from './admin/business-setting/business.component';
import {BusinessTipAdjustmentComponent} from './admin/business-setting/tipadjustment.component'
import {BusinessStaffComponent} from './admin/business-setting/staff.component'
import {BusinessReviewComponent} from './admin/business-setting/review.component'
import {BusinessInventoryComponent} from './admin/business-setting/inventory.component'
import {BusinessCustomerComponent} from './admin/business-setting/customer.component'
import {BusinessCouponComponent} from './admin/business-setting/coupon.component'
import {AddReviewComponent} from './admin/business-setting/addreview.component'
import {AddTaxTableComponent} from './admin/business-setting/addtaxtable.component'
import {BusinessTaxTableComponent} from './admin/business-setting/taxtable.component'
import {AdminCommunicationComponent} from './admin/communication/communication.component'
import {AddNewEmailCommunicationComponent} from './admin/communication/addnewemail.component'
import {AddNewSmsCommunicationComponent} from './admin/communication/addnewsms.component'
import {NotificationsettingComponent} from './dashboard/notificationsetting/notificationsetting.component';
import {ButtonsComponent} from './buttons.component';
import {TimerService} from './timer.service';
import {TimerComponent1} from './timer.component';
import {BusinessServicesCategoryComponent} from './admin/business-setting/servicecategory.component'
import {AddServicesComponent} from './admin/business-setting/addservices.component'
import {BusinessTurnCountComponent} from './admin/business-setting/turncount.component'
import {AddTurnCountComponent} from './admin/business-setting/addturncount.component'
import {BusinessExpLevelComponent} from './admin/business-setting/explevel.component'
import {AddExpLevelComponent} from './admin/business-setting/addexplevel.component'
import {EditBusinessProfileContactComponent} from './admin/business-setting/editcontact.component'
import {EditBusinessProfileNameComponent} from './admin/business-setting/editbusinessname.component'
import {PayperiodComponent} from './admin/business-setting/payperiod.component';
import {BusinessScheduleComponent} from './admin/business-setting/schedule.component'
import {AddScheduleComponent} from './admin/business-setting/addschedule.component'
import {AddPayPeriodComponent} from './admin/business-setting/addpayperiod.component'
import {BusinessSidebarComponent} from './admin/business-setting/businesssettingsidebar.component'
import {AddSupplierComponent} from './admin/business-setting/addsupplier.component'
import {SupplierComponent} from './admin/business-setting/supplier.component'
import {CustomerService} from './customer/customer.service'
import {CustomerComponent} from './customer/customer.component'
import {AddCustomerComponent} from './customer/addcustomer.component'
import {UpdateCustomerComponent} from './customer/updatecustomer.component'
import {CustomerStatusBarComponent} from './customer/statusbar.component'
import {EditBulkCustomerComponent} from './customer/editbulk.component'
import {CustomerDashboardComponent} from './customer/customer-dashboard/customerdashboard.component'
import {CustDashboardComponent} from './customer/customer-dashboard/dashboard/customer-dashboard.component'
import {CustomerCommunicationComponent} from './customer/customer-dashboard/communications/communication.component'
import {CustomerHistoryComponent} from './customer/customer-dashboard/history/history.component'
import {CustomerNotesComponent} from './customer/customer-dashboard/notes/notes.component'
import {CustomerProfileComponent} from './customer/customer-dashboard/profile/profile.component'
import {CustomerSalesComponent} from './customer/customer-dashboard/sales/sales.component'
import {CustomerProfileEditComponent} from './customer/customer-dashboard/profile/customerprofile-edit.component'
import {CustomerContactEditComponent} from './customer/customer-dashboard/profile/customercontact-edit.component'
import {CustomerAddressEditComponent} from './customer/customer-dashboard/profile/customeraddress-edit.component'
import {CustomerProfileinfoEditComponent} from './customer/customer-dashboard/profile/customerlogininfo-edit.component'
import {CustomerProfileSettingComponent} from './customer/customer-dashboard/profile/customerprofilesetting.component'
import {MobileSidebarComponent} from './_layout/sidebar/mobile-sidebar.component'

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  imports: [
    MultiSelectAllModule,
    DateRangePickerModule,
    DateTimePickerModule,
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    ModalModule,
    FormsModule,
    RichTextEditorAllModule,
    LoggerModule.forRoot({
      serverLoggingUrl: '/api/logs',
      level: NgxLoggerLevel.TRACE,
      serverLogLevel: NgxLoggerLevel.ERROR,
      disableConsoleLogging: false
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  declarations: [AppComponent,
    CustomerComponent,
    AddCustomerComponent,
    UpdateCustomerComponent,
    CustomerStatusBarComponent,
    EditBulkCustomerComponent,
    CustomerDashboardComponent,
    CustDashboardComponent,
    CustomerCommunicationComponent,
    CustomerHistoryComponent,
    CustomerNotesComponent,
    CustomerProfileComponent,
    CustomerSalesComponent,
    CustomerProfileEditComponent,
    CustomerContactEditComponent,
    CustomerAddressEditComponent,
    CustomerProfileinfoEditComponent,
    CustomerProfileSettingComponent,
    MobileSidebarComponent,
    AddReviewComponent,
    AddTaxTableComponent,
    BusinessTipAdjustmentComponent,
    BusinessStaffComponent,
    BusinessReviewComponent,
    BusinessInventoryComponent,
    BusinessCustomerComponent,
    BusinessCouponComponent,
    BusinessTaxTableComponent,
    BusinessServicesCategoryComponent,
    AddServicesComponent,
    AddPayPeriodComponent,
    BusinessSidebarComponent,
    AddSupplierComponent,
    SupplierComponent,
    BusinessTurnCountComponent,
    AddTurnCountComponent,
    BusinessScheduleComponent,
    AddScheduleComponent,
    BusinessExpLevelComponent,
    AddExpLevelComponent,
    EditBusinessProfileContactComponent,
    EditBusinessProfileNameComponent,
    AdminCommunicationComponent,
    AddNewEmailCommunicationComponent,
    AddNewSmsCommunicationComponent,
    AddUserComponent,
    AdminRewardsComponent,
    AdminBusinessSettingComponent,
    AddRewardsComponent,
    AdminCouponComponent,
    AddCouponComponent,
    AddInventoryComponent,
    AdminInventoryComponent,
    DeleteComponent,
    AdminComponent,
    UserComponent,
    AdminRolesComponent,
    AddRolesComponent,
    IMAPSettingComponent,
    ScheduleEditComponent,
    SignUpComponent,
    LoginComponent,
    ForgotComponent,
    ControlErrorsDirective,
    ControlErrorContainerDirective,
    FormSubmitDirective,
    ControlErrorComponent,
    MessagesComponent,
    ControlErrorComponent,
    DashboardComponent,
    ResetpasswordComponent,
    ProfilesettingComponent,
    EmailsettingComponent,
    NotificationsettingComponent,
    AccountsettingComponent,
    BanksettingComponent,
    SchedulesettingComponent,
    SidebarComponent,
    HeaderComponent, ProfileEditComponent, AddressEditComponent, ContactEditComponent, ProfileinfoEditComponent,
    CscComponent,
    InternationalTelNoDirective,
    AccountEditComponent, EmailEditComponent, CustomTimePickerComponent, Safe, TimerComponent, TimerComponent1, UserDetailsComponent,
    UserRightsComponent, UserHistoryComponent, AdminServiceComponent,
    AddServiceComponent, ButtonsComponent, BusinessReviewComponent, PayperiodComponent
  ],
  providers: [UserdataService, DatePipe, AdminService, TimerService, CustomerService],
  entryComponents: [ControlErrorComponent, ModalComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }

