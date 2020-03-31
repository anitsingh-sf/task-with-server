export class userDataModel {
    firstname: string;
    middlename: string;
    lastname: string;
    email: string;
    phone: string;
    role: number;
    customer: number;
    address: string;
    index: string;
}

export enum Roles {
    Developer = 0,
    Tester,
    QA,
    DevOps
}

export enum Customer {
    Amazon = 0,
    Flipkart
}
