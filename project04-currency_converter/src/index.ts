#! /usr/bin/env node

import inquirer from "inquirer";
import CurrencyConverter from "./currency_converter.js";

const currencyConverter = new CurrencyConverter();

const questions = [
  {
    type: "input",
    name: "amount",
    message: "Enter the amount to convert:",
    validate: (input: any) =>
      !isNaN(parseFloat(input)) && parseFloat(input) > 0,
  },
  {
    type: "input",
    name: "from",
    message: "Enter the source currency code (e.g., USD):",
  },
  {
    type: "input",
    name: "to",
    message: "Enter the target currency code (e.g., EUR):",
  },
];

inquirer.prompt(questions).then(async (answers) => {
  try {
    const amount = parseFloat(answers.amount);
    const from = answers.from.toUpperCase();
    const to = answers.to.toUpperCase();

    const convertedAmount = await currencyConverter.convertCurrency(
      amount,
      from,
      to
    );

    console.log(`Converted amount: ${convertedAmount.toFixed(2)} ${to}`);
  } catch (error: any) {
    console.error("An error occurred:", error.message);
  }
});
