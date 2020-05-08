const passport = require("passport");

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
    app.get('/auth/google/callback', passport.authenticate('google'))

    //handle for logging out
    app.get('/api/logout', (req, res) => {
        //takes the user cookie and kill it
        req.logout();
    });

    //req comes from cookie handled by passport
    app.get('/api/current_user', (req, res) => {

        res.send(req.user);
    });
}
