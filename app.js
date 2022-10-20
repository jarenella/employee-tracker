const inquirer = require("inquirer");
const mysql = require('mysql2');
require('dotenv').config();

inquirer.prompt([
    {
        type: "list",
        name: "test1",
        message: "This is just a test. Choose any answer",
        choices: ["Ok", "Alright"]
    },
    {
        type: "list",
        name: "test2",
        message: "This is another. Choose any answer",
        choices: ["Got it", "Sure"]
    }
])
.then(answers => {
    console.log("User's answer: " + answers.test1);
    console.log("User's second answer: " + answers.test2)
})