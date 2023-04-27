const db = require("../models");
const Product = db.product;
const productService = require("../services/productServices")

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

exports.allProducts = async(req,res) =>{

    try{
    const product  = await productService.findAllProducts();
    return res.status(200).send(product)
    }catch(err){
        console.log("Error while finding all product",err);
        return res.status(500).send({
            mesg : "Internal server error"
        })
    }
}

exports.searchProduct = async (req,res) =>{

    try{
    const search = req.params.key
    const product = await productService.findProductBySearch(search)
    return res.status(200).send(product)
    }catch(err){
        console.log("Error while searching product by words",err);
        return res.status(500).send({
            mesg : "Internal server error"
        })
    }
}