export class ScreeningParams {
    StartRecord: number;
    NumberOfRecords: number;
    sortField: string;
    sortOrder: number;
    firstName: string;
    lastName: string;
    email: string;
    state: string;
    startDate: any;
    endDate: any;
    gender: string;
    status: number;
}

export class ScreeningData {
    Email: string;
    Name: string;
    DateOfBirth: string;
    StateName: string;
    ScreeningStatus: string;
    CreatedDate: string;
    ScreeningID: number;
    IsReceiveSMS: string;
}
export class PostScreeningIdModel {
    ScreeningID: number;
}
export class PatientDetailParamVM {
    PatientId: number;
}
export class DeleteFileParamVM {
    FileID: number;
    fileName: string;
}

export class SingleScreeningViewModel {
    IsAsymptomatic: string;
    IsPreviouslyInjectedDrug: string;
    IsSexuallyActiveAboriginal: string;
    IsSexuallyActivePerson: string;
    IsSexwithAnotherMale: string;
    IsSexWorker: string;
}

export class PatientDetailViewModel {
    firstName: string;
    lastName: string;
    DateOfBirth: string;
    State: string;
    PostCode: string;
    Gender: string;
    Suburb: string;
    AddressLine1: string;
    phone: string;
    Email: string;
}
export class RevenueParams {
    startDate: any;
    endDate: any;
    StartRecord: number;
    NumberOfRecords: number;
    sortField: string;
    sortOrder: number;
}
export class ScreeningOrderedParams {
    startDate: any;
    endDate: any;
    StartRecord: number;
    NumberOfRecords: number;
    sortField: string;
    sortOrder: number;
}
export enum ScreeningStatusEnum {
    New,
    Sent
}

