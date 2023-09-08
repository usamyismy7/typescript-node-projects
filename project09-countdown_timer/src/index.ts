#! /usr/bin/env node

import inquirer from "inquirer";

const countdown = (targetDate: Date) => {
  const interval = setInterval(() => {
    const currentDate = new Date();
    const remainingTime = targetDate.getTime() - currentDate.getTime();
    if (remainingTime <= 0) {
      clearInterval(interval);
      console.log("Countdown timer has ended!");
    } else {
      const seconds = Math.floor(remainingTime / 1000);
      console.log(`Time remaining: ${seconds} seconds`);
    }
  }, 1000);
};

const promptUser = async () => {
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "targetDate",
      message: "Enter the target date and time (YYYY-MM-DD HH:MM:SS):",
    },
  ]);

  const targetDate = new Date(answers.targetDate);

  if (isNaN(targetDate.getTime())) {
    console.log("Invalid date format. Please use YYYY-MM-DD HH:MM:SS.");
  } else {
    countdown(targetDate);
  }
};

promptUser();
