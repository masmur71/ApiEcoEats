const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Static Folder
app.use('/uploads', express.static('uploads'));

// Database Connection
require('./config/db');

// Routes
const buyerRoutes = require('./routes/buyerRoutes');
const sellerRoutes = require('./routes/sellerRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const cartRoutes = require('./routes/cartRoutes');

const addressRoutes = require('./routes/addressRoutes');

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// endpoints
app.use('/api/buyers', buyerRoutes);
app.use('/api/sellers', sellerRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/cart', cartRoutes);  

app.use('/api/addresses', addressRoutes);
// Root Route
app.get('/', (req, res) => {
    res.send('EcoEats server is running');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
