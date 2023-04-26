
const Sequelize = require("sequelize");

const env = process.env.NODE_ENV || "development"
const Config = require("../config/config")[env]

const sequelize = new Sequelize(
    Config.database,
    Config.username,
    Config.password,
    {
        host:Config.host,
        dialect : Config.dialect
    }
    )
const auth = async ()=>{
    try{
    await sequelize.authenticate()
    console.log("Conneted to database")
    }catch(err){
        console.log("error while connecting to database")
    } 
}
auth()

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.user = require("./user")(sequelize,Sequelize)
db.product = require("./product")(sequelize,Sequelize)
db.cart = require("./cart")(sequelize,Sequelize);

//---------------Association between models ---------------
db.user.hasMany(db.cart,{foreignKey:"userId"});
db.cart.belongsTo(db.product,{foreignKey:"productId"})

module.exports = db;