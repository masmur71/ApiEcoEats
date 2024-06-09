const { readProducts, writeProducts } = require('../models/product');

exports.getAllProducts = (req, res) => {
  const products = readProducts();
  res.json(products);
};

exports.getProductById = (req, res) => {
  const products = readProducts();
  const product = products.find(p => p.id === req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
};

exports.createProduct = (req, res) => {
  const products = readProducts();
  const newProduct = {
    id: (products.length + 1).toString(),
    nama: req.body.nama,
    deskripsi: req.body.deskripsi,
    harga: req.body.harga,
    stok: req.body.stok,
    tanggalDaluwarsa: req.body.tanggalDaluwarsa,
    kategori: req.body.kategori,
    gambar: req.file ? `/uploads/${req.file.filename}` : null
  };
  products.push(newProduct);
  writeProducts(products);
  res.status(201).json(newProduct);
};

exports.updateProduct = (req, res) => {
  const products = readProducts();
  const index = products.findIndex(p => p.id === req.params.id);
  if (index !== -1) {
    const updatedProduct = {
      ...products[index],
      ...req.body,
      gambar: req.file ? `/uploads/${req.file.filename}` : products[index].gambar
    };
    products[index] = updatedProduct;
    writeProducts(products);
    res.json(updatedProduct);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
};

exports.deleteProduct = (req, res) => {
  const products = readProducts();
  const index = products.findIndex(p => p.id === req.params.id);
  if (index !== -1) {
    products.splice(index, 1);
    writeProducts(products);
    res.json({ message: 'Product deleted' });
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
};
