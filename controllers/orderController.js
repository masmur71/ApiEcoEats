const Order = require('../models/Order');

const orderController = {
  createOrder: (req, res) => {
    const pembeliId = 1; // Default pembeliId to 1
    const { penjualId, totalPembayaran, items } = req.body;

    Order.create(pembeliId, penjualId, totalPembayaran, (err, result) => {
      if (err) return res.status(500).json({ error: err.message });

      const pesananId = result.insertId;
      const itemPromises = items.map(item => {
        return new Promise((resolve, reject) => {
          Order.addItem(pesananId, item.produkId, item.quantity, item.harga, item.namaProduk, (err, result) => {
            if (err) return reject(err);
            resolve(result);
          });
        });
      });

      Promise.all(itemPromises)
        .then(results => {
          res.status(201).json({ message: 'Order created successfully', pesananId });
        })
        .catch(error => {
          res.status(500).json({ error: error.message });
        });
    });
  },

  getOrders: (req, res) => {
    const pembeliId = 1; // Default pembeliId to 1
    Order.getByPembeliId(pembeliId, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    });
  },

  getOrdersByPembeliId: (req, res) => {
    const pembeliId = 1; // Default pembeliId to 1
    const sql = 'SELECT * FROM pesanan WHERE pembeliId = ?';
    db.query(sql, [pembeliId], (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(200).json(results);
    });
  },

  getOrderItems: (req, res) => {
    const { pesananId } = req.params;
    Order.getItemsByPesananId(pesananId, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    });
  }
};

module.exports = orderController;
