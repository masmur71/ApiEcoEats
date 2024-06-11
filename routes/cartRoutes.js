const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Route untuk menambahkan item ke keranjang belanja
router.post('/', cartController.createCartItem);

// Route untuk mendapatkan semua item di keranjang belanja berdasarkan ID pesanan
router.get('/:pesananId', cartController.getCartItemsByOrderId);

// Route untuk memperbarui item di keranjang belanja
router.put('/:id', cartController.updateCartItem);

// Route untuk menghapus item di keranjang belanja
router.delete('/:id', cartController.deleteCartItem);

module.exports = router;
