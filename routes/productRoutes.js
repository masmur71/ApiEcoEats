const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const productController = require('../controllers/productController');

// Konfigurasi Multer untuk upload gambar
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Route untuk membuat produk baru
router.post('/', upload.single('gambar'), productController.createProduct);

// Route untuk mendapatkan semua produk
router.get('/', productController.getAllProducts);

// Route untuk mencari produk berdasarkan nama
router.get('/search', productController.searchProducts);

// Route untuk mendapatkan produk berdasarkan ID
router.get('/:id', productController.getProductById);

// Route untuk memperbarui data produk
router.put('/:id', upload.single('gambar'), productController.updateProduct);

// Route untuk menghapus produk
router.delete('/:id', productController.deleteProduct);

module.exports = router;
