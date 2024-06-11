const db = require('../config/db');

const Order = {
    create: (data, callback) => {
        const query = 'INSERT INTO Pesanan (pembeliId, penjualId, totalPembayaran, status) VALUES (?, ?, ?, ?)';
        db.query(query, [data.pembeliId, data.penjualId, data.totalPembayaran, data.status], (err, result) => {
            if (err) return callback(err);
            const pesananId = result.insertId;
            const itemQueries = data.items.map(item => {
                return new Promise((resolve, reject) => {
                    const itemQuery = 'INSERT INTO ItemPesanan (pesananId, produkId, quantity, harga, namaProduk) VALUES (?, ?, ?, ?, ?)';
                    db.query(itemQuery, [pesananId, item.produkId, item.quantity, item.harga, item.namaProduk], (itemErr, itemResult) => {
                        if (itemErr) reject(itemErr);
                        else resolve(itemResult);
                    });
                });
            });
            Promise.all(itemQueries)
                .then(results => callback(null, results))
                .catch(callback);
        });
    },

    findById: (id, callback) => {
        const query = 'SELECT * FROM Pesanan WHERE id = ?';
        db.query(query, [id], (err, result) => {
            if (err) return callback(err);
            if (result.length === 0) return callback(null, []);
            const pesanan = result[0];
            const itemQuery = 'SELECT * FROM ItemPesanan WHERE pesananId = ?';
            db.query(itemQuery, [id], (itemErr, items) => {
                if (itemErr) return callback(itemErr);
                pesanan.items = items;
                callback(null, pesanan);
            });
        });
    },

    findAll: (callback) => {
        const query = 'SELECT * FROM Pesanan';
        db.query(query, (err, results) => {
            if (err) return callback(err);
            const pesananQueries = results.map(pesanan => {
                return new Promise((resolve, reject) => {
                    const itemQuery = 'SELECT * FROM ItemPesanan WHERE pesananId = ?';
                    db.query(itemQuery, [pesanan.id], (itemErr, items) => {
                        if (itemErr) reject(itemErr);
                        else {
                            pesanan.items = items;
                            resolve(pesanan);
                        }
                    });
                });
            });
            Promise.all(pesananQueries)
                .then(results => callback(null, results))
                .catch(callback);
        });
    },

    findBySellerId: (penjualId, callback) => {
        const query = 'SELECT * FROM Pesanan WHERE penjualId = ?';
        db.query(query, [penjualId], (err, results) => {
            if (err) return callback(err);
            const pesananQueries = results.map(pesanan => {
                return new Promise((resolve, reject) => {
                    const itemQuery = 'SELECT * FROM ItemPesanan WHERE pesananId = ?';
                    db.query(itemQuery, [pesanan.id], (itemErr, items) => {
                        if (itemErr) reject(itemErr);
                        else {
                            pesanan.items = items;
                            resolve(pesanan);
                        }
                    });
                });
            });
            Promise.all(pesananQueries)
                .then(results => callback(null, results))
                .catch(callback);
        });
    },

    update: (id, data, callback) => {
        const query = 'UPDATE Pesanan SET pembeliId = ?, penjualId = ?, totalPembayaran = ?, status = ? WHERE id = ?';
        db.query(query, [data.pembeliId, data.penjualId, data.totalPembayaran, data.status, id], callback);
    },

    delete: (id, callback) => {
        const query = 'DELETE FROM Pesanan WHERE id = ?';
        db.query(query, [id], callback);
    }
};

module.exports = Order;
