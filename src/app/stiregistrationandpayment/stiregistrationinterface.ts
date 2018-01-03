export interface IStiRegistration {
    STIReferralFormUsertype: string;
    Firstname: string;
    LastName: string;
    PhoneNumber: string;
    EmailAddress: string;
    Gender: number;
    EmailAddressRegisterdUser: string;
    DateOfBirth: Date;
    IsAllergies: string; // must be yes or no
    IsReceiveSms:  string; // must be yes or no
    IsMedicareCard: string; // must be yes or no
    MedicareCardNumber: string;
    MedicareRefNumber: string;
    Address: {
        AddressLine1: string;
        Suburb: string;
        PostCode: string;
        State: string;
    };
    IsSexuallyActivePerson: string; // must be yes or no
    IsSexuallyActiveAboriginal:  string; // must be yes or no
    IsAsymptomatic: string; // must be yes or no
    IsSexwithAnotherMale: string; // must be yes or no
    IsSexWorker: string; // must be yes or no
    IsPreviouslyInjectedDrug: string; // must be yes or no
}
export class UserEmailViewModel{
    EmailAddress: string;
}
export class StripeSubmissionForm{
    Token: string;
    UserID: string;
    ScreeningID: number;
    EmailAddress: string;
}
