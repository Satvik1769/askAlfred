const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const nameSchema = new Schema({
  name: String,
  address: String,
});

const Name = model("Name", nameSchema);
module.exports = Name;
