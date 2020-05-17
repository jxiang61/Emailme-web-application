const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');

require('./models/User');
require('./models/Survey');
require('./services/passport'); //make sure to execute the passport part
const authRoutes = require('./routes/authRoutes');
const billingRouetes = require('./routes/billingRoutes');
const surveyRoutes = require('./routes/surveyRoutes');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const keys = require('./config/keys');


//connect the cloud mongoDB in Atlas
mongoose.connect(keys.mongoURI);

const app = express();

//middleware, convert the body to json
app.use(bodyParser.json());

app.use(
    cookieSession({
        //how long the cookie exists
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);

app.use(passport.initialize());
app.use(passport.session());

authRoutes(app);
billingRouetes(app);
surveyRoutes(app);

//let express handle the incoming route request from front end
if (process.env.NODE_ENV === 'production') {
    //Express will serve up the production assets
    //like main.js file in build
    app.use(express.static('client/build'));

    //Express will serve up the index.html file
    //if express doesn't know the request route from front end,
    //just send index.html
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

//wait for web server assigning port for us.
//if web server give us a port, use the first one,
//otherwise, use the second one.
const PORT = process.env.PORT || 5000;
app.listen(PORT);
