import { Component, OnInit, ViewChild, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { IStiRegistration, UserEmailViewModel, StripeSubmissionForm } from '../stiregistrationandpayment/stiregistrationinterface';
import { StiRegistrationValidationService } from '../stiregistrationandpayment/stiregistrationvalidation.service';
import { STIRegistrationService } from '../stiregistrationandpayment/stiregistration.service';
import { MessageService } from '../shared/messagedisplay.service';
import { ToastrService } from 'ngx-toastr';
@Component({
    selector: 'sti-registration',
    templateUrl: './stiregistration.component.html',
    styleUrls : ['./stiregistration.component.css'],
    providers: [STIRegistrationService, MessageService],
    encapsulation: ViewEncapsulation.None
})
export class StiRegistrationComponent implements OnInit {
    mask: any[] = ['+','6', '1', ' ', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
    IsLoaderActive = false;
    @ViewChild(MessageService) showMessages: MessageService;
    UserEmailViewModel: UserEmailViewModel;
    stripeSubmissionForm: StripeSubmissionForm;
    IsThankYouVisible = false;
    Message: any[] = [];
    public stiForm: FormGroup;
    public stiPaymentForm: FormGroup;
    IsPayFormDisplay = false;
    IsStiformDisplay = true;
    IsSTIDisplay = true;
    IsAllergyListDisplay = false;
    IsMedicareCardDisplay = false;
    IsDuplicateEmail = false;
    setvalueOfUsertype = 'New';
    UserID: string;
    UserScreeningID: number;

    


    public MEDICARE_CARD = {
        YES: 'yes',
        No: 'no'
    };
    public ALLERGIESQUESTION = {
        YES: 'yes',
        No: 'no'
    };
    public RECEIVESMS = {
        YES: 'yes',
        No: 'no'
    };
    public SEXUALL_ACTIVE_PERSON = {
        YES: 'yes',
        No: 'no'
    };
    public SEXUALL_ACTIVE_PERSON_ABORIGINAL = {
        YES: 'yes',
        No: 'no'
    };
    public ASYMPTOMATIC_PERSON = {
        YES: 'yes',
        No: 'no'
    };
    public USER_REGISTRATION_TYPE = {
        ALREADYEXIST: 'Existing',
        NEW: 'New'
    };
    public IS_SEX_WITH_ANOTHER_MALE = {
        YES: 'yes',
        No: 'no'
    };
    public SEX_WORKER = {
        YES: 'yes',
        No: 'no'
    };
    public PREVIOUSLY_INJECTED_DRUGS = {
        YES: 'yes',
        No: 'no'
    };
    constructor(private cdr: ChangeDetectorRef, private toastr: ToastrService, private _fb: FormBuilder, private _STIRegistrationService: STIRegistrationService, private _payform: FormBuilder) {

    }
    onlyNumberKey(event) {
        return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
    }
    ngOnInit() {
        this.stiForm = this._fb.group({
            STIReferralFormUsertype: [''],
            Firstname: ['', [StiRegistrationValidationService.FirstnameValidator,Validators.minLength(3)]],
            // Firstname: ['', [Validators.required,Validators.minLength(2), Validators.maxLength(20)]],
            LastName: ['',[StiRegistrationValidationService.LastnameValidator,Validators.minLength(3)]],
            PhoneNumber: ['', [StiRegistrationValidationService.PhonenumberValidator]],
            EmailAddress: ['', [Validators.required, Validators.email]],
            EmailAddressRegisterdUser: ['', [Validators.required, Validators.email]],
            DateOfBirth: ['', Validators.required],
            Gender: [1],
            IsReceiveSms: ['no'],
            IsAllergies: ['no'],
            AllergiesList: ['', StiRegistrationValidationService.AllergiesListValidator],
            IsMedicareCard: ['no'],
            MedicareCardNumber: ['', Validators.required],
            MedicareRefNumber: ['', Validators.required],
            Address: this.initAddressFormGroup(),
            IsSexuallyActivePerson: ['no'],
            IsSexuallyActiveAboriginal: ['no'],
            IsAsymptomatic: ['no'],
            IsSexwithAnotherMale: ['no'],
            IsSexWorker: ['no'],
            IsPreviouslyInjectedDrug: ['no'],
        });
        this.IsStiformDisplay = true;

        this.ClearValidatorsAtFirstLoad();
        this.stiForm.controls.IsMedicareCard.valueChanges.subscribe(
            (typevalue: string) => {
                if (typevalue == 'yes') {
                    this.IsMedicareCardDisplay = true;
                    this.stiForm.get('MedicareCardNumber').setValidators(Validators.required);
                    this.stiForm.get('MedicareRefNumber').setValidators(Validators.required);
                }
                else {
                    this.IsMedicareCardDisplay = false;
                    this.stiForm.get('MedicareCardNumber').clearValidators();
                    this.stiForm.get('MedicareRefNumber').clearValidators();
                }
                this.stiForm.get('MedicareCardNumber').updateValueAndValidity();
                this.stiForm.get('MedicareRefNumber').updateValueAndValidity();
            }
        );
        this.stiForm.controls.IsAllergies.valueChanges.subscribe(
            (typevalue: string) => {
                if (typevalue == 'yes') {
                    this.IsAllergyListDisplay = true;
                    this.stiForm.get('AllergiesList').setValidators(Validators.required);
                }
                else {
                    this.IsAllergyListDisplay = false;
                    this.stiForm.get('AllergiesList').clearValidators();
                }
                this.stiForm.get('AllergiesList').updateValueAndValidity();
            }
        );

        // Initializing payment form
        this.stiPaymentForm = this._payform.group({
            cardNumber: ['', [Validators.required, StiRegistrationValidationService.creditCardValidator]],
            expiryMonth: ['', [Validators.required]],
            expiryYear: ['', [Validators.required]],
            cvc: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(4)]],
            Amount: ['21.99']
        });

        // this.stiForm.get('Firstname').valueChanges.subscribe(

        //         (country: string) => {
        //             debugger;
        //             if (country === 'US') {

        //                 this.stiForm.get('postalCode').setValidators([Validators.required, Validators.pattern('^[0-9]{5}(?:-[0-9]{4})?$')]);

        //             } else if (country === 'CA') {

        //                 this.stiForm.get('postalCode').setValidators([Validators.required, Validators.pattern('[ABCEGHJKLMNPRSTVXY][0-9][ABCEGHJKLMNPRSTVWXYZ] ?[0-9][ABCEGHJKLMNPRSTVWXYZ][0-9]')]);
        //             }
        //             this.stiForm.get('postalCode').updateValueAndValidity();

        //         }

        //     )

    }

    a(event) {
        var char = event.which;
        if (char > 31 && char != 32 && (char < 65 || char > 90) && (char < 97 || char > 122)) {
          return false;
        }
      }



      public restrictNumeric(e) {
        let input;
        if (e.metaKey || e.ctrlKey) {
          return true;
        }
        if (e.which === 40) {
            return true;
          }
          if (e.which === 41) {
            return true;
          }

        if (e.which === 32) {
          return false;
        }
        if (e.which === 0) {
          return true;
        }
        if (e.which < 33) {
          return true;
        }
         input = String.fromCharCode(e.which);
         return !!/[\d\s]/.test(input);
      }


      keyPress(event: any) {
        const pattern = /^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/;
        let inputChar = String.fromCharCode(event.charCode);
    
        if (pattern.test(inputChar)) {
          // invalid character, prevent input
          event.preventDefault();
        }
    }



    ClearValidatorsAtFirstLoad() {
        this.stiForm.get('MedicareCardNumber').clearValidators();
        this.stiForm.get('MedicareRefNumber').clearValidators();
        this.stiForm.get('AllergiesList').clearValidators();
        //   this.stiForm.controls.IsAllergies.get('yes').get('AllergiesList').clearValidators();
        this.stiForm.get('EmailAddressRegisterdUser').clearValidators();
    }

    initAddressFormGroup() {
        const addressmodel = this._fb.group({
            AddressLine1: ['', [ StiRegistrationValidationService.addressValidator]],
            Suburb: ['', [ StiRegistrationValidationService.suburbValidator]],
            PostCode: ['',[ StiRegistrationValidationService.postcodeValidator]],
            State: ['1', Validators.required]
        });
        return addressmodel;
    }

    setFormDisplayType(type: string) {
        this.clearAndSetValidators(type);
    }

    clearAndSetValidators(type: string) {
        debugger;
        let data = this.stiForm.get('EmailAddress').value;
        if (type == 'Existing') {
            this.IsDuplicateEmail = true;
            this.stiForm.get('Firstname').clearValidators();
            this.stiForm.get('LastName').clearValidators();
            this.stiForm.get('PhoneNumber').clearValidators();
            this.stiForm.get('EmailAddress').clearValidators();
            this.stiForm.get('DateOfBirth').clearValidators();
            this.stiForm.get('AllergiesList').clearValidators();
            // this.stiForm.controls.IsAllergies.get('yes').get('AllergiesList').clearValidators();
            this.stiForm.controls.Address.get('AddressLine1').clearValidators();
            this.stiForm.controls.Address.get('State').clearValidators();
            this.stiForm.controls.Address.get('PostCode').clearValidators();
            this.stiForm.controls.Address.get('Suburb').clearValidators();
            this.stiForm.get('MedicareCardNumber').clearValidators();
            this.stiForm.get('MedicareRefNumber').clearValidators();
            this.stiForm.get('EmailAddressRegisterdUser').setValidators([Validators.required, Validators.email]);
        }
        else {
            this.IsDuplicateEmail = false;
            this.stiForm.get('Firstname').setValidators(StiRegistrationValidationService.FirstnameValidator);
            this.stiForm.get('LastName').setValidators(StiRegistrationValidationService.LastnameValidator);
            this.stiForm.get('PhoneNumber').setValidators(StiRegistrationValidationService.PhonenumberValidator);
            this.stiForm.get('EmailAddress').setValidators([Validators.required, Validators.email]);
            this.stiForm.get('DateOfBirth').setValidators(Validators.required);
            // this.stiForm.controls.IsAllergies.get('yes').get('AllergiesList').setValidators(StiRegistrationValidationService.AllergiesListValidator);
            this.stiForm.controls.Address.get('AddressLine1').setValidators(StiRegistrationValidationService.addressValidator);
            this.stiForm.controls.Address.get('State').setValidators(Validators.required);
            this.stiForm.controls.Address.get('PostCode').setValidators(StiRegistrationValidationService.postcodeValidator);
            this.stiForm.controls.Address.get('Suburb').setValidators(StiRegistrationValidationService.suburbValidator);
            // this.stiForm.controls.IsMedicareCard.get('yes').get('MedicareCardNumber').setValidators(Validators.required);
            //this.stiForm.controls.IsMedicareCard.get('yes').get('MedicareRefNumber').setValidators(Validators.required);
            this.stiForm.get('EmailAddressRegisterdUser').clearValidators();
        }

        this.stiForm.get('Firstname').updateValueAndValidity();
        this.stiForm.get('LastName').updateValueAndValidity();
        this.stiForm.get('PhoneNumber').updateValueAndValidity();
        this.stiForm.get('EmailAddress').updateValueAndValidity();

        this.stiForm.get('DateOfBirth').updateValueAndValidity();
        this.stiForm.get('AllergiesList').updateValueAndValidity();
        // this.stiForm.controls.IsAllergies.get('yes').get('AllergiesList').updateValueAndValidity();
        this.stiForm.controls.Address.get('AddressLine1').updateValueAndValidity();
        this.stiForm.controls.Address.get('State').updateValueAndValidity();
        this.stiForm.controls.Address.get('PostCode').updateValueAndValidity();
        this.stiForm.controls.Address.get('Suburb').updateValueAndValidity();
        this.stiForm.get('MedicareCardNumber').updateValueAndValidity();
        this.stiForm.get('MedicareRefNumber').updateValueAndValidity();
        this.stiForm.get('EmailAddressRegisterdUser').updateValueAndValidity();
        this.stiForm.get('EmailAddressRegisterdUser').setValue(data);
        this.IsStiformDisplay = type == 'Existing' ? false : true;
    }

    savestiform(model: any, isvalid: boolean) {
        debugger;
        this.IsLoaderActive = true;
        let ValidEmail = this.IsDuplicateEmail;
        model.DateOfBirth = model.DateOfBirth.year + '-' + model.DateOfBirth.month + '-' + model.DateOfBirth.day;
        model.STIReferralFormUsertype = this.setvalueOfUsertype;
        this._STIRegistrationService.PostSTIForm(model).subscribe(data => {
            this.IsLoaderActive = false;
            if (data.StatusCode == 200) {
                this.UserID = data.ResponseData.UserID;
                this.UserScreeningID = data.ResponseData.ScreeningID; this.UserID = data.ResponseData.UserID;
                this.UserScreeningID = data.ResponseData.ScreeningID;
                if (this.setvalueOfUsertype == 'Existing') {
    
                    

                    if (data.ResponseData) 
                    {

                        this.IsPayFormDisplay = true;
                        this.IsThankYouVisible = false;
    
                        this.IsSTIDisplay = false;
                        this.cdr.detectChanges();
                    }
                    else{
                        this.IsSTIDisplay = false;
                        this.IsPayFormDisplay = true;
                        this.IsThankYouVisible = false;
                    }
                }

                else {
                    this.IsPayFormDisplay = true;
                    this.IsThankYouVisible = false;
                   
                    this.IsSTIDisplay = false;
                    this.cdr.detectChanges();
                }
            }
            else if (data.StatusCode === 602) {
                data.ResponseData.forEach((item, index) => {
                    this.toastr.error(item, 'Error');
                });
            }
            else {
                this.toastr.error(data.ResponseData, 'Error');
            }
        }, error => {
            debugger;
            this.IsLoaderActive = false;
            this.IsThankYouVisible = false;
            this.toastr.error(error, 'Error');
            this.cdr.detectChanges();
        });
    }
    getToken(paymentFormData) {
        this.IsLoaderActive = true;
        this.stripeSubmissionForm = new StripeSubmissionForm();
        (<any>window).Stripe.card.createToken({
            number: paymentFormData.cardNumber,
            exp_month: paymentFormData.expiryMonth,
            exp_year: paymentFormData.expiryYear,
            cvc: paymentFormData.cvc
        }, (status: number, response: any) => {
            if (status === 200) {
                this.stripeSubmissionForm.Token = response.id;
                this.stripeSubmissionForm.UserID = this.UserID;
                this.stripeSubmissionForm.ScreeningID = this.UserScreeningID;
                this.stripeSubmissionForm.EmailAddress = this.stiForm.get('EmailAddress').value;
                this._STIRegistrationService.PostPaymentData(this.stripeSubmissionForm).subscribe(data => {
                    this.IsLoaderActive = false;
                    if (data.StatusCode === 200) {
                        this.IsThankYouVisible = true;
                        this.IsPayFormDisplay = false;
                        this.cdr.detectChanges();
                    }
                    else {
                        this.IsThankYouVisible = false;
                        this.cdr.detectChanges();
                    }

                }, error => {
                    this.IsLoaderActive = false;
                    this.IsThankYouVisible = false;
                    this.cdr.detectChanges();
                });
            } else {
                this.IsThankYouVisible = false;
                this.IsLoaderActive = false;
            }
        });
    }
    CheckEmail(value) {
        this.UserEmailViewModel = new UserEmailViewModel();
        this.UserEmailViewModel.EmailAddress = value;
        if (this.stiForm.get('EmailAddress').valid) {
            // hit api to check duplicate email address
            this._STIRegistrationService
                .CheckDuplicateEmailAddress(this.UserEmailViewModel)
                .subscribe(data => {
                    if (data.StatusCode !== 200) {
                        this.toastr.error(data.ResponseData, 'Error');
                        this.IsDuplicateEmail = false;
                        this.cdr.detectChanges();
                    }
                    else {
                        this.IsDuplicateEmail = true;
                        this.cdr.detectChanges();
                    }

                }, error => {
                    this.toastr.error('Some Unknown Error', 'Error');
                });
        }
        else {

        }
    }





    isFieldValid(field: string) {
        return !this.stiForm.get(field).valid && this.stiForm.get(field).touched;
      }
    
      displayFieldCss(field: string) {
        return {
          'has-error': this.isFieldValid(field),
          'has-feedback': this.isFieldValid(field)
        };
      }
    
      onSubmit() {
        console.log(this.stiForm);
        if (this.stiForm.valid) {
          console.log('form submitted');
        } else {
          this.validateAllFormFields(this.stiForm);
        }
      }
    
      validateAllFormFields(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach(field => {
          console.log(field);
          const control = formGroup.get(field);
          if (control instanceof FormControl) {
            control.markAsTouched({ onlySelf: true });
          } else if (control instanceof FormGroup) {
            this.validateAllFormFields(control);
          }
        });
      }

}
