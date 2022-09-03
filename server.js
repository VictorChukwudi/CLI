import { sendMail } from "./nodemailer.js";
import sqlite3 from "sqlite3";
import chalkAnimation from "chalk-animation";
const db = new sqlite3.Database("mails.db");
let sql = `CREATE TABLE IF NOT EXISTS mails (id INTEGER PRIMARY KEY AUTOINCREMENT, service TEXT, useremail VARCHAR, userpassword TEXT, recipient VARCHAR,subject TEXT, body TEXT)`;
db.run(sql);

//Save mail function
const saveMail = async ({
  service,
  userEmail,
  userPassword,
  recipient,
  subject,
  text,
}) => {
  db.run(
    "INSERT INTO mails(service, useremail, userpassword, recipient, subject, body) VALUES(?,?,?,?,?,?)",
    [
      `${service.toLowerCase()}`,
      `${userEmail}`,
      `${userPassword}`,
      `${recipient}`,
      `${subject}`,
      `${text}`,
    ],
    (err) => {
      if (err) {
        console.info(err);
      }
    }
  );
  db.close();
};

//Resend Mail function
const resendMail = (id) => {
  db.get(`SELECT * FROM mails WHERE id=${id}`, (err, row) => {
    if (err) {
      console.info(err);
    } else {
      sendMail({
        service: row.service,
        userEmail: row.useremail,
        userPassword: row.userpassword,
        recipient: row.recipient,
        subject: row.subject,
        text: row.body,
      });
      chalkAnimation.rainbow(`sending mail .........`);
    }
  });
  db.close();
};

//Delete a specific mail function
const deleteMail = (id) => {
  db.run(`DELETE FROM mails WHERE id= ${id}`);
  console.info(`mail with id: ${id} deleted successfully`);
  db.close();
};

//Delete all mails function
const deleteAllMail = () => {
  db.all("SELECT * FROM mails", (err, rows) => {
    if (err) {
      console.info(err);
    } else {
      db.run("DELETE FROM mails");
      console.info(`${rows.length} mail(s) deleted`);
    }
  });
  db.close();
};

//List all mails function
const listMails = () => {
  db.all("SELECT * FROM mails", (err, rows) => {
    if (err) {
      console.info(err);
    } else {
      rows.forEach((row) => {
        console.info({
          id: row.id,
          sender: row.useremail,
          recipient: row.recipient,
          subject: row.subject,
          body: row.body,
        });
      });
      console.info(`${rows.length} mail(s) found`);
    }
  });
  db.close();
};
export { saveMail, resendMail, listMails, deleteMail, deleteAllMail };
