require('dotenv').config();
require('express-async-errors');

//express
const express = require('express');
const app = express();

//routes
const authRouter = require('./routes/authRouter');

//error handlers
const notFoundErrorMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

//other packages
const morgan = require('morgan');

//connectdb
const connectDB = require('./db/connect');

app.use(morgan('tiny'));
app.use(express.json());

//routes
app.get('/', (req, res) => {
  res.send('Hi from server');
});
app.use('/api/v1/auth', authRouter);
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
