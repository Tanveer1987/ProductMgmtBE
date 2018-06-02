const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const productRouter = require('./routers/product_routes');
const app = express();

// Mongo DB Connection
mongoose.connect('mongodb://localhost:27017/testdb');

mongoose.connection.once('open', function() {
    console.log('Database connection is successfully established');
});

mongoose.connection.on('error', function(error) {
    console.log('Database Connection Error' + error);
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

app.use(function(request, response, next) {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Credentials', true);
    response.header('Access-Control-Allow-Headers', '*');
    response.header('Access-Control-Allow-Methods', '*');
    
    
    next();
});

// Router Configurations
app.use('/api/products', productRouter);

app.listen(3000, function() {
    console.log('Server started at http://localhost:3000/');
});