const db = require('../config/db');

const Cart = {
  add: (pembeliId, produkId, quantity, callback) => {
    const sql = 'INSERT INTO cart (pembeliId, produkId, quantity) VALUES (?, ?, ?)';
    db.query(sql, [pembeliId, produkId, quantity], callback);
  },

  update: (id, quantity, callback) => {
    const sql = 'UPDATE cart SET quantity = ? WHERE id = ?';
    db.query(sql, [quantity, id], callback);
  },

  delete: (id, callback) => {
    const sql = 'DELETE FROM cart WHERE id = ?';
    db.query(sql, [id], callback);
  },

  getByPembeliId: (pembeliId, callback) => {
    const sql = `
      SELECT cart.id, cart.pembeliId, cart.produkId, cart.quantity, produk.gambar, produk.nama, produk.harga
      FROM cart
      JOIN produk ON cart.produkId = produk.id
      WHERE cart.pembeliId = ?
    `;
    db.query(sql, [pembeliId], callback);
  },
};

module.exports = Cart;
