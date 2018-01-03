import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions,ResponseContentType } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { JwtUserDataService } from '../shared/index';

@Injectable()
export class STIAdminService {
    constructor(private _http: Http,private _jwtUserDataService: JwtUserDataService) { }
    GetScreeningData(data: any){
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });
        return this._http
            .post(environment.baseurl + '/api/STIScreening/ScreeningData', data, options)
            .map((response: Response) => response.json())
            .catch(this._errorhandler);
    }

     /////////////////////////*****************************/////////
     getSortedData(data: any){
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });
        return this._http
            .post(environment.baseurl + '/api/STIScreening/ScreeningDataSorted', data, options)
            .map((response: Response) => response.json())
            .catch(this._errorhandler);
    }


    GetAuditData(data: any) {
        const headers = new Headers({ 'Content-Type': 'application/json' });
       
        const options = new RequestOptions({ headers: headers });
        return this._http
            .post(environment.baseurl + '/api/STIScreening/AuditData', data, options)
            .map((response: Response) => response.json())
            .catch(this._errorhandler);
    }

    getDashboardData(){
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });
        return this._http
            .post(environment.baseurl + '/api/STIScreening/GetDashboardData',  options)
            .map((response: Response) => response.json())
            .catch(this._errorhandler);
    }


    GetSingleScreeningData(data: any): Observable<any> {
        const headers = new Headers({ 'Content-Type': 'application/json' });
       
        const options = new RequestOptions({ headers: headers });
        return this._http
            .post(environment.baseurl + '/api/STIScreening/PatientScreening', data, options)
            .map((response: Response) => response.json())
            .catch(this._errorhandler);
    }
      

    GetPatientDetails(data: any) {  
        const headers = new Headers({ 'Content-Type': 'application/json' });
       
        const options = new RequestOptions({ headers: headers });
        return this._http
            .post(environment.baseurl + '/api/STIScreening/PatientDetails', data, options)
            .map((response: Response) => response.json())
            .catch(this._errorhandler);
    }

    GetScreeningFiles(data: any) {
        const headers = new Headers({ 'Content-Type': 'application/json' });
       
        const options = new RequestOptions({ headers: headers });
        return this._http
            .post(environment.baseurl + '/api/STIScreening/ScreeningUploadedFiles', data, options)
            .map((response: Response) => response.json())
            .catch(this._errorhandler);
    }
    DeleteSelectedFile(data: any) {
        const headers = new Headers({ 'Content-Type': 'application/json' });
       
        const options = new RequestOptions({ headers: headers });
        return this._http
            .post(environment.baseurl + '/api/STIScreening/RemoveFile', data, options)
            .map((response: Response) => response.json())
            .catch(this._errorhandler);
    }

    
    DownloadScreeningFile(FileID): Observable<Blob> {
        const headers = new Headers({ 'Content-Type': 'application/json' });
       
        const options = new RequestOptions({ headers: headers, responseType: ResponseContentType.Blob });
        return this._http
            .get(environment.baseurl + '/api/STIScreening/GetFileData?FileID=' + FileID, { responseType: ResponseContentType.Blob, headers: headers })
            .catch(this._errorhandler);
    }
    uploadReportFile(data: any) {
        const headers = new Headers();
      
        const options = new RequestOptions({
            headers: headers
        });
        return this._http.post(environment.baseurl + '/api/STIScreening/PostReport', data, options)
            .map((response: Response) => response.json())
            .catch(this._errorhandler);
    }

    DownloadExcelRevenueData(data:any){
        const headers= new Headers({'Content-Type': 'application/json'});
        const options = new RequestOptions({ headers: headers, responseType: ResponseContentType.Blob });
        return this._http
        .post(environment.baseurl + '/api/STIScreening/GetDownloadRevenueData', data, { responseType: ResponseContentType.Blob, headers: headers })
        .catch(this._errorhandler);
    }


    _errorhandler(err: Response) {
        return Observable.throw(err.json());

    }
}
