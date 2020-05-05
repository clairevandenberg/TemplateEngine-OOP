const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const util = require("util");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const writeFileAsync = util.promisify(fs.writeFile);


const employees = []; // array to store user input data for each employee.

// Asking User which employee they want to list. 
function employeeBuilder() {
console.log("Begin building your team");
return inquirer.prompt ([
{
    message: "What Employee Do You Want To Record?",
    type: "list",
    name: "employeetype",
    choices: [
        "Manager",
        "Engineer",
        "Intern"
    ]
}
]);
}

// Asks User if they want to build more employees
function addMoreEmployees () {
    return inquirer.prompt ([
        {
        message: "Would you like to add another Employee?",
        type: "list",
        name: "addAnotherEmployee",
        choices: [
            "Yes",
            "NO",
        ]
    }
    ]);
};


// Manager User Questions. 
function createManager() {
    return inquirer.prompt ([
        {
        message: "What is your Managers name?",
        type:"input",
        name: "ManagerName",
        validate: answer => {
            if(answer !== ""){
                return true;
            }
            return "Please Enter Manager Name";
        }
    },
    
        {
        message: "What is your Managers ID?",
        type:"input",
        name: "ManagerID",
        validate: answer => {
            if(answer !== ""){
                return true;
            }
                return "Please Enter Managers ID";
        }
    },
    
        {
        message: "What is your Managers Email?",
        type:"input",
        name: "ManagerEmail",
        validate: answer => {
            if(answer !== ""){
                return true;
            }
                return "Please Enter Managers Email Adress";
         }
    },

        {
        message: "What is your Managers Office Number?",
        type:"input",
        name: "ManagerOfficeNumber?",
        validate: answer => {
            if(answer !== ""){
                return true;
            }
                return "Please Enter Managers Office Number";
        }
    }, 
// saving user input and pushing employees array to the new manager object.
]).then(userInput => {
    const manager = new Manager (userInput.ManagerName, userInput.ManagerID , userInput.ManagerEmail, userInput.ManagerOfficeNumber);
    employees.push(manager);
    console.log("Manager Pushed")

});
}

// Engineer User Questions. 
function createEngineer () {
    console.log("Begin building your team");
    return inquirer.prompt([
        {
        message: "What is your Engineers name?",
        type:"input",
        name: "EngineerName",
        validate: answer => {
            if(answer !== ""){
                return true;
            }
                return "Please Enter Engineers Full Name";
        }
    },
        
        {
        message: "What is your Engineer ID?",
        type:"input",
        name: "EngineerID",
        validate: answer => {
            if(answer !== ""){
                return true;
            }
                return "Please Enter Engineer ID";
         }
    },
        
        {
        message: "What is your Engineer Email?",
        type:"input",
        name: "EngineerEmail",
        validate: answer => {
        if(answer !== ""){
                return true;
            }
                return "Please Enter Engineer Email Adress";
        }
    },

        {
        message: "What is your Engineer GitHub Username?",
        type:"input",
        name: "EngineerGithubUsername",
        validate: answer => {
        if(answer !== ""){
                return true;
             }
                return "Please Enter Engineers GitHub";
        }
    },
]).then(userInput => {
    const engineer = new Engineer (userInput.EngineerName, userInput.EngineerID , userInput.EngineerEmail, userInput.EngineerGithubUsername);
    employees.push(engineer);
    console.log("Engineer Pushed")

});
}

// Intern User Questions. 
function createIntern () {
    console.log("Begin building your team");
    return inquirer.prompt([
        {
         message: "What is your Interns name?",
        type:"input",
        name: "InternName",
        validate: answer => {
        if(answer !== ""){
                return true;
             }
                return "Please Enter Interns Full Name";
        }
    },
            
        {
        message: "What is your Interns ID?",
        type:"input",
        name: "InternID",
        validate: answer => {
        if(answer !== ""){
                return true;
             }
                return "Please Enter Intern ID";
        }
    },
            
        {
        message: "What is your Intern  Email?",
        type:"input",
        name: "InternEmail",
        validate: answer => {
        if(answer !== ""){
                return true;
            }
                return "Please Enter Interns Email Adress";
        }
    },
            
    {
        message: "What school did your Intern attend?",
        type:"input",
        name: "InternSchool",
        validate: answer => {
        if(answer !== ""){
                return true;
            }
                return "Please Enter Interns School";
        }
    }
]).then(userInput => {
    const intern = new Intern (userInput.InternName, userInput.InternID , userInput.InternEmail, userInput.InternSchool);
    employees.push(intern);
    console.log("Intern Pushed")
});
};

//creating Manager, Intern and Engineer >>> employeeBuilder if manager is selected will promt the manager messages.
async function createEmployee () {
    try { 
    const addingEmployee = await employeeBuilder ()

if (addingEmployee.employeetype === "Manager") {
        const addingManager = await createManager ();
        console.log("Manager has been added to employeee list");
       
} else if (addingEmployee.employeetype === "Engineer") {
    const addingEngineer = await createEngineer ();
        console.log("Engineer has been added to employeee list");
        
} else if (addingEmployee.employeetype === "Intern") {
    const addingIntern= await createIntern ();
        console.log("Intern has been added to employeee list");
}  

//Do You Want To Add Another Team Member? If YES then will call the createEmployee function again to add more employees. ELSE will build your HTML page. 
moreEmployees = await addMoreEmployees ()
if (moreEmployees.addAnotherEmployee === "Yes") {
    createEmployee ()

} else 
{
// generate HTML Page through rendering employees.
const html = render(employees);
fs.writeFile(outputPath, render(employees), (err) => {
    console.log("Your employee list is complete");
});
}
}
catch (error) {
    console.log(error)
}
};




