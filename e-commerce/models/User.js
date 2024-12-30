const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

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

UserSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model('User', UserSchema);
