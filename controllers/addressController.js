const Address = require('../models/address');

const addressController = {
  createAddress: (req, res) => {
    const { pembeliId, namaPenerima, nomorTelepon, namaGedung, alamatLengkap } = req.body;
    Address.create(pembeliId, namaPenerima, nomorTelepon, namaGedung, alamatLengkap, (err, result) => {
      if (err) return res.status(500).send(err);
      res.status(201).send(result);
    });
  },

  updateAddress: (req, res) => {
    const { id } = req.params;
    const { namaPenerima, nomorTelepon, namaGedung, alamatLengkap } = req.body;
    Address.update(id, namaPenerima, nomorTelepon, namaGedung, alamatLengkap, (err, result) => {
      if (err) return res.status(500).send(err);
      res.status(200).send(result);
    });
  },

  deleteAddress: (req, res) => {
    const { id } = req.params;
    Address.delete(id, (err, result) => {
      if (err) return res.status(500).send(err);
      res.status(200).send(result);
    });
  },

  getAddressesByPembeliId: (req, res) => {
    const { pembeliId } = req.params;
    Address.findByPembeliId(pembeliId, (err, result) => {
      if (err) return res.status(500).send(err);
      res.status(200).send(result);
    });
  },
};

module.exports = addressController;
