const db = require("../models");
const Product = db.product;

exports.addProduct = async(req,res) =>{

    try{
    const {productName,price,description,rating} = req.body

    const product = await Product.create({
        productName,
        description,
        price,
        rating
    }) 

    return res.status(200).send(product)
}catch(err){
    console.log("Error while adding new product",err);
    return res.status(500).send({
        mesg : "Internal server error"
    })
}
}