const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send({hi: 'body'})

});

//wait for web server assigning port for us.
//if web server give us a port, use the first one,
//otherwise, use the second one.
const PORT = process.env.PORT || 5000;
app.listen(PORT);
