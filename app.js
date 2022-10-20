const inquirer = require("inquirer");
const mysql = require('mysql2');
const startingPrompt = require("./lib/startingPrompt");
require('dotenv').config();

//connect to the database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: "employe_information_db"
    },
    console.log("Successfully connected to the database")
)

//run the initial prompt
startingPrompt();