import { Component, OnInit } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl } from '@angular/forms';
import { AuditData, AuditParams } from './auditdata';
import { JwtUserDataService } from '../../shared/index';
import { STIAdminService } from '../stiadmin.service';
import { Router } from '@angular/router';
@Component({
    selector: 'app-auditdata',
    templateUrl: './auditdata.component.html'
})
export class AuditDataComponent implements OnInit{
    searchform:FormGroup;
    model:AuditParams;
    tabletotal:number;
    tablerows:number;
    datatabledata:AuditData[]=[];
    constructor(private _jwtUserDataService: JwtUserDataService, private _STIAdminService: STIAdminService, private router: Router, private toaster: ToastrService) {
    }
    ngOnInit() {
        this.searchform = new FormGroup({
            startDate: new FormControl(new Date()),
            endDate: new FormControl(new Date()),
            operationType: new FormControl()
        });
        (<FormControl>this.searchform.controls['operationType'])
            .setValue('-1', { onlySelf: true });
        this.loadDataInitially();
    }
    loadDataInitially() {
        this.model = new AuditParams();
        this.model.StartRecord = 0;
        this.model.NumberOfRecords = 10;
        this.model.sortField = 'date';
        this.model.sortOrder = -1;
        this.model.startDate = null;
        this.model.endDate = null;
        this.model.OperationType = null;
        this.tablerows = 10;
        // this._STIAdminService.GetAuditData(this.model).subscribe(data => {
        //     if (data.StatusCode === 200) {
        //         this.datatabledata = data.ResponseData.auditDataList;
        //         this.tabletotal = data.ResponseData.totalRecrods;
        //     }
        // }, error => {
        //     if (error.ISAuthenticated !== undefined && error.ISAuthenticated === false) {
        //         this.toaster.error('Invalid token', 'Error');
        //         this._jwtUserDataService.destroyToken();
        //         this._jwtUserDataService.destroyUserName();
        //         this._jwtUserDataService.destroyUserType();
        //         this.router.navigateByUrl('/login');
        //     } else {
        //         this.toaster.error('Something is wrong', 'Error');
        //     }
        // });
    }
    loadLazyScreeningData(event) {
        this.model.StartRecord = event.first;
        this.model.NumberOfRecords = event.rows;
        this.model.sortField = event.sortField;
        this.model.sortOrder = event.sortOrder;
        const operationTypeValue = this.searchform.get('operationType').value === '-1' ? null : this.searchform.get('operationType').value;
        this.model.OperationType = operationTypeValue;
        const makingStartDate = this.searchform
        .get('startDate').value == null ? null : this.searchform.get('startDate').value.year + '-' + this.searchform.get('startDate').value.month + '-' + this.searchform.get('startDate').value.day;
    const makingEndDate = this.searchform
        .get('endDate').value == null ? null : this.searchform.get('endDate').value.year + '-' + this.searchform.get('endDate').value.month + '-' + this.searchform.get('endDate').value.day;
    this.model.startDate = makingStartDate;
    this.model.endDate = makingEndDate;
     this._STIAdminService.GetAuditData(this.model)
            .subscribe(data => {
                this.datatabledata = data.ResponseData.auditDataList;
                this.tablerows = event.rows;
                this.tabletotal = data.ResponseData.totalRecrods;
            }, error => {
                if (error.ISAuthenticated !== undefined && error.ISAuthenticated === false) {
                    this.toaster.error('Invalid token', 'Error');
                    this._jwtUserDataService.destroyToken();
                    this._jwtUserDataService.destroyUserName();
                    this._jwtUserDataService.destroyUserType();
                    this.router.navigateByUrl('/login');
                } else {
                    this.toaster.error('Something is wrong', 'Error');
                }
            });
    }

    filterData(formvalue) {
        this.model.StartRecord = 0;
        this.tablerows = 10;
        this.model.NumberOfRecords = this.tablerows;
        this.model.sortField = 'date';
        this.model.sortOrder = -1;
        const operationTypeValue = formvalue.operationType === '-1' ? null : formvalue.operationType;
        this.model.OperationType = operationTypeValue;
        this.model.startDate = formvalue.startDate == null ? null : formvalue.startDate.year + '-' + formvalue.startDate.month + '-' + formvalue.startDate.day;
        this.model.endDate = formvalue.endDate == null ? null : formvalue.endDate.year + '-' + formvalue.endDate.month + '-' + formvalue.endDate.day;
       
        this._STIAdminService.GetAuditData(this.model)
            .subscribe(data => {
                this.datatabledata = data.ResponseData.auditDataList;
                this.tabletotal = data.ResponseData.totalRecrods;
            }, error => {
                if (error.ISAuthenticated !== undefined && error.ISAuthenticated === false) {
                    this.toaster.error('Invalid token', 'Error');
                    this._jwtUserDataService.destroyToken();
                    this._jwtUserDataService.destroyUserName();
                    this._jwtUserDataService.destroyUserType();
                    this.router.navigateByUrl('/login');
                } else {
                    this.toaster.error('Something is wrong', 'Error');
                }
            });
    }

}