const express = require('express');
const Product = require('../models/product_model');
const router = express.Router();

router.post('/', function(req, res, next) {
    console.log('Post Request ' , req.body);

    Product.create(req.body).then(function(product) {
        console.log('Saved Product ', product);
        res.status(200).send(product);
    });

});


router.get('/', function(req, res, next) {
    console.log('Get Request');

    Product.find({}).then(function(products) {
        console.log('Products List ', products);
        res.status(200).send(products);
    })
});


router.delete('/:id', function(req, res, next) {
    console.log('Delete Request ' + req.params.id);

    Product.findByIdAndRemove({_id : req.params.id }).then(function(product) {
        console.log('Deleted Product ', product);
        res.status(200).send(product);
    })
});



router.get('/:id', function(req, res, next) {
    console.log('Get Request ' + req.params.id);

    Product.findById({_id : req.params.id }).then(function(product) {
        console.log('Product ', product);
       
        if(!product) {
            console.log('Product is not present in the DB');
            const error = new Error('Missing Product')
            error.httpStatusCode = 404;
            return next(error);
        }
        
        res.status(200).send(product);
    })
});

router.put('/:id', function(req, res, next) {
    console.log('Update Request ' + req.params.id, req.body);

    Product.findByIdAndUpdate({_id : req.params.id }, req.body).then(function() {
        Product.findOne({_id : req.params.id }).then(function(product) {
            console.log('Updated Product ', product);
            res.status(200).send(product);
        }); 
    })
});

router.get('/search', function(req, res, next) {
    console.log('Get Request ', req.query.name);
    console.log(new RegExp('^'+req.query.name+'$', "i"));
    Product.find({name: new RegExp(req.query.name, "i")}, function(err, products) {
        console.log('Products List...');
        if(err) {
            res.status(200).send(err);    
        }
        
        console.log('Products List ', products);
        res.status(200).send(products);
    });

});

module.exports = router;