const User = require('../models/User');

const { isTokenValid } = require('../utils');
const CustomError = require('../errors');

const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token; //.token name of cookie

  if (!token) {
    throw new CustomError.UnauthenticatedError('Authentication is Invalid');
  }

  try {
    const payload = isTokenValid({ token: token });
    req.user = {
      name: payload.name,
      userId: payload.userId,
      role: payload.role,
    };
    next();
  } catch (error) {
    throw new CustomError.UnauthenticatedError('Authentication is Invalid');
  }
};

const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new CustomError.UnAuthorizedError('invalid access');
    }
    next();
  };
};

module.exports = { authenticateUser, authorizePermissions };
