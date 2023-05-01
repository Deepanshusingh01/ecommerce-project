
const cart = require("./cart")
const user = require("./user")
const product = require("./product")

//---------------Association between models ---------------
user.hasMany(cart,{foreignKey:"userId"});
cart.belongsTo(product,{foreignKey:"productId"})


module.exports = {
    cart,
    user,
    product
}
