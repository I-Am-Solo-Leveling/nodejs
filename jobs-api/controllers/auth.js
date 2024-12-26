const registerUser = async (req, res) => {
  res.send('Register user route')
}

const loginUser = async (req, res) => {
  res.send('Login User Route')
}

module.exports = {
  registerUser,
  loginUser,
}
