#! /usr/bin/env node
import nanoSpinner from "nanospinner";
import gradientString from "gradient-string";
import chalkAnimation from "chalk-animation";
import Result from "./modules/result.js";
export let questions = [
    {
        id: 1,
        Question: "How Many provinces in pakistan",
        option: [
            { id: "A", option: "Two" },
            { id: "B", option: "Three" },
            { id: "C", option: "One" },
            { id: "D", option: "Four" },
        ],
        Answer: "D",
    },
    {
        id: 2,
        Question: "Who was the founder of pakistn",
        option: [
            { id: "A", option: "Muhammad Ali Jinnah" },
            { id: "B", option: "Allama Iqbal" },
            { id: "C", option: "Gandi Jee" },
            { id: "D", option: "Nehru Pandit" },
        ],
        Answer: "A",
    },
    {
        id: 3,
        Question: "Karachi is Located near a Arabian Sea ",
        option: [
            { id: "A", option: "True" },
            { id: "B", option: "False" },
        ],
        Answer: "A",
    },
    {
        id: 4,
        Question: "Who is the current prime minister of pakistan",
        option: [
            { id: "A", option: "Imran Khan" },
            { id: "B", option: "Nawaz Sharif" },
        ],
        Answer: "A",
    },
    {
        id: 5,
        Question: "Who is the current president of pakistan",
        option: [
            { id: "A", option: "Arif Alvi" },
            { id: "B", option: "Mamnoon Hussain" },
        ],
        Answer: "A",
    },
];
// animations on start
let sleep = () => new Promise((r) => setTimeout(r, 1500));
async function welcome(msg1, msg2, msg3) {
    let chalk = chalkAnimation.rainbow(msg1);
    chalk.start();
    await sleep();
    const gradientColors = [
        "#ffb3ba",
        "#ffdfba",
        "#ffffba",
        "#baffc9",
        "#bae1ff",
    ];
    const gradient = gradientString(...gradientColors).multiline(msg2);
    console.log(gradient);
    await sleep();
    const spinner = nanoSpinner.createSpinner(msg3);
    spinner.start();
    await sleep();
    spinner.stop();
}
await welcome("Quiz App", "Welcome to Quiz App CLI!", "Loading...");
// start quiz & calculate result
Result();
