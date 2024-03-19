import inquirer from "inquirer";

const students = [
  {
    reg_id: 1,
    name: "John Doe",
    gender: "Male",
    age: 30,
    course: "Computer Science",
    department: "Science",
    personality: "Extrovert",
    hobby: "Reading",
    skill: "Programming",
  },
  {
    reg_id: 2,
    name: "Jane Williams",
    gender: "Female",
    age: 25,
    course: "Software Engineer",
    department: "Science",
    personality: "Introvert",
    hobby: "Writing",
    skill: "Design",
  },
  {
    reg_id: 3,
    name: "James Smith",
    gender: "Male",
    age: 20,
    course: "Information Technology",
    department: "Science",
    personality: "Mysterious",
    hobby: "Listening to music",
    skill: "Problem solving",
  },
];

class Person {
  hobby: string;
  skill: string;
  personality: string;

  constructor(
    personality: string = "",
    hobby: string = "",
    skill: string = ""
  ) {
    this.personality = personality;
    this.hobby = hobby;
    this.skill = skill;
  }
}

class Student extends Person {
  reg_id: number;
  name: string;
  age: number;
  gender: string;
  course: string;
  department: string;

  constructor(
    name: string = "",
    personality: string = "",
    course: string = "",
    gender: string = "",
    age: number = 0,
    department: string = "",
    reg_id: number = 0,
    hobby: string = "",
    skill: string = ""
  ) {
    super(personality);
    super(hobby);
    super(skill);
    this.reg_id = reg_id;
    this.name = name;
    this.age = age;
    this.gender = gender;
    this.course = course;
    this.department = department;
  }

  studentInfo(): string {
    return `Name: ${this.name},
        ID: ${this.reg_id},
        Age: ${this.age},
        Gender: ${this.gender},
        Course: ${this.course},
        Department: ${this.department},
        Personality: ${this.personality},
        Hobby: ${this.hobby},
        Skill: ${this.skill}`;
  }
}

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
  } catch (error) {
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
        message: "Enter student gender: ",
        choices: ["Male", "Female"],
        validate: function (value) {
          if (value) {
            return true;
          }
          return false;
        },
      },
      {
        type: "input",
        name: "course",
        message: "Enter student course: ",
        validate: function (value) {
          if (value) {
            return true;
          }
          return false;
        },
      },
      {
        type: "input",
        name: "department",
        message: "Enter student department: ",
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
        message:
          "What is your personality? Type 1 if you like to talk to others and Type 2 if you would rather keep to yourself.",
        choices: ["Extrovert", "Introvert", "Mysterious"],
        validate: function (value) {
          if (value === "1" || value === "2" || value === "3") {
            return true;
          }
          return false;
        },
      },
      {
        type: "input",
        name: "hobby",
        message: "Enter student hobby: ",
        validate: function (value) {
          if (value) {
            return true;
          }
          return false;
        },
      },
      {
        type: "input",
        name: "skill",
        message: "Enter student skill: ",
        validate: function (value) {
          if (value) {
            return true;
          }
          return false;
        },
      },
    ])
    .then(function (answers) {
      let student = new Student();
      console.log(student.studentInfo());
      mainMenu();
    });
}

function existingStudent() {
  // ... your code for handling existing students ...
  // After handling the existing student, call studentInfo and then mainMenu
  let student = students.find(/* ... */);
  if (student) {
    console.log(student.studentInfo());
  }
  mainMenu();
}

mainMenu();
