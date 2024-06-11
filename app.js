const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Multer Setup for File Uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Static Folder
app.use('/uploads', express.static('uploads'));

// Database Connection
require('./config/db');

// Routes
const buyerRoutes = require('./routes/buyerRoutes');
const sellerRoutes = require('./routes/sellerRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');

app.use('/api/buyers', buyerRoutes);
app.use('/api/sellers', sellerRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Root Route
app.get('/', (req, res) => {
    res.send('EcoEats server is running');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
