const app = require("../server");
const request = require('request');

describe("server api", function(){
    const baseTestUrl = 'http://localhost:8082';
    let server;
    
    beforeAll(function(done) {
        console.log("starting server for tests");
        server = app.listen(8082, function() {
            console.log("server connected on 8082 for tests");
            done();
        })
    })
    
    afterAll(function(done) {
        console.log("\nClosing server");
        server.close();
        server = null;
        console.log("Server Closed");
        done();
    });
    
    it("returns json response at root endpoint", function(done){
        request.get(`${baseTestUrl}/`, function(err, res, body) {
            const expectedResponse = {
                "hello": "world"
            };
            const serverResponse = JSON.parse(body);
            expect(serverResponse).toEqual(expectedResponse);
            done();
        });
    });
})