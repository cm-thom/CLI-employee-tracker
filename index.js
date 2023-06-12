const inquirer = require('inquirer');
const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD 
});

const prompt = () => {
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
};

prompt();


const viewAllDepartments = () => {
    connection.query(
        'SELECT * FROM department',
        (err, results) => {console.table(results)
        prompt();
        }  
    )
};

const viewAllRoles = () => {
    connection.query(
        'SELECT * FROM role',
        (err, results) => {console.table(results)
        prompt();
        }
    )
};

const viewAllEmployees = () => {
    connection.query(
        'SELECT * FROM employee',
        (err, results) => {console.table(results)
            prompt();
            }
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
            (err, results) => {
                console.log(`${data.departmentName} department added!`)
                prompt();
            }
        )
    })
};

const addRole = () => {
    inquirer.prompt([
        {
            type: 'input',
            message: 'Enter role name:',
            name: 'roleName'
        },
        {
            type: 'number',
            message: 'Enter role salary:',
            name: 'roleSalary'
        },
        {
            type: 'integer',
            message: 'Enter department ID of new role:',
            name: 'roleDepartmentId'
        }
    ]).then( (data) => {
        console.log(data.roleSalary);
        console.log(data.roleDepartmentId);
        connection.query(
            `INSERT INTO role (title, salary, department_id) VALUES ('${data.roleName}', ${data.roleSalary}, ${data.roleDepartmentId})`,
            (err, results) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log(`${data.roleName} role added!`)
                    prompt();
                }}
        )
    })
};

const addEmployee = () => {
    inquirer.prompt([
        {
            type: 'input',
            message: 'Enter employee first name:',
            name: 'firstName'
        },
        {
            type: 'input',
            message: 'Enter employee last name:',
            name: 'lastName'
        },
        {
            type: 'integer',
            message: 'Enter role ID of the employee:',
            name: 'roleId'
        },
        {
            type: 'integer',
            message: 'Enter manager ID of the employee:',
            name: 'managerId'
        }
    ]).then( (data) => {
        connection.query(
            `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${data.firstName}', '${data.lastName}', ${data.roleId}, ${data.managerId})`,
            (err, results) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log(`New employee added!`)
                    prompt();
                }}
        )
    })
};

const updateEmployeeRole = () => {
    inquirer.prompt([
        {
            type: 'number',
            message: 'Enter the ID of the employee whose role will be updated:',
            name: 'employeeId'
        },
        {
            type: 'number',
            message: 'Enter the ID of the updated role:',
            name: 'roleId'
        }
    ]).then( (data) => {
        connection.query(
            `UPDATE employee SET role_id = ${data.roleId} WHERE id = ${data.employeeId}`, (err, results) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log(`Employee role updated!`)
                    prompt();
                }
            }
        )
    })
};