
const stripe = require("stripe")("sk_test_51N1jgOSJgpumi8zKYZAkpD0RAASAEaLYfSAZwhy2pYfSKnDSNX1IaPv5RF3TNKOKz1Uu2HBYGWU9PwQLBNwy0TEu00B0SPixd4");

const payment = async()=>{

    const paymentIntent = await stripe.paymentIntents.create({
        amount:100,
        currency:"usd",
        payment_method_types : ["card"],
        receipt_email:"deepanshusing54@gmail.com"
    })
    const clientSecret = paymentIntent.client_secret
    console.log(clientSecret)
}

payment()
app.post("/webhook", express.raw({type: 'application/json'}),(req,res)=>{
    // const stripeWebHook = (req,res) =>{
    let endPointSecret = "whsec_32e93f7afb3f6c965bf589c6e73abb8114378f49efac5d1991fda4e36037e925"
        const signature = req.headers["stripe-signature"]
        let event = stripe.webHooks.constructEvent(req.body,signature,endPointSecret);
    
        switch(event.type){
            case  "payment_intent.succeeded":
            console.log("payment successful");
            break;
            case "payment_intent.payment_failed":
                console.log("payment failed");
                break; 
            default :
            console.log(`unhandle event type ${event.type}`)
        }
        return res.sendStatus(200);
    }
)

// --------------------------------------------------------------------