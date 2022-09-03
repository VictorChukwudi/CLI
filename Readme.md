# CLI-Mailer - a command line interface app

## Table of Contents

- [General info](#general-info)
- [Modules](#modules)
- [Setup](#setup)

## General info

This is a simple CLI tool that can be used to send emails directly from the interface by providing required details.

## Modules

The node modules used for this projects are

- Commander
- Inquirer
- Mongoose
- Nodemailer
- Sqlite3

with their versions shown in the package.json file.

## Setup

To run this project (i.e. locally), first, ensure you have installed mongod locally on your machine or connect to a mongodb atlas cloud storage with the URI.

- Clone the repo and install all modules with:

```
$ git clone https://github.com/VictorChukwudi/cli-mailer.git
$ npm install
$ npm run db
```

- Finally to run and test the tool enter:

```
$ cli-mailer
```

This command gives you a list of the allowed commands. You can the try out the tool.

### Note

When prompted to enter your email password when sending an email, it is required to have already generated an **application password** for this app. The **application password** is the required password when testing the cli tool and not your actual email address password.

- For gmail, click [how to generate application password for gmail](https://support.google.com/accounts/answer/185833?hl=en) and [here also](https://devanswers.co/create-application-specific-password-gmail/).
- For yahoo mail, click to learn [how to generated an application password for yahoo mail](https://support.reolink.com/hc/en-us/articles/360039239274-How-to-Generate-an-APP-Password-in-Yahoo-Email-Account) and [here also](https://www.lifewire.com/manage-app-passwords-imap-pop-yahoo-1174448).
