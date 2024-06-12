const db = require('../config/db');

const Order = {
    create: (buyerId, totalAmount, callback) => {
        const query = 'INSERT INTO orders (buyerId, totalAmount) VALUES (?, ?)';
        db.query(query, [buyerId, totalAmount], (err, result) => {
            if (err) return callback(err);
            callback(null, result.insertId);
        });
    },
    
    addItem: (orderId, productId, quantity, price, callback) => {
        const query = 'INSERT INTO order_items (orderId, productId, quantity, price) VALUES (?, ?, ?, ?)';
        db.query(query, [orderId, productId, quantity, price], callback);
    },

    findById: (id, callback) => {
        const query = 'SELECT * FROM orders WHERE id = ?';
        db.query(query, [id], (err, result) => {
            if (err) return callback(err);

            if (result.length === 0) return callback(new Error('Order not found'));

            const order = result[0];
            Order.findItemsByOrderId(order.id, (err, items) => {
                if (err) return callback(err);
                order.items = items;
                callback(null, order);
            });
        });
    },

    findItemsByOrderId: (orderId, callback) => {
        const query = 'SELECT * FROM order_items WHERE orderId = ?';
        db.query(query, [orderId], callback);
    },

    findAll: (callback) => {
        const query = 'SELECT * FROM orders';
        db.query(query, (err, orders) => {
            if (err) return callback(err);

            const ordersWithItems = [];
            let processedOrders = 0;

            orders.forEach(order => {
                Order.findItemsByOrderId(order.id, (err, items) => {
                    if (err) return callback(err);

                    order.items = items;
                    ordersWithItems.push(order);
                    processedOrders++;

                    if (processedOrders === orders.length) {
                        callback(null, ordersWithItems);
                    }
                });
            });

            if (orders.length === 0) {
                callback(null, ordersWithItems);
            }
        });
    }
};

module.exports = Order;
