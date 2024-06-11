const express = require('express');
const router = express.Router();
const buyerController = require('../controllers/buyerController');

// Route untuk membuat pembeli baru
router.post('/', buyerController.createBuyer);

// Route untuk mendapatkan pembeli berdasarkan ID
router.get('/:id', buyerController.getBuyerById);

// Route untuk memperbarui data pembeli
router.put('/:id', buyerController.updateBuyer);

// Route untuk menghapus pembeli
router.delete('/:id', buyerController.deleteBuyer);

module.exports = router;
