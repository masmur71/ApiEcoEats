const Buyer = require('../models/Buyer');

const buyerController = {
    createBuyer: (req, res) => {
        const data = req.body;
        Buyer.create(data, (err, result) => {
            if (err) return res.status(500).send(err);
            res.status(201).send(result);
        });
    },

    getBuyerById: (req, res) => {
        const id = req.params.id;
        Buyer.findById(id, (err, result) => {
            if (err) return res.status(500).send(err);
            res.status(200).send(result);
        });
    },

    updateBuyer: (req, res) => {
        const id = req.params.id;
        const data = req.body;
        Buyer.update(id, data, (err, result) => {
            if (err) return res.status(500).send(err);
            res.status(200).send(result);
        });
    },

    deleteBuyer: (req, res) => {
        const id = req.params.id;
        Buyer.delete(id, (err, result) => {
            if (err) return res.status(500).send(err);
            res.status(200).send(result);
        });
    }
};

module.exports = buyerController;
