import { Component, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
 import { StiRegistrationValidationService } from '../stiregistrationandpayment/stiregistrationvalidation.service';

@Component({
  selector: 'STIcontrol-messages',
  template: `<small style="color:#a94442;" *ngIf="errorMessage !== null">{{errorMessage}}</small>`
})
export class STIformControlMessages {
  @Input() control: FormControl;
  constructor() { }

  get errorMessage() {
    for (const propertyName in this.control.errors) {
      if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched || this.control.errors.hasOwnProperty(propertyName) && this.control.dirty) {
        return StiRegistrationValidationService.getValidatorErrorMessage(propertyName, this.control.errors[propertyName]);
      }
    }

    return null;
  }
}


