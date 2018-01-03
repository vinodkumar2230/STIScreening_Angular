import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { STIAdminService } from '../Admin/stiadmin.service';
import { MessageService } from '../shared/messagedisplay.service';
import { ScreeningParams, ScreeningData, DeleteFileParamVM, PatientDetailViewModel, ScreeningStatusEnum, SingleScreeningViewModel, PostScreeningIdModel, PatientDetailParamVM } from '../Admin/allscreeings';
import { FormGroup, FormControl } from '@angular/forms';
import { ModalDirective, BsModalService } from 'ngx-bootstrap/modal';

import { STIRegistrationService } from '../stiregistrationandpayment/stiregistration.service';
import { Router } from '@angular/router';
import { JwtUserDataService } from '../shared/index';
import { ToastrService } from 'ngx-toastr';
import { ActionType } from '../shared/actiontype';
import { saveAs as importedSaveAs } from 'file-saver';
import swal from 'sweetalert2';


@Component({
    selector: 'sti-allscreenings',
    templateUrl: './allscreeings.component.html',
    providers: [STIAdminService, MessageService, STIRegistrationService],
    encapsulation: ViewEncapsulation.None
})
export class STIAllScreeningComponent implements OnInit {
    @ViewChild('autoShownaSTIModal') public autoShownaSTIModal: ModalDirective;
    @ViewChild('autoShownUploadReportModal') public autoShownUploadReportModal: ModalDirective;
    @ViewChild('autoShownPatientDetailModal') public autoShownPatientDetailModal: ModalDirective;
    @ViewChild('reportUpload') reportupload: any;

    ScreeningStatuses: any[];
    patientDetailParamVM: any;
    deleteFileParamVM: DeleteFileParamVM;
    patientDetailViewModel: PatientDetailViewModel;
    screeningStatusEnumValues = ScreeningStatusEnum;
    statesData: any[] = [];
    filesList: any[] = [];
    public IsLoaderActive = false;
    reportFile: File;
    public isSTIModalShown = false;
    public isPatientDetailShown = false;
    public isUploadReportModalShown = false;
    isFileSelected: any = false;
    screeningID: string;
    patientID: string;
    display = true;
    singleScreeningViewModel: SingleScreeningViewModel;
    postScreeningIdModel: PostScreeningIdModel;
    screeningFileParam: PostScreeningIdModel;



    model: ScreeningParams;
    searchform: FormGroup;
    datatabledata: ScreeningData[] = [];
    tabletotal: number;
    tablerows: number;

    public config = { animated: true, keyboard: true, backdrop: true, ignoreBackdropClick: false };

    public showModal(): void {
        this.isSTIModalShown = true;
    }

    public hideModal(): void {
        this.autoShownaSTIModal.hide();
    }
    public hidePatientDetailModal(): void {
        this.autoShownPatientDetailModal.hide();
    }

    public hideReportModal(): void {
        this.autoShownUploadReportModal.hide();
    }


    public onHidden(): void {
        this.isSTIModalShown = false;

    }

    public onPatientModelHidden(): void {
        this.isPatientDetailShown = false;
    }
    public onReportModelhidden(): void {
        this.isUploadReportModalShown = false;
    }





    constructor(private _STIRegistrationService: STIRegistrationService,private _STIAdminService: STIAdminService, private _jwtUserDataService: JwtUserDataService, private toastr: ToastrService, private modalService: BsModalService, private router: Router) {
        this.model = new ScreeningParams();
    }

    ngOnInit() {
        this.ScreeningStatuses = Object.keys(this.screeningStatusEnumValues).filter(key => !isNaN(Number(key)));
        // const dateNow=new Date();
        // const firstDayOfTheWeek=(dateNow.getDate() - dateNow.getDay()) +1;
        // const lastDayOfTheWeek=firstDayOfTheWeek + 6;
        // const firstDayOfLastWeek = new Date(dateNow.setDate(firstDayOfTheWeek - 7));
        // const lastDayOfLastWeek = new Date(new Date().setDate(lastDayOfTheWeek - 7));


        this.searchform = new FormGroup({
            firstName: new FormControl(),
            lastName: new FormControl(),
            email: new FormControl(),
            state: new FormControl(),
            startDate: new FormControl(),
            endDate: new FormControl(),
            gender: new FormControl(),
            status: new FormControl()
        });
        (<FormControl>this.searchform.controls['state'])
            .setValue('-1', { onlySelf: true });
        (<FormControl>this.searchform.controls['gender'])
            .setValue('-1', { onlySelf: true });
        (<FormControl>this.searchform.controls['status'])
            .setValue('-1', { onlySelf: true });
        this._STIRegistrationService.AllStates().subscribe(data => {
            this.IsLoaderActive = false;
            if (data.StatusCode === 200) {
                this.statesData = data.ResponseData;
            }
        }, error => {
            this.toastr.error('something is wrong', 'Error');
        });


        this.LoadData();
    }

