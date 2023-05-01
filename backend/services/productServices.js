const db = require("../models");
const Product = db.product;


const findAllProducts = async (query) => {
  const products = await Product.findAll(query);
  return products;
};

const findProductByPk = async (productId) => {
  const product = await Product.findByPk(productId);
  return product;
};

module.exports = {
    findAllProducts,
    findProductByPk
}