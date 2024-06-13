const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.post('/', orderController.createOrder);
router.get('/', orderController.getOrders);
router.get('/:pesananId', orderController.getOrderItems);
router.get('/pembeli', orderController.getOrdersByPembeliId);

module.exports = router;
