require('dotenv').config();
require('express-async-errors');

//express
const express = require('express');
const app = express();

//routes
const authRouter = require('./routes/authRouter');
const userRouter = require('./routes/userRouter');
//error handlers
const notFoundErrorMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

//other packages
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
//connectdb
const connectDB = require('./db/connect');

app.use(morgan('tiny'));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET)); //signing cookies

//routes
app.get('/', (req, res) => {
  res.send('Hi from server');
});

app.get('/api/v1/', (req, res) => {
  console.log(req.signedCookies);
  res.send('Hi from server');
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);

app.use(notFoundErrorMiddleware);
app.use(errorHandlerMiddleware);

const port = 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => console.log(`server is listening on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
