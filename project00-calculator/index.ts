#! /usr/bin/env node

import inquirer from "inquirer";
import chalkAnimation from "chalk-animation";

import Add from "./operations/add.js";
import Sub from "./operations/sub.js";
import Mul from "./operations/mul.js";
import Div from "./operations/div.js";

const sleep = (ms = 3000) => new Promise((r) => setTimeout(r, ms));

async function welcome(heading: any) {
  const styledTitle = chalkAnimation.karaoke(heading + "\n");
  await sleep();
  styledTitle.stop();
}

(async () => {
  await welcome("Welcome to the CLI Calculator!");

  inquirer
    .prompt([
      {
        type: "input",
        name: "num1",
        message: "Enter the first number:",
      },
      {
        type: "input",
        name: "num2",
        message: "Enter the second number:",
      },
      {
        type: "list",
        name: "operator",
        message: "Select an operator:",
        choices: ["Add", "Sub", "Mul", "Div"],
      },
    ])
    .then((answers: any) => {
      let result = 0;
      const num1 = parseFloat(answers.num1);
      const num2 = parseFloat(answers.num2);
      switch (answers.operator) {
        case "Add":
          result = Add(num1, num2);
          break;
        case "Sub":
          result = Sub(num1, num2);
          break;
        case "Mul":
          result = Mul(num1, num2);
          break;
        case "Div":
          result = Div(num1, num2);
          break;
      }
      console.log(`The result is: ${result}`);
    });
})();
