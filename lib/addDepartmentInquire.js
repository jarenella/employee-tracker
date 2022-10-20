const inquirer = require("inquirer");
const mysql = require('mysql2');
require('dotenv').config();

function addDepartmentInquire() {
    //connect to database
    const db = mysql.createConnection(
        {
            host: 'localhost',
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: "employe_information_db"
        },
        console.log("Successfully connected to the database")
    )
    
    //inquire user
    inquirer.prompt([
        {
            type: "input",
            name: "departmentName",
            message: "Please state the name of the department you'd like to add"
        }
    ])
    .then(ans => {
        //insert the new entry into the departments table as a new department
        db.query(`INSERT INTO departments (department) VALUES ("${ans.departmentName}");`, (err, results) => {
            console.log(`Adding ${ans.departmentName}...`);
        })
        //show the user the updated list of departments by console logging it
        db.query("SELECT * FROM departments", (err, results) => {
            console.log("Here is an updated list of all departments:");
            console.log(results);
        })
    })
}

module.exports = addDepartmentInquire;