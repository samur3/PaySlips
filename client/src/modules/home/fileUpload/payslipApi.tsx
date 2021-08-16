import {EmployeesDetails} from "./modles";

export const generatePaySlips:any = async (data: EmployeesDetails) => {
    try {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/payslips/`,requestOptions);
        const jsonData = await response.json();
        return jsonData.data;
    }
    catch(error){
        console.log(`Fetch error: ${error}`);
    }
}
