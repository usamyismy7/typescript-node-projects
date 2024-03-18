#!/usr/bin/env node
import inquirer from "inquirer";
import { Customer } from "./modules/Customer.js";
import { BankAccount } from "./modules/BankAccount.js";
process.stdin.setMaxListeners(0);
let customers = [
    new Customer("John", "Doe", "Male", 30, "1234567890", new BankAccount()),
    new Customer("Jane", "Williams", "Female", 25, "0987654321", new BankAccount()),
];
let customer;
const questions = [
    {
        type: "list",
        name: "customerType",
        message: "New Customer or Existing Customer?",
        choices: ["New Customer", "Existing Customer", "Exit"],
    },
    {
        type: "input",
        name: "firstName",
        message: "What's your first name?",
        validate: (val) => {
            return val.length > 0 || "Please enter your first name";
        },
        when: (answers) => answers.customerType === "New Customer",
    },
    {
        type: "input",
        name: "lastName",
        message: "What's your last name?",
        validate: (val) => {
            return val.length > 0 || "Please enter your last name";
        },
        when: (answers) => answers.customerType === "New Customer",
    },
    {
        name: "gender",
        type: "list",
        message: "What's your gender?",
        choices: ["Male", "Female"],
        when: (answers) => !answers.gender && answers.customerType === "New Customer",
    },
    {
        type: "input",
        name: "age",
        message: "How old are you?",
        validate: (val) => {
            let valid = !isNaN(parseFloat(val));
            return valid || "Please enter a number";
        },
        when: (answers) => answers.customerType === "New Customer",
    },
    {
        type: "input",
        name: "mobileNumber",
        message: "What's your mobile number?",
        validate: (val) => {
            let valid = /^[0-9]{8,14}$/.test(val);
            return valid || "Please enter a valid mobile number";
        },
        when: (answers) => answers.customerType === "New Customer",
    },
];
function mainMenu() {
    inquirer.prompt(questions).then((answers) => {
        if (answers.customerType === "Exit") {
            process.exit();
        }
        else if (answers.customerType === "New Customer") {
            customer = new Customer();
            customer.bankAccount = new BankAccount();
            customer.firstName = answers.firstName;
            customer.lastName = answers.lastName;
            customer.gender = answers.gender;
            customer.age = answers.age;
            customer.mobileNumber = answers.mobileNumber;
            customers.push(customer);
            console.log(customer.customerInfo());
            mainMenu();
        }
        else {
            inquirer
                .prompt([
                {
                    type: "list",
                    name: "selectedCustomer",
                    message: "Select a customer",
                    choices: customers.map((customer, index) => ({
                        name: `${customer.firstName} ${customer.lastName}`,
                        value: index,
                    })),
                },
            ])
                .then((answers) => {
                customer = customers[answers.selectedCustomer];
                accountMenu();
            });
        }
    });
}
function accountMenu() {
    const accountQuestions = [
        {
            type: "list",
            name: "action",
            message: "What would you like to do?",
            choices: ["Debit", "Credit", "Check Balance", "Customer Details", "Exit"],
        },
        {
            type: "input",
            name: "amount",
            message: "How much?",
            when: (answers) => answers.action === "Debit" || answers.action === "Credit",
        },
    ];
    inquirer.prompt(accountQuestions).then((answers) => {
        if (answers.action === "Exit") {
            mainMenu();
        }
        else {
            if (answers.action === "Debit") {
                console.log(customer.bankAccount.debit(Number(answers.amount)));
            }
            else if (answers.action === "Credit") {
                console.log(customer.bankAccount.credit(Number(answers.amount)));
            }
            else if (answers.action === "Check Balance") {
                console.log(`Your balance is $${customer.bankAccount.accountBalance}`);
            }
            else if (answers.action === "Customer Details") {
                console.log(customer.customerInfo());
            }
            accountMenu(); // Move this inside the else block
        }
    });
}
mainMenu();