    LoadData() {
        this.model.StartRecord = 0;
        this.model.NumberOfRecords = 10;
        this.model.sortField = 'CreatedDate';
        this.model.sortOrder = -1;
        this.model.firstName = null;
        this.model.lastName = null;
        this.model.email = null;
        this.model.state = null;
        this.model.startDate = null;
        this.model.endDate = null;
        this.model.gender = null;
        this.model.status = null;
        this.tablerows = 10;
        this._STIAdminService.GetScreeningData(this.model).subscribe(data => {
            if (data.StatusCode == 200) {
                this.datatabledata = data.ResponseData.screeningDataList;
                this.tabletotal = data.ResponseData.totalRecrods;
            }
        }, error => {

        });
    }
    loadLazyScreeningData(event) {
        this.model.StartRecord = event.first;
        this.model.NumberOfRecords = event.rows;
        this.model.sortField = event.sortField;
        this.model.sortOrder = event.sortOrder;
        this.model.firstName = this.searchform.get('firstName').value;
        this.model.lastName = this.searchform.get('lastName').value;
        this.model.email = this.searchform.get('email').value;
        this.model.state = this.searchform.get('state').value == -1 ? null : this.searchform.get('state').value;
        this.model.state = this.searchform.get('gender').value == -1 ? null : this.searchform.get('gender').value;
        this.model.state = this.searchform.get('status').value == -1 ? null : this.searchform.get('status').value;
        const makingStartDate = this.searchform
            .get('startDate').value == null ? null : this.searchform.get('startDate').value.year + '-' + this.searchform.get('startDate').value.month + '-' + this.searchform.get('startDate').value.day;
        const makingEndDate = this.searchform
            .get('endDate').value == null ? null : this.searchform.get('endDate').value.year + '-' + this.searchform.get('endDate').value.month + '-' + this.searchform.get('endDate').value.day;
        this.model.startDate = makingStartDate;
        this.model.endDate = makingEndDate;
        this._STIAdminService.GetScreeningData(this.model)
            .subscribe(data => {
                this.datatabledata = data.ResponseData.screeningDataList;
                this.tablerows = event.rows;
                this.tabletotal = data.ResponseData.totalRecrods;
            });
    }

    FilterData(formvalue) {
        this.model.StartRecord = 0;
        this.tablerows = 10;
        this.model.NumberOfRecords = this.tablerows;
        this.model.sortField = 'CreatedDate';
        this.model.sortOrder = -1;
        this.model.firstName = formvalue.firstName;
        this.model.lastName = formvalue.lastName;
        this.model.email = formvalue.email;
        this.model.state = formvalue.state == -1 ? null : formvalue.state;
        this.model.state = formvalue.gender == -1 ? null : formvalue.gender;
        this.model.state = formvalue.status == -1 ? null : formvalue.status;
        this.model.startDate = formvalue.startDate == null ? null : formvalue.startDate.year + '-' + formvalue.startDate.month + '-' + formvalue.startDate.day;
        this.model.endDate = formvalue.endDate == null ? null : formvalue.endDate.year + '-' + formvalue.endDate.month + '-' + formvalue.endDate.day;
        this._STIAdminService.GetScreeningData(this.model)
            .subscribe(data => {
                this.datatabledata = data.ResponseData.screeningDataList;
                this.tabletotal = data.ResponseData.totalRecrods;
            });
    }


    ViewSTIForm(screeningID) {
        this.postScreeningIdModel = new PostScreeningIdModel();
        this.postScreeningIdModel.ScreeningID = screeningID;
        this._STIAdminService.GetSingleScreeningData(this.postScreeningIdModel).subscribe(data => {
            if (data.StatusCode === 200) {
                this.singleScreeningViewModel = data.ResponseData;
                this.tabletotal = data.totalRecrods;
                this.isSTIModalShown = true;
            }
        })
    }

    openPatientView(PatientID) {
        const url = '/Patient/' + PatientID;
        this.patientDetailParamVM = new PatientDetailParamVM();
        this.patientDetailParamVM.PatientId = PatientID;
        this._STIAdminService.GetPatientDetails(this.patientDetailParamVM).subscribe(data => {
            if (data.StatusCode === 200) {
                this.patientDetailParamVM = data.ResponseData;
                this.isPatientDetailShown = true;
            }
        }, error => {
            // this.isPatientDetailShown = false;
            // if (error.ISAuthenticated !== undefined && error.ISAuthenticated === false) {
            //     this._jwtUserDataService.destroyToken();
            //     this._jwtUserDataService.destroyUserName();
            //     this._jwtUserDataService.destroyUserType();
            //     this.router.navigateByUrl('/login');
            }
        );
        // this.router.navigateByUrl(url);
    }

