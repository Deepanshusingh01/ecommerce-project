const db = require('../models');
const Cart = db.cart;
const Product = db.product;
const { StatusCodes } = require('http-status-codes')

exports.addCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const user = req.user;
    const cart = await Cart.create({
      userId: user.userId,
      productId,
      quantity,
    });
    return res.status(StatusCodes.CREATED).send(cart);
  } catch (err) {
    console.log('Error while adding product in cart', err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      mesg: 'Internal server error',
    });
  }
};

exports.getCartProducts = async (req, res) => {
  try {
    const userId = req.user.userId;
    const product = await Cart.findAll({
      where: { userId },
      include: [Product],
    });
    let totalQuantity = 0;
    let totalPrice = 0;
    if (product.length == 0) {
      return res.status(StatusCodes.BAD_REQUEST).send({
        mesg: 'Cart is empty',
      });
    }
    product.forEach((item) => {
      totalQuantity += item.quantity;
      totalPrice += item.product.price * item.quantity;
    });
    return res.status(StatusCodes.OK).send({ product: product, totalPrice, totalQuantity });
  } catch (err) {
    console.log('Error while getting cart products', err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      mesg: 'Internal server error',
    });
  }
};

exports.removeCartProducts = async (req, res) => {
  try {
    const userId = req.user.userId;
    const ids = req.body.ids;
    if (ids.length >= 1) {
      ids.forEach(async (productId) => {
        await Cart.destroy({ where: { userId, productId } });
      });
      return res.status(StatusCodes.OK).send({
        mesg: 'Successfully removed product from cart',
      });
    }
  } catch (err) {
    console.log('Error while removing cart product', err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      mesg: 'Internal server error',
    });
  }
};
