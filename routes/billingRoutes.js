const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {


    //after make a payment, we get the token back from stripe
    //with the body-parser, we can easily get the json format req.body
    //req contains the card info, which comes from token
    app.post('/api/stripe', requireLogin, async (req, res) => {
        //check isLogin in middleware

        //the method below comes from documentations
        const charge = await stripe.charges.create({
            amount:500,
            currency: 'usd',
            description: '$5 for 5 credits',
            source: req.body.id
        });

        req.user.credits += 5;
        const user = await req.user.save();

        //send user's info back to front end
        //so we can see the credits changes in the web page
        res.send(user);

    })
}
