const fs = require('fs');
const path = require('path');
const ordersFilePath = path.join(__dirname, '../data/orders.json');

const readOrders = () => {
  return JSON.parse(fs.readFileSync(ordersFilePath, 'utf8'));
};

const writeOrders = (data) => {
  fs.writeFileSync(ordersFilePath, JSON.stringify(data, null, 2));
};

exports.getAllOrders = (req, res) => {
  const orders = readOrders();
  res.json(orders);
};

exports.getOrderById = (req, res) => {
  const orders = readOrders();
  const order = orders.find(o => o.id === req.params.id);
  if (order) {
    res.json(order);
  } else {
    res.status(404).json({ message: 'Order not found' });
  }
};

exports.createOrder = (req, res) => {
  const orders = readOrders();
  const newOrder = {
    id: (orders.length + 1).toString(),
    ...req.body
  };
  orders.push(newOrder);
  writeOrders(orders);
  res.status(201).json(newOrder);
};

exports.updateOrder = (req, res) => {
  const orders = readOrders();
  const index = orders.findIndex(o => o.id === req.params.id);
  if (index !== -1) {
    const updatedOrder = { ...orders[index], ...req.body };
    orders[index] = updatedOrder;
    writeOrders(orders);
    res.json(updatedOrder);
  } else {
    res.status(404).json({ message: 'Order not found' });
  }
};

exports.deleteOrder = (req, res) => {
  const orders = readOrders();
  const index = orders.findIndex(o => o.id === req.params.id);
  if (index !== -1) {
    orders.splice(index, 1);
    writeOrders(orders);
    res.json({ message: 'Order deleted' });
  } else {
    res.status(404).json({ message: 'Order not found' });
  }
};
