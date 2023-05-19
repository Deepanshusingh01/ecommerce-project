const joi = require("joi");

const verifyAddProduct = {
  body: joi.object().keys({
    productName: joi.string().required().messages({
      "any.required": "Product Name is required.",
      "string.empty": "Product Name connot be empty.",
    }),
    description: joi.string().required().messages({
      "any.required": "Description is required.",
      "string.empty": "Description cannot be empty.",
    }),
    price: joi.number().required().messages({
      "any.required": "Price is required.",
    }),
  }),
};


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
}
