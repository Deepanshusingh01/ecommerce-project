const db = require("../models");
const Cart = db.cart

exports.addCart = async(req,res) =>{

    try{
    const {productId} = req.body;
    const user = req.user
    const cart = await Cart.create({
        userId : user.userId,
        productId
    })
    return res.status(201).send(cart)
}catch(err){
    console.log("Error while adding product in cart",err);
    return res.status(500).send({
        mesg : "Internal server error"
    })
}
}