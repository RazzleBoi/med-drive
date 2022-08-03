const router = require("express").Router();
const Stripe = require("stripe");

const stripe = Stripe(process.env.SECRET_KEY);

router.post('/pay', async (req, res ) => {
  try{
    const {name, amount} = req.body;
    console.log(amount);
    if(!name) return res.status(400).json({ message: 'Please enter name' });
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: 'RON',
      payment_method_types: ["card"],
      metadata: {name},
    });
    console.log(paymentIntent);
    const clientSecret = paymentIntent.client_secret;
    res.json({ message: 'Payment initiated', clientSecret: clientSecret });
  } catch(err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server Error' })
  }
})

module.exports = router;