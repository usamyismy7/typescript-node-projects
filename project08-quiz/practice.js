import nanoSpinner from "nanospinner";
import inquirer from "inquirer";
import gradientString from "gradient-string";
import chalkAnimation from "chalk-animation";
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
];
// animations on start
let sleep = () => new Promise((r) => setTimeout(r, 2000));
async function welcome(msg1, msg2, msg3) {
    const chalk = chalkAnimation.rainbow(msg1);
    chalk.start();
    await sleep;
    chalk.stop();
    const gradientColors = [
        "#FF0000",
        "#FF7F00",
        "#FFFF00",
        "#00FF00",
        "#0000FF",
        "#4B0082",
        "#8F00FF",
    ];
    const gradient = gradientString(...gradientColors).multiline(msg2);
    console.log(gradient);
    await sleep;
    const spinner = nanoSpinner.createSpinner(msg3);
    spinner.start();
    await sleep;
    spinner.stop();
}
await welcome("Quiz App", "Welcome to Quiz App", "Loading Questions");
// start quiz
let correctAnswers = 0;
let totalAnswers = questions.length;
let score = 0;
async function startQuiz() {
    for (let i = 0; i < questions.length; i++) {
        let reply = await showList(questions[i].Question, i);
        correctAnswers += reply === questions[i].Answer ? 1 : 0;
    }
    score = correctAnswers * 20;
    console.log(`Total Question: ${totalAnswers + 1}`);
    console.log(`Total Correct Answer: ${correctAnswers}`);
    console.log(`Your Score: ${score} out of 100`);
}
startQuiz();
// show list
async function showList(question, index) {
    let optionsList = questions[index].option;
    let quizOptions = optionsList.map((item) => {
        return {
            name: item.id + ") " + item.option,
            value: item.id,
        };
    });
    let input = await inquirer.prompt([
        {
            type: "list",
            name: "quizQuestions",
            message: question,
            choices: quizOptions,
        },
    ]);
    return input.quizOptions;
}
