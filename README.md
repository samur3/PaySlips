# PaySlips challenge

The challenge was written in react using typescript language on the client-side,
and Node.js on the server-side.

It is structured in one solution as monorepo. each project has its own package.json file.

To run the project, first run in the terminal: `npm install` in the client and server folders.

* This command will install all dependencies and dev-dependencies (exists in package.json file)

### Run the client-side

Run under client folder, in the terminal: `npm start` (will run in port 3000)

### Run the server-side

Run under server folder, in the terminal: `npm run start` (will run in port 5000)

Both the client-side and the server-side has README files that explain the design, structure and how to run commands related to each solution.

### Assumptions

* We are supporting only upload of CSV files.

* We will support till 100 MB sending in the body request.

* Data Format supported: MM / DD / YYYY.

* Data in the csv file will be valid (if you will send invalid data, invalid data would be ignored).

* I added a tax tables list for supporting multiple years - the default tax table will be last one in the list (the idea that it will be the most relevant in the list from current year).

* Year in the tax table list will represent the start of the financial year. An example: year: 2012 - represent 07/01/2012 - 07/01/2013.

* We will support the option to calculate for each employee the relevant payslip by his payment start date.

* We are supporting relative pay - depends on the start day of the employee.

* The pay date will be on the 15th of the month.

* All employee details fields are required.

* CSV file that will be sent will be without headers, the order of data will be: firstName, lastName, annual salary, super rate, payment start date

### Example of CSV file content sent

David, Rudd, 60050, 9, 3/1/2012

Ryan, Chen, 120000, 10, 4/10/2013 - (will return relative payment)

### Example of CSV file content returned

| employee  | payDate | payFrequency | annualIncome | grossIncome|incomeTax|netIncome|super|isRelativePayment|message|
| :------------ |:----:| -----:|-----:|-----:|-----:|-----:|-----:|-----:|-----:|
| David Rudd | 15-Mar-12 | Monthly | 60050 | 5004 | 922 | 4082 | 450 | FALSE |  |
| Ryan Chen  | 15-Apr-13 | Monthly | 120000 | 7000 | 1719 | 5281 | 700 | TRUE |  |


In the main folder I added try.csv file than can be a start point to test the app.

Enjoy!
