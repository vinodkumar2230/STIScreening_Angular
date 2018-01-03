import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment';

@Injectable()
export class STIRegistrationService {

    constructor(private _http: Http) { }
    PostSTIForm(data: any) {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });
        return this._http
            .post(environment.baseurl + '/api/STIScreening/PostReferralForm', data, options)
            .map((response: Response) => response.json())
            .catch(this._errorhandler);
    }
    CheckDuplicateEmailAddress(data: any){
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });
        return this._http
            .post(environment.baseurl + '/api/STIScreening/CheckDuplicateEmailAddress', data, options)
            .map((response: Response) => response.json())
            .catch(this._errorhandler);
    }

    PostPaymentData(data: any){
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });
        return this._http
            .post(environment.baseurl + '/api/STIScreening/PostPaymentFormData', data, options)
            .map((response: Response) => response.json())
            .catch(this._errorhandler);
    }

    GetScreeningData(data: any){
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });
        return this._http
            .post(environment.baseurl + '/api/STIScreening/GetScreeningData', data, options)
            .map((response: Response) => response.json())
            .catch(this._errorhandler);
    }
    AllStates() {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });
        return this._http
            .get(environment.baseurl + '/api/STIScreening/GetStates', options)
            .map((response: Response) => response.json())
            .catch(this._errorhandler);
    }
    _errorhandler(err: Response) {
        return Observable.throw(err.json());

    }
}
