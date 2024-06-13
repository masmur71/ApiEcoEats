const db = require('../config/db');

const Order = {
  create: (pembeliId, penjualId, totalPembayaran, callback) => {
    const sql = 'INSERT INTO pesanan (pembeliId, penjualId, totalPembayaran,status) VALUES (?, ?, ?, "pending")';
    db.query(sql, [pembeliId, penjualId, totalPembayaran], callback);
  },

  addItem: (pesananId, produkId, quantity, harga, namaProduk, callback) => {
    const sql = 'INSERT INTO itempesanan (pesananId, produkId, quantity, harga, namaProduk) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [pesananId, produkId, quantity, harga, namaProduk], callback);
  },

  getByPembeliId: (req, res) => {
    const pembeliId = req.params.pembeliId;
    const sql = 'SELECT * FROM pesanan WHERE pembeliId = 1';
    db.query(sql, [pembeliId], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(results);
    })
},


  getItemsByPesananId: (pesananId, callback) => {
    const sql = 'SELECT * FROM itempesanan WHERE pesananId = ?';
    db.query(sql, [pesananId], callback);
  }
};

module.exports = Order;
