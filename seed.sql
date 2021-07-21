DROP DATABASE IF EXISTS employee_DB;
CREATE DATABASE employee_DB;

USE employee_DB;

CREATE TABLE Departments(
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO Departments (name)
VALUES ("Sales");
INSERT INTO Departments (name)
VALUES ("Legal");
INSERT INTO Departments (name)
VALUES ("Software Development");


CREATE TABLE Employees(
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT,
  PRIMARY KEY (id)
);

INSERT INTO Employees (first_name, last_name, role_id, manager_id)
VALUES ("Bob", "Smith", 1, 1);
INSERT INTO Employees (first_name, last_name, role_id, manager_id)
VALUES ("Mike", "Chan", 2, 1);
INSERT INTO Employees (first_name, last_name, role_id, manager_id)
VALUES ("Jane", "Brown", 3, 1);
INSERT INTO Employees (first_name, last_name, role_id, manager_id)
VALUES ("Jessica", "Smith", 4, 2);
INSERT INTO Employees (first_name, last_name, role_id, manager_id)
VALUES ("Luiz", "Rodriguez", 5, 2);
INSERT INTO Employees (first_name, last_name, role_id, manager_id)
VALUES ("Omy", "Goodness", 6, 3);
INSERT INTO Employees (first_name, last_name, role_id, manager_id)
VALUES ("Charles", "McLondon", 6, 3);


CREATE TABLE Roles(
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INT,
  PRIMARY KEY (id)
);

INSERT INTO Roles (title, salary, department_id)
VALUES ("Salesperson", 80000, 1);
INSERT INTO Roles (title, salary, department_id)
VALUES ("Traveling Salesman", 81000, 1);
INSERT INTO Roles (title, salary, department_id)
VALUES ("Sales Manager", 90000, 1);
INSERT INTO Roles (title, salary, department_id)
VALUES ("Lawyer", 200000, 2);
INSERT INTO Roles (title, salary, department_id)
VALUES ("Head Lawyer", 250000, 2);
INSERT INTO Roles (title, salary, department_id)
VALUES ("Software Developer", 70000, 3);
INSERT INTO Roles (title, salary, department_id)
VALUES ("Lead Developer", 100000, 3);
