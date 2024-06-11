const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Route untuk membuat pesanan baru
router.post('/', orderController.createOrder);

// Route untuk mendapatkan semua pesanan
router.get('/', orderController.getAllOrders);

// Route untuk mendapatkan pesanan berdasarkan ID
router.get('/:id', orderController.getOrderById);

// Route untuk mendapatkan pesanan berdasarkan ID penjual
router.get('/seller/:penjualId', orderController.getOrdersBySellerId);

// Route untuk memperbarui data pesanan
router.put('/:id', orderController.updateOrder);

// Route untuk menghapus pesanan
router.delete('/:id', orderController.deleteOrder);

module.exports = router;
