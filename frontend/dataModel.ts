export class userDataModel {
    firstName: string;
    middleName: String;
    lastName: string;
    eMail: string;
    phone: string;
    role: number
    address: string;
    index: string;
}

export enum Roles {
    Developer = 0,
    Tester,
    QA,
    DevOps
}
