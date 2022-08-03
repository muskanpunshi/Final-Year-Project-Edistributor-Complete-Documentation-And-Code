const express = require('express');
const router = express.Router();
const productController = require('../Controllers/Product.controller');

router.post('/addproduct',productController.uploadImg, productController.product_create);
router.get('/listproduct',productController.get_products);
router.get('/sum',productController.total_sum);
router.get('/productdetail/:id',productController.product_details);
router.post('/delete/:id',productController.delete_product);
router.post('/update/:id',productController.update_quantity);


module.exports = router ;