
const cart = require("./cart")
const user = require("./user")
const product = require("./product");
const orderDetail = require("./orderdetail");
const orderItem = require("./orderItem")

//---------------Association between models ---------------
user.hasMany(cart,{foreignKey:"userId"});
cart.belongsTo(product,{foreignKey:"productId"})
product.hasMany(orderItem,{foreignKey:"productId"});
user.hasMany(orderDetail,{foreignKey:"userId"})



module.exports = {
    cart,
    user,
    product,
    orderDetail,
    orderItem
}
