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
    // const {name:userName,phoneNo:userMobileNo,shippingAddressLine1} = userDetail;
    const orderDetails = await orderDetail.create({
        userId,
        totalPrice,
        totalQuantity,
        userName,
        userMobileNo,
        // shippingAddressLine1
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
    const order = await orderDetail.findOne({where:{stripeSessionId:session.metadata.session_id}});
    console.log("--------------update -----------order",order)
    if(order){
        await order.update({orderStatus:orderStatus})
    }
}


module.exports = {
    createOrder,
    updateOrderPaymentStatus
}
