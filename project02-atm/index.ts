#! /usr/bin/env node

// ATM

/*
This somewhat complex TypeScript / Node.js project is a console - based application. When the system starts the user is prompted with a user id and user pin.After entering the details successfully, the ATM functionalities are unlocked.All the user data is generated randomly.
*/

import inquirer from "inquirer";

type Transaction = {
  type: string;
  amount: number;
  before: number;
  after: number;
  time: Date;
};

type User = {
  name: string;
  balance: number;
  transactions: Transaction[];
};

const users: User[] = [
  {
    name: "Usama Irfan",
    balance: 1000,
    transactions: [],
  },
  {
    name: "Shahzaib Malik",
    balance: 10000,
    transactions: [
      {
        type: "withdraw",
        amount: 1000,
        before: 6000,
        after: 5000,
        time: new Date(),
      },
      {
        type: "deposit",
        amount: 1000,
        before: 5000,
        after: 6000,
        time: new Date(),
      },
      {
        type: "withdraw",
        amount: 1000,
        before: 6000,
        after: 5000,
        time: new Date(),
      },
      {
        type: "deposit",
        amount: 5000,
        before: 5000,
        after: 10000,
        time: new Date(),
      },
    ],
  },
  {
    name: "Haris Jalip",
    balance: 3000,
    transactions: [
      {
        type: "deposit",
        amount: 1000,
        before: 2000,
        after: 3000,
        time: new Date(),
      },
      {
        type: "withdraw",
        amount: 500,
        before: 3000,
        after: 2500,
        time: new Date(),
      },
      {
        type: "deposit",
        amount: 500,
        before: 2500,
        after: 3000,
        time: new Date(),
      },
    ],
  },
  {
    name: "Ali Zulqarnain",
    balance: 10000,
    transactions: [
      {
        type: "withdraw",
        amount: 5000,
        before: 15000,
        after: 10000,
        time: new Date(),
      },
    ],
  },
  {
    name: "Hamza Inam",
    balance: 8000,
    transactions: [
      {
        type: "deposit",
        amount: 2000,
        before: 7000,
        after: 9000,
        time: new Date(),
      },
      {
        type: "withdraw",
        amount: 1000,
        before: 9000,
        after: 8000,
        time: new Date(),
      },
    ],
  },
];

console.log("Welcome to the ATM");

inquirer
  .prompt([
    {
      name: "userid",
      type: "input",
      message: "Enter your three digit user id: ",
      validate: function (value) {
        if (
          isNaN(value) === false &&
          parseInt(value) > 100 &&
          parseInt(value) < 1000
        ) {
          return true;
        }
        return false;
      },
    },
    {
      name: "userpin",
      type: "input",
      message: "Enter your four digit pin: ",
      validate: function (value) {
        if (
          isNaN(value) === false &&
          parseInt(value) > 1000 &&
          parseInt(value) < 10000
        ) {
          return true;
        }
        return false;
      },
    },
  ])
  .then(function (answer) {
    console.log("User id: " + answer.userid);
    let randomNumber = Math.floor(Math.random() * 5);
    console.log(users[randomNumber]);
  });
