const { Schema, model, models } = require('mongoose');

const userSchema = new Schema({
  firstName: {
    type: String,
    required: [true, 'You need to have a valid firstName'],
    maxlength: [15, 'The first name provided is too long'],
  },

  lastName: {
    type: String,
    required: [true, 'You need to have a valid firstName'],
    maxlength: [15, 'The first name provided is too long'],
  },

  email: {
    type: String,
    required: true,
  },

  mobile: {
    type: String,
    maxlength: [15, 'The mobile number provided is too long'],
  },

  signInHistory: {
    type: Array,
  },

  createdAt: {
    type: String,
  },
});

const user = model('user', userSchema);

module.exports = user;