    openUploadReportModalPopup(PatientID, ScreeninigID) {
        this.screeningFileParam = new PostScreeningIdModel();
        this.screeningFileParam.ScreeningID = ScreeninigID;
        this.screeningID = ScreeninigID;
        this.patientID = PatientID;
        this._STIAdminService.GetScreeningFiles(this.screeningFileParam).subscribe(data => {
            this.filesList = [];
            if (data.StatusCode === 200) {
                if (data.ResponseData.length > 0) {
                    this.filesList = data.ResponseData;
                } else {

                }
                this.isUploadReportModalShown = true;
            }
        })

    }

    DeleteSelectedFile(FileID, fileName) {
        this.deleteFileParamVM = new DeleteFileParamVM();
        this.deleteFileParamVM.FileID = FileID;
        this.deleteFileParamVM.fileName = fileName;
        const that = this;
        swal({
            title: 'Are You Sure ?',
            text: 'You want to delete this file?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes Delete it!',
            cancelButtonText: 'No Keep it'
        }).then(function () {
            that.IsLoaderActive = true;
            that._STIAdminService.DeleteSelectedFile(this.deleteFileParamVM).subscribe(data => {
                that.IsLoaderActive = false;
                if (data.StatusCode === 200) {
                    swal(
                        'Deleted',
                        'File has been deleted',
                        'success'
                    );
                    const index = that.filesList.indexOf(FileID);
                    that.filesList.splice(index, 1);
                }
                else {
                    that.toastr.info(data.ResponseData, 'Error');
                }
            })
            
        }),
        function (dismiss)   {
            // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
            if (dismiss === 'cancel') {
                swal(
                    'Cancelled',
                    'File is safe :)',
                    'error'
                );
            }
        };

    }

    DownloadScreeningFile(FileID, file) {
        this._STIAdminService.DownloadScreeningFile(FileID).subscribe(data => {
            this.isUploadReportModalShown = true;
            const myBlob: Blob = new Blob([(<any>data)._body]);
            if ((<any>data).status === 200) {
                importedSaveAs(myBlob, file);
            } else {
                this.toastr.info('Some unknown error occurred', 'Error');
            }
        }, error => {
            this.isUploadReportModalShown = false;
            if (error.ISAuthenticated !== undefined && error.ISAuthenticated === false) {
                this._jwtUserDataService.destroyToken();
                this._jwtUserDataService.destroyUserName();
                this._jwtUserDataService.destroyUserType();
                this.router.navigateByUrl('/login');
            } else {
                this.toastr.error('Some unknown error occurred', 'Error');
            }
        });
    }
    fileChange(files: any) {
        this.reportFile = files[0];
        this.isFileSelected = true;
    }
    onReportSubmit() {
        this.IsLoaderActive = true;
        if (this.reportFile === undefined) {
            this.toastr.warning('Please select file', 'File Not Found');
        } else {
            const _formData = new FormData();
            _formData.append('patientID', this.patientID);
            _formData.append('screeningID', this.screeningID);
            _formData.append('MyFile', this.reportFile);
            _formData.append('UploadReport', ActionType.UploadReport.toString());
            _formData.append('ScreenName', 'Screening upload Report');
            const body = _formData;
            this._STIAdminService.uploadReportFile(body).subscribe(data => {
                if (data.StatusCode === 200) {
                    this.IsLoaderActive = false;
                    this.isFileSelected = false;
                    this.isUploadReportModalShown = false;
                    this.reportupload.nativeElement.value = '';
                    this.toastr.success('Report Uploaded Successfully', 'Uploaded');
                } else {
                    this.toastr.error(data.ResponseData, 'Error');
                    this.IsLoaderActive = false;
                }

            }, error => {
                this.isFileSelected = false;
                this.IsLoaderActive = false;
                this.reportupload.nativeElement.value = '';
                if (error.ISAuthenticated !== undefined && error.ISAuthenticated === false) {
                    this.toastr.error('Invalid token', 'Error');
                    this._jwtUserDataService.destroyToken();
                    this._jwtUserDataService.destroyUserName();
                    this._jwtUserDataService.destroyUserType();
                    this.router.navigateByUrl('/login');

                } else {
                    this.toastr.error('Something is wrong', 'Error');
                }
            });

        }
    }
}
