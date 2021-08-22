import {EmployeeDetails, EmployeesDetails} from "./modles";

export const parseCSVData = (fileData:any):EmployeesDetails | null => {
    if(!fileData || fileData.length === 0) {
        return null;
    }

    let employeesDetails:EmployeesDetails = {
        employeesDetailsData: new Array<EmployeeDetails>()
    }

    for(let i=0; i < fileData.length; i++){
        let employeeDetails: EmployeeDetails = {firstName:"",lastName:"",annualSalary:0,superRate:0,
            isValid:false,paymentStartDate:new Date()};
        const employeeDetailsCSVDataRow = fileData[i].data;
        if(employeeDetailsCSVDataRow &&
            employeeDetailsCSVDataRow.length > 1) {
            employeeDetails.firstName = employeeDetailsCSVDataRow[0];
            employeeDetails.lastName = employeeDetailsCSVDataRow[1];
            employeeDetails.annualSalary = employeeDetailsCSVDataRow[2];
            employeeDetails.superRate = employeeDetailsCSVDataRow[3];
            employeeDetails.paymentStartDate = new Date(employeeDetailsCSVDataRow[4]);
            if(employeeDetails.firstName && employeeDetails.lastName &&
               _checkAnnualSalary(employeeDetails.annualSalary) &&
               _checkSuperRate(employeeDetails.superRate) &&
               (employeeDetails.paymentStartDate.getDate() && employeeDetails.paymentStartDate.getMonth()+1)
            ) {
                employeesDetails.employeesDetailsData.push(employeeDetails as EmployeeDetails);
            }
        }
    }
    return employeesDetails;
}

const _checkAnnualSalary = (annualSalary: number) => {
    return annualSalary && Number(annualSalary) && annualSalary > 0;
}

const _checkSuperRate = (superRate: number) => {
    return superRate && Number(superRate) && superRate > 0 && superRate <= 50;
}