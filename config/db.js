// config/db.js
const mysql = require('mysql');

// Konfigurasi koneksi database
const db = mysql.createConnection({
    host: 'localhost',    // Ganti dengan host database Anda jika berbeda
    user: 'root',         // Ganti dengan username database Anda
    password: '',         // Ganti dengan password database Anda
    database: 'ecoeats'   // Nama database yang Anda buat
});

// Menghubungkan ke database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('MySQL is connected...');
});

module.exports = db;
