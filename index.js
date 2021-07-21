const mysql = require('mysql');
const inquirer = require('inquirer');

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
        choices: ['Add Employee', 'View All Employeees', 'Exit'],
      })
      .then((answer) => {

        switch (answer.mainMenu) {
            case 'View All Employeees':
                viewAllemployees();
              break;
            case 'Add Employee':
                addEmployee();
              break;
            case 'Add Role':
                addEmployee();
              break;
            case 'Add Department':
                addEmployee();
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

  const viewAllemployees = () => {}

  const addEmployee = () => {
    connection.query('SELECT title FROM Roles', (err, queryResults) => {
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
                queryResults.forEach(({ title }) => {
                  choiceArray.push(title);
                });
                return choiceArray;
              },
              message: 'In what role is the new employee?',
            },
            {
              name: 'manager_id',
              type: 'list',
              message: 'Who is the manager of the new employee?',
              choices: [1, 2, 3],
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
                manager_id: answer.manager_id,
            },
            (err) => {
                if (err) throw err;
                console.log('');
                start();
            }
            );
        });
    });
}

const getRoleId = (role) => {
  let role_id;
  connection.query(`SELECT id FROM Roles WHERE title = '${role}'`, (err, result) => {
    role_id = result[0].id;
  });
  return role_id;
}


  start();