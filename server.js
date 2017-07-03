//set environmental variables
require('dotenv');

const express = require("express");
const app = express();
const wagner = require("wagner-core");

//add models to wagner
wagner.factory('mongoModels', function() {
    return require('./models');
});

app.use('/neo', wagner.invoke(require("./routes/neoRouter")));

app.get('/', function(req, res) {
    res.json({
        "hello": "world"
    });
});

const port = process.env.PORT || 8080;

//rely on express build-in error handling

// If we're running this file directly
// start up the server
if (require.main === module) {
    app.listen(port, function() {
        console.log(`Example app listening on port ${port}!`);
    });
}

module.exports = app;
