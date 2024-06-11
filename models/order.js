const db = require('../config/db');

const Order = {
    create: (data, callback) => {
        const query = 'INSERT INTO Pesanan (pembeliId, penjualId, produkId, quantity, status) VALUES (?, ?, ?, ?, ?)';
        db.query(query, [data.pembeliId, data.penjualId, data.produkId, data.quantity, data.status], callback);
    },

    findById: (id, callback) => {
        const query = 'SELECT * FROM Pesanan WHERE id = ?';
        db.query(query, [id], callback);
    },

    update: (id, data, callback) => {
        const query = 'UPDATE Pesanan SET pembeliId = ?, penjualId = ?, produkId = ?, quantity = ?, status = ? WHERE id = ?';
        db.query(query, [data.pembeliId, data.penjualId, data.produkId, data.quantity, data.status, id], callback);
    },

    delete: (id, callback) => {
        const query = 'DELETE FROM Pesanan WHERE id = ?';
        db.query(query, [id], callback);
    }
};

module.exports = Order;
