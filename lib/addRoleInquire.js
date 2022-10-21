const inquirer = require("inquirer");
const mysql = require('mysql2');
require('dotenv').config();
const db = require("./connection");

//function to inquire the user when they choose to add a new role
function addRoleInquire() {

    //query the db for departments so we can ask the user which department to add the new role to
    db.query("SELECT * FROM departments", (err, results) => {
        //variable array that will have departments pushed onto it
        let departments = [];
        //loops through all the results of the db query
        for (i=0; i < results.length; i++) {
            departments.push(results[i].department);
        }

        //inquire user
        inquirer.prompt([
            {
                type: "input",
                name: "roleName",
                message: "Please state the name of the role you'd like to add"
            },
            {
                type: "input",
                name: "roleSalary",
                message: "Please input a salary for the role"
            },
            {
                type: "list",
                name: "departmentOfRole",
                message: "Please select the department the role belongs to",
                choices: departments //these departments are the ones we got by looping through results earlier
            }
        ])
        .then(ans => {
            //query the db for the ID of the department which the user selected by NAME
            db.query(`SELECT id FROM departments WHERE department = "${ans.departmentOfRole}"`, (err, res) => {
                //result of id is turned into a string containing only numbers (no alphanumeric), then turned to just an integer and saved as an id variable
                const id = parseInt(JSON.stringify(res).replace(/\D/g,''));

                //insert the new user entry into the roles table as a new role
                db.query(`INSERT INTO roles (title, salary, department_id) VALUES ("${ans.roleName}", ${ans.roleSalary}, ${id});`, (err, results) => {
                    if (err) {throw err};
                    console.log(`Adding ${ans.roleName}...`);
                    //show the user the updated list of departments by console logging it
                    db.query("SELECT * FROM roles", (err, results) => {
                        console.log("Here is an updated list of all roles:");
                        console.log(results);
                    })
                })
            })
        })
    })
    
}

module.exports = addRoleInquire;