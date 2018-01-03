import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ValidationService } from './validation.service';
@Component({
    selector: 'register',
    templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
    registrationform: FormGroup;

    constructor(private fb: FormBuilder) {

    }
    ngOnInit() {
        this.registrationform = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            firstname: ['', [Validators.required]],
            lastname: ['', [Validators.required]],
            password: ['', [Validators.required, Validators.minLength(6)]],
        });
    }
    onSubmit(form: FormGroup) {
        debugger;
    }
}
