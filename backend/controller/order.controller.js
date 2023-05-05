const orderService = require("../services/orderService");
const stripe = require("../payment/stripe");
const { cart, orderDetail } = require("../models");

const stripeWebHook = async (req, res) => {
  let event;
  try {
    let endPointSecret ="whsec_32e93f7afb3f6c965bf589c6e73abb8114378f49efac5d1991fda4e36037e925";
    const signature = req.headers["stripe-signature"];
    event = stripe.webhooks.constructEvent(req.body, signature, endPointSecret);
console.log(req.body,"req,b0dy----------------------------------")
  }catch (err) {
  console.log("Error while calling webhook", err);
  return res.status(500).send({
    mesg: "Internal server error",
  });
}

  switch (event.type) {
    case "customer.created": {
      const session = event.data.object;
      console.log(session, "customer.created");
      break;
    }
    case "payment_intent.succeeded": {
      const session = event.data.object; //paymentIntent
      console.log("payment_intent.succeeded", session);
      await orderService.updateOrderPaymentStatus(session, "CONFIRMED");
      break;
    }
    case "payment_intent.payment_failed": {
      const session = event.data.object;
      console.log("payment_intent.payment_failed", session);
      await orderService.updateOrderPaymentStatus(session, "FAILED");
      break;
    }
    case "checkout.session.completed": {
      const session = event.data.object;
      const customer = await stripe.customers.retrieve(session.customer);
      await orderService.updateOrderPaymentStatus(session, "CONFIRMED");
      await cart.destroy({ where: { userId: customer.metadata.userId } });
      console.log("checkout.session.completed", session);
      break;
    }
    case "checkout.session.expired": {
      const session = event.data.object;
      const order = await orderDetail.findOne({
        where: { stripeSessionId: session.id },
      });
      if (order && order.orderStatus === "PENDING") {
        await order.update({ orderStatus: "FAILED" });
      }
      console.log("checkout.session.expired", session);
      break;
    }case "payment_intent.requires_action": {
      const paymentIntent = event.data.object;
      const clientSecret = paymentIntent.client_secret;
      if (paymentIntent.next_action.type === "use_stripe_sdk") {
        const { type, use_stripe_sdk: useStripeSdk } = paymentIntent.next_action;
        if (type === "three_d_secure_redirect") {
          const stripeJsUrl = useStripeSdk.stripe_js;
          const sourceUrl = useStripeSdk.source;
          res.redirect(stripeJsUrl);
        }
      }
      console.log("payment_intent.requires_action",paymentIntent)
      break;
    }

    default:
      console.log(`unhandle event type ${event.type}`);
  }
  return res.status(200).send({
    mesg: "sucessful",
  });
};

const checkOutSession = async (req, res) => {
  try {
    const currency = "inr";
    const allowedCountryISOCodes = ["IN"];
    const user = req.user;
    const userId = req.user.userId;

    const customer = await stripe.customers.create({
      email: user.email,
      metadata: { userId },
    });

    const { orderDetails, orderItemResult } = await orderService.createOrder(
      userId
    );
    const stripeLineItems = orderItemResult.map((item) => {
      return {
        price_data: {
          currency: currency,
          product_data: {
            name: item.productName,
            metadata: {
              id: item.productId,
              price: item.productPrice,
            },
          },
          unit_amount: Math.floor(item.productPrice * 100),
        },
        quantity: item.quantity,
      };
    });

    const successUrl = "https://checkout.stripe.com/test/success";
    const cancelUrl = "https://checkout.stripe.com/test/cancelled";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      currency: currency,
      line_items: stripeLineItems,
      shipping_address_collection: {
        allowed_countries: allowedCountryISOCodes,
      },
      expand: ["line_items"],
      customer: customer.id,
      success_url: successUrl,
      cancel_url: cancelUrl,
    });

    await orderDetails.update({ stripeSessionId: session.id });
    return res.status(200).send({
      mesg: "successfully created checkout session",
    });
  } catch (err) {
    console.log("Error while creating checkout session", err);
    return res.status(400).send({
      mesg: "Internal server error",
    });
  }
};

module.exports = {
  stripeWebHook,
  checkOutSession,
};
