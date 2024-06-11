const db = require('../config/db');

const Buyer = {
    create: (data, callback) => {
        const query = 'INSERT INTO Pembeli (nama, password, alamat) VALUES (?, ?, ?)';
        db.query(query, [data.nama, data.password, data.alamat], callback);
    },

    findById: (id, callback) => {
        const query = 'SELECT * FROM Pembeli WHERE id = ?';
        db.query(query, [id], callback);
    },

    update: (id, data, callback) => {
        const query = 'UPDATE Pembeli SET nama = ?, password = ?, alamat = ? WHERE id = ?';
        db.query(query, [data.nama, data.password, data.alamat, id], callback);
    },

    delete: (id, callback) => {
        const query = 'DELETE FROM Pembeli WHERE id = ?';
        db.query(query, [id], callback);
    }
};

module.exports = Buyer;
