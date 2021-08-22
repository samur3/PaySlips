export interface EmployeesDetails{
    employeesDetailsData: EmployeeDetails[];
}

export interface EmployeeDetails {
    firstName: string;
    lastName: string;
    annualSalary: number;
    superRate: number;
    paymentStartDate: Date;
    isValid: boolean;
}