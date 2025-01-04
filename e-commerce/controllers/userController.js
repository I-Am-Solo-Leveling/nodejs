const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors/');

const getAllUsers = async (req, res) => {
  console.log(req.user.userId);
  const user = await User.find({ role: 'user' }).select('-password');
  res.status(200).json({ user: user });
};

const getSingleUser = async (req, res) => {
  const { id: userId } = req.params;
  if (!userId) {
    throw new CustomError.NotFoundError('user not found');
  }
  const user = await User.findOne({ _id: userId }).select('-password');
  res.status(StatusCodes.OK).json({ user: user });
};

const showCurrentUser = async (req, res) => {
  res.status(StatusCodes.OK).json({ user: req.user });
};

const updateUser = async (req, res) => {
  res.send('update user');
};

const updateUserPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  console.log(oldPassword, newPassword);
  if (!oldPassword || !newPassword) {
    throw new CustomError.BadRequestError('Please provide valid credentials');
  }
  const user = await User.findOne({ _id: req.user.userId });

  const isCorrectPassword = await user.comparePassword(oldPassword);
  if (!isCorrectPassword) {
    throw new CustomError.UnauthenticatedError(
      'please provide valid credentials'
    );
  }
  user.password = newPassword;
  await user.save();

  res.status(StatusCodes.OK).json({ msg: 'password changed successfully' });
};

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
};
