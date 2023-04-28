const serverConfig = require("./config/server.config")
const sequelize = require("./config/db")
const cors = require("cors")
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors())

sequelize.sync({alter:true}).then(() =>{
    console.log("sync successfully");
}).catch(err=>{
    console.log(err.message);
})

const productRoute = require("./route/product.route");
const userRoute = require("./route/user.route");
const cartRoute = require("./route/cart.route")


app.use(productRoute);
app.use(cartRoute)
app.use(userRoute)

app.listen(serverConfig.PORT,()=>{
    console.log("Server started at Port :",serverConfig.PORT)
})