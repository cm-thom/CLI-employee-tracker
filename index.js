const inquirer = require('inquirer');
const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD 
});

inquirer.prompt([
    {
        type: 'list',
        message: 'What would you like to do?',
        choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role'],
        name: 'userSelection'
        
    }]).then( data => {
        switch(data.userSelection) {
            case 'View All Departments':
                viewAllDepartments();
                break;
            case 'View All Roles':
                viewAllRoles();
                break;
            case 'View All Employees':
                viewAllEmployees();
                break;
            case 'Add a Department':
                addDepartment();
                break;
            case 'Add a Role':
                addRole();
                break;
            case 'Add an Employee':
                addEmployee();
                break;
            case 'Update an Employee Role':
                updateEmployeeRole();
                break;
            default:
                console.log('it\'s broken')
                console.log(choice.userSelection)
        }
    });

const viewAllDepartments = () => {
    connection.query(
        'SELECT * FROM department',
        (err, results) => console.table(results)
    )
};

const viewAllRoles = () => {
    connection.query(
        'SELECT * FROM role',
        (err, results) => console.table(results)
    )
};

const viewAllEmployees = () => {
    connection.query(
        'SELECT * FROM employee',
        (err, results) => console.table(results)
    )
};

const addDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            message: 'Enter department name:',
            name: 'departmentName'
        }
    ]).then( (data) => {
        connection.query(
            `INSERT INTO department (department_name) VALUES ('${data.departmentName}')`,
            (err, results) => console.log(`${data.departmentName} department added!`)
        )
    })
};

const addRole = () => {
    inquirer.prompt([
        {
            type: 'input',
            message: 'Enter role name:',
            name: roleName
        }
    ])
};

const addEmployee = () => {
    //logic
};

const updateEmployeeRole = () => {
    //logic
};