const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');


//mongoose model class: give us to access collection
const User = mongoose.model('users');

//define a function to encode user, the goal is to create specific cookie
//after user is pushed in to DB, this function will be called automatically
passport.serializeUser((user, done) => {
    done(null, user.id);
});

//take users' id from cookie, extract user's info and store user's info in req
//so we can say, req comes from cookie
passport.deserializeUser((id, done) => {
    User.findById(id)
        .then((user) => {
            done(null, user);
        });
});


//passport will use this specific strategy
passport.use(new GoogleStrategy(
    {
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
        //the query returns a Promise
        User.findOne({googleId: profile.id})
            .then((user) => {
                if(!user) {
                    new User({googleId: profile.id})
                        .save()
                        .then(user => done(null, user));
                } else {
                    done(null, user);
                }
            })
    }
));
