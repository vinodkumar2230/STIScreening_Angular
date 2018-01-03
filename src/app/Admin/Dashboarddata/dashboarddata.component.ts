import { Component, OnInit } from '@angular/core';
import { STIAdminService } from '../stiadmin.service';
import { JwtUserDataService } from '../../shared/index';
import { Router } from '@angular/router';
@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboarddata.component.html'
})
export class DashboarddataComponent implements OnInit {

    IsLoaderActive: any = false;
    Chartdata: any;
    labels: any[] = [];
    datasets: any[] = [];
    completeDataArray: any[] = [];
    inCompleteDataArray: any[] = [];
    totalReferral: any;
    totalRevenue: any;
    pendingReferrals: any;
    constructor(private _STIAdminService: STIAdminService, private _jwtUserDataService: JwtUserDataService, private router: Router) {
    }
    ngOnInit() {
        this.IsLoaderActive = true;
        this._STIAdminService.getDashboardData().subscribe(data => {
            if (data.StatusCode === 200) {
                this.IsLoaderActive = false;
                data.ResponseData.Chartdata.forEach((item, index) => {
                    this.labels.push(item.Year);
                    this.completeDataArray.push(item.Complete);
                    this.inCompleteDataArray.push(item.NotComplete);
                });
                this.datasets.push(
                    {
                        label: 'Completed Screenings',
                        backgroundColor: '#42A5F5',
                        borderColor: '#1E88E5',
                        data: this.completeDataArray
                    },
                    {
                        label: 'Incomplete Screenings',
                        backgroundColor: '#9CCC65',
                        borderColor: '#1E88E5',
                        data: this.inCompleteDataArray
                    }
                );
                this.Chartdata = {
                    labels: this.labels,
                    datasets: this.datasets
                };
                this.totalReferral = data.ResponseData.totalReferral;
                this.totalRevenue = data.ResponseData.totalRevenue;
                this.pendingReferrals = data.ResponseData.pendingReferrals;
            }
        }, error => {
            this.IsLoaderActive = false;
            if (error.ISAuthenticated !== undefined && error.ISAuthenticated === false) {
                this._jwtUserDataService.destroyToken();
                this._jwtUserDataService.destroyUserName();
                this._jwtUserDataService.destroyUserType();
                this.router.navigateByUrl('/login');
            }
        });
    }



}