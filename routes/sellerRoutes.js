const express = require('express');
const router = express.Router();
const sellerController = require('../controllers/sellerController');

// Route untuk membuat penjual baru
router.post('/', sellerController.createSeller);

// Route untuk mendapatkan penjual berdasarkan ID
router.get('/:id', sellerController.getSellerById);

// Route untuk memperbarui data penjual
router.put('/:id', sellerController.updateSeller);

// Route untuk menghapus penjual
router.delete('/:id', sellerController.deleteSeller);

module.exports = router;
