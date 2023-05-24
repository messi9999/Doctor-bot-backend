const stripe = require("stripe")(
  "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"
);

const run = async () => {
  //   const product = await stripe.products.create({
  //     name: "pay_1"
  //   });
  //   console.log(product.id);
  //   const price = await stripe.prices.create({
  //     product: "prod_Nvk2mOgeLrQztk",
  //     unit_amount: 300,
  //     currency: "usd"
  //   });
  //   console.log(price.id);

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        price: "price_1N9tDjIrQBekSI5uemCL5Jaz",
        quantity: 1
      }
    ],
    success_url: "http://localhost:3000",
    cancel_url: "http://localhost:3000/cancel"
  });
  console.log(session.success_url);
};

run();
