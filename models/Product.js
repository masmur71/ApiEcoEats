const db = require('../config/db');

const Product = {
    create: (data, callback) => {
        const query = `INSERT INTO produk (nama, deskripsi, harga, stok, tglKadaluarsa, kategori, gambar, penjualId) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        const values = [data.nama, data.deskripsi, data.harga, data.stok, data.tglKadaluarsa, data.kategori, data.gambar, data.penjualId];
        db.query(query, values, (err, result) => {
            if (err) return callback(err);
            callback(null, result);
        });
    },

    findById: (id, callback) => {
        const query = `SELECT * FROM produk WHERE id = ?`;
        db.query(query, [id], (err, result) => {
            if (err) return callback(err);
            callback(null, result);
        });
    },

    findAll: (callback) => {
        const query = `SELECT * FROM produk`;
        db.query(query, (err, result) => {
            if (err) return callback(err);
            callback(null, result);
        });
    },

    searchByName: (name, callback) => {
        const query = `SELECT * FROM produk WHERE nama LIKE ?`;
        db.query(query, [`%${name}%`], (err, result) => {
            if (err) return callback(err);
            callback(null, result);
        });
    },

    update: (id, data, callback) => {
        const query = `UPDATE produk SET nama = ?, deskripsi = ?, harga = ?, stok = ?, tglKadaluarsa = ?, kategori = ?, gambar = ?, penjualId = ? WHERE id = ?`;
        const values = [data.nama, data.deskripsi, data.harga, data.stok, data.tglKadaluarsa, data.kategori, data.gambar, data.penjualId, id];
        db.query(query, values, (err, result) => {
            if (err) return callback(err);
            callback(null, result);
        });
    },

    delete: (id, callback) => {
        const query = `DELETE FROM produk WHERE id = ?`;
        db.query(query, [id], (err, result) => {
            if (err) return callback(err);
            callback(null, result);
        });
    },
};

module.exports = Product;
