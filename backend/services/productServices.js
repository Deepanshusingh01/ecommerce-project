const db = require("../models");
const Product = db.product;
const Op = require("sequelize").Op

module.exports = {

    findAllProducts:async()=>{
        const products = await Product.findAll();
        return products;
    },
    findProductBySearch:async(searchTerm)=>{
        const product = await Product.findAll({
            where: {
                [Op.or]:[
                    { productName : { [Op.like]: `%${searchTerm}%`}},
                    { description : {[Op.like] : `%${searchTerm}%`}}
                ]
            }
        })
        return product
    }
}