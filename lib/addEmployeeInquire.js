const inquirer = require("inquirer");
const mysql = require('mysql2');
require('dotenv').config();
const db = require("./connection");

function addEmployeeInquire() {
    //query to find all roles in the database so we can present the user a list of all possible roles to give their new employee
    db.query("SELECT * FROM roles", (err, results) => {
        //variable array that will have roles pushed onto it
        let roles = [];
        //loops through all the results of the db query
        for (i = 0; i < results.length; i++) {
            roles.push(results[i].title);
        }

        //query the db to find a list of all managers so we can list all managers to the user when asked which manager oversees the new employee
        db.query('SELECT * FROM employees WHERE role_id = 3', (error, res) => {
            //object constructor to construct a new manager for each manager we get from the db
            function Manager(firstName, lastName, fullName) {
                this.firstName = firstName;
                this.lastName = lastName;
                this.fullName = fullName;
            }
            //an array that we can add all the manager objects to
            let managers = [];
            let managersFullName = [];
            //loop through all of the managers and create a new manager object and add them to the managers array
            for (i=0; i < res.length; i++) {
                const newManager = new Manager(res[i].first_name, res[i].last_name, `${res[i].first_name} ${res[i].last_name}`)
                managers.push(newManager);
                managersFullName.push(newManager.fullName);
            }

            //inquire user
            inquirer.prompt([
                {
                    type: "input",
                    name: "firstName",
                    message: "Please state the first name of the employee you'd like to add"
                },
                {
                    type: "input",
                    name: "lastName",
                    message: "Please state the last name of the employee you'd like to add"
                },
                {
                    type: "list",
                    name: "role",
                    message: "What is there role?",
                    choices: roles //this is the array of roles we got from the loop earlier
                },
                {
                    type: "list",
                    name: "whichManager",
                    message: "Which manager oversees this employee?",
                    choices: managersFullName
                }
            ])
            .then(ans => {
                //the manager selected's first and last name are split into an array of two which is then looped through and assigned to a firstName and a lastName variable
                const managerFirstAndLastName = ans.whichManager.split(" ");
                let managerFirstName = "";
                let managerLastName = "";
                for (i=0; i < managerFirstAndLastName.length; i++) {
                    if (i === 0) {managerFirstName = managerFirstAndLastName[i]}
                    if (i === 1) {managerLastName = managerFirstAndLastName[i]}
                }

                //query the db to find the ID of the manager the user selected by NAME
                db.query(`SELECT id FROM employees WHERE first_name = "${managerFirstName}" AND last_name = "${managerLastName}"`, (err, res) => {
                    //result of id is turned into a string containing only numbers (no alphanumeric), then turned to just an integer and saved as an id variable
                    const id = parseInt(JSON.stringify(res).replace(/\D/g,''));
                    console.log(id);
                })
            })
        })
    })
}

module.exports = addEmployeeInquire;