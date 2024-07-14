#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";

class Student {
    static counter = 10000;
    id: number;
    name: string;
    courses: string[];
    balance: number;

    constructor(name: string) {
        this.id = Student.counter++;
        this.name = name;
        this.courses = [];
        this.balance = 100;
    }

    enroll_course(course: string) {
        this.courses.push(course);
    }

    view_balance() {
        console.log(chalk.magenta(`Balance for ${this.name}: $${this.balance}`));
        console.log(chalk.yellow('-'.repeat(50)));
    }

    pay_fees(amount: number) {
        this.balance -= amount;
        console.log(chalk.green(`$${amount} fees paid successfully for ${this.name}`));
        console.log(chalk.magenta(`Remaining Balance : $${this.balance}`));
        console.log(chalk.yellow('-'.repeat(50)));
    }

    show_status() {
        console.log(chalk.blue(`ID: ${this.id}`));
        console.log(chalk.blue(`Name: ${this.name}`));
        console.log(chalk.blue(`Courses: ${this.courses.join(", ")}`));
        console.log(chalk.blue(`Balance: $${this.balance}`));
        console.log(chalk.yellow('-'.repeat(50)));
    }
}

class Student_manager {
    students: Student[];

    constructor() {
        this.students = [];
    }

    add_student(name: string): Student {
        let newStudent = new Student(name);
        this.students.push(newStudent);
        return newStudent;
    }

    enroll_student(student_id: number, course: string) {
        let student = this.students.find(s => s.id === student_id);
        if (student) {
            student.enroll_course(course);
            console.log(chalk.cyan(`Course ${course} enrolled successfully for ${student.name}.`));
        } else {
            console.log(chalk.red(`Student with ID ${student_id} not found.`));
        }
        console.log(chalk.yellow('-'.repeat(50)));
    }

    view_student_balance(student_id: number) {
        let student = this.students.find(s => s.id === student_id);
        if (student) {
            student.view_balance();
        } else {
            console.log(chalk.red(`Student with ID ${student_id} not found.`));
        }
    }

    pay_student_fees(student_id: number, amount: number) {
        let student = this.students.find(s => s.id === student_id);
        if (student) {
            student.pay_fees(amount);
        } else {
            console.log(chalk.red(`Student with ID ${student_id} not found.`));
        }
    }

    show_student(student_id: number) {
        let student = this.students.find(s => s.id === student_id);
        if (student) {
            student.show_status();
        } else {
            console.log(chalk.red(`Student with ID ${student_id} not found.`));
        }
    }
}

async function main() {
    console.log(chalk.yellow("Welcome to 'CodeWithEman' - Student Management System"));
    console.log(chalk.yellow("-".repeat(50)));

    let student_manager = new Student_manager();

    while (true) {
        let { choice } = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                message: chalk.yellow("Select an option"),
                choices: [
                    { name: "Add Student", value: "add_student" },
                    { name: "Enroll Student", value: "enroll_student" },
                    { name: "View Student Balance", value: "view_balance" },
                    { name: "Pay Fees", value: "pay_fees" },
                    { name: "Show Status", value: "show_status" },
                    { name: "Exit", value: "exit" },
                ]
            }
        ]);

        switch (choice) {
            case "add_student":
                let { name } = await inquirer.prompt({
                    name: "name",
                    type: "input",
                    message: chalk.cyan("Enter student name:")
                });
                let newStudent = student_manager.add_student(name);
                console.log(chalk.green(`Student ${name} added successfully with student ID: ${newStudent.id}.`));
                console.log(chalk.yellow('-'.repeat(50)));
                break;

            case "enroll_student":
                let course_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: chalk.cyan("Enter student ID:")
                    },
                    {
                        name: "course",
                        type: "input",
                        message: chalk.cyan("Enter course name:")
                    }
                ]);
                student_manager.enroll_student(course_input.student_id, course_input.course);
                break;

            case "view_balance":
                let balance_input = await inquirer.prompt({
                    name: "student_id",
                    type: "number",
                    message: chalk.cyan("Enter student ID:")
                });
                student_manager.view_student_balance(balance_input.student_id);
                break;

            case "pay_fees":
                let fees_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: chalk.cyan("Enter student ID")
                    },
                    {
                        name: "amount",
                        type: "number",
                        message: chalk.cyan("Enter the amount to pay")
                    }
                ]);
                student_manager.pay_student_fees(fees_input.student_id, fees_input.amount);
                break;

            case "show_status":
                let status_input = await inquirer.prompt({
                    name: "student_id",
                    type: "number",
                    message: chalk.cyan("Enter student ID")
                });
                student_manager.show_student(status_input.student_id);
                break;

            case "exit":
                console.log(chalk.red("Exiting..."));
                process.exit();
        }
    }
}

main();

