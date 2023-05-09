const {cart,orderDetail,orderItem,product,user} = require("../models");



const createOrder = async(userId)=>{

    const cartItems = await cart.findAll({where:{userId},include:[product]});
    let totalPrice = 0;
    let totalQuantity = 0;
    let productDetail = []
    cartItems.forEach((item) => {
        totalPrice += item.product.price;
        totalQuantity += item.quantity;
        productDetail.push({
            productId : item.productId,
            productName : item.product.productName,
            productPrice : item.product.price,
            quantity : item.quantity,
            image : item.product.image,
            
        })
    });


    const userDetail = await user.findByPk(userId)
    const {name:userName,phoneNo:userMobileNo} = userDetail;
    const orderDetails = await orderDetail.create({
        userId,
        totalPrice,
        totalQuantity,
        userName,
        userMobileNo,
    })
    const orderItemResult = await createOrderItem(orderDetails.id,productDetail);
    return {orderDetails,orderItemResult}
}


const createOrderItem = async(orderId,productDatail)=>{

    const orderItems = productDatail.map((item) => {
        item.orderId = orderId;
        return item;
      });
    const result = await orderItem.bulkCreate(orderItems);
    return result
}

const updateOrderPaymentStatus = async(session,orderStatus)=>{
    const order = await orderDetail.findOne({where:{stripeSessionId:session.id}});
    if(order){
        await order.update({orderStatus:orderStatus})
    }
}

const updateOrderBySession = async(session) =>{
    const address = session.shipping_details.address;

    const addressDetail = {
        shippingAddressLine1 : address.line1,
        shippingAddressLine2 : address.line2,
        shippingCountry : address.country,
        shippingState : address.state,
        shippingCity : address.city,
        shippingPincode : address.postal_code,
        shippingLandMark : ""
    }
    let orderStatus;
    if(session.payment_status === "paid"){
        orderStatus = "CONFIRMED"
    }

    const order = await orderDetail.findOne({where:{stripeSessionId:session.id}})
    await order.update({orderStatus,...addressDetail})
}


module.exports = {
    createOrder,
    updateOrderPaymentStatus,
    updateOrderBySession
}
