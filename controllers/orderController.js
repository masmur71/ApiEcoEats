const Order = require('../models/Order');

const orderController = {
    createOrder: (req, res) => {
        const data = req.body;
        Order.create(data, (err, result) => {
            if (err) return res.status(500).send(err);
            res.status(201).send(result);
        });
    },

    getOrderById: (req, res) => {
        const id = req.params.id;
        Order.findById(id, (err, result) => {
            if (err) return res.status(500).send(err);
            res.status(200).send(result);
        });
    },

    updateOrder: (req, res) => {
        const id = req.params.id;
        const data = req.body;
        Order.update(id, data, (err, result) => {
            if (err) return res.status(500).send(err);
            res.status(200).send(result);
        });
    },

    deleteOrder: (req, res) => {
        const id = req.params.id;
        Order.delete(id, (err, result) => {
            if (err) return res.status(500).send(err);
            res.status(200).send(result);
        });
    }
};

module.exports = orderController;
