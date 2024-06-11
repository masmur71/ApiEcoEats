const db = require('../config/db');

const CartItem = {
    create: (data, callback) => {
        const query = 'INSERT INTO ItemPesanan (pesananId, produkId, quantity, harga, namaProduk) VALUES (?, ?, ?, ?, ?)';
        db.query(query, [data.pesananId, data.produkId, data.quantity, data.harga, data.namaProduk], callback);
    },

    findByOrderId: (pesananId, callback) => {
        const query = 'SELECT * FROM ItemPesanan WHERE pesananId = ?';
        db.query(query, [pesananId], callback);
    },

    update: (id, data, callback) => {
        const query = 'UPDATE ItemPesanan SET quantity = ? WHERE id = ?';
        db.query(query, [data.quantity, id], callback);
    },

    delete: (id, callback) => {
        const query = 'DELETE FROM ItemPesanan WHERE id = ?';
        db.query(query, [id], callback);
    }
};

module.exports = CartItem;
