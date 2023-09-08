#! /usr/bin/env node

// Develop a simple command line Todo app using TypeScipt, Node.js and Inquirer.

import inquirer from "inquirer";
import Todo from "./todo.js";

const todo = new Todo();

const menu = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "Choose an action:",
        choices: ["Add Task", "Remove Task", "List Tasks", "Exit"],
      },
    ])
    .then((answers) => {
      switch (answers.action) {
        case "Add Task":
          addTask();
          break;
        case "Remove Task":
          removeTask();
          break;
        case "List Tasks":
          listTasks();
          break;
        case "Exit":
          console.log("Goodbye!");
          process.exit(0);
          break;
      }
    });
};

const addTask = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "task",
        message: "Enter a new task:",
      },
    ])
    .then((answers) => {
      todo.addTask(answers.task);
      console.log("Task added successfully.");
      menu();
    });
};

const removeTask = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "taskIndex",
        message: "Select a task to remove:",
        choices: todo.listTasks(),
      },
    ])
    .then((answers) => {
      const taskIndex = todo.listTasks().indexOf(answers.taskIndex);
      todo.removeTask(taskIndex);
      console.log("Task removed successfully.");
      menu();
    });
};

const listTasks = () => {
  console.log("Tasks:");
  todo.listTasks().forEach((task: any) => console.log(`- ${task}`));
  menu();
};

menu();
