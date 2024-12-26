require('dotenv').config();

//express, express async-errors
require('express-async-errors');
const express = require('express');
const app = express();

//DB
const connectDB = require('./db/connect');

//products routes
const productRoute = require('./routes/productsRoute');

//Error and Not found middlewares
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

//json middleware
app.use(express.json());

//port
const port = 3000 || process.env.port;

//test route
app.get('/', (req, res) => {
  res.send('Hi');
});

//actual route
app.use('/api/v1/products', productRoute);

//error and notfound routes
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

//server fn
async function startFn() {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => console.log(`Server is listening on ${port}`));
  } catch (error) {}
}

startFn();
