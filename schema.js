import mongoose from "mongoose";
const schema = mongoose.Schema;

const mailSchema = new schema({
  service: {
    type: String,
  },
  userEmail: {
    type: String,
  },
  userPassword: {
    type: String,
  },
  from: {
    type: String,
  },
  to: {
    type: String,
  },
  subject: {
    type: String,
  },
  text: {
    type: String,
  },
  deliveryReport: {
    type: String,
    enum: ["sent", "failed"],
  },
});

const mail = mongoose.model("Mail", mailSchema);
export default mail;
