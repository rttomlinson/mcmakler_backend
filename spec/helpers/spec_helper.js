// Set test environment
process.env.NODE_ENV = 'test';

const mongoose = require('mongoose');

//connect to the databse if not already connected
beforeAll((done) => {
    if (mongoose.connection.readyState) {
        done();
    }
    else {
        require('../../mongoConnect')()
        .then(() => {
            return require('../../seeds/seeds')();
        })
        .then(() => {
            done();
        })
        .catch((e) => console.error(e.stack));
    }
});

afterEach((done) => {
    //clean after each test
    require('../../seeds/clean')()
    .then(() => {
        done();
    })
    .catch((e) => console.error(e.stack));
})