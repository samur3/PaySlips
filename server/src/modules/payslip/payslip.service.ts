import moment                                               from "moment";
import { getIncomeTax }                                     from "./income-tax-generator";
import { EmployeeDetails, EmployeesDetails, PaySlipData }   from "./models";

export const generatePaySlips = (data: EmployeesDetails):Array<PaySlipData> => {
    const parsedData = _parseEmployeesDetails(data);
    if(!parsedData) throw new Error('invalid data');
    return _buildPaySlipsData(parsedData);
}

function _parseEmployeesDetails(data: EmployeesDetails): EmployeesDetails  {
    const parsedData:EmployeesDetails = {
        employeesDetailsData: new Array<EmployeeDetails>()
    };

    if (!data) return null;
    data.employeesDetailsData.forEach((employeeData) => {
        const employeeDetails = _parseEmployeeDetails(employeeData);
        if(employeeDetails) {
            parsedData.employeesDetailsData.push(employeeDetails)
        }
    })
    return parsedData;
}

function _parseEmployeeDetails(employeeDetails: EmployeeDetails): EmployeeDetails | null {
    const
        firstName = `${employeeDetails.firstName}`,
        lastName = `${employeeDetails.lastName}`,
        annualSalary = +employeeDetails.annualSalary,
        superRate = +employeeDetails.superRate,
        paymentStartDate = employeeDetails.paymentStartDate;
    return firstName && lastName &&
        (annualSalary && annualSalary > 0) &&
        (superRate > 0 && superRate < 50) &&
        (paymentStartDate.day && paymentStartDate.month && paymentStartDate.year) ?
        {firstName,lastName,annualSalary,superRate,paymentStartDate,isValid: true} :
        {firstName,lastName,annualSalary,superRate,paymentStartDate,isValid: false};
}

function _buildPaySlipsData (employeesDetails: EmployeesDetails) : Array<PaySlipData>{
    const paySlipsData = new Array<PaySlipData>();
    let paySlipData = null;
    employeesDetails.employeesDetailsData.forEach((employeeData) => {
        if(!employeeData.isValid) {
            paySlipData = getInvalidPaySlipDataResponse(employeeData);
        }
        else {
            paySlipData = _buildPaySlipData(employeeData);
        }
        paySlipsData.push(paySlipData);
    });
    return paySlipsData;
}

function getInvalidPaySlipDataResponse(employeeData): PaySlipData{
    return {
        employee: `${employeeData.firstName} ${employeeData.lastName}`,
        payDate: _getPayDate(employeeData.paymentStartDate),
        payFrequency: 'Monthly',
        annualIncome: employeeData.annualSalary,
        grossIncome: null,
        incomeTax: null,
        netIncome: null,
        super: null,
        isRelativePayment: null,
        message: 'employee details are invalid'
    }
}

function _buildPaySlipData(employeeData: EmployeeDetails) : PaySlipData{
    const relativeData = _getRelativeData(employeeData.paymentStartDate);
    const grossIncome = Math.round((employeeData.annualSalary / 12) * relativeData);
    const incomeTax = Math.round(getIncomeTax(employeeData.annualSalary, employeeData.paymentStartDate.year) * relativeData);
    const netIncome = grossIncome - incomeTax;
    const superValue = Math.round(grossIncome * (employeeData.superRate / 100));
    return {
        employee: `${employeeData.firstName} ${employeeData.lastName}`,
        payDate: _getPayDate(employeeData.paymentStartDate),
        payFrequency: 'Monthly',
        annualIncome: employeeData.annualSalary,
        grossIncome: grossIncome,
        incomeTax: incomeTax,
        netIncome: netIncome,
        super: superValue,
        isRelativePayment: relativeData !== 1 ? "true" : "false",
        message: ''
    }
}

function _getRelativeData(date): number{
    if(date.day === 1) return 1;
    const numberOfDaysInMonth = moment(`${date.year}-${date.month}`, `YYYY-MM`).daysInMonth();
    return ((numberOfDaysInMonth - date.day) + 1) / numberOfDaysInMonth;
}

function _getPayDate(date): string{
    if ( date.day >= 15 ) return moment().date(15).month(date.month).year(date.year).format('DD MMMM YYYY');
    return moment().date(15).month(date.month-1).year(date.year).format('DD MMMM YYYY');
}


