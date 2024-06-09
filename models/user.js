const fs = require('fs');
const path = require('path');
const usersFilePath = path.join(__dirname, '../data/users.json');

const readUsers = () => {
  return JSON.parse(fs.readFileSync(usersFilePath, 'utf8'));
};

const writeUsers = (data) => {
  fs.writeFileSync(usersFilePath, JSON.stringify(data, null, 2));
};

module.exports = {
  readUsers,
  writeUsers
};
