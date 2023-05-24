const { body } = require("express-validator");

const verifyAddProduct = [

  body("productName")
    .isString()
    .withMessage("Product Name should be a string")
    .notEmpty()
    .withMessage("Product name cannot be empty"),
  body("description")
    .isString()
    .withMessage("Description should be a string")
    .notEmpty()
    .withMessage("Description cannot be empty"),
  body("price")
    .isNumeric()
    .withMessage("Price must be a number")
    .notEmpty()
    .withMessage("Price cannot be empty"),
];


// const joi = require("joi");
// const verifyAddProduct = {
//   body: joi.object().keys({
//     productName: joi.string().required().messages({
//       "any.required": "Product Name is required.",
//       "string.empty": "Product Name connot be empty.",
//     }),
//     description: joi.string().required().messages({
//       "any.required": "Description is required.",
//       "string.empty": "Description cannot be empty.",
//     }),
//     price: joi.number().required().messages({
//       "any.required": "Price is required.",
//     }),
//   }),
// };

// const verifyFindByPk = {
//     params: {
//         id: joi.number().required().messages({
//             'any.required': 'Product id is required in params'
//         })
//     }
// }

// const verifyFindByPk = {
//     body: joi.object().keys({
//         id: joi.number().required()
//     })
// }

module.exports = {
  verifyAddProduct,
  // verifyFindByPk,
};

