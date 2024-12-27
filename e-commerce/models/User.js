const mongoose = require('mongoose');
const validator = require('validator');
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter a valid name'],
    minlength: 3,
    maxlength: 27,
  },
  email: {
    type: String,
    required: [true, 'Please enter a valid email'],
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: 'Please enter a valid email',
    },
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 5,
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
});

module.exports = mongoose.model('User', UserSchema);
