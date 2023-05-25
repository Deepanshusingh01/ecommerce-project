const db = require("../models");
const Product = db.product;
const productService = require("../services/productServices");
const Op = require("sequelize").Op;
const { StatusCodes } = require("http-status-codes");
const deleteImage = require("../utils/delete.image");

exports.addProduct = async (req, res) => {
  try {
    const { productName, price, description } = req.body;
    const userId = req.user.userId;
    const product = await Product.create({
      productName,
      description,
      price,
      image: req.file.filename,
      createdBy: userId,
    });

    return res.status(StatusCodes.CREATED).send(product);
  } catch (err) {
    console.log("Error while adding new product", err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      mesg: "Internal server error",
    });
  }
};

exports.allProducts = async (req, res) => {
  try {
    let { limit, page, search } = req.query;
    limit = parseInt(limit) || 10;
    page = parseInt(page) || 1;
    let offset = page * limit - limit;
    let query;
    let count;
    if (search) {
      query = await productService.findAllProducts({
        where: {
          [Op.or]: [
            { productName: { [Op.like]: `%${search}%` } },
            { description: { [Op.like]: `%${search}%` } },
          ],
        },
        offset: offset,
        limit: limit,
        order: [["createdAt", "DESC"]],
      });
      count = await Product.count({
        where: {
          [Op.or]: [
            { productName: { [Op.like]: `%${search}%` } },
            { description: { [Op.like]: `%${search}%` } },
          ],
        },
        offset: offset,
        limit: limit,
        order: [["createdAt", "DESC"]],
      });
    }
    if (!search) {
      query = await productService.findAllProducts({
        limit: limit,
        page: page,
        offset: offset,
        order: [["createdAt", "DESC"]],
      });
      count = await Product.count();
    }
    return res
      .status(StatusCodes.OK)
      .send({ product: query, pagination: { count, limit, page, search } });
  } catch (err) {
    console.log("Error while finding all product", err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      mesg: "Internal server error",
    });
  }
};

exports.findByPk = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await productService.findProductByPk(productId);

    return res.status(StatusCodes.OK).send(product);
  } catch (err) {
    console.log("Error while finding product by productId", err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      mesg: "Internal server error",
    });
  }
};

exports.deleteProduct = async (req, res) => {

  const createdBy = req.session.user.userId;
  const products = await productService.findAllProducts({
    where: { createdBy },
    attributes: ["productId", "image"],
  });

  if (!products.length) {
    return res.status(StatusCodes.BAD_REQUEST).send({
      mesg: "No Products added Yet",
    });
  }

  const productId = req.body.deletingProducts;
  if (!productId) {
    return res.status(StatusCodes.BAD_REQUEST).send({
      mesg: "deleting Products is required",
    });
  }

  for (const product of products) {
    if (product.productId === productId) {
      await Product.destroy({ where: { productId } });
      const filePath = "productImages/" + product.image;
      await deleteImage(filePath);
      return res.status(StatusCodes.OK).send({
        mesg: 'Deleted Product successfully',
      });
    }
  }

  return res.status(StatusCodes.BAD_REQUEST).send({
    mesg: `Product ID is not matching any products created by the user: ${createdBy}`,
  });
};
