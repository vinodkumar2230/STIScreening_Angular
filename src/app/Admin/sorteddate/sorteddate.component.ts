import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { STIAdminService } from '../stiadmin.service';
import { MessageService } from '../../shared/messagedisplay.service';
import { ScreeningParams, ScreeningData } from '../allscreeings';
import * as  FileSaver from 'file-saver';

@Component({
    selector: 'sti-sorted',
    templateUrl: './sorteddate.component.html',
    providers: [STIAdminService, MessageService]
})
export class SortedDateComponent implements OnInit {
    model: ScreeningParams;
    IsLoaderActive: any = false;
    searchform: FormGroup;
    datatabledata:any
    tabletotal: number;
    tablerows: number;
    totaldata:any;
    totalamount:number=0;
    constructor(private _STIAdminService: STIAdminService) {
        this.model = new ScreeningParams();
    }

    LoadData() {
         this.model.StartRecord = 0;
         this.model.NumberOfRecords = 10;
         this.model.sortField = 'CreatedDate';
         this.model.sortOrder = -1;
        // this.model.firstName = null;
        // this.model.lastName = null;
        // this.model.email = null;
        // this.model.state = null;
        this.model.startDate = null;
        this.model.endDate = null;
        this.tablerows = 10;
        this._STIAdminService.getSortedData(this.model).subscribe(data => {
            if (data.StatusCode == 200) {
                this.datatabledata = data.ResponseData;
                this.tabletotal = data.ResponseData.ResponseData.length;
                
            }
        }, error => {

        });
    }
    loadLazyScreeningData(event) {
         this.model.StartRecord = event.first;
         this.model.NumberOfRecords = event.rows;
         this.model.sortField = event.sortField;
         this.model.sortOrder = event.sortOrder;
        // this.model.firstName = this.searchform.get('firstName').value;
        // this.model.lastName = this.searchform.get('lastName').value;
        // this.model.email = this.searchform.get('email').value;
        this.model.state = this.searchform.get('state').value == -1 ? null : this.searchform.get('state').value;
        const makingStartDate = this.searchform
            .get('startDate').value == null ? null : this.searchform.get('startDate').value.year + '-' + this.searchform.get('startDate').value.month + '-' + this.searchform.get('startDate').value.day;
        const makingEndDate = this.searchform
            .get('endDate').value == null ? null : this.searchform.get('endDate').value.year + '-' + this.searchform.get('endDate').value.month + '-' + this.searchform.get('endDate').value.day;
        this.model.startDate = makingStartDate;
        this.model.endDate = makingEndDate;
        this._STIAdminService.getSortedData(this.model)
            .subscribe(data => {
                this.datatabledata = data.ResponseData;
                this.tablerows = event.rows;
                this.tabletotal = data.ResponseData.ResponseData.length;
            });
    }
    ngOnInit() {
        this.searchform = new FormGroup({
          //  firstName: new FormControl(),
            //lastName: new FormControl(),
            //email: new FormControl(),
            state: new FormControl(),
            startDate: new FormControl(),
            endDate: new FormControl()
        });
        (<FormControl>this.searchform.controls['state'])
            .setValue('-1', { onlySelf: true });
        this.LoadData();
    }
    FilterData(formvalue) {
         this.model.StartRecord = 0;
         this.tablerows = 20;
         this.model.NumberOfRecords = this.tablerows;
         this.model.sortField = 'CreatedDate';
         this.model.sortOrder = -1;
        // this.model.firstName = formvalue.firstName;
        // this.model.lastName = formvalue.lastName;
        // this.model.email = formvalue.email;
        // this.model.state = formvalue.state == -1 ? null : formvalue.state;
        this.model.startDate = formvalue.startDate == null ? null : formvalue.startDate.year + '-' + formvalue.startDate.month + '-' + formvalue.startDate.day;
        this.model.endDate = formvalue.endDate == null ? null : formvalue.endDate.year + '-' + formvalue.endDate.month + '-' + formvalue.endDate.day;
        this._STIAdminService.getSortedData(this.model)
            .subscribe(data => {
                this.datatabledata = data.ResponseData;
                this.tabletotal = data.ResponseData.ResponseData.length;
               this.totaldata=this.datatabledata.ResponseData.length;
            
            });
            
               // this.totaldata=this.datatabledata.ResponseData.length;
                
                   
                    //var p= this.datatabledata.ResponseData[4];
                    // for(var j=0; j<this.totaldata;j++)
                    // {
                    //     this.totalamount=this.datatabledata.ResponseData[j].amount+this.totalamount
                    // }
                    
                   
                }


                getTotal() {
                    let total = 0;
                    for (var i = 0; i < this.datatabledata.ResponseData.length; i++) {
                        if (this.datatabledata.ResponseData[i].amount) {
                            total += this.datatabledata.ResponseData[i].amount;
                            this.totalamount = total ;
                        }
                    }
                    return total;
                }


                ExportExcel(){
                   this.IsLoaderActive=true;
                   this._STIAdminService.DownloadExcelRevenueData(this.model).subscribe(response=>{
                       this.IsLoaderActive=false;
                       const myBlob: Blob=new Blob([(<any>response)._body],{type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
                       FileSaver.saveAs(myBlob, 'Revenue.xlsx');
                   });

                   
                

                }
            
    ViewSTIForm(rowID) {
        debugger;
        alert(1);
    }
}
