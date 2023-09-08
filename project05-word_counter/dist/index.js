#! /usr/bin/env node
import inquirer from "inquirer";
import WordCounter from "./word-counter.js";
const wordCounter = new WordCounter();
const questions = [
    {
        type: "input",
        name: "paragraph",
        message: "Enter an English paragraph:",
    },
];
inquirer.prompt(questions).then((answers) => {
    const paragraph = answers.paragraph;
    const wordCount = wordCounter.countWords(paragraph);
    const characterCount = wordCounter.countCharacters(paragraph);
    console.log(`Words: ${wordCount}`);
    console.log(`Characters (excluding whitespaces): ${characterCount}`);
});
