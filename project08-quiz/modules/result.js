import inquirer from "inquirer";
import { questions } from "../index.js";
export default function Result() {
    // show list of questions function
    let totalAnswers = questions.length - 1;
    let correctAnswers = 0;
    let score = 0;
    async function showList(question, questionIndex) {
        let optionsList = questions[questionIndex].option;
        let quizOptions = optionsList.map((val) => {
            return { name: val.id + ") " + val.option, value: val.id };
        });
        let input = await inquirer.prompt([
            {
                name: "quizQuestions",
                type: "list",
                message: question,
                choices: quizOptions,
            },
        ]);
        return input.quizQuestions;
    }
    // start quiz function
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
}
