const Product = require('../models/Product');
const path = require('path');

const productController = {
    createProduct: (req, res) => {
        const data = req.body;
        data.penjualId = 1;
        if (req.file) {
            data.gambar = req.file.path.replace(/\\/g, '/');
        }
        Product.create(data, (err, result) => {
            if (err) return res.status(500).send(err);
            res.status(201).send(result);
        });
    },

    getProductById: (req, res) => {
        const id = req.params.id;
        Product.findById(id, (err, result) => {
            if (err) return res.status(500).send(err);
            if (result.length === 0) {
                return res.status(404).send({ error: 'Product not found' });
            }
            // Update the image path before sending the response
            const product = result[0];
            product.gambar = `${req.protocol}://${req.get('host')}/uploads/${path.basename(product.gambar.replace(/\\/g, '/'))}`;
            res.status(200).json(product);
        });
    },
    
    

    getAllProducts: (req, res) => {
        Product.findAll((err, products) => {
            if (err) return res.status(500).json({ error: err.message });
            if (!products) {
                return res.status(404).json({ error: 'No products found' });
            }
            const productsWithFullPath = products.map(product => {
                return {
                    ...product,
                    gambar: `${req.protocol}://${req.get('host')}/uploads/${path.basename(product.gambar.replace(/\\/g, '/'))}`
                };
            });
            res.status(200).json(productsWithFullPath);
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
        if (req.file) {
            data.gambar = req.file.path.replace(/\\/g, '/');
        }
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
    },

    uploadImage: (req, res) => {
        if (req.file) {
            res.json({ imageUrl: `uploads\\${req.file.filename}` });
        } else {
            res.status(400).json({ error: 'Failed to upload image' });
        }
    },
};

module.exports = productController;
