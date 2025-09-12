/**
 * Netlify Function: create-checkout-session
 * Handles Stripe Checkout for ColumbiaPA300 donations.
 * Supports both one-time and recurring donations.
 */

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Recurring donation mapping → Stripe price IDs (from Stripe dashboard)
const recurringPriceMap = {
  25: process.env.STRIPE_PRICE_25,
  100: process.env.STRIPE_PRICE_100,
  250: process.env.STRIPE_PRICE_250,
  500: process.env.STRIPE_PRICE_500,
};

exports.handler = async (event) => {
  try {
    if (!event.body) {
      return {
        statusCode: 400,
        body: JSON.stringify({ success: false, message: "Missing request body" }),
      };
    }

    const { name, email, amount, recurring, note } = JSON.parse(event.body);

    if (!email || !amount) {
      return {
        statusCode: 400,
        body: JSON.stringify({ success: false, message: "Email and amount are required" }),
      };
    }

    let session;

    if (recurring) {
      const priceId = recurringPriceMap[amount];
      if (!priceId) {
        return {
          statusCode: 400,
          body: JSON.stringify({ success: false, message: "Invalid recurring donation amount" }),
        };
      }

      session = await stripe.checkout.sessions.create({
        mode: "subscription",
        payment_method_types: ["card"],
        customer_email: email,
        line_items: [{ price: priceId, quantity: 1 }],
        success_url: `${process.env.SITE_URL}/thank-you`,
        cancel_url: `${process.env.SITE_URL}/donate`,
      });
    } else {
      session = await stripe.checkout.sessions.create({
        mode: "payment",
        payment_method_types: ["card"],
        customer_email: email,
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: "Donation to ColumbiaPA300",
                description: `From ${name || "Anonymous"} — ${note || "No message provided"}`,
              },
              unit_amount: parseInt(amount, 10) * 100,
            },
            quantity: 1,
          },
        ],
        success_url: `${process.env.SITE_URL}/thank-you`,
        cancel_url: `${process.env.SITE_URL}/donate`,
      });
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, id: session.id }),
    };
  } catch (err) {
    console.error("Stripe Checkout Error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, message: "Failed to create checkout session" }),
    };
  }
};
