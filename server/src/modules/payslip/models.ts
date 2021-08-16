export interface EmployeeDetails {
    firstName: string;
    lastName: string;
    annualSalary: number;
    superRate: number;
    paymentStartDate: PaymentStartDate;
    isValid: boolean;
}

export interface PaymentStartDate{
    day: number;
    month: number;
    year: number | null;
}

export interface EmployeesDetails{
    employeesDetailsData: Array<EmployeeDetails>;
}

export interface PaySlipData {
    employee: string;
    payDate: string;
    payFrequency: string;
    annualIncome: number;
    grossIncome: number | null;
    incomeTax: number | null,
    netIncome: number | null,
    super: number | null,
    isRelativePayment: string | null;
    message: string
}

export interface TaxTable {
    year: string;
    data: Array<TaxTableItem>
}

export interface TaxTableItem {
    minAmount: number;
    maxAmount: number;
    centsForOneDollar: number
}