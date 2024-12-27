const registerUser = async (req, res) => {
  res.send('Register user Route');
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
