const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');

const connection = mysql.createConnection({
    host: 'localhost',
    // port
    port: 3306,
    //username
    user: 'root',
    //password
    password: 'a',
    database: 'employee_DB',
  });
  

  const start = () => {
    inquirer
      .prompt({
        name: 'mainMenu',
        type: 'list',
        message: 'What would you like to do?',
        choices: ['View All Employeees', 'View All Roles', 'View All Departments',
        'Add Employee', 'Add Role', 'Add Department', 'Exit'],
      })
      .then((answer) => {

        switch (answer.mainMenu) {
            case 'View All Employeees':
                viewAllEmployees();
              break;
            case 'View All Roles':
                viewAllRoles();
              break;
            case 'View All Departments':
                viewAllDepartments();
              break;
            case 'Add Employee':
                addEmployee();
              break;
            case 'Add Role':
                addRole();
              break;
            case 'Add Department':
                addDepartment();
              break;
            case 'Exit':
              connection.end();
              break;
            default:
              console.log('What?');
              break;
          }
      });
  };

  const viewAllEmployees = () => {
    connection.query('SELECT * FROM Employees', (err, queryResults) => {
      let table = cTable.getTable(queryResults);
      console.log(table);
      start();
    });
  }
  const viewAllRoles = () => {
    connection.query('SELECT * FROM Roles', (err, queryResults) => {
      let table = cTable.getTable(queryResults);
      console.log(table);
      start();
    });
  }
  const viewAllDepartments = () => {
    connection.query('SELECT * FROM Departments', (err, queryResults) => {
      let table = cTable.getTable(queryResults);
      console.log(table);
      start();
    });
  }

  const addEmployee = () => {
    connection.query('SELECT title, id FROM Roles', (err, queryResults) => {
        inquirer
        .prompt([
            {
            name: 'first_name',
            type: 'input',
            message: 'What is the first name of new employee?',
            },
            {
            name: 'last_name',
            type: 'input',
            message: 'What is the last name of new employee?',
            },
            {
              name: 'role',
              type: 'list',
              choices() {
                const choiceArray = [];
                queryResults.forEach((queryResults) => {
                  choiceArray.push({ name:queryResults.title, value:queryResults.id});
                });
                return choiceArray;
              },
              message: 'In what role is the new employee?',
            },
            {
              name: 'manager_id',
              type: 'list',
              message: 'Who is the manager of the new employee?',
              choices: ["Jane Brown", "Luiz Rodriguez", "Charles McLondon"],
            }
        ])
        .then((answer) => {
            //const r_id = getRoleId(answer.role)
            connection.query(
            'INSERT INTO Employees SET ?',
            {
                first_name: answer.first_name,
                last_name: answer.last_name,
                role_id: answer.role,
                manager_id: 2
                ,
            },
            (err) => {
                if (err) throw err;
                console.log(`\n${answer.first_name} ${answer.last_name} added to the team! \n`);
                start();
            }
            );
        });
    });
}

//Add new employee role to Roles table
const addRole = () => {
  connection.query('SELECT name, id FROM Departments', (err, queryResults) => {
      inquirer
        .prompt([
            {
            name: 'title',
            type: 'input',
            message: 'What is the title of the new role?',
            },
            {
            name: 'salary',
            type: 'input',
            message: 'What is the salary of new role?',
            },
            {
              name: 'department',
              type: 'list',
              choices() {
                const choiceArray = [];
                queryResults.forEach((queryResults) => {
                  choiceArray.push({ name:queryResults.name, value:queryResults.id});
                });
                return choiceArray;
              },
              message: 'In what department is the new role?',
            }
        ])
        .then((answer) => {
            //const r_id = getRoleId(answer.role)
            connection.query(
            'INSERT INTO Roles SET ?',
            {
              title: answer.title,
              salary: answer.salary,
              department_id: answer.department,
            },
            (err) => {
                if (err) throw err;
                console.log(`\nNew job role ${answer.title} added. \n`);
                start();
            }
            );
        });
    });
  }
const addDepartment = () => {
  inquirer
    .prompt([
      {
        name: 'name',
        type: 'input',
        message: 'What is the name of the new department?',
        }
    ])
    .then((answer) => {
        //const r_id = getRoleId(answer.role)
        connection.query(
        'INSERT INTO Departments SET ?',
        {
          name: answer.name,
        },
        (err) => {
            if (err) throw err;
            console.log(`\nNew department ${answer.name} added. \n`);
            start();
        }
        );
    });
  }

  start();

// const getRoleId = (role) => {
//   let role_id;
//   connection.query(`SELECT id FROM Roles WHERE title = '${role}'`, (err, result) => {
//     role_id = result[0].id;
//   });
//   return role_id;
// }
