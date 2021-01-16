const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const stripe = require('stripe')('sk_test_51HqHC0KUEqdWaOUoG0CKhZ2ldAwScsKCCeQRs3kQpDhA0Qg0fwe8MLNPRna082a7axGmvbxFSbQoyqC8GBWUTGXM00VzlAoPgK');

// API 

// App config
const app = express();

// Middlewares 
app.use(cors({origin: true}));
app.use(express.json());

// API routes
app.get('/', (req, res) => res.status(200).send('hello world'))
// create endpoint - as in payment.js (/payments/create?total...)
app.post('/payments/create', async(req, res) => {
const total = req.query.total; // or use req.params['total']
console.log("payment req recievef for amount", total);

const paymentIntent = await stripe.paymentIntents.create({
    amount: total, // subunits of the currency (cents)
    currency: 'usd' 
});
res.status(201).send({
    clientSecret: paymentIntent.client_secret,
})
})

// Listen cmd
exports.api = functions.https.onRequest(app);

// Example endpoint
// 'http://localhost:5001/app-592dc/us-central1/api'











// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
