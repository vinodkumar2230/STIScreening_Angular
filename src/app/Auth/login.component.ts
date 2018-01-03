import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ValidationService } from './validation.service';
import { Router } from '@angular/router';
import { JwtUserDataService } from '../shared/services/settingtokenuserdata.service';
import { UserService } from '../shared/services/user.service';
import { User } from '../shared/models/user.model';
import { ToastrService } from 'ngx-toastr';
@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    // styleUrls: ["./resetlogin.component.css","./responsivelogin.component.css","./stylelogin.component.css"],
    encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
    IsloaderActive = false;
    loginform: FormGroup;
    loading = false;
    user: User;
    
    constructor(private fb: FormBuilder,
        private router: Router,
        private _jwtUserDataService: JwtUserDataService,
        private _userservice: UserService,
        private toastr: ToastrService,
    ) {

    }
    ngOnInit() {
        this.loginform = this.fb.group({
            username: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required]],
            grant_type: ['password']
        });

    }
    onSubmit(form: FormGroup) {
        debugger;
        this.IsloaderActive = true;
        this._userservice.attemptAuth(form).subscribe(data => {
            this.user = data;
            let sdsd = this.user;
            if (data.roles == 'Admin') {
                this._jwtUserDataService.saveToken(data.access_token);
                this._jwtUserDataService.settingUserType(data.roles);
                this._jwtUserDataService.saveUserName(data.userName);
                this.router.navigateByUrl('/Screenings');
            }
            else {
                this.toastr.warning('Currently you are not allowed to login', 'Not Allowed');
            }
        }, error => {
            debugger;
           if (error.error_description === 'undefined'){
            this.toastr.error(error.error_description, 'Error');
           }
           else{
            this.toastr.error('Some unknown Error', 'Error',{ timeOut: 2000 });
           }
            this.IsloaderActive = false;
        });
        // this logic needs to be called when user is authenticated
    }
   
  
}
