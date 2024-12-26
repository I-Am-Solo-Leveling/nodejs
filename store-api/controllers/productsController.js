const Product = require('../models/product');

const getAllProductsStatic = async (req, res) => {
  const search = req.query.name;
  console.log(search);
  const products = await Product.find({
    name: {
      $regex: search,
      $options: 'i',
    },
  }).limit(10);
  res.status(200).json({ products: products, productsFound: products.length });
};

const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, fields, numericFilters } = req.query;
  const queryObject = {};
  if (featured) {
    queryObject.featured = featured === 'true' ? true : false;
  }

  if (company) {
    queryObject.company = company;
  }

  if (name) {
    queryObject.name = { $regex: name, $options: 'i' };
  }

  if (numericFilters) {
    //operator map to convert userfriendly ones to mongoose ones
    const operatorMap = {
      '>': '$gt',
      '>=': '$gte',
      '=': '$eq',
      '<': '$lt',
      '<=': '$lte',
    };
    const regEx = /\b(>|<|=|>=|<=)\b/g;
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );
    const options = ['price', 'rating'];

    filters = filters.split(',').forEach((item) => {
      const [field, operator, value] = item.split('-');
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
    });
  }

  let result = Product.find(queryObject);

  if (sort) {
    const sortedItems = sort.split(',').join(' ');
    result = result.sort(sortedItems);
  } else {
    result = result.sort('createdAT');
  }

  if (fields) {
    const selectedFields = fields.split(',').join(' ');
    result = result.select(selectedFields);
  }

  //pagination and limit

  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 1;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const products = await result;
  res
    .status(200)
    .json({ products: products, numberOfProducts: products.length });
};

module.exports = {
  getAllProductsStatic,
  getAllProducts,
};
