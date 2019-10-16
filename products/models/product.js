// Define product in my app / look of product

const mongoose = require("mongoose");

const productSchema = mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
    name:String,
    type:String,
    price:Number

});

module.exports = mongoose.model('allproducts', productSchema);