const express = require('express');
const router = express.Router();

const authCheck = require('../middleware/auth');
const ProductController = require('../controller/product');

// POST - add product
router.post('/addProduct', authCheck, ProductController.POST_ADD_PRODUCT);

// GET - all product details
router.get('/allProducts', ProductController.GET_ALL_PRODUCTS);
 
// GET - specific product details
router.get('/specificProduct/:id', authCheck, ProductController.GET_SPECIFIC_PRODUCT);

// PUT - update product 
router.put('/updateProduct/:id', authCheck, ProductController.PUT_UPDATE_PRODUCT);

// DELETE - delete product
router.delete('/deleteProduct/:id', authCheck, ProductController.DELETE_REMOVE_PRODUCT);

// Files of Product
router.get('/getBill', ProductController.READ_BILL_FILE);

// Load more paging 
router.get('/paging/:id', ProductController.LOAD_MORE_PRODUCTS);

module.exports = router; 