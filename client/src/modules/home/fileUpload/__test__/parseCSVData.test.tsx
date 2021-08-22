import * as parseCSV from "../parseCSVData";

describe("Parse CSV Data Unit Tests", () => {

    it("parse valid csv data will parse tha csv data into EmployeesDetails",  () => {

        /* Arrange */
        const fileDataArr = [{
            data: ["David","Rudd",60050,9,"2012-03-01"]
        }];

        /* Act */
        const parsedData = parseCSV.parseCSVData(fileDataArr);
        /* Assert */
        expect(parsedData?.employeesDetailsData).toBeTruthy();
        expect(parsedData?.employeesDetailsData.length).toEqual(1);
        expect(parsedData?.employeesDetailsData[0].firstName).toEqual("David");
        expect(parsedData?.employeesDetailsData[0].lastName).toEqual("Rudd");
        expect(parsedData?.employeesDetailsData[0].annualSalary).toEqual(60050);
        expect(parsedData?.employeesDetailsData[0].superRate).toEqual(9);
        expect(parsedData?.employeesDetailsData[0].paymentStartDate.toLocaleDateString()).toEqual("3/1/2012");

    });

    it("parse invalid csv data will not parse tha csv data into EmployeesDetails",  () => {

        /* Arrange */
        const fileDataArr = [{
            data: ["David","Rudd",-60050,9,"2012-03-01"]
        }];

        /* Act */
        const parsedData = parseCSV.parseCSVData(fileDataArr);

        /* Assert */
        expect(parsedData?.employeesDetailsData).toBeTruthy();
        expect(parsedData?.employeesDetailsData.length).toEqual(0);

    });

    it("calling to parseCSVData with out file data will rerun null",  () => {

        /* Arrange */
        const fileDataArr = "";

        /* Act */
        const parsedData = parseCSV.parseCSVData(fileDataArr);

        /* Assert */
        expect(parsedData).toEqual(null);

    });

});