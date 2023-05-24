const express = require("express");
const axios = require("axios");

require("dotenv").config();

const payRouter = express.Router();
const stripe = require("stripe")(process.env.STRIPE_API_KEY);
const YOUR_DOMAIN = process.env.CLIENT_URL;
const PRICE_ID_30 = process.env.STRIPE_PRICE_ID_30;
const PRICE_ID_80 = process.env.STRIPE_PRICE_ID_80;
const PRICE_ID_150 = process.env.STRIPE_PRICE_ID_150;

payRouter.post("/", async (req, res) => {
  const price = req.body.price;
  const priceID = eval("PRICE_ID_" + String(price));
  console.log(priceID);

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        price: "price_1N9tDjIrQBekSI5uemCL5Jaz",
        quantity: 1
      }
    ],
    success_url: YOUR_DOMAIN,
    cancel_url: YOUR_DOMAIN
  });
  console.log(session.url);
  res.redirect(303, session.url);
  //   res.status(201).send({
  //     result: "hello"
  //   });
});

module.exports = payRouter;
