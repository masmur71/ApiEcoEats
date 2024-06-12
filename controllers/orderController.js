const Order = require('../models/Order');

const orderController = {
    createOrder: (req, res) => {
        const { items, totalAmount } = req.body;
        const buyerId = 1; // Menetapkan ID pembeli sebagai 1 secara otomatis

        Order.create(buyerId, totalAmount, (err, orderId) => {
            if (err) return res.status(500).json({ error: err.message });

            items.forEach(item => {
                Order.addItem(orderId, item.productId, item.quantity, item.price, (err) => {
                    if (err) return res.status(500).json({ error: err.message });
                });
            });

            res.status(201).json({ message: 'Order created successfully', orderId });
        });
    },

    getOrderById: (req, res) => {
        const orderId = req.params.id;
        Order.findById(orderId, (err, order) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(200).json(order);
        });
    },

    getAllOrders: (req, res) => {
        Order.findAll((err, orders) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(200).json(orders);
        });
    }
};

module.exports = orderController;
