DROP DATABASE IF EXISTS employeeTracker_DB;
CREATE DATABASE employeeTracker_DB;

USE employeeTracker_DB

CREATE TABLE department
(
    id INTEGER NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY(id)    

);

    CREATE TABLE role
    (
    id INTEGER NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL
    department_id INTEGER    
    PRIMARY KEY(id)  
    FOREIGN KEY(department_id) REFERENCES(department.id)  

);

        CREATE TABLE employee
        (
        id INTEGER NOT NULL AUTO_INCREMENT,
   first_name VARCHAR(30) NOT NULL
   last_name VARCHAR(30)  NOT NULL
   role_id INTEGER
   manager_id INTEGER 
   FOREIGN KEY(manager_id) REFERENCES(employee.id),
   FOREIGN KEY(role_id) REFERENCES(roles.id)
    PRIMARY KEY(id)    

);

SELECT * FROM department;
SELECT * FROM  role;
SELECT * FROM employee;
