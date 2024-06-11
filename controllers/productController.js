const Product = require('../models/Product');

const productController = {
    createProduct: (req, res) => {
        const data = req.body;
        data.gambar = req.file ? req.file.path : null;
        Product.create(data, (err, result) => {
            if (err) return res.status(500).send(err);
            res.status(201).send(result);
        });
    },

    getProductById: (req, res) => {
        const id = req.params.id;
        Product.findById(id, (err, result) => {
            if (err) return res.status(500).send(err);
            res.status(200).send(result);
        });
    },

    getAllProducts: (req, res) => {
        Product.findAll((err, results) => {
            if (err) return res.status(500).send(err);
            res.status(200).send(results);
        });
    },

    searchProducts: (req, res) => {
        const name = req.query.name;
        Product.searchByName(name, (err, results) => {
            if (err) return res.status(500).send(err);
            res.status(200).send(results);
        });
    },

    updateProduct: (req, res) => {
        const id = req.params.id;
        const data = req.body;
        data.gambar = req.file ? req.file.path : null;
        Product.update(id, data, (err, result) => {
            if (err) return res.status(500).send(err);
            res.status(200).send(result);
        });
    },

    deleteProduct: (req, res) => {
        const id = req.params.id;
        Product.delete(id, (err, result) => {
            if (err) return res.status(500).send(err);
            res.status(200).send(result);
        });
    }
};

module.exports = productController;
