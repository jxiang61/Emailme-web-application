const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');
require('./models/User');
require('./services/passport'); //make sure to execute the passport part
const authRoutes = require('./routes/authRoutes');
const mongoose = require('mongoose');
const keys = require('./config/keys');


//connect the cloud mongoDB in Atlas
mongoose.connect(keys.mongoURI);

const app = express();


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




//wait for web server assigning port for us.
//if web server give us a port, use the first one,
//otherwise, use the second one.
const PORT = process.env.PORT || 5000;
app.listen(PORT);
