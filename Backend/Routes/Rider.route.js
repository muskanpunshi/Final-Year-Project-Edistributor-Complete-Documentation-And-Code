const express = require('express');
const router = express.Router();
const rider_controller= require('../Controllers/Rider/Rider.controller');
const { loginValidation } = require("../middleware/LoginValidation");

router.post('/createrider',rider_controller.addRider);
router.post('/login',rider_controller.riderLogin);
router.get('/ridercount',rider_controller.total_count_riders);
router.get('/riderlist',rider_controller.get_all_riders);
router.post('/delete/:id',rider_controller.delete_rider);
router.get('/myorders',loginValidation,rider_controller.myOrders);
router.post('/markasdelivered/:id',rider_controller.markAsDelivered);
router.get('/confirmedorderdetail',rider_controller.confirmedOrderDetails);
router.get('/deliveredorders',rider_controller.deliveredOrder);
router.get('/userdetailsbyid/:id',rider_controller.userDetails);

module.exports = router ;
