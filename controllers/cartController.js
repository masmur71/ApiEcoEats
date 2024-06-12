const Cart = require('../models/Cart');

const cartController = {
  addToCart: async (req, res) => {
    const { productId, quantity } = req.body;

    try {
      // Periksa apakah produk sudah ada di keranjang
      let cartItem = await Cart.findOne({ where: { productId: productId } });

      if (cartItem) {
        // Jika produk sudah ada, perbarui jumlahnya
        cartItem.quantity += quantity;
        await cartItem.save();
      } else {
        // Jika produk belum ada, tambahkan produk baru ke keranjang
        cartItem = await Cart.create({ productId, quantity });
      }

      res.status(200).json(cartItem);
    } catch (error) {
      res.status(500).json({ error: 'Failed to add item to cart' });
    }
  },

  getCartItems: async (req, res) => {
    try {
      const cartItems = await Cart.findAll();
      res.status(200).json(cartItems);
    } catch (error) {
      res.status(500).json({ error: 'Failed to load cart items' });
    }
  },

  updateCartItem: async (req, res) => {
    const { cartItemId, quantity } = req.body;

    try {
      const cartItem = await Cart.findByPk(cartItemId);

      if (cartItem) {
        cartItem.quantity = quantity;
        await cartItem.save();
        res.status(200).json(cartItem);
      } else {
        res.status(404).json({ error: 'Cart item not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to update cart item' });
    }
  },

  removeCartItem: async (req, res) => {
    const { cartItemId } = req.params;

    try {
      const cartItem = await Cart.findByPk(cartItemId);

      if (cartItem) {
        await cartItem.destroy();
        res.status(200).json({ message: 'Cart item removed' });
      } else {
        res.status(404).json({ error: 'Cart item not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete cart item' });
    }
  }
};

module.exports = cartController;
