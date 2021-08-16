# challenge - server side

This solution was written in Node.js using typescript language.

### Design

I chose to use Express Node.js.

The server side structured in the same way as the client side with modules folder to keep on consistency and thinking
for large scale in the future.

### Structure
```
./server
│
├── src
│   │   
│   ├── modules
│   │   ├── payslip
│   │   │   └── __test__
│   │   │   │   └── income-tax-generator.test.ts - unit tests
│   │   │   │   └── payslip.controller.test.ts - unit tests
│   │   │   │   └── payslip.service.test.ts - unit tests
│   │   │   │   └── mocks.ts - mock file
│   │   │   └── payslip.controller.ts - call to the service, build the response
│   │   │   └── payslip.service.ts - build the pay slip
│   │   │   └── payslip.router.ts - define routers for pay slip API's
│   │   │   └── taxTables.ts - list of tax tables 
│   │   │   └── income-tax-generator.ts - get the income tax 
```

### Assumptions

* Usage only for development environment.

* Http only - simple UI requirements.

* Authentication or Authorization are not included.

### Before Starting (important: all commands need to run under the server folder)

You can run it in Visual Studio Code, Web Storm or any IDE that able to run JavaScript code.

Run in the terminal: `npm install`

* This command will install all dependencies and dev-dependencies (exists in package.json file)

### Run the server side

Run in the terminal: `npm run start`

### Run the tests

Run Unit tests in the terminal: `npm run test`

Run Unit tests with coverage in the terminal: `npm run test-coverage`