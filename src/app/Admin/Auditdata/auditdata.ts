export class AuditParams {
    StartRecord: number;
    NumberOfRecords: number;
    sortField: string;
    sortOrder: number;
    startDate: any;
    endDate: any;
    OperationType: string;
}
export class AuditData {
    userName: string;
    ScreenName: string;
    Operation: string;
    date: string;
}
