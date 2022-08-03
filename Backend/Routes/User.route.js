const express = require('express');
const router = express.Router();
const user_controller = require('../Controllers/User.controller');
const LoginValidation = require('../middleware/LoginValidation');
const product_controller = require('../Controllers/Product.controller');

const { loginValidation } = require("../middleware/LoginValidation");


router.post('/createuser', user_controller.addUser);

router.get('/usercount',user_controller.total_count_users);
router.get('/ordercount',user_controller.total_count_orders);

router.get('/listusers',user_controller.get_all_users);

router.get('/productdetails/:id', user_controller.productDetails);
router.get('/productdetail', user_controller.allProducts);

router.get('/innovativeproducts', user_controller.innovativeProducts);

router.get('/bakelineproducts', user_controller.bakelineProducts);

router.post('/addtocart',loginValidation,product_controller.uploadImg ,user_controller.addToCart);

router.get('/viewcart',loginValidation,user_controller.viewCartProduct);

router.post('/updateQuantity/:id', user_controller.updateProductQuantity);

router.get('/search/:key',user_controller.searchProduct);

router.post('/shipment',loginValidation,user_controller.saveShipmentDetails);

router.post('/order',loginValidation,user_controller.order_details);

router.get('/orderdetail',loginValidation,user_controller.view_orders);

router.post('/setid/:id',user_controller.orders);

router.post('/delete/:id',user_controller.delete_user);

router.get('/allriders',user_controller.view_all_riders);

router.get('/allorders',user_controller.view_all_orders)

router.post('/assignOrder/:id',user_controller.assignOrderToRider);


// router.get('/userdetails',loginValidation,user_controller.userDetails)


module.exports = router;
