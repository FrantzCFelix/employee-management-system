"use strict";

const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "FroonceTheDev_170",
  database: "employee_db"
});

connection.connect(err => {
  if (err) {
    throw err;
  }
  promptUser();
});

async function promptUser() {
 const {userPrompt} = await inquirer.prompt({
      name: "userPrompt",
      type: "list",
      message: "Welcome to the Employee Managment System",
      choices: [
        "View all employees",
        "View all employees by department",
        "View all employees by manager",
        "Add employee",
        "Remove employee",
        "Update employee role",
        "Update employee manager",
        "View all roles",
        "Add role",
        "Remove role",
        "View all departments",
        "Add department",
        "Remove department",
        "Exit"
      ]
    });
    
      switch (userPrompt) {
        case "View all employees":
          viewAllEmployees();
          break;
        case "View all employees by department":
          viewAllDepartmentEmployees();
          break;
        case "View all employees by manager":
          viewAllManagerEmployees();
          break;
        case "Add employee":
          addEmployee();
          break;
        case "Remove employee":
          removeEmployee();
          break;
        case "Update employee role":
          updateEmployeeRole();
          break;
        case "Update employee manager":
          updateEmployeeManager();
          break;
        case "View all roles":
          viewAllRoles();
          break;
        case "Add role":
          addRole();
          break;
        case "Remove role":
          removeRole();
          break;
        case "View all departments":
          viewAllDepartments();
          break;
        case "Add department":
          addDepartment();
          break;
        case "Remove department":
          removeDepartment();
          break;
        case "Exit":
          connection.end();
          break;
      }
    
};

const viewAllEmployees = () => {
  const query = "SELECT * FROM employee";
  connection.query(query, (err, res) => {
    if (err) {
    throw err;
  }
    console.table(res);
    promptUser();
  });
};

async function viewAllDepartmentEmployees(){
  const {viewByDepartment} = await inquirer.prompt([
      {
        name: "viewByDepartment",
        type: "input",
        message: "Which department(ID) employees would you like to see?"
      }
    ]);  
      const query = "SELECT * FROM employee WHERE ?";
      connection.query(query, { id: viewByDepartment }, (err, res) => {
        if (err) {
    throw err;
  }
        console.table(res);
        promptUser();
      });
    
};

async function viewAllManagerEmployees (){
  const {viewByManager} = inquirer.prompt([
      {
        name: "viewByManager",
        type: "input",
        message: "Which manager(ID) employees would you like to see?"
      }
    ]);    
      const query = "SELECT * FROM employee WHERE ?";
      connection.query(query, { manager_id: viewByManager }, (err, res) => {
        if (err) {
    throw err;
  }
        console.table(res);
        promptUser();
      });
    
};

async function addEmployee(){
  const {firstName,lastName,roleID,managerID} = await inquirer.prompt([
      {
        name: "firstName",
        type: "input",
        message: "Employee's first name:"
      },
      {
        name: "lastName",
        type: "input",
        message: "Employee's last name:"
      },
      {
        name: "roleID",
        type: "input",
        message: "Employee's role(ID):"
      },
      {
        name: "managerID",
        type: "input",
        message: "Employee's manager(ID):"
      }
    ]);
      const query = "INSERT INTO employee SET ?";
      let userInput = {
        first_name: firstName,
        last_name: lastName,
        role_id: roleID,
        manager_id: managerID
      };

      connection.query(query, userInput, (err, res) => {
        if (err) {
    throw err;
  }
        console.log("Employee added");
        promptUser();
      });
    
};

async function removeEmployee(){
  const {removeEmployeeFirst, removeEmployeeLast} = await inquirer.prompt([
      {
        name: "removeEmployeeFirst",
        type: "input",
        message:
          "Please enter the first name of the employee you would like to remove."
      },
      {
        name: "removeEmployeeLast",
        type: "input",
        message:
          "Please enter the last name of the employee you would like to remove."
      }
    ]);
      const query = "DELETE FROM employee WHERE first_name = ? AND last_name = ?";

      connection.query(query,[removeEmployeeFirst, removeEmployeeLast],(err, res) => {

          if (err){
              throw err;
          }
          console.log("Employee removed");
          promptUser();
        }
      );
    
};

async function updateEmployeeRole(){
  const {roleID, employeeFirst,employeeLast} = await inquirer.prompt([
      {
        name: "employeeFirst",
        type: "input",
        message:
          "Please enter the first name of the employee you would like to update."
      },
      {
        name: "employeeLast",
        type: "input",
        message:
          "Please enter the last name of the employee you would like to update."
      },
      {
        name: "roleID",
        type: "input",
        message: "Please enter the new role ID."
      }
    ]);
      const query =
        "UPDATE employee SET role_id = ? WHERE first_name = ? AND last_name = ?";
      connection.query(query,[roleID, employeeFirst, employeeLast],(err, res) => {
          if (err) {
            throw err;
          }
          console.log("Employee's role ID updated");
          promptUser();
        }
      );
    
};

async function updateEmployeeManager (){
  const {managerID,employeeFirst,employeeLast} = await inquirer.prompt([
      {
        name: "employeeFirst",
        type: "input",
        message:
          "Please enter the first name of the employee you would like to update."
      },
      {
        name: "employeeLast",
        type: "input",
        message:
          "Please enter the last name of the employee you would like to update."
      },
      {
        name: "managerID",
        type: "input",
        message: "Please enter the id of the employee's new manager."
      }
    ]);
      const query =
        "UPDATE employee SET manager_id = ? WHERE first_name = ? AND last_name = ?";
      connection.query(query,[managerID, employeeFirst, employeeLast],(err, res) => {
          if (err) {
            throw err;
          }
          console.log("Employee's manager ID updated");
          promptUser();
        }
      );
   
};

function viewAllRoles(){
  const query = "SELECT * FROM role";
  connection.query(query, (err, res) => {
    if (err) {
     throw err;
    }
    console.table(res);
    promptUser();
  });
};

async function addRole(){
  const {roleTitle,roleSalary,roleDepartmentID} = await inquirer.prompt([
      {
        name: "roleTitle",
        type: "input",
        message: "Title of role:"
      },
      {
        name: "roleSalary",
        type: "input",
        message: "Salary of role:"
      },
      {
        name: "roleDepartmentID",
        type: "input",
        message: "Department ID of role:"
      }
    ]);
    
      const query = "INSERT INTO role SET ?";
      connection.query(query,{title: roleTitle,salary: roleSalary, department_id: roleDepartmentID},(err, res) => {
          if (err) {
            throw err;
          }
          console.log("New role created");
          promptUser();
        }
      );
  
};

async function removeRole(){
 const{deleteTitle} = await inquirer.prompt([
      {
        name: "deleteTitle",
        type: "input",
        message: "Please enter the title of the role you would like to remove."
      }
    ])
      const query = "DELETE FROM role WHERE ?";
      connection.query(query, { title: deleteTitle }, (err, res) => {
        if (err) {
          throw err;
        }
        console.log("Role removed");
        promptUser();
      });
    
};

const viewAllDepartments = () => {
  const query = "SELECT * FROM department";
  connection.query(query, (err, res) => {
    if (err) {
    throw err;
  }
    console.table(res);
    promptUser();
  });
};

async function addDepartment() {
  const {newDepartment} = await inquirer.prompt([
      {
        name: "newDepartment",
        type: "input",
        message: "Please enter the department you would like to add."
      }
    ]);
    
      const query = "INSERT INTO department SET ?";
      connection.query(query, { name: newDepartment }, (err, res) => {
        if (err) {
    throw err;
  }
        console.log("Department added");
        promptUser();
      });
    
};

async function removeDepartment () {
  const {deleteDepartment} = await inquirer.prompt([
      {
        name: "deleteDepartment",
        type: "input",
        message: "Please enter the department you would like to remove."
      }
    ]);
   
      const query = "DELETE FROM department WHERE ?";
      connection.query(query, { name: deleteDepartment }, (err, res) => {
        if (err) {
          throw err;
        }
        console.log("Department removed");
        promptUser();
      });
    
};