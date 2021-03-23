const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const stripe = require('stripe')(
  '00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'
);

// API

// - App config
const app = express();

// - Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// - App routes
app.get('/', (req, res) => {
  res.status(200).send('hello world');
});

app.post('/payments/create', async (req, res) => {
  const { total } = req.query;
  console.log('Payment Request Recieved ROOM!!', total);

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: 'usd',
    });

    //   ok - created
    return res.status(201).send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    return res.status(400).send({ errormessage: error.message });
  }
});
// - Listen command
exports.api = functions.https.onRequest(app);

// example endpoint
// http://localhost:5001/clone-00000/us-central1/api
