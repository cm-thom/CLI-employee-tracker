const inquirer = require('inquirer');
const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD 
});

//put the inquirer logic here to run in the CLI
//probably also could put the mysql2 logic here for joins unless that needs routes? idk. there's no server needed?
// will have to seed table columns with data. (seeds.sql)

inquirer.createPromptModule([
    {
        
    }
])



// FUNCTIONALITY
// - run index.js, stuff happens