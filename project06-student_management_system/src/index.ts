#! /usr/bin/env node

import inquirer from "inquirer";
import { Student, createStudent } from "./student.js";

const students: Student[] = [];

const mainMenu = () => {
  inquirer
    .prompt({
      type: "list",
      name: "menu",
      message: "Main Menu",
      choices: [
        "Add Student",
        "Enroll Student in Course",
        "View Student Balance",
        "Pay Tuition Fees",
        "Show Student Status",
        "Exit",
      ],
    })
    .then((answers) => {
      switch (answers.menu) {
        case "Add Student":
          addStudent();
          break;
        case "Enroll Student in Course":
          enrollStudent();
          break;
        case "View Student Balance":
          viewBalance();
          break;
        case "Pay Tuition Fees":
          payTuition();
          break;
        case "Show Student Status":
          showStatus();
          break;
        case "Exit":
          process.exit();
          break;
      }
    });
};

const addStudent = () => {
  inquirer
    .prompt({
      type: "input",
      name: "name",
      message: "Enter student name:",
    })
    .then((answers) => {
      const student = createStudent(answers.name);
      students.push(student);
      console.log(`Student ${answers.name} added with ID ${student.studentId}`);
      mainMenu();
    });
};

const courses = [
  { name: "Math", tuition: 500 },
  { name: "English", tuition: 400 },
  { name: "Science", tuition: 600 },
  { name: "History", tuition: 700 },
  { name: "Geography", tuition: 800 },
  // Add more courses as needed
];

const enrollStudent = () => {
  if (students.length === 0) {
    console.log("No students available to enroll.");
    mainMenu();
    return;
  }

  const studentNames = students.map((student) => ({
    name: student.name,
    value: student,
  }));

  inquirer
    .prompt([
      {
        type: "list",
        name: "student",
        message: "Select a student to enroll:",
        choices: studentNames,
      },
      {
        type: "list",
        name: "course",
        message: "Select a course:",
        choices: courses.map((course) => ({
          name: `${course.name} ($${course.tuition})`,
          value: course,
        })),
      },
    ])
    .then((answers) => {
      answers.student.enrollCourse(answers.course.name, answers.course.tuition);
      console.log(
        `${answers.course.name} enrolled for ${answers.student.name}`
      );
      mainMenu();
    });
};

const viewBalance = () => {
  if (students.length === 0) {
    console.log("No students available to view balance.");
    mainMenu();
    return;
  }

  const studentNames = students.map((student) => ({
    name: student.name,
    value: student,
  }));

  inquirer
    .prompt({
      type: "list",
      name: "student",
      message: "Select a student to view balance:",
      choices: studentNames,
    })
    .then((answers) => {
      const balance = answers.student.balance;
      console.log(`Balance for ${answers.student.name}: $${balance}`);
      mainMenu();
    });
};

const payTuition = () => {
  if (students.length === 0) {
    console.log("No students available to pay tuition fees.");
    mainMenu();
    return;
  }

  const studentNames = students.map((student) => ({
    name: student.name,
    value: student,
  }));

  inquirer
    .prompt([
      {
        type: "list",
        name: "student",
        message: "Select a student to pay tuition fees:",
        choices: studentNames,
      },
    ])
    .then((answers) => {
      const student = answers.student;
      if (student.courses.length === 0) {
        console.log(`No courses enrolled for ${student.name}`);
        mainMenu();
        return;
      }

      inquirer
        .prompt([
          {
            type: "list",
            name: "course",
            message: "Select a course to pay for:",
            choices: student.courses.map((course: any) => ({
              name: `${course.course} ($${course.tuition})`,
              value: course,
            })),
          },
        ])
        .then((answers) => {
          try {
            student.payTuition(answers.course.tuition);
            console.log(
              `Payment of $${answers.course.tuition} received for ${student.name}'s ${answers.course.course}`
            );
          } catch (error) {
            console.log(`Payment exceeds the balance for ${student.name}`);
          }
          mainMenu();
        });
    });
};

const showStatus = () => {
  if (students.length === 0) {
    console.log("No students available to show status.");
    mainMenu();
    return;
  }

  const studentNames = students.map((student) => ({
    name: student.name,
    value: student,
  }));

  inquirer
    .prompt({
      type: "list",
      name: "student",
      message: "Select a student to show status:",
      choices: studentNames,
    })
    .then((answers) => {
      const student = answers.student;
      console.log("Student Status:");
      console.log(`Name: ${student.name}`);
      console.log(`ID: ${student.studentId}`);
      console.log(`Balance: $${student.balance}`);
      console.log("Courses Enrolled:");
      student.courses.forEach((course: any) => {
        console.log(`- ${course.course} ($${course.tuition})`);
      });
      mainMenu();
    });
};

console.log("Student Management System");
mainMenu();
