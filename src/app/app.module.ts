import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
// STI Screening Control Messages
import { ControlMessages } from './Auth/formerrors.component';
import{STIformControlMessages} from './stiregistrationandpayment/stiregistrationcomponenterror';
// STI Screening Control Messages

//STI Screening Components
import { HeaderComponent } from './shared/navbar/header.component';
import { LoginComponent } from './Auth/login.component';
import { RegisterComponent } from './Auth/register.component';
import { HomeComponent } from './home/home.component';
import { HomeLayoutComponent } from './shared/layouts/homelayout.component';
import { LoginLayoutComponent } from './shared/layouts/loginlayout.component';
import { NotFoundComponent } from './notfound.component';
import {StiRegistrationComponent} from './stiregistrationandpayment/stiregistration.component';
import {STIAllScreeningComponent} from './Admin/allscreeings.component';
import {MessageService} from './shared/messagedisplay.service';
//STI Screening Components

// STI Screenig Services
import { ApiService, AuthGuard, JwtUserDataService, UserService } from './shared';
import {STIAdminService} from './Admin/stiadmin.service';
// STI Screenig Services

// STI Screening Routing
import { routing } from  './app.routing';
// STI Screening Routing

import {ToastrModule} from 'ngx-toastr';
import {CalendarModule, GrowlModule, DataTableModule, ButtonModule, PanelModule, ChartModule} from 'primeng/primeng';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import {LoaderComponent} from './shared/loader.component';
import { SortedDateComponent } from './Admin/sorteddate/sorteddate.component';
import { TextMaskModule } from 'angular2-text-mask';
import { AuditDataComponent } from './Admin/Auditdata/auditdata.component';
import { DashboarddataComponent } from './Admin/Dashboarddata/dashboarddata.component';
import { ModalModule, BsDatepickerModule, BsDropdownModule } from 'ngx-bootstrap';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    HomeLayoutComponent,
    LoginLayoutComponent,
    NotFoundComponent,
    StiRegistrationComponent,
    STIAllScreeningComponent,
    ControlMessages,
    STIformControlMessages,
    MessageService,
    LoaderComponent,
    SortedDateComponent,
    AuditDataComponent,
    DashboarddataComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    routing,
    CalendarModule,
    GrowlModule,
    ToastrModule.forRoot({preventDuplicates: true}),
    DataTableModule,
    ButtonModule,
    PanelModule,
    ChartModule,
    BrowserAnimationsModule,
    TextMaskModule,
    NgbModule.forRoot(),
    ModalModule.forRoot(), // ngx bootstrap
    BsDatepickerModule.forRoot(), // ngx bootstrap
    BsDropdownModule.forRoot() // ngx bootstrap

  ],
  providers: [ApiService, 
    AuthGuard,
    JwtUserDataService, 
    UserService,
    STIAdminService,
    {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }






