const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const notificationSchema = new Schema({
  date: Date,
  message: String,
  address: String,
});

const Notification = model("Notification", notificationSchema);
module.exports = Notification;
