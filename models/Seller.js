const db = require('../config/db');

const Seller = {
    create: (data, callback) => {
        const query = 'INSERT INTO Penjual (nama, password, namaToko, alamat) VALUES (?, ?, ?, ?)';
        db.query(query, [data.nama, data.password, data.namaToko, data.alamat], callback);
    },

    findById: (id, callback) => {
        const query = 'SELECT * FROM Penjual WHERE id = ?';
        db.query(query, [id], callback);
    },

    update: (id, data, callback) => {
        const query = 'UPDATE Penjual SET nama = ?, password = ?, namaToko = ?, alamat = ? WHERE id = ?';
        db.query(query, [data.nama, data.password, data.namaToko, data.alamat, id], callback);
    },

    delete: (id, callback) => {
        const query = 'DELETE FROM Penjual WHERE id = ?';
        db.query(query, [id], callback);
    }
};

module.exports = Seller;
