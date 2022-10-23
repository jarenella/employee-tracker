const inquirer = require("inquirer");
const mysql = require('mysql2');
require('dotenv').config();
const db = require("./connection");

//function which updates and employees role and will console log the updated list of employees
function updateEmployeeRole() {
    console.log("Test")
}

module.exports = updateEmployeeRole;