var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 8080,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "employeeTracker_DB"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  start();
});

// save to the database using "INSERT table_name SET ?"
const createEmployee = employeeRecord => {
    connection.query("insert into employees SET ?", employeeRecord, (err, results) => {
        if(err) throw err;
        showMenu();
    })
}

const askEmployeeCreateQuestions = () => {
    // if they want to add an employee,
    // ask "What is your first name?",
    // ask "What is your last name?"
    return inquirer.prompt([
        {
            message: "What is your first name?",
            type: "input",
            name: "first_name"
        },
        {
            message: "What is your last name?",
            type: "input",
            name: "last_name"
        },
        {
            message: "What is your role?",
            type: "input",
            name: "role"
        }
    ])
    .then(response => {
        return createEmployee(response);
    });
};

const updateEmployee = (employee_info, id) => {
    //UPDATE auctions SET ? WHERE ?;
    //UPDATE auctions SET highest_bid = 2 WHERE id = 3;
    
    // update and read the final result back to the user
    // update the database record "UPDATE ... SET ... WHERE ..."
    connection.query( "UPDATE auctions SET ? WHERE ?",
    [employee_info, id],
    err => {
        if(err) throw err;
        // read auction from the database "SELECT * FROM ..."
        connection.query("SELECT * FROM auctions WHERE ?", id,
        (err2, results) => {
            if(err2) throw err2;
            let row = results[0];
            console.log(`${row.category}: ${row.item_name} ::> ${row.highest_bid}`);
            // we need to go back to the main menu
            showMenu();
        });
    });
}

const readAndAskEmployeeQuestions = () => {
    // read the auction choices from the database "SELECT * FROM ..."
    connection.query("SELECT * FROM employee", (err, employee) => {
        if(err) throw err;
        let employeeChoices = employee.map( employee => {
            return {
                name: `${employee.first_name} ${employee.last_name}`,
                value: employee
            };
        });
        connection.query("SELECT * FROM role", (err, results) => {
            if(err) throw err;
            // console.log(results);
            let choices = results.map( row => { 
                let roleName = `${row.title}: ${row.salary} :: ${row.department_id} `;
                if(row.winning_bidder_id != null){
                 
            
                return {
                    name: roleName,
                    value: row
                };
            });
            // console.log(choices);
            // ask the question "What auction would you like to place a bid in?"
            // below that, we need the auction choices
            // ask the question "How much would you like to bid?"
            // take in the input choice of bid

            return inquirer.prompt([
                {
                    message: "Who are you?",
                    name: "employee",
                    choices: employeeChoices,
                    type: "list"
                },
                {
                    message: "What is the salary of the employee?",
                    name: "salary",
                    choices: salaries,
                    type: "input"
                },
                {
                    message: "What is the Title of the emploee?",
                    name: "employee_title",
                    type: "input"
                }
            ]).then( response => {
                // console.log(response);
                const salary = parseInt(response.salaries);

                // if(input_bid <= response.auction.highest_bid){
                //     console.log("Your bid is too small. Ask Jackie for a loan.");
                //     showMenu();
                // }
                // else{
                //     updateAuction({ highest_bid: input_bid, winning_bidder_id: response.bidder.id }, { id: response.auction.id } );
                }
            //}
            );
        })
    
    });
};
                
// create the auction record (C from crud)
const createAuctionRecord = dataRecord => {
    connection.query("insert into auctions SET ?", dataRecord, (err, results) => {
        if(err) throw err;
        showMenu();
    })
}
// ask the create auction questions
const askCreateQuestions = () => {
    return inquirer.prompt([
        {
            message: "What is the item you would like to submit?",
            name: "item_name",
            type: "input"
        },
        {
            message: "What category would you like to place your auction in?",
            name: "category",
            type: "input"
        },
        {
            message: "What would you like your starting bid to be?",
            name: "starting_bid",
            type: "input"
        }
    ])
    .then( response => {
        // because every auction needs to start with a value
        response.highest_bid = response.starting_bid;
        createAuctionRecord(response);
    });
}

// ask the first menu questions
const showMenu = () => {
    return inquirer.prompt([
        {
            message: "Would you like to [POST] an auction or [BID] on an auction? Or, would you like to add a bidder?",
            choices: ["POST", "BID", "ADD BIDDER", "EXIT"],
            name: "menuitem",
            type: "list"
        }
    ])
    .then( response => {
        switch(response.menuitem){
            case "POST":
                return askCreateQuestions();
            case "BID":
                return readAndAskBidQuestions();
            case  "ADD BIDDER":
                return askBidderCreateQuestions();
            default:
                connection.end();
        }
    });
}

connection.connect(function(err) {
    if (err) throw err;
    showMenu();
});

// do create the specific auction
// place the same bid 1000 every time
// close connection