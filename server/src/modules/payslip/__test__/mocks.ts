import {EmployeesDetails,
        EmployeeDetails,
        PaySlipData} from "../models";

export const getEmployeeDataRequest = ():EmployeesDetails => {
    return {
        "employeesDetailsData": [{
            "firstName": "David",
            "lastName": "Don",
            "annualSalary": 60050,
            "superRate": 9,
            "paymentStartDate": new Date("2020-03-01"),
            "isValid": null,
        }]
    }
}

export const getEmployeeDataResponse = ():Array<PaySlipData> => {
    return [{
        "employee": "Ryan Chen",
        "payDate": "15 March 2020",
        "payFrequency": "Monthly",
        "annualIncome": 120000,
        "grossIncome": 10000,
        "incomeTax": 2696,
        "netIncome": 7304,
        "super": 1000,
        "isRelativePayment": "false",
        "message": ''
    }];
}

export const getEmployeeDetailsDataStartPaymentOfFirstDayOfTheMonth = ():EmployeesDetails => {
    return {
        "employeesDetailsData": [{
            "firstName": "Michael",
            "lastName": "Jordan",
            "annualSalary": 60050,
            "superRate": 9,
            "paymentStartDate": new Date("2012-09-01"),
            "isValid": null,
        }]
    }
};

export const getEmployeeDetailsDataStartPaymentOfTwentyDayOfTheMonth = ():EmployeesDetails => {
    return {
        "employeesDetailsData": [{
            "firstName": "Michael",
            "lastName": "Jordan",
            "annualSalary": 60050,
            "superRate": 9,
            "paymentStartDate": new Date("2012-05-20"),
            "isValid": null,
        }]
    }
};

export const getEmployeeDetailsDataStartPaymentOfFifthDayOfTheMonth = ():EmployeesDetails => {
    return {
        "employeesDetailsData": [{
            "firstName": "Michael",
            "lastName": "Jordan",
            "annualSalary": 60050,
            "superRate": 9,
            "paymentStartDate": new Date("2012-08-05"),
            "isValid": null,
        }]
    };
};

export const getEmployeeDetailsDataWithoutTaxYear = ():EmployeesDetails => {
    return {
        "employeesDetailsData": [<EmployeeDetails>{
            "firstName": "Michael",
            "lastName": "Jordan",
            "annualSalary": -60050,
            "superRate": 9,
            "paymentStartDate": new Date("2018-05-05"),
            "isValid": null,
        }]
    }
};

export const getEmployeeDetailsDataWithNonValidAnnualSalary = ():EmployeesDetails => {
    return {
        "employeesDetailsData": [<EmployeeDetails>{
            "firstName": "Michael",
            "lastName": "Jordan",
            "annualSalary": -60050,
            "superRate": 9,
            "paymentStartDate": new Date("2018-05-05"),
            "isValid": null,
        }]
    }
};

export const getEmployeeDetailsDataEqualToNull = ():EmployeesDetails  => {
    return null
};

export const getEmployeeDetailsDataWithNonValidSuperRateLessThanOne = ():EmployeesDetails => {
    return {
        "employeesDetailsData": [{
            "firstName": "Michael",
            "lastName": "Jordan",
            "annualSalary": 60050,
            "superRate": -1,
            "paymentStartDate": new Date("2018-05-05"),
            "isValid": null,
        }]
    }
};

export const getEmployeeDetailsDataWithNonValidSuperRateBiggerThan50 = ():EmployeesDetails => {
    return {
        "employeesDetailsData": [{
            "firstName": "Michael",
            "lastName": "Jordan",
            "annualSalary": 60050,
            "superRate": 51,
            "paymentStartDate": new Date("2018-05-05"),
            "isValid": null,
        }]
    }
};

export const getEmployeeDetailsDataWithAnnualSalaryInStage5 = ():EmployeesDetails => {
    return {
        "employeesDetailsData": [{
            "firstName": "Michael",
            "lastName": "Jordan",
            "annualSalary": 210000,
            "superRate": 9,
            "paymentStartDate": new Date("2018-05-01"),
            "isValid": null,
        }]
    }
};
