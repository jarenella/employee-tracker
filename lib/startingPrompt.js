const inquirer = require("inquirer");
require('dotenv').config();
const addDepartmentInquire = require("./addDepartmentInquire");
const db = require("./connection");
const addRoleInquire = require("./addRoleInquire");
const addEmployeeInquire = require("./addEmployeeInquire");
const updateEmployeeRole = require("./updateEmployeeRole");

//function for the prompt that the user first sees when starting the app
function startingPrompt() {
    //inquire user
    inquirer.prompt([
        {
            type: "list",
            name: "prompt1",
            message: "What would you like to do?",
            choices: ["Show departments", "Show roles", "Show employees", "Add a department", "Add a role", "Add an employee", "Update an employee role"]
        }
    ])
    .then(answers => {
        //if they answer show departments, query the database to show departments and log the result
        if (answers.prompt1 === "Show departments") {
            db.query("SELECT * FROM departments", (err, results) => {
                console.log(results);
            })
        }
        //if they answer show roles, query the database to show roles and log the result
        else if(answers.prompt1 === "Show roles") {
            db.query("SELECT * FROM roles", (err, results) => {
                console.log(results);
            })
        }
        //if they answer show employees, query the database to show employees and log the result
        else if(answers.prompt1 === "Show employees") {
            db.query("SELECT * FROM employees", (err, results) => {
                console.log(results);
            })
        }
        //if they answer add department, query the database to add a department and log the result
        else if(answers.prompt1 === "Add a department") {
            addDepartmentInquire(); // <======== imported function to inquire the user to add a department
        }
        //if they answer add role, query the database to add a role and log the result
        else if(answers.prompt1 === "Add a role") {
            addRoleInquire(); // <======== imported function to inquire the user to add a role
        }
        //if they answer add employee, query the database to add an employee and log the result
        else if(answers.prompt1 === "Add an employee") {
            addEmployeeInquire(); // <======== imported function to inquire the user to add an employee
        }
        //if they answer update employee role, query the db to update their role and log the result
        else if (answers.prompt1 === "Update an employee role") {
            updateEmployeeRole(); // <======== imported function to inquire the user to update an employee's role
        }
        //if there's an error, throw the error
        else {
            console.log("ERROR");
        }
    })
}

module.exports = startingPrompt;