const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../data/products.json');

const readProducts = () => {
  return JSON.parse(fs.readFileSync(productsFilePath, 'utf8'));
};

const writeProducts = (data) => {
  fs.writeFileSync(productsFilePath, JSON.stringify(data, null, 2));
};

module.exports = {
  readProducts,
  writeProducts
};
