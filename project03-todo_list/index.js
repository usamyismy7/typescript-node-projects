#! /usr/bin/env node
// Develop a simple command line Todo app using TypeScipt, Node.js and Inquirer.
import inquirer from "inquirer";
let list = [];
let todo = "";
inquirer
    .prompt([
    {
        name: "todo",
        type: "input",
        message: "Enter a todo item: ",
        validate: function (value) {
            if (value) {
                return true;
            }
            return false;
        },
    },
])
    .then(function (answer) {
    todo = answer.todo;
    list.push(todo);
    console.log(list);
});
