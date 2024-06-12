const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb)  {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

router.post('/', upload.single('gambar'), productController.createProduct);
router.post('/uploads', upload.single('gambar'), productController.uploadImage);
router.get('/:id', productController.getProductById);
router.get('/', productController.getAllProducts);
router.put('/:id', upload.single('gambar'), productController.updateProduct);
router.delete('/:id', productController.deleteProduct);
router.get('/search', productController.searchProducts);

module.exports = router;
