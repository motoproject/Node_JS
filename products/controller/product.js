const isEmpty = require("lodash.isempty");

const mongoose = require("mongoose");
const ProductModel = require("../models/product");

const fileMethods = require("../../filesSystems/filesEvents");

// GET - all products
exports.GET_ALL_PRODUCTS = (req, res)=>{

    // Using imported model instance
    ProductModel.find({},{_id:0,__v:0}). 
    then(results => {
        res.status(200).json({
            message: "Details fetched successfully",
            status: 200,
            result: results
        })
    })
    .catch(err =>{
        res.status(444).json({
            message: "Error occured",
            error: err.message
        })
    });

}

// GET - GET required product
exports.GET_SPECIFIC_PRODUCT =  (req, res)=>{

    ProductModel.findById(req.params.id)
    .then(result=>{
        res.status(200).json({
            message:"Details fetched successfully",
            status:200,
            results: result
        })
    })
    .catch(err=>{
        res.status(403).json({
            message:err.message
        })
    })
}

// POST - add products
exports.POST_ADD_PRODUCT =  (req, res)=>{

    if(isEmpty(req.body)){
        res.status(500).json({ message:'-------Request--body--NULL--Error----'});
    }else{
        const productModel = new ProductModel({ // created instance of model
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            type: req.body.type,
            price: req.body.price
        });
        
        productModel.save()
        .then(result => { // allows to handle result after db operatons 
            res.status(200).json({
                message: "New product saved successfully",
                status:200,
                savedProduct: result
            })
        })
        .catch(error => {
            res.status(403).json({
                error: error.message
            });
        });

    }


}

// DELETE - delete a product
exports.DELETE_REMOVE_PRODUCT = (req, res)=>{
    ProductModel.findByIdAndRemove(req.params.id)
    .then(result=>{
        res.status(200).json({
            message:"Document deleted successfully!",
            status:200,
        });
    })
    .catch(err=>{
        res.status(403).json({ message: err.message });
    });
}

// PUT - update product
exports.PUT_UPDATE_PRODUCT = (req, res)=>{

    ProductModel.findByIdAndUpdate(req.params.id, req.body)
    .then(result=>{
        res.status(200).json({
            message:"Document updated successfully!",
            status:200,
        });
    })
    .catch(err=>{
        res.status(403).json({ message: err.message });
    });
}

// Files
exports.READ_BILL_FILE = (req,res)=>{
    let fileRes = fileMethods.READ_WRITE_FILE("read");
    console.log("\n=----fileRes----"+fileRes);
    res.send(fileRes);
}