import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { JwtUserDataService } from '../services/settingtokenuserdata.service';
import { Router } from '@angular/router';
@Component({
    selector: 'header-nav',
    templateUrl: './header.component.html',
    encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {
    public IsAdmin: boolean;
    public IsDoctor: boolean;
    public loggedInUserName: String;
    constructor(private _jwtuserdataservice: JwtUserDataService, private router: Router) {
        this.IsAdmin = false;
        this.IsDoctor = false;
    }
    ngOnInit() {
        if (this._jwtuserdataservice.getUserType()) {
            let userType = this._jwtuserdataservice.getUserType();
            if (userType == 'Admin') {
                this.IsAdmin = true;
                //  this.IsDoctor = false;
            }
            else {
                this.IsAdmin = false;
                // this.IsDoctor = true;
            }
            this.loggedInUserName = this._jwtuserdataservice.getUserName();
        }
    }

    LogoutClick(){
        this._jwtuserdataservice.destroyToken();
        this._jwtuserdataservice.destroyUserName();
        this._jwtuserdataservice.destroyUserType();
        this.router.navigate(['/login']);
    }
}
