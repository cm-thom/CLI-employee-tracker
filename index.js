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

inquirer.prompt([
    {
        type: 'list',
        message: 'What would you like to do?',
        choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role'],
        name: 'userSelection'
        
    }]).then( choice => {
        switch(choice.userSelection) {
            case 'View All Departments':
                viewAllDepartments();
                break;
            default:
                console.log('it\'s broken')
                console.log(choice.userSelection)
        }
    });