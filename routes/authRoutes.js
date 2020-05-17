const passport = require("passport");

//the idea about data between front-end and back-end:
//front-end pass data to req
//back-end takes in the data from req, then do something
//then back-end send res to front-end

module.exports = (app) => {
    app.get(
        '/auth/google',
        passport.authenticate(
            'google', //passport knows which strategy should be used
            {
                //asking google to give us the users' info
                scope:['profile', 'email']
            }
        ));

    //with the code after callback, passport knows how to send users' info back
    app.get(
        '/auth/google/callback',
        passport.authenticate('google'),
        (req, res) => {
            res.redirect('/surveys');
        }
    );

    //handle for logging out
    app.get('/api/logout', (req, res) => {
        //takes the user cookie and kill it
        req.logout();
        res.redirect('/');
    });

    //req comes from cookie handled by passport
    app.get('/api/current_user', (req, res) => {

        res.send(req.user);
    });
}
