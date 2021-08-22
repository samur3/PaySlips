import {EmployeeDetails, EmployeesDetails, PaymentStartDate} from "./modles";

export const parseCSVData = (fileData:any):EmployeesDetails | null => {
    let employeesDetails:EmployeesDetails = {
        employeesDetailsData: new Array<EmployeeDetails>()
    }
    if(!fileData || fileData.length === 0) {
        return null;
    }

    for(let i=0; i < fileData.length; i++){
        let employeeDetails: Partial<EmployeeDetails> = {};
        const employeeDetailsCSVDataRow = fileData[i].data;
        if(employeeDetailsCSVDataRow &&
            employeeDetailsCSVDataRow.length > 1) {
            employeeDetails.firstName = employeeDetailsCSVDataRow[0];
            employeeDetails.lastName = employeeDetailsCSVDataRow[1];
            employeeDetails.annualSalary = employeeDetailsCSVDataRow[2];
            employeeDetails.superRate = employeeDetailsCSVDataRow[3];
            employeeDetails.paymentStartDate = _setPaymentStartDate(employeeDetailsCSVDataRow[4]);
            if(employeeDetails.firstName && employeeDetails.lastName &&
               _checkAnnualSalary(employeeDetails.annualSalary) &&
               _checkSuperRate(employeeDetails.superRate) &&
               (employeeDetails.paymentStartDate.day && employeeDetails.paymentStartDate.month)
            ) {
                employeesDetails.employeesDetailsData.push(employeeDetails as EmployeeDetails);
            }
        }
    }
    return employeesDetails;
}

const _checkAnnualSalary = (annualSalary: number | undefined) => {
    return annualSalary && Number(annualSalary) && annualSalary > 0;
}

const _checkSuperRate = (superRate: number | undefined) => {
    return superRate && Number(superRate) && superRate > 0 && superRate <= 50;
}

const _setPaymentStartDate = (dateString: string):PaymentStartDate => {
    let date = new Date(Date.parse(dateString));
    return {day: date.getDate(), month:date.getMonth()+1, year:date.getFullYear()};
}