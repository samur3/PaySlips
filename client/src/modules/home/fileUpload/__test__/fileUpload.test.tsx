import { FileUpload }   from "../index";
import * as payslipApi  from "../payslipApi";
import * as parseCSV    from "../parseCSVData";
import {
    render,
    fireEvent,
    waitFor
}                       from "@testing-library/react"

jest.mock('../payslipApi');
jest.mock('../parseCSVData');

describe("FileUpload Tests", () => {

    it("render correctly on mount",  () => {

        /* Act */
        const {container} = render(
            <FileUpload fileData={""}/>
        )

        /* Assert */
        expect(container.outerHTML.includes('<input type=\"file\" accept=\".csv\" style=\"display: none;\">')).toBeTruthy();
        expect(container.outerHTML.includes(`<span id="drop">Drop CSV file here or click to upload.</span>`)).toBeTruthy();
        expect(container.outerHTML.includes(`<a download=\"try101.csv\" target=\"_self\" href=\"data:text/csv;charset=utf-8,﻿\"></a>`)).toBeTruthy();
        expect(container.outerHTML.includes(`<span class="process">Generate Pay Slips...</span>`)).toBeFalsy();
        expect(container.outerHTML.includes(`<span class="error">Error Generate Pay Slips</span>`)).toBeFalsy();
    });

    it("click on generate pay slip button will call to generate pay slip API method",  async () => {

        /* Arrange */
        const fileDataArr = [{
            data: ["David","Rudd",60050,9,"3/01/2012"]
        }];

        (payslipApi.generatePaySlips as jest.Mock).mockResolvedValue("123");

        const employeeDetails = { employeesDetailsData: [{
                firstName: "David",
                lastName: "Rudd",
                annualSalary: 60050,
                superRate: 9,
                paymentStartDate: {day:1,month:1,year:2012},
                isValid: true
            }]};
        (parseCSV.parseCSVData as jest.Mock).mockReturnValue(employeeDetails);
        jest.mock('../parseCSVData', () => ({ parseCSVData: jest.fn() }))

        /* Act */
        const result = render(<FileUpload fileData={fileDataArr}/>);
        const button = result.container.querySelector('#generateFile');
        button && fireEvent.click(button);

        /* Assert */
        await waitFor(() => {
            expect(payslipApi.generatePaySlips).toHaveBeenCalledTimes(1);
            expect(parseCSV.parseCSVData).toHaveBeenCalledTimes(1);
        });
    })

    it("error message will appear when failed to parse csv data locally",  async () => {

        /* Arrange */
        const fileDataArr = [{
            data: ["David","Rudd",60050,9,"3/01/2012"]
        }];

        (payslipApi.generatePaySlips as jest.Mock).mockResolvedValue("123");

        (parseCSV.parseCSVData as jest.Mock).mockReturnValue(null);
        jest.mock('../parseCSVData', () => ({ parseCSVData: jest.fn() }))

        /* Act */
        let {container} = render(<FileUpload fileData={fileDataArr}/>);
        const button = container.querySelector('#generateFile');
        button && fireEvent.click(button);

        /* Assert */
        await waitFor(() => {
            expect(container.outerHTML.includes(`Error Generate Pay Slips`)).toBeTruthy();
        });
    })

    it("error message will appear when failed to call generate pay slip api",  async () => {

        /* Arrange */
        const fileDataArr = [{
            data: ["David","Rudd",60050,9,"3/01/2012"]
        }];
        const employeeDetails = { employeesDetailsData: [{
                firstName: "David",
                lastName: "Rudd",
                annualSalary: 60050,
                superRate: 9,
                paymentStartDate: {day:1,month:1,year:2012},
                isValid: true
            }]};

        (payslipApi.generatePaySlips as jest.Mock).mockRejectedValue("Error Generate Pay Slips");

        (parseCSV.parseCSVData as jest.Mock).mockReturnValue(employeeDetails);
        jest.mock('../parseCSVData', () => ({ parseCSVData: jest.fn() }))

        /* Act */
        let {container} = render(<FileUpload fileData={fileDataArr}/>);
        const button = container.querySelector('#generateFile');
        button && fireEvent.click(button);

        /* Assert */
        await waitFor(() => {
            expect(container.outerHTML.includes(`Error Generate Pay Slips`)).toBeTruthy();
        });
    })

});