const db = require('../config/db');

const Address = {
  create: (pembeliId, namaPenerima, nomorTelepon, namaGedung, alamatLengkap, callback) => {
    const query = 'INSERT INTO alamat (pembeliId, namaPenerima, nomorTelepon, namaGedung, alamatLengkap) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [pembeliId, namaPenerima, nomorTelepon, namaGedung, alamatLengkap], callback);
  },

  update: (id, namaPenerima, nomorTelepon, namaGedung, alamatLengkap, callback) => {
    const query = 'UPDATE alamat SET namaPenerima = ?, nomorTelepon = ?, namaGedung = ?, alamatLengkap = ? WHERE id = ?';
    db.query(query, [namaPenerima, nomorTelepon, namaGedung, alamatLengkap, id], callback);
  },

  delete: (id, callback) => {
    const query = 'DELETE FROM alamat WHERE id = ?';
    db.query(query, [id], callback);
  },

  findByPembeliId: (pembeliId, callback) => {
    const query = 'SELECT * FROM alamat WHERE pembeliId = ?';
    db.query(query, [pembeliId], callback);
  },
};

module.exports = Address;
