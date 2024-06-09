const fs = require('fs');
const path = require('path');
const ordersFilePath = path.join(__dirname, '../data/orders.json');

const readOrders = () => {
  return JSON.parse(fs.readFileSync(ordersFilePath, 'utf8'));
};

const writeOrders = (data) => {
  fs.writeFileSync(ordersFilePath, JSON.stringify(data, null, 2));
};

module.exports = {
  readOrders,
  writeOrders
};
