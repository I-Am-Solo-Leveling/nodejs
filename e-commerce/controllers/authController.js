const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const { createJWT } = require('../utils');

const registerUser = async (req, res) => {
  const { email, name, password } = req.body;

  const emailAlreadyExists = await User.findOne({ email });

  if (emailAlreadyExists) {
    throw new CustomError.BadRequestError('Please enter a valid value');
  }

  const isFirstAccount = (await User.countDocuments({})) === 0;

  const role = isFirstAccount ? 'admin' : 'user';

  const user = await User.create({ name, email, password, role });
  const tokenUser = { name: user.name, userId: user._id, role: user.role };
  const token = createJWT({ payload: tokenUser });

  res.status(StatusCodes.CREATED).json({ user: tokenUser, token });
};

const loginUser = async (req, res) => {
  res.send('Login user Route');
};

const logoutUser = async (req, res) => {
  res.send('Logout user Route');
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
};
