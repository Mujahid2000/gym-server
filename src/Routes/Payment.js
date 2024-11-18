const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


router.post('/', async (req, res) => {
  const { trainerData } = req.body;

  console.log("Request Body:", req.body); // Debugging request body
  if (!trainerData || !trainerData.name || !trainerData.salary) {
    return res.status(400).json({ error: "Invalid trainer data. Missing name or salary." });
  }

  try {
    const lineItems = [
      {
        price_data: {
          currency: 'USD',
          product_data: {
            name: trainerData.name,
          },
          unit_amount: Math.round(trainerData.salary * 100), // Stripe expects amount in cents
        },
        quantity: 1,
      },
    ];

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: lineItems,
      success_url: 'https://fitness-website-amber.vercel.app/dashboard/success',
      cancel_url: `https://fitness-website-amber.vercel.app/dashboard/cancel`,
    });

    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error("Error creating checkout session:", error.message);
    res.status(500).json({ error: "An error occurred while creating the checkout session" });
  }
});

module.exports = router;
