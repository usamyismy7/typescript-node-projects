#!/usr/bin/env node
import inquirer from "inquirer";
class Person {
    hobby;
    skill;
    personality;
    constructor(personality = "", hobby = "", skill = "") {
        this.personality = personality;
        this.hobby = hobby;
        this.skill = skill;
    }
}
class Student extends Person {
    reg_id;
    name;
    age;
    gender;
    course;
    department;
    constructor(name = "", personality = "", course = "", gender = "", age = 0, department = "", reg_id = 0, hobby = "", skill = "") {
        super(personality, hobby, skill);
        this.reg_id = reg_id;
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.course = course;
        this.department = department;
    }
    studentInfo() {
        return `Name: ${this.name}\nID: ${this.reg_id}\nAge: ${this.age}\nGender: ${this.gender}\nCourse: ${this.course}\nDepartment: ${this.department}\nPersonality: ${this.personality}\nHobby: ${this.hobby}\nSkill: ${this.skill}`;
    }
}
const students = [
    new Student("John Doe", "Extrovert", "Computer Science", "Male", 30, "Science", 1, "Reading", "Programming"),
    new Student("Jane Williams", "Introvert", "Software Engineer", "Female", 25, "Science", 2, "Writing", "Design"),
    new Student("James Smith", "Mysterious", "Information Technology", "Male", 20, "Science", 3, "Listening to music", "Problem solving"),
];
function mainMenu() {
    try {
        inquirer
            .prompt([
            {
                type: "list",
                name: "menu",
                message: "What would you like to do?",
                choices: ["New Student", "Existing Student", "Exit"],
            },
        ])
            .then(function (answers) {
            switch (answers.menu) {
                case "New Student":
                    newStudent();
                    break;
                case "Existing Student":
                    existingStudent();
                    break;
                case "Exit":
                    process.exit();
            }
        });
    }
    catch (error) {
        console.error(error);
    }
}
function newStudent() {
    inquirer
        .prompt([
        {
            type: "input",
            name: "reg_id",
            message: "Enter student registration ID: ",
            validate: function (value) {
                if (value) {
                    return true;
                }
                return false;
            },
        },
        {
            type: "input",
            name: "name",
            message: "Enter student name: ",
            validate: function (value) {
                if (value) {
                    return true;
                }
                return false;
            },
        },
        {
            type: "input",
            name: "age",
            message: "Enter student age: ",
            validate: function (value) {
                if (value) {
                    return true;
                }
                return false;
            },
        },
        {
            type: "list",
            name: "gender",
            message: "Select student gender: ",
            choices: ["Male", "Female"],
            validate: function (value) {
                if (value) {
                    return true;
                }
                return false;
            },
        },
        {
            type: "list",
            name: "course",
            message: "Select student course: ",
            choices: [
                "Computer Science",
                "Software Engineer",
                "Information Technology",
                "Mechanical Engineering",
                "Civil Engineering",
                "Electrical Engineering",
                "Business Studies",
                "Accounting",
                "Nursing",
                "Pharmacy",
                "Psychology",
                "Sociology",
                "Mathematics",
                "Law",
                "Political Science",
                "Economics",
                "History",
                "Geography",
            ],
            validate: function (value) {
                if (value) {
                    return true;
                }
                return false;
            },
        },
        {
            type: "list",
            name: "department",
            message: "Select student department: ",
            choices: [
                "Science",
                "Engineering",
                "Arts",
                "Business",
                "Health Science",
                "Social Science",
                "Mathematics",
                "Law",
            ],
            validate: function (value) {
                if (value) {
                    return true;
                }
                return false;
            },
        },
        {
            type: "list",
            name: "personality",
            message: "Select student personality: ",
            choices: ["Extrovert", "Introvert", "Mysterious"],
            validate: function (value) {
                if (value === "1" || value === "2" || value === "3") {
                    return true;
                }
                return false;
            },
        },
        {
            type: "list",
            name: "hobby",
            message: "Select student hobby: ",
            choices: [
                "Listening to music",
                "Reading",
                "Playing sports",
                "Watching movies",
                "Writing",
                "Drawing",
                "Traveling",
                "Cooking",
                "Photography",
                "Gardening",
                "Dancing",
            ],
            validate: function (value) {
                if (value) {
                    return true;
                }
                return false;
            },
        },
        {
            type: "list",
            name: "skill",
            message: "Select student skill: ",
            choices: [
                "Programming",
                "Design",
                "Problem solving",
                "Leadership",
                "Communication",
                "Teamwork",
                "Time management",
                "Adaptability",
                "Creativity",
                "Negotiation",
                "Critical thinking",
                "Decision making",
                "Conflict resolution",
                "Emotional intelligence",
                "Stress management",
            ],
            validate: function (value) {
                if (value) {
                    return true;
                }
                return false;
            },
        },
    ])
        .then(function (answers) {
        let student = new Student(answers.name, answers.personality, answers.course, answers.gender, answers.age, answers.department, answers.reg_id, answers.hobby, answers.skill);
        students.push(student);
        console.log("\n# Added student details: #\n" +
            student.studentInfo() +
            "\n\n# All students: #\nID: Name");
        students.map(function (student) {
            console.log(student.reg_id + ": " + student.name);
        });
        console.log("");
        mainMenu();
    });
}
function existingStudent() {
    inquirer
        .prompt([
        {
            type: "list",
            name: "student",
            message: "Select a student: ",
            choices: students.map((student) => ({
                name: student.name,
                value: student.reg_id,
            })),
        },
    ])
        .then(function (answers) {
        const selectedStudent = students.find((student) => student.reg_id === answers.student);
        if (selectedStudent) {
            console.log("\nSelected student details:\n" + selectedStudent.studentInfo() + "\n");
        }
        else {
            console.log("\nStudent not found.\n");
        }
        mainMenu();
    });
}
mainMenu();
