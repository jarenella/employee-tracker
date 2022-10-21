const inquirer = require("inquirer");
const mysql = require('mysql2');
const startingPrompt = require("./lib/startingPrompt");
require('dotenv').config();
//connect to the database
const db = require("./lib/connection");

//run the initial prompt
startingPrompt();