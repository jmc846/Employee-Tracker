// The below alerts Javascript what requirements it must take in to make the App run
const mysql = require("mysql");
const inquirer = require("inquirer");
const table = require("console.table");


// This is creating a connection to our MySQL database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "67504@jc",
    database: "employeeTracker_DB"
});

// This starts the main display in the terminal
const start = () => {
    return inquirer.prompt({
        name:"menu",
        type: "list",
        message: "Please select an option below.",
        choices: [
            "View all departments",
            "View all roles?",
            "View all employees",
            "Add a department",
            "Add a role",
            "Add an employee",
            "Update employee role",
            "Exit"
        ]
    })
    .then( response => {
        console.log(response.menu)
        switch (response.menu){
            case "View all departments":
               return viewDepartments();
                // start()
            case  "View all roles?":
                return viewRoles();
            case  "View all employees":
                return viewEmployees();
            case "Add a department":
                return addDepartment();
            case "Add a role":
                console.log("case hit");
                return addRole();
            case "Add an employee":
                return addEmployee();
            case "Update employee role":
                return updateEmployeeRoles();
            case "Exit":
               return connection.end();                        
        }
       
    })
}
// This allows the users to view all departments
const viewDepartments = () => {
    
    connection.query("SELECT * FROM department", (err, res) => {
        if(err) throw err;
        // console.log(res)
        res.forEach(department => {
            console.table(`ID: ${department.id} | Name: ${department.name}`)
        })  
    });
}

// This function allows the user to view all roles
const viewRoles = () => {
    var query = `SELECT role.id, role.title, role.salary, department.department_name 
    AS department
    FROM role
    INNER JOIN department
    ON role.department_id = department.id`;

    connection.query(query, (err, res) => {
        if(err) throw err;
        console.table(res)
    });
}

// This allows the user to view all employees
const viewEmployees = () => {
    var query = `SELECT * FROM employee`
    // join with role table , join employee with employee
    connection.query(query, (err, res) => {
        if(err) throw err;
  
        console.table(res)
        
    });
}

// This allows the user to add a new department
const addDepartment = () => {
    inquirer
        .prompt({
            name: "department",
            type: "input",
            message: "What is the name of the new department?",
          })
        .then( answer => {
        var query = "INSERT INTO department (name) VALUES ( ? )";
        connection.query(query, answer.department, (err, res) => {
            console.table(`Successfully added the: ${(answer.department)} department.`)
        })
        viewDepartments();
        })
}

// This allows the user to add a new role
const addRole = () => { 
    return inquirer
    .prompt([{
        name: "title",
        type: "input",
        message: "What is the title of the new role?",
      }, 
      {
        name: "salary",
        type: "number",
        message: "What is the salary of the new role?",
      },
      {
        name: "department",
        type: "number",
        message: "Which department does this role fall under?",
      }
      ])  
          .then( answer =>  {
            var query = "INSERT INTO role (title, salary, department_id) VALUES ( ?, ?, ? )";
            connection.query(query, [answer.title, answer.salary, answer.department], (err, res) => {
                console.table(`Successfully added the: ${(answer.title)} role.`)
            })
        viewRoles();
        })
    }

    // This allows a user to add a new employee
    const addEmployee = () => {
        return inquirer
        .prompt([{
            name: "first_name",
            type: "input",
            message: "What is the employee's first name?",
          }, 
          {
            name: "last_name",
            type: "input",
            message: "What is the employee's last name?",
          },
          {
            name: "role_id",
            type: "number",
            message: "What role does the employee have?",
          }
          ])  
              .then( answer =>  {
                var query = "INSERT INTO employee (first_name, last_name, role_id) VALUES ( ?, ?, ? )";
                connection.query(query, [answer.first_name, answer.last_name, answer.role_id], (err, res) => {
                    console.table(`Successfully added the: employee.`)
                })
            
            })
           


        }

        const updateEmployeeRoles = () => {
            var query = `SELECT * FROM employee`
            var query2 = `SELECT * from role`
            connection.query (query, (err, res) =>{
                if(err)throw error ;
                console.log(res)
                let empArr = [];
                res.map(emp => empArr.push(emp.first_name + ' ' + emp.last_name))
             connection.query(query2,(err2, res2) =>{
                if(err2)throw error ;
                let roleArr = [];
                res2.map(role => roleArr.push(role.title))
                inquirer.prompt([
                {
                name: "empName",
                type: "list",
                message: "Who is the employee you'd like to update?",
                choices: empArr
                },
                {
                name: "roleName",
                type: "list",
                message: "What role would you like to change?",
                choices: roleArr
                }
                ]).then( answer =>  {
                    console.log(answer)
                    var bothNames = answer.empName.split(" ")
                    var firstN = bothNames[0]
                    var lastN = bothNames[1]
                    console.log(firstN, lastN)
                    var query3 = "UPDATE employee SET role_id = (role) WHERE first_name = (first_name) AND last_name = (last_name) VALUES ( ?, ?, ? )";
                    connection.query(query3, [answer.roleName, firstN, lastN], (err, res) => {
                        console.table(res)
                        console.log(`Successfully updated the: employee.`)
                    })
                })
            })
        })
        }

 // This establishes a connection to our terminal
connection.connect(function(err){
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    // connection is complete, remainder of code can start.
    start()
  }); 
// Callback to the start fucntion up top
// start()