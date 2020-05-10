//heroku uses the production env
if (process.env.NODE_ENV === 'production') {
    //in production, return the prod set of keys
    module.exports = require('./prod');
} else {
    //return dev keys
    module.exports = require('./dev');
}
