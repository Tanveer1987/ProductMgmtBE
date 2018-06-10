const express = require('express');
const Category = require('../models/category_model');
const router = express.Router();

router.get('/', function(req, res, next) {
    console.log('Get Request');

    Category.find({}).then(function(categories) {
        console.log('category List ', categories);
        res.status(200).send(categories);
    })
});
 

router.post('/', function(req, res, next) {
    console.log('Post Request ' , req.body);

    Category.create(req.body).then(function(category) {
        console.log('Saved category ', category);
        res.status(200).send(category);
    });

});

router.put('/:id', function(req, res, next) {
    console.log('Update Request ' + req.params.id, req.body);

    Category.findByIdAndUpdate({_id : req.params.id }, req.body, {new: true}).then(function(category) {
            console.log('Updated category ', category);
            res.status(200).send(category);
    })
});



router.delete('/:id', function(req, res, next) {
    console.log('Delete Request ' + req.params.id);

    Category.findByIdAndRemove({_id : req.params.id }).then(function(category) {
        console.log('Deleted category ', category);
        res.status(200).send(category);
    })
});


module.exports = router;