const app = require("../server");
const request = require('request');

//These tests require connection to a mongodb. Check spec_helper files for more information
const NEO = require('../models').NEO;

describe("server api", function() {
    const baseTestUrl = 'http://localhost:8082';
    let server;

    beforeAll(function(done) {
        console.log("starting server for tests");
        server = app.listen(process.env.TEST_PORT || 8082, function() {
            console.log("server connected on 8082 for tests");
            done();
        });
    });

    //reseed the database before each new test
    beforeEach(function(done) {
        require('../seeds/seeds')()
            .then(() => {
                done();
            });
    });


    afterAll(function(done) {
        console.log("\nClosing server");
        server.close();
        server = null;
        console.log("Server Closed");
        done();
    });

    it("returns json response at root endpoint", function(done) {
        const expectedResponse = {
            "hello": "world"
        };
        request.get(`${baseTestUrl}/`, function(err, res, body) {

            const serverResponse = JSON.parse(body);
            expect(serverResponse).toEqual(expectedResponse);
            done();
        });
    });
    it("returns response at /neo/hazardous endpoint", function(done) {
        const expectedResponse = [{
            date: "2017-06-01T00:00:00.000Z",
            reference: '2418094',
            name: '418094 (2007 WV4)',
            speed: 83656.2560790809,
            isHazardous: true
        }];
        request.get(`${baseTestUrl}/neo/hazardous`, function(err, res, body) {

            const serverResponse = JSON.parse(body);
            const potentiallyHazardousNEOs = serverResponse.potentiallyHazardousNEOs;
            const firstNEO = potentiallyHazardousNEOs[0];
            expect(Array.isArray(potentiallyHazardousNEOs)).toBe(true);
            expect(firstNEO.date).toEqual(expectedResponse[0].date);
            expect(firstNEO.reference).toEqual(expectedResponse[0].reference);
            expect(firstNEO.name).toEqual(expectedResponse[0].name);
            expect(firstNEO.speed).toEqual(expectedResponse[0].speed);
            expect(firstNEO.isHazardous).toEqual(expectedResponse[0].isHazardous);
            done();
        });
    });
    it("returns response at /neo/fastest endpoint", function(done) {
        const expectedResponse = {
            date: "2017-06-01T00:00:00.000Z",
            reference: '2418094',
            name: '418094 (2007 WV4)',
            speed: 83656.2560790809,
            isHazardous: true
        };
        request.get(`${baseTestUrl}/neo/fastest`, function(err, res, body) {

            const serverResponse = JSON.parse(body);

            expect(serverResponse.fastestNEO.date).toEqual(expectedResponse.date);
            expect(serverResponse.fastestNEO.reference).toEqual(expectedResponse.reference);
            expect(serverResponse.fastestNEO.name).toEqual(expectedResponse.name);
            expect(serverResponse.fastestNEO.speed).toEqual(expectedResponse.speed);
            expect(serverResponse.fastestNEO.isHazardous).toEqual(expectedResponse.isHazardous);
            done();
        });
    });
    it("returns 200 on successful NASA API fetch at /neo with valid dates endpoint", function(done) {
        request.get(`${baseTestUrl}/neo?startDate=2017-06-01&endDate=2017-06-03`, function(err, res, body) {
            expect(res.statusCode).toEqual(200);
            done();
        });
    });
    it("returns 30 NEOS in DB on successful NASA API fetch update at /neo 06-01 -> 06-04 valid dates endpoint", function(done) {
        let p = new Promise((resolve) => {
            request.get(`${baseTestUrl}/neo?startDate=2017-06-01&endDate=2017-06-04`, function(err, res, body) {
                expect(res.statusCode).toEqual(200);
                resolve();
            });
        });
        p.then(() => {
            NEO.find()
                .then((neos) => {
                    expect(neos.length).toEqual(30);
                    done();
                })
        });
    })
});
