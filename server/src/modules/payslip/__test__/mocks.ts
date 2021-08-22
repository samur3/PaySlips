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
            "paymentStartDate": {"day":1, "month":3, "year":2020 },
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
            "paymentStartDate": {day: 1, month: 9, year: 2012},
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
            "paymentStartDate": {day: 20, month: 5, year: 2012},
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
            "paymentStartDate": {day: 5, month: 8, year: 2012},
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
            "paymentStartDate": {day: 5, month: 5, year: 2018},
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
            "paymentStartDate": {day: 5, month: 5, year: 2018},
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
            "paymentStartDate": {day: 5, month: 5, year: 2018},
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
            "paymentStartDate": {day: 5, month: 5, year: 2018},
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
            "paymentStartDate": {year: 2018, month: 5, day: 1},
            "isValid": null,
        }]
    }
};
