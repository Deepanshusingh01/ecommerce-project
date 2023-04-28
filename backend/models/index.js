
const Cart = require("./cart")
const User = require("./user")
const Product = require("./product")

//---------------Association between models ---------------
User.hasMany(Cart,{foreignKey:"userId"});
Cart.belongsTo(Product,{foreignKey:"productId"})
