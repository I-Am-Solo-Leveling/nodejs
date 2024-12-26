require('dotenv').config();

const connectDB = require('./db/connect');
const Product = require('./models/product');

const jsonProducts = require('./products.json');

async function startFn() {
  try {
    await connectDB(process.env.MONGO_URL);
    await Product.deleteMany();
    await Product.create(jsonProducts);
    console.log('Data added');
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

startFn();
