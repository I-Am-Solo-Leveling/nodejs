const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A product must have a valid name'],
  },
  price: {
    type: Number,
    required: [true, 'price must be porvided'],
  },
  featured: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  company: {
    type: String,
    // enum: {
    //   value: ['ikea', 'caressa', 'liddy', 'marcos'],
    //   message: '{VALUE} not supported',
    // },
    enum: ['ikea', 'caressa', 'liddy', 'marcos'],
  },
});

module.exports = mongoose.model('Product', ProductSchema);
