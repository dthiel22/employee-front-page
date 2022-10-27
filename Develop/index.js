const inquirer = require("inquirer");
const fs = require("fs")
const Employee = require("./lib/Employee");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");
const generateHtml = require("./util/generateHtml")

team = []

function startQuestion() {
    console.log('To begin making your employee front page, we will start with your manager')
    inquirer.prompt([
        {
            type: "input",
            message: "What is your managers name?",
            name: "managerName"
        },
        {
            type: "number",
            message: "What is this employees ID number?",
            name: "managerId"
        },
        {
            type: "input",
            message: "what is their email?",
            name: "managerEmail"
        },
        {
            type: "number",
            message: "What is the manager's office number?",
            name: "officeNumber"
        }
    ]).then(answer => {
        const manager = new Manager (answer.managerName, answer.managerId,answer.managerEmail,answer.officeNumber)
        team.push(manager) 
        nextEmployee();
    })
}

function nextEmployee() {
    inquirer.prompt([
        {
            name: "question",
            type: "list",
            choices: ["Add an Engineer", "Add an Intern", "Quit"]
        }
    ]).then(answers => {
        switch (answers.question) {
            case "Add an Engineer":
                console.log("Add an Engineer!")
                addEngineer();
                break;

            case "Add an Intern":
                console.log("Add an Intern!")
                addIntern();
                break;

            default:
                console.log("thanks for using this application!")
                fs.writeFile("index.html", generateHtml(team), (err)=>{
                    if(err){
                      throw err;
                    }
                    console.log('Worked!')
                  });
                break;
        }
    })
}

function addEngineer() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the engineer's name?",
            name: "engineerName"
        },
        {
            type: "number",
            message: "What is the engineer's ID number?",
            name: "engineerId"
        },
        {
            type: "input",
            message: "what is the engineer's email?",
            name: "engineerEmail"
        },
        {
            type: "input",
            message: "What is the engineer's github?",
            name: "github"
        }
    ]).then(answer => {
        const engineer = new Engineer (answer.engineerName, answer.engineerId,answer.engineerEmail,answer.github)
        console.log(engineer)
        team.push(engineer)
        nextEmployee();
    })
}

function addIntern() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the intern's name?",
            name: "internName"
        },
        {
            type: "number",
            message: "What is the intern's ID number?",
            name: "internId"
        },
        {
            type: "input",
            message: "what is the intern's email?",
            name: "internEmail"
        },
        {
            type: "input",
            message: "What school did the intern attend?",
            name: "internSchool"
        }
    ]).then(answer => {
        const intern = new Intern (answer.internName, answer.internId,answer.internEmail,answer.internSchool)
        console.log(intern)
        team.push(intern)
        nextEmployee();
    })
}

startQuestion()