import { Request, Response }        from 'express';
import { getEmployeeDataRequest,
         getEmployeeDataResponse }  from './mocks';
import * as paySlipController       from '../payslip.controller';
import * as paySlipService          from '../payslip.service';
import { PaySlipData }              from "../models";

const SUCCESS = "SUCCESS";
const FAILURE = "FAILURE";
const ERROR = "ERROR";

describe('Payslip Controller Unit Tests:', () => {

    describe('Testing the Post methods', () => {
        let mockGeneratePaySlipSuccessfulResponse: Partial<Response>;
        let mockGeneratePaySlipFailureResponse: Partial<Response>;
        let mockRequest: Partial<Request> = {};
        const successfulResponse = {status: SUCCESS, error:null, data:getEmployeeDataResponse};
        const failureResponse = {status: FAILURE, error:ERROR, data:null};

        beforeEach(  () => {
            mockRequest = {
                app: {get: () => getEmployeeDataRequest}
            } as Express.Application;
        });

        afterEach(() => {
            jest.resetAllMocks()
        })

        it('PaySlipController.generatePaySlip Should be able to generate slip pay data object', () => {

            /* Arrange */
            mockGeneratePaySlipSuccessfulResponse = {
                statusCode: 200,
                send: jest.fn().mockReturnValue(successfulResponse)
            };
            const data: Array<PaySlipData> = getEmployeeDataResponse();
            jest.spyOn(paySlipService, 'generatePaySlips').mockReturnValue(data);

            /* Act */
            paySlipController.generatePaySlips(mockRequest as Request,mockGeneratePaySlipSuccessfulResponse as Response);

            /* Assert */
            expect(mockGeneratePaySlipSuccessfulResponse.send()).toEqual(successfulResponse);
            expect(mockGeneratePaySlipSuccessfulResponse.statusCode).toBe(200);

        });

        it('PaySlipController.generatePaySlip Should be failed to generate slip pay data object that throws error', () => {

            /* Arrange */
            mockGeneratePaySlipFailureResponse = {
                statusCode: 500,
                send: jest.fn().mockReturnValue(failureResponse)
            };

            jest.spyOn(paySlipService, 'generatePaySlips').mockImplementation(() => {
                throw new Error();
            });

            /* Act */
            paySlipController.generatePaySlips(mockRequest as Request,mockGeneratePaySlipFailureResponse as Response);

            /* Assert */
            expect(mockGeneratePaySlipFailureResponse.send()).toEqual(failureResponse);
            expect(mockGeneratePaySlipFailureResponse.statusCode).toBe(400);

        });
    });
});