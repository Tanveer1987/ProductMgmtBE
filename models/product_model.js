const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Product = mongoose.model('product', new Schema({
    code : String,
    name : String,
    price : Number
}));

module.exports = Product;