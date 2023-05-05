const db = require("../models");
const Product = db.product;
const productService = require("../services/productServices")
const Op = require("sequelize").Op;

exports.addProduct = async(req,res) =>{

    try{

    const {productName,price,description} = req.body
    const product = await Product.create({
        productName,
        description,
        price,
        image:req.file.filename
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

    let {limit,page,search} = req.query
    limit = parseInt(limit) || 10 ;
    page = parseInt(page) || 1
    let offset = page * limit - limit
    let query;
    let count;
    if(search){
        query = await productService.findAllProducts({
            where:{
                [Op.or]:[
                    {productName:{[Op.like]:`%${search}%`}},
                    {description:{[Op.like]:`%${search}%`}}
                ]
            },
            offset:offset,
            limit : limit,
            order :[["createdAt","DESC"]]

        })
        count = await Product.count({
            where:{
                [Op.or]:[
                    {productName:{[Op.like]:`%${search}%`}},
                    {description:{[Op.like]:`%${search}%`}}
                ]
            },
            offset:offset,
            limit : limit,
            order :[["createdAt","DESC"]]
        })
    }
    if(!search){
        query = await productService.findAllProducts({
            limit : limit,
            page : page,
            offset : offset,
            order : [["createdAt","DESC"]]
        })
        count = await Product.count()
    }
    return res.status(200).send({product:query,pagination:{count,limit,page,search}})
    }catch(err){
        console.log("Error while finding all product",err);
        return res.status(500).send({
            mesg : "Internal server error"
        })
    }
}



exports.findByPk = async (req,res) =>{

    try{
    const productId = req.params.id
    const product = await productService.findProductByPk(productId);

    return res.status(200).send(product)
    }catch(err){
        console.log("Error while finding product by productId",err);
        return res.status(500).send({
            mesg : "Internal server error"
        })
    }
}

