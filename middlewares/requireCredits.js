//do something between app and routes(post, get, etc.)
module.exports = (req, res, next) => {
    if(req.user.credits < 1) {
        return res.status(403).send({error: 'You don\'t have enough credits'});
    }

    //go to the next step
    next();
};
