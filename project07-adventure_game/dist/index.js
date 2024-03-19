#! /usr/bin/env node
import inquirer from "inquirer";
import nanoSpinner from "nanospinner";
import chalkAnimation from "chalk-animation";
import gradientString from "gradient-string";
const enemies = ["Zombie", "Skeleton", "Warrior", "Assassin"];
let welcomeOnce = false;
let mainMenuFuncOn = true;
let menu2On = false;
let score = 0;
let enemyKills = 0;
let maxEnemyHealth = 75;
let enemyAttackDamage = 25;
let health = 100;
let attackDamage = 50;
let numHealthPots = 3;
let healthPotionHealAmount = 30;
let healthPotionDropChance = 50; // Percentage
const mainMenu = [
    {
        type: "list",
        name: "mainMenu",
        message: "Main Menu",
        choices: [
            {
                name: "Play Game",
                value: "play",
            },
            {
                name: "Exit",
                value: "exit",
            },
        ],
    },
];
const menu2 = [
    {
        type: "list",
        name: "action",
        message: "What would you like to do?",
        choices: ["Attack", "Heal", "Drop", "Inventory", "Run", "Exit"],
    },
];
// animations
let sleep = () => new Promise((r) => setTimeout(r, 1500));
async function welcome(msg1, msg2, msg3) {
    let chalk = chalkAnimation.rainbow(msg1);
    chalk.start();
    await sleep();
    chalk.stop();
    const spinner = nanoSpinner.createSpinner(msg2);
    spinner.start();
    await sleep();
    spinner.stop();
    const gradientColors = [
        "#ffb3ba",
        "#ffdfba",
        "#ffffba",
        "#baffc9",
        "#bae1ff",
    ];
    const gradient = gradientString(...gradientColors).multiline(msg3);
    console.log(gradient);
}
function finalScore() {
    console.log(`\t> Your Score: ${score}`);
    console.log(`\t> Enemy Kills: ${enemyKills}\n`);
}
async function checkPlayerHealth(health) {
    if (health <= 0) {
        console.log("\t> You have taken too much damage, you are too weak to go on!");
        console.log("\t> You have been defeated!");
        console.log("\t> You limp out of the dungeon, weak from battle.");
        mainMenuFuncOn = true;
        menu2On = false;
        await MainMenuFunc();
    }
}
async function checkEnemyHealth(enemyHealth, enemy) {
    if (enemyHealth <= 0 && health > 0) {
        enemyKills++;
        score += 5;
        console.log(`\t> ${enemy} was defeated! Hooray!`);
        console.log(`\t> You have ${health} HP left.`);
        if (Math.random() * 100 < healthPotionDropChance) {
            numHealthPots++;
            console.log(`\t> The ${enemy} dropped a health potion!`);
            console.log(`\t> You picked up the enemy's health potion. You now have ${numHealthPots} health potions.`);
        }
        console.log("\n\t> # You Win # \n");
        finalScore();
        mainMenuFuncOn = true;
        menu2On = false;
        await MainMenuFunc();
    }
}
async function Menu2(enemy, enemyHealth) {
    if (!menu2On)
        return;
    const answers = await inquirer.prompt(menu2);
    if (answers.action === "Exit") {
        finalScore();
        mainMenuFuncOn = true;
        menu2On = false;
        await MainMenuFunc();
    }
    else if (answers.action === "Attack") {
        const damageDealt = Math.floor(Math.random() * attackDamage);
        const damageTaken = Math.floor(Math.random() * enemyAttackDamage);
        console.log(`\t> You attacked the ${enemy} for ${damageDealt} damage!`);
        enemyHealth -= damageDealt;
        console.log(`\t> The ${enemy} attacked you for ${damageTaken} damage!\n`);
        health = Math.max(0, health - damageTaken);
        console.log(`\t> Your HP: ${health}.`);
        console.log(`\t> ${enemy}'s HP: ${Math.max(0, enemyHealth)}.\n`);
        await checkPlayerHealth(health);
        await checkEnemyHealth(Math.max(0, enemyHealth), enemy);
        mainMenuFuncOn = false;
        menu2On = true;
        if (enemyHealth > 0 && health > 0) {
            await Menu2(enemy, Math.max(0, enemyHealth));
        }
    }
    else if (answers.action === "Heal") {
        if (numHealthPots > 0) {
            health += healthPotionHealAmount;
            numHealthPots--;
            console.log(`\t> You drank a health potion, healing yourself for ${healthPotionHealAmount} HP!`);
            console.log(`\t> You now have ${health} HP.`);
            console.log(`\t> You have ${numHealthPots} health potions left.\n`);
        }
        else {
            console.log("\t> You don't have any health potions left! Defeat enemies for a chance to get one!");
            if (health <= 0) {
                console.log("\t> You have been defeated!");
                console.log("\t> You limp out of the dungeon, weak from battle.");
                mainMenuFuncOn = true;
                menu2On = false;
                MainMenuFunc();
            }
        }
        mainMenuFuncOn = false;
        menu2On = true;
        await Menu2(enemy, enemyHealth);
    }
    else if (answers.action === "Drop") {
        if (Math.floor(Math.random() * 100) < healthPotionDropChance &&
            numHealthPots > 0) {
            health -= healthPotionHealAmount;
            numHealthPots--;
            console.log(`\t> You dropped a health potion!`);
            console.log(`\t> You now have ${numHealthPots} health potions.`);
            console.log(`\t> You have ${health} HP.`);
        }
        else {
            console.log("\t> You can't drop any health potion right now. Try again later.");
        }
        console.log("\n");
        mainMenuFuncOn = false;
        menu2On = true;
        await Menu2(enemy, enemyHealth);
    }
    else if (answers.action === "Inventory") {
        console.log(`\t> You have ${numHealthPots} health potions.`);
        console.log(`\t> You have ${health} HP.`);
        console.log("\n");
        mainMenuFuncOn = false;
        menu2On = true;
        await Menu2(enemy, enemyHealth);
    }
    else if (answers.action === "Run") {
        console.log("\t> You have decided to leave the dungeon.");
        console.log(`\t> You ran away from the ${enemy} and lose!`);
        finalScore();
        mainMenuFuncOn = true;
        menu2On = false;
        await MainMenuFunc();
    }
    else {
        console.log("\t> Invalid action!");
        mainMenuFuncOn = false;
        menu2On = true;
        await Menu2(enemy, enemyHealth);
    }
}
async function MainMenuFunc() {
    if (!mainMenuFuncOn)
        return;
    if (welcomeOnce === false) {
        await welcome("Welcome to the Dungeon!", "Loading...", "---------------------------------");
        welcomeOnce = true;
    }
    await new Promise((resolve) => setTimeout(resolve, 4000));
    const answers = await inquirer.prompt(mainMenu);
    if (answers.mainMenu === "play") {
        const enemy = enemies[Math.floor(Math.random() * enemies.length)];
        let enemyHealth = Math.floor(Math.random() * maxEnemyHealth);
        console.log(`\t> A wild ${enemy} has appeared!`);
        console.log("\t> Your HP: " + health);
        console.log("\t> " + enemy + " HP: " + enemyHealth + "\n");
        mainMenuFuncOn = false;
        menu2On = true;
        await Menu2(enemy, enemyHealth);
    }
    else if (answers.mainMenu === "exit") {
        welcome("\n---------------------------------", "Exiting Dungeon!", "Thanks for playing! Goodbye!");
        await new Promise((resolve) => setTimeout(resolve, 4000));
        process.exit();
    }
}
// Start the game
mainMenuFuncOn = true;
menu2On = false;
MainMenuFunc();
