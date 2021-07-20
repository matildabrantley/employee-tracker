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
    connection.query('SELECT * FROM Roles', (err, queryResults) => {
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
            name: 'role_id',
            type: 'list',
            message: 'In which role is the new employee?',
            choices: [1, 2, 3],
            // choices() {
            //     const choiceArray = [];
            //     queryResults.forEach(({ role }) => {
            //     choiceArray.push(role);
            //     });
            //     return choiceArray;
            // }
            },
            {
              name: 'manager_id',
              type: 'list',
              message: 'Who is the manager of the new employee?',
              choices: [1, 2, 3],
            }
        ])
        .then((answer) => {
            connection.query(
            'INSERT INTO Employees SET ?',
            {
                first_name: answer.first_name,
                last_name: answer.last_name,
                role_id: answer.role_id,
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

  start();