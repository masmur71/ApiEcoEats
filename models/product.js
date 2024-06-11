const db = require('../config/db');

const Product = {
    create: (data, callback) => {
        const query = 'INSERT INTO Produk (nama, deskripsi, harga, tglKadaluarsa, kategori, stok, penjualId, gambar) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        db.query(query, [data.nama, data.deskripsi, data.harga, data.tglKadaluarsa, data.kategori, data.stok, data.penjualId, data.gambar], callback);
    },

    findById: (id, callback) => {
        const query = 'SELECT * FROM Produk WHERE id = ?';
        db.query(query, [id], callback);
    },

    findAll: (callback) => {
        const query = 'SELECT * FROM Produk';
        db.query(query, callback);
    },

    update: (id, data, callback) => {
        const query = 'UPDATE Produk SET nama = ?, deskripsi = ?, harga = ?, tglKadaluarsa = ?, kategori = ?, stok = ?, gambar = ? WHERE id = ?';
        db.query(query, [data.nama, data.deskripsi, data.harga, data.tglKadaluarsa, data.kategori, data.stok, data.gambar, id], callback);
    },

    delete: (id, callback) => {
        const query = 'DELETE FROM Produk WHERE id = ?';
        db.query(query, [id], callback);
    },

    searchByName: (name, callback) => {
        const query = 'SELECT * FROM Produk WHERE nama LIKE ?';
        db.query(query, [`%${name}%`], callback);
    }
};

module.exports = Product;
