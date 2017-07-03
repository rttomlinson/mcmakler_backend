//set environmental variables
require('dotenv');

const express = require("express");
const app = express();

const NEO = require('./models').NEO;

app.use('/neo', require("./routes/neoRouter"));

app.get('/', function(req, res) {
    res.json({
        "hello": "world"
    });
});

const port = process.env.PORT || 8080;
// If we're running this file directly
// start up the server
if (require.main === module) {
    app.listen(port, function() {
        console.log(`Example app listening on port ${port}!`);
    });
}

module.exports = app;
