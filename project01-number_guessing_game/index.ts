#! /usr/bin/env node

// Number Guessing Game

/*
This guess the number game is a short TypeScript/Node.js project that allows the user to guess the number generated by the computer. There are also several ways to alter the game, like adding more rounds or displaying the score. It’s quite simple and uses the random function to generate a number.
*/

import inquirer from "inquirer";

const computerGeneratedNumber = Math.floor(Math.random() * 5) + 1;
const rounds = 3;
let guesses = 0;

console.log("I am thinking of a number between 1 and 5...");
console.log("Can you guess what it is?");
console.log("You have three tries!\n");

function askQuestion() {
  inquirer
    .prompt([
      {
        name: "guess",
        message: "Enter a number between 1 and 5: ",
        type: "input",
        validate: function (value) {
          if (
            isNaN(value) === false &&
            parseInt(value) > 0 &&
            parseInt(value) < 6
          ) {
            return true;
          }
          return false;
        },
      },
    ])
    .then(function (answer) {
      const userGuess = parseInt(answer.guess);
      guesses++;
      if (userGuess === computerGeneratedNumber) {
        console.log("You guessed correctly!");
        console.log(
          "Your score is " +
            ((100 / rounds) * (rounds - guesses + 1)).toFixed(1) +
            "%"
        );
      } else if (guesses === rounds) {
        console.log("You have no more tries left.");
        console.log("Your score is 0%");
        console.log("The correct number was " + computerGeneratedNumber);
      } else {
        console.log("You guessed incorrectly. Try again.");
        askQuestion();
      }
    });
}

askQuestion();
