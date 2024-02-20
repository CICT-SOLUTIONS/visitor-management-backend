const { Schema, model, models } = require("mongoose");

const adminSchema = new Schema({
  fullName: {
    type: String,
    required: [true, "You need to have a valid firstName"],
    maxlength: [30, "The first name provided is too long"],
  },

  email: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

});

const Admin = model("admin", adminSchema);

module.exports = Admin;
