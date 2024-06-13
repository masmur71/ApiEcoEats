const Cart = require('../models/Cart');

const cartController = {
  addToCart: (req, res) => {
    const { produkId, quantity } = req.body;
    const pembeliId = 1; // Default pembeliId to 1
    Cart.add(pembeliId, produkId, quantity, (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json(result);
    });
  },

  updateCartItem: (req, res) => {
    const { id } = req.params;
    const { quantity } = req.body;
    Cart.update(id, quantity, (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(result);
    });
  },
  

  deleteCartItem: (req, res) => {
    const { id } = req.params;
    Cart.delete(id, (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(result);
    });
  },

  getCartItems: (req, res) => {
    const pembeliId = 1; // Default pembeliId to 1
    Cart.getByPembeliId(pembeliId, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    });
  },
};

module.exports = cartController;
