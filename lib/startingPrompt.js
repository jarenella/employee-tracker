const inquirer = require("inquirer");
const mysql = require('mysql2');
require('dotenv').config();

function startingPrompt() {
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
        //if they answer add department, query the database add a department and log the result
        else if(answers.prompt1 === "Add a department") {
            db.query("", (err, results) => {
                console.log(results);
            })
        }
        //if there's an error, throw the error
        else if(err) {
            throw err;
        }
    })
}

module.exports = startingPrompt;