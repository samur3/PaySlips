import * as mockData        from './mocks';
import * as payslipService  from '../payslip.service';

describe('Payslip Service Unit Tests:', function () {

    it('generatePaySlip For a pay date on the first of the month, should return a whole month`s netIncome' +
        ' and get valid results by default tax table', function () {

        /* Arrange */
        const employeeDetailsData = mockData.getEmployeeDetailsDataStartPaymentOfFirstDayOfTheMonth();

        /* Act */
        const result = payslipService.generatePaySlips(employeeDetailsData);

        /* Assert */
        expect(result[0].netIncome).toEqual(4082);
    });

    it('generatePaySlip For a pay date on the fifth of the month, should return a relative month`s netIncome',
        () => {

        /* Arrange */
        const employeeDetailsData = mockData.getEmployeeDetailsDataStartPaymentOfFifthDayOfTheMonth();

        /* Act */
        const result = payslipService.generatePaySlips(employeeDetailsData);

        /* Assert */
        expect(result[0].netIncome).toEqual(3555);
    });

    it('generatePaySlip should return valid result when user insert employee details above 200K' +
        ' and get valid results by default tax table', function () {

        /* Arrange */
        const employeeDetailsData = mockData.getEmployeeDetailsDataWithAnnualSalaryInStage5();

        /* Act */
        const result = payslipService.generatePaySlips(employeeDetailsData);

        /* Assert */
        expect(result[0].netIncome).toEqual(12069);
    });

    it('generatePaySlip should return no valid data when employee details contains non valid annual salary',
        () => {

        /* Arrange */
        const employeeDetailsData = mockData.getEmployeeDetailsDataWithNonValidAnnualSalary();

        /* Act */
        const result = payslipService.generatePaySlips(employeeDetailsData);

        /* Assert */
        expect(result[0].message).toEqual("employee details are invalid");
    });

    it('generatePaySlip should return invalid data when employee details equals to null',  () => {

        /* Assert */
        expect(function() {
            payslipService.generatePaySlips(mockData.getEmployeeDetailsDataEqualToNull()) }).toThrow("invalid data");
    });

    it('generatePaySlip should return no valid data when employee details contains negative super rate', () => {

        /* Arrange */
        const employeeDetailsData = mockData.getEmployeeDetailsDataWithNonValidSuperRateLessThanOne();

        /* Act */
        const result = payslipService.generatePaySlips(employeeDetailsData);

        /* Assert */
        expect(result[0].message).toEqual("employee details are invalid");

    });

    it('generatePaySlip should return no valid data when employee details contains super rate bigger than 50',
        () => {

        /* Arrange */
        const employeeDetailsData = mockData.getEmployeeDetailsDataWithNonValidSuperRateBiggerThan50();

        /* Act */
        const result = payslipService.generatePaySlips(employeeDetailsData);

        /* Assert */
        expect(result[0].message).toEqual("employee details are invalid");

    });

    it('generatePaySlip should return the pay date of the 15 day of the month when the start payment date' +
        ' is less than the 15 of the month',  () => {

        /* Arrange */
        const employeeDetailsData = mockData.getEmployeeDetailsDataStartPaymentOfFirstDayOfTheMonth();
        /* Act */
        const result = payslipService.generatePaySlips(employeeDetailsData);

        /* Assert */
        expect(result[0].payDate).toEqual('15 May 2012');
    });

    it('generatePaySlip should return the pay date of the end day of the month when the start payment date' +
        ' is bigger equal than the 15 of the month',  () => {

        /* Arrange */
        const employeeDetailsData = mockData.getEmployeeDetailsDataStartPaymentOfTwentyDayOfTheMonth();
        /* Act */
        const result = payslipService.generatePaySlips(employeeDetailsData);

        /* Assert */
        expect(result[0].payDate).toEqual('15 June 2012');
    });

    it('generatePaySlip should return payment relative false when the day of the start payment date ' +
        'is the first day of the month',  () => {

        /* Arrange */
        const employeeDetailsData = mockData.getEmployeeDetailsDataStartPaymentOfFirstDayOfTheMonth();
        /* Act */
        const result = payslipService.generatePaySlips(employeeDetailsData);

        /* Assert */
        expect(result[0].isRelativePayment).toEqual("false");
    });

    it('generatePaySlip should return payment relative true when the day of the start payment date ' +
        'bigger the first day of the month',  () => {

        /* Arrange */
        const employeeDetailsData = mockData.getEmployeeDetailsDataStartPaymentOfTwentyDayOfTheMonth();
        /* Act */
        const result = payslipService.generatePaySlips(employeeDetailsData);

        /* Assert */
        expect(result[0].isRelativePayment).toEqual("true");
    });
});