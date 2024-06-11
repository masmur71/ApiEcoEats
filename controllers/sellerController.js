const Seller = require('../models/Seller');

const sellerController = {
    createSeller: (req, res) => {
        const data = req.body;
        Seller.create(data, (err, result) => {
            if (err) return res.status(500).send(err);
            res.status(201).send(result);
        });
    },

    getSellerById: (req, res) => {
        const id = req.params.id;
        Seller.findById(id, (err, result) => {
            if (err) return res.status(500).send(err);
            res.status(200).send(result);
        });
    },

    updateSeller: (req, res) => {
        const id = req.params.id;
        const data = req.body;
        Seller.update(id, data, (err, result) => {
            if (err) return res.status(500).send(err);
            res.status(200).send(result);
        });
    },

    deleteSeller: (req, res) => {
        const id = req.params.id;
        Seller.delete(id, (err, result) => {
            if (err) return res.status(500).send(err);
            res.status(200).send(result);
        });
    }
};

module.exports = sellerController;
