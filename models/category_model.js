const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Category = mongoose.model('category', new Schema({
    code : String,
    name : String
}));

module.exports = Category;