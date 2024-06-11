const CartItem = require('../models/CartItem');

const cartController = {
    createCartItem: (req, res) => {
        const data = req.body;
        CartItem.create(data, (err, result) => {
            if (err) return res.status(500).send(err);
            res.status(201).send(result);
        });
    },

    getCartItemsByOrderId: (req, res) => {
        const pesananId = req.params.pesananId;
        CartItem.findByOrderId(pesananId, (err, result) => {
            if (err) return res.status(500).send(err);
            res.status(200).send(result);
        });
    },

    updateCartItem: (req, res) => {
        const id = req.params.id;
        const data = req.body;
        CartItem.update(id, data, (err, result) => {
            if (err) return res.status(500).send(err);
            res.status(200).send(result);
        });
    },

    deleteCartItem: (req, res) => {
        const id = req.params.id;
        CartItem.delete(id, (err, result) => {
            if (err) return res.status(500).send(err);
            res.status(200).send(result);
        });
    }
};

module.exports = cartController;
