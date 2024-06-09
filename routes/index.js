const express = require('express');
const router = express.Router();

// Root route
router.get('/', (req, res) => {
  res.send('Welcome to the Food Marketplace API');
});

module.exports = router;
