export interface PaymentStartDate{
    day: number;
    month: number;
    year: number;
}

export interface EmployeesDetails{
    employeesDetailsData: Array<EmployeeDetails>;
}

export interface EmployeeDetails {
    firstName: string;
    lastName: string;
    annualSalary: number;
    superRate: number;
    paymentStartDate: PaymentStartDate;
    isValid: boolean;
}