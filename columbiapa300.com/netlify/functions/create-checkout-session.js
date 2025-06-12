const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const recurringPriceMap = {
  25: "price_1RZ2YAB0bQHfouEEvVfVhLeQ",
  100: "price_1RZ2YZB0bQHfouEEDFl98Are",
  250: "price_1RZ2ZNB0bQHfouEEAmW7Ocpb",
  500: "price_1RZ2ZnB0bQHfouEEmYoCifnn"
};

exports.handler = async (event) => {
  const body = JSON.parse(event.body);
  const { name, email, amount, recurring, note } = body;

  try {
    let session;
    if (recurring) {
      const priceId = recurringPriceMap[amount];
      if (!priceId) throw new Error("Invalid recurring price");

      session = await stripe.checkout.sessions.create({
        mode: 'subscription',
        payment_method_types: ['card'],
        customer_email: email,
        line_items: [{ price: priceId, quantity: 1 }],
        success_url: 'https://columbiapa300.com/thank-you',
        cancel_url: 'https://columbiapa300.com/donate'
      });
    } else {
      session = await stripe.checkout.sessions.create({
        mode: 'payment',
        payment_method_types: ['card'],
        customer_email: email,
        line_items: [{
          price_data: {
            currency: 'usd',
            product_data: {
              name: "Donation to: Marketing & Outreach",
              description: `From ${name} — ${note || 'No message provided'}`
            },
            unit_amount: parseInt(amount) * 100
          },
          quantity: 1
        }],
        success_url: 'https://columbiapa300.com/thank-you',
        cancel_url: 'https://columbiapa300.com/donate'
      });
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ id: session.id }),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
