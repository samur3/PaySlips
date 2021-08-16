# challenge - client side

This solution was written in react using typescript language.

### Design

After reading the task requirements, I understood that the code needs to be simple and concise.

I added modules folder for hold all the modules of the app.
The thinking behind was to divide each business model into a different folder
and structure the app for large scale in the future.

Each folder will hold the models that related to the business model. In our case is the file upload

In our case The Home will be the only module.

### Structure
```
./client

├── src
│   │   
│   ├── modules
│   │   ├── home
│   │   │   └── fileUpload
│   │   │       └── __tests__
│   │   │             └── fileUpload.test.tsx - unit test
│   │   │             └── parseCSVData.test.tsx - unit test      
│   │   │       └── payslipApi.tsx - calling to API's
│   │   │       └── parseCSVData.tsx - parse csv data from file loaded
│   │   │       └── index - functional component
│   │   │       └── modules.tsx - modles structure related to file upload. 
│   │   │       
```

### Assumptions

* Usage only for development environment.

* Http only - simple UI requirements.

* Authentication or Authorization are not included - simple UI requirements.


### Before Starting (important: all commands need to run under the client folder)

You can run it in Visual Studio Code, Web Storm or any IDE that able to run JavaScript code.

Run in the terminal: `npm install`

* This command will install all dependencies and dev-dependencies (exists in package.json file)

### Run the client side

Run in the terminal: `npm start`

### Run the tests

Run Unit tests in the terminal: `npm test`

Run Unit tests with coverage in the terminal: `npm test -- --coverage --watchAll=false`

