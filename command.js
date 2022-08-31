#!/usr/bin/env node
import { Command } from "commander";
import inquirer from "inquirer";
import { sendMail } from "./nodemailer.js";
import {
  saveMail,
  resendMail,
  listMails,
  deleteMail,
  deleteAllMail,
} from "./server.js";
const program = new Command();
const questions1 = [
  {
    type: "input",
    name: "service",
    message: "Mail Service used. Gmail or Yahoo only?",
  },
  {
    type: "input",
    name: "userEmail",
    message: "Sender's Email Address?",
  },
  {
    type: "password",
    name: "userPassword",
    message: "Sender's Email App Password?",
    mask: "*",
  },
  {
    type: "input",
    name: "recipient",
    message: "Recipient's Email Address?",
  },
  {
    type: "input",
    name: "subject",
    message: "Email Subject?",
  },
  {
    type: "input",
    name: "text",
    message: "Mail body?",
  },
];

const questions2 = [
  {
    type: "input",
    name: "_id",
    message: "Message _id from database?",
  },
];
program
  .name("cli-mailer")
  .description("A simple CLI tool used to send emails.")
  .usage("<command>")
  .version("0.1.0");

program
  .command("send")
  .description("Sends an email")
  .alias("snd")
  .action(() => {
    inquirer.prompt(questions1).then((answers) => {
      saveMail(answers);
      sendMail(answers);
    });
  });

program
  .command("list")
  .description("lists all emails")
  .alias("lst")
  .action(() => {
    listMails();
  });
program
  .command("resend")
  .description("resends an email")
  .alias("rnd")
  .action(() => {
    inquirer.prompt(questions2).then((answers) => resendMail(answers._id));
  });
program
  .command("delete")
  .description("deletes an email")
  .alias("del")
  .action((_id) => {
    inquirer.prompt(questions2).then((answers) => deleteMail(answers._id));
  });

program
  .command("delete-all")
  .description("deletes all emails saved to the database")
  .alias("del-A")
  .action(() => {
    deleteAllMail();
  });
program.parse(process.argv);
