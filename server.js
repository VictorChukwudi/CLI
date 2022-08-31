import mongoose from "mongoose";
import { sendMail } from "./nodemailer.js";
import Mail from "./schema.js";

mongoose.Promise = global.Promise;

//Pass your mongodb uri conncection string either locally or from mongodb atlas
mongoose.connect("mongodb://localhost:27017/projects", {
  useNewUrlParser: true,
});

const saveMail = ({
  service,
  userEmail,
  userPassword,
  recipient,
  subject,
  text,
}) => {
  const mailService = service.toLowerCase();
  new Mail({
    service: mailService,
    userEmail,
    userPassword,
    from: userEmail,
    to: recipient,
    subject,
    text,
  }).save();
  mongoose.disconnect();
};

const resendMail = async (_id) => {
  const email = await Mail.findById(_id);
  sendMail({
    service: email.service,
    userEmail: email.userEmail,
    userPassword: email.userPassword,
    recipient: email.to,
    subject: email.subject,
    text: email.text,
  });
  mongoose.disconnect();
};
const deleteMail = async (_id) => {
  await Mail.findByIdAndDelete(_id);
  console.info(`Mail deleted`);
  mongoose.disconnect();
};
const deleteAllMail = async () => {
  const allMail = await Mail.deleteMany();
  console.info(`${allMail.deletedCount} mails deleted`);
  mongoose.disconnect();
};
const listMails = async () => {
  const emails = await Mail.find().select([
    "-__v",
    "-userEmail",
    "-userPassword",
    "-service",
  ]);
  console.info(`${emails}
${emails.length} mail(s) found`);
  mongoose.disconnect();
};
export { saveMail, resendMail, listMails, deleteMail, deleteAllMail };
