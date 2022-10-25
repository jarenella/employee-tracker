const inquirer = require("inquirer");
const mysql = require('mysql2');
require('dotenv').config();
const db = require("./connection");

//function which updates and employees role and will console log the updated list of employees
function updateEmployeeRole() {
    //query db so we can generate a list of all employees
    db.query("SELECT first_name, last_name FROM employees", (err, res) => {
        //object constructor to construct an object for each new employee when we loop through the response
        function Employee(firstName, lastName, fullName) {
            this.firstName = firstName;
            this.lastName = lastName;
            this.fullName = fullName;
        }
        //arrays that employees full names from the query will be pushed onto
        let employees = [];
        let employeesFullName = [];
        //loops through the response and saves every employee as a new object that is added to the employees and employeesFullName arrays
        for (i=0; i<res.length; i++) {
            const newEmployee = new Employee(res[i].first_name, res[i].last_name, `${res[i].first_name} ${res[i].last_name}`);
            employees.push(newEmployee);
            employeesFullName.push(newEmployee.fullName);
        }

        //query db for list of potential roles to list to the user when asking what role they would like to make the new employee
        db.query("SELECT title FROM roles", (err, res) => {
            //variable to put a list of role titles in
            let rolesList = [];
            //loop through the response and get the title of each role, then assign it to a rolesList variable
            for (i=0; i<res.length; i++) {
                const newRole = res[i].title;
                rolesList.push(newRole);
            }

            //inquire user
            inquirer.prompt([
                {
                    type: "list",
                    name: "employeeName",
                    message: "Which employee would you like to update the role of?",
                    choices: employeesFullName //the choices are a list of all employees, each index being their full name
                },
                {
                    type: "list",
                    name: "newRole",
                    message: "What role would you like to assign this employee?",
                    choices: rolesList //the choices are a list of existing roles
                }
            ])
            .then(ans => {
                //the employee selected's first and last name are split into an array of two which is then looped through and assigned to a firstName and a lastName variable
                const employeeFirstAndLastName = ans.employeeName.split(" ");
                let employeeFirstName = "";
                let employeeLastName = "";
                for (i = 0; i < employeeFirstAndLastName.length; i++) {
                    if (i === 0) { employeeFirstName = employeeFirstAndLastName[i] }
                    if (i === 1) { employeeLastName = employeeFirstAndLastName[i] }
                }

                //query the db to obtain the ID of the role selected by NAME/TITLE
                db.query(`SELECT id FROM roles WHERE title = "${ans.newRole}"`, (err, res) => {
                    //result of id is turned into a string containing only numbers (no alphanumeric), then turned to just an integer and saved as a roleID variable
                    const roleID = parseInt(JSON.stringify(res).replace(/\D/g,''));
                    console.log(roleID);

                    //query the db to update the selected employees role to the id of the newly selected role
                    db.query(`UPDATE employees SET role_id = ${roleID} WHERE first_name = "${employeeFirstName}" AND last_name = "${employeeLastName}"`, (err,res) => {
                        
                        //query the db to show the user an updated list of employees containing the new role
                        db.query("SELECT * FROM employees", (err, res) => {
                            console.log("This employees role ID has successfully been updated to that of their new role. Here is an updated list of all employees:")
                            console.log(res);
                        })
                    })
                })
            })
        })
    })
}

module.exports = updateEmployeeRole;