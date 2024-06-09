const { readUsers, writeUsers } = require('../models/user');

exports.getAllUsers = (req, res) => {
  const users = readUsers();
  res.json(users);
};

exports.getUserById = (req, res) => {
  const users = readUsers();
  const user = users.find(u => u.id === req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

exports.createUser = (req, res) => {
  const users = readUsers();
  const newUser = {
    id: (users.length + 1).toString(),
    ...req.body
  };
  users.push(newUser);
  writeUsers(users);
  res.status(201).json(newUser);
};

exports.updateUser = (req, res) => {
  const users = readUsers();
  const index = users.findIndex(u => u.id === req.params.id);
  if (index !== -1) {
    const updatedUser = { ...users[index], ...req.body };
    users[index] = updatedUser;
    writeUsers(users);
    res.json(updatedUser);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

exports.deleteUser = (req, res) => {
  const users = readUsers();
  const index = users.findIndex(u => u.id === req.params.id);
  if (index !== -1) {
    users.splice(index, 1);
    writeUsers(users);
    res.json({ message: 'User deleted' });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};
