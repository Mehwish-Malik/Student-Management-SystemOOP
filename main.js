#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
class Student {
    static counter = 10000;
    name;
    id;
    courses;
    balance;
    constructor(name) {
        this.id = Student.counter++;
        this.name = name;
        this.courses = [];
        this.balance = 100;
    }
    // Method to Enroll a student in Course
    enroll_Course(course) {
        this.courses.push(course);
    }
    // Method to view a student balance
    view_Balance() {
        console.log(chalk.yellowBright(`Balance for ${this.name} : $ ${this.balance}`));
    }
    // Method to Pay student Tuition Fee
    pay_Tuition_Fee(amount) {
        this.balance -= amount;
        console.log(chalk.yellowBright(`$ ${amount}Fee Paid Successfully for ${this.name}!!`));
        console.log(chalk.yellowBright(`Remaining Balance:$${this.balance} `));
    }
    show_Status() {
        console.log(chalk.yellowBright(`ID: ${this.id}`));
        console.log(chalk.yellowBright(`Name: ${this.name}`));
        console.log(chalk.yellowBright(`Course: ${this.courses}`));
        console.log(chalk.yellowBright(`Balance: ${this.balance}`));
    }
}
class Student_Manager {
    students;
    constructor() {
        this.students = [];
    }
    add_Student(name) {
        let student = new Student(name);
        this.students.push(student);
        console.log(chalk.bold.bgBlueBright(` Students: ${name} Added Successfully. student ID: ${student.id}`));
        console.log("-".repeat(60));
    }
    // Method to Enroll students in Course
    enroll_Student(student_id, course) {
        let stuDent = this.find_Student(student_id);
        if (stuDent) {
            stuDent.enroll_Course(course);
            console.log(chalk.bold.yellow(`${stuDent.name} Enrolled in ${course} Successfully!!`));
        }
    }
    // Method to view Student Balance
    view_Student_Balance(student_id) {
        let stuDent = this.find_Student(student_id);
        if (stuDent) {
            stuDent.view_Balance();
        }
        else {
            console.log(chalk.red("Student not Found Please Enter a Correct Student ID"));
        }
    }
    pay_Student_Fee(student_id, amount) {
        let stuDent = this.find_Student(student_id);
        if (stuDent) {
            stuDent.pay_Tuition_Fee(amount);
        }
        else {
            console.log(chalk.red("Student not Found Please Enter a Correct Student ID"));
        }
    }
    // Method to Show student status
    Show_Student_Status(student_id) {
        let stuDent = this.find_Student(student_id);
        if (stuDent) {
            stuDent.show_Status();
        }
    }
    //  Method to find a Student By Student ID
    find_Student(student_id) {
        return this.students.find(std => std.id === student_id);
    }
}
// Main Function to Run Program
async function main() {
    console.log(chalk.yellow("*********** WELCOME TO STUDENT MANAGEMENT SYSTEM **********"));
    console.log("-".repeat(60));
    let std_manager = new Student_Manager();
    while (true) {
        let choice = await inquirer.prompt([{
                name: "choice",
                type: "list",
                message: "Select an Option",
                choices: ["Add student", "Enroll Student", "View Student Balance", "Pay Fees", "Show Status", "Exit"]
            }
        ]);
        switch (choice.choice) {
            case "Add student":
                let name_Input = await inquirer.prompt([
                    {
                        name: "name",
                        type: "input",
                        message: "Enter Student Name"
                    }
                ]);
                std_manager.add_Student(name_Input.name);
                break;
            case "Enroll Student":
                let course_Input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter Student ID"
                    },
                    {
                        name: "course",
                        type: "input",
                        message: "Enter Course Name"
                    }
                ]);
                std_manager.enroll_Student(course_Input.student_id, course_Input.course);
                break;
            case "View Student Balance":
                let balance_Input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter Student ID"
                    }
                ]);
                std_manager.view_Student_Balance(balance_Input.student_id);
                break;
            case "Pay Fees":
                let payFee_Input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter Student ID"
                    },
                    {
                        name: "amount",
                        type: "number",
                        message: "Enter a Amount to Pay"
                    }
                ]);
                std_manager.pay_Student_Fee(payFee_Input.student_id, payFee_Input.amount);
                break;
            case "Show Status":
                let status_Input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter Student ID"
                    }
                ]);
                std_manager.Show_Student_Status(status_Input.student_id);
                break;
            case "Exit":
                console.log("Exiting...");
                process.exit();
        }
    }
}
// calling a main Function
main();
