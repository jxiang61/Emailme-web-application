//do something between app and routes(post, get, etc.)
module.exports = (req, res, next) => {
    if(!req.user) {
        return res.status(401).send({error: 'You must login'});
    }

    //go to the next step
    next();
};
