import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ApiService } from './api.service';
import { JwtUserDataService } from './settingtokenuserdata.service';
import { User } from '../models/user.model';
import { environment } from '../../../environments/environment';

@Injectable()
export class UserService {
  private currentUserSubject = new BehaviorSubject<User>(new User());
  public currentUser = this.currentUserSubject.asObservable().distinctUntilChanged();

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(
    private apiService: ApiService,
    private http: Http,
    private jwtUserDataService: JwtUserDataService
  ) { }

  // Verify JWT in localstorage with server & load user's info.
  // This runs once on application startup.
  populate() {
    // If JWT detected, attempt to get & store user's info
    if (this.jwtUserDataService.getToken()) {
      this.apiService.get('/user')
        .subscribe(
        data => this.setAuth(data.user),
        err => this.purgeAuth()
        );
    } else {
      // Remove any potential remnants of previous auth states
      this.purgeAuth();
    }
  }

  setAuth(user: User) {
    // Save JWT sent from server in localstorage
    this.jwtUserDataService.saveToken(user.access_token);
  }

  purgeAuth() {
    // Remove JWT from localstorage
    this.jwtUserDataService.destroyToken();
  }

  attemptAuth(credentials): Observable<User> {
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const options = new RequestOptions({ headers: headers });
    return this.http.post(environment.baseurl + '/TOKEN', 'grant_type=password' + '&username=' + credentials.username + '&password=' + credentials.password, options)
      .map((res: Response) => res.json()).catch(this._errorhandler);
  }
  _errorhandler(err: Response) {
    debugger;
    return Observable.throw(err.json());

  }

  getCurrentUser(): User {
    return this.currentUserSubject.value;
  }

  // Update the user on the server (email, pass, etc)
  update(user): Observable<User> {
    return this.apiService
      .put('/user', { user })
      .map(data => {
        // Update the currentUser observable
        this.currentUserSubject.next(data.user);
        return data.user;
      });
  }

}
