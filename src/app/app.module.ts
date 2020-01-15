import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
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
import { NotificationsettingComponent } from './dashboard/notificationsetting/notificationsetting.component';
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
import {ForgotpasswordComponent} from './login/forgotpassword.component';
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

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  imports: [
    DateRangePickerModule,
    DateTimePickerModule,
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    ModalModule,
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
    AccountEditComponent, EmailEditComponent, CustomTimePickerComponent, Safe],
  providers: [UserdataService, DatePipe],
  entryComponents: [ControlErrorComponent, ModalComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }

