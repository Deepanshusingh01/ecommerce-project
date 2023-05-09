const express = require("express");
const app = express();
const serverConfig = require("./config/server.config");
const sequelize = require("./config/db")
const cors = require("cors")
app.use(cors());

const orderController = require("./controller/order.controller")
app.post("/stripe/webhook",express.raw({ type: 'application/json' }),orderController.stripeWebHook)
app.use(express.json());
app.use(express.urlencoded({extended:true}))

sequelize.sync({alter:true}).then(() =>{
    console.log("sync successfully");
}).catch(err=>{
    console.log(err.message);
})

const productRoute = require("./route/product.route");
const userRoute = require("./route/user.route");
const cartRoute = require("./route/cart.route")
const orderRoute = require("./route/order.route");



app.use(productRoute);
app.use(cartRoute)
app.use(userRoute)
app.use(orderRoute)


app.listen(serverConfig.PORT,()=>{
    console.log("Server started at Port :",serverConfig.PORT)
})

