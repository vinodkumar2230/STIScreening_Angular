import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './Auth/login.component';
import { RegisterComponent } from './Auth/register.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './shared/services/auth-guard.service';
import { NotFoundComponent } from './notfound.component';
import {HomeLayoutComponent}from  './shared/layouts/homelayout.component';
import {LoginLayoutComponent}from  './shared/layouts/loginlayout.component';
import {StiRegistrationComponent} from './stiregistrationandpayment/stiregistration.component';
import {STIAllScreeningComponent} from './Admin/allscreeings.component';
import { SortedDateComponent } from './Admin/sorteddate/sorteddate.component';
import { AuditDataComponent } from './Admin/Auditdata/auditdata.component';
import { DashboarddataComponent } from './Admin/Dashboarddata/dashboarddata.component';

const appRoutes: Routes = [
    {
        path: '',
        component: HomeLayoutComponent,

       // canActivate: [AuthGuard],
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'home',
          },
          {
            path: 'home',
            component: HomeComponent, canActivate: [AuthGuard]
          },
          {path: 'Screenings', component: STIAllScreeningComponent},
          {path: 'get-tested', component: StiRegistrationComponent},
          {path: 'sorted-data', component:  SortedDateComponent},
          {path: 'Audit-Logs', component:  AuditDataComponent},
          {path: 'Dashboard-data', component : DashboarddataComponent}
        
          // {
          //   path: 'doctordashboard',
          //  // component: DoctorDashboardComponent,canActivate: [AuthGuard],

          // },
          // {
          //   path: 'profile',
          //   //component: DoctorProfileComponent,canActivate: [AuthGuard]

          // },
          // {
          //   path: 'editprofile',
          //   //component: EditDoctorProfileComponent,canActivate: [AuthGuard],

          // }
        ]
      },

      // {path:"Screenings",component:STIAllScreenings,canActivate:[AuthGuard]},
      {
        path: '',
        component: LoginLayoutComponent,
        children: [
          {
            path: 'login',
            component: LoginComponent
          },
          {
            path: 'register',
            component: RegisterComponent
          }
        ]
      },

    { path: '**', component: NotFoundComponent }
];
export const routing = RouterModule.forRoot(appRoutes);
