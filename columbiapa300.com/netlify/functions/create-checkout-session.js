const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  const body = JSON.parse(event.body);
  const { name, email, amount, recurring, note, purpose } = body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Donation to: ${purpose}`,
              description: `From ${name} — ${note || 'No message provided'}`,
            },
            unit_amount: parseInt(amount) * 100,
            recurring: recurring ? { interval: 'month' } : undefined,
          },
          quantity: 1,
        },
      ],
      mode: recurring ? 'subscription' : 'payment',
      success_url: 'https://columbiapa300.com/thank-you',
      cancel_url: 'https://columbiapa300.com/donate',
    });

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
