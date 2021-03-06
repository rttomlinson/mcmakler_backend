## Technical Stack
* NodeJS v7.10.0
* Express v4.15.3
* MongoDB v3.4.2
* Linux - Ubuntu 14.04.5 LTS
* Cloud9 - IDE

NodeJS was selected for familiarity and availability of Express  
MongoDB was selected as per assignment

### Setting up the database

You will require mongoDB to use this setup.  
If you do not have mongoDB, please visit their installation page at (https://docs.mongodb.com/manual/installation/)

*Note - MongoDB will default to listen on port 27017

### Install dependencies

Run `npm i` in the root directory to install all dependencies

### Starting the server

To start the local development server, use the `npm run start:dev`. This will use nodemon to refresh the server when changes are made.  
If you'd like you only start the server once, use `npm start`.

The server will default to port 8080. Navigate to localhost:8080.

Since this is only the backend, you will need to manually go to each endpoint.

### Running tests

All tests can be found in the spec directory.  
The testing framework using is Jasmine.  
Test are run on port 8082.  
`npm run test` will run the test suite once and `npm run test:watch` will watch for changes and rerun tests.

### Fetching the last three days

To fetch the last three days (including the current day), run `npm run fetch`.  
This can be run without the server up, but still requires mongoDB to be running.

Alternatively, you are able to navigate to /neo to request NEOs for specified dates. Refer to the endpoints section for more information


## Endpoints
* /neo?startDate=[String]&endDate=[String]
    * This will update the database with new NEOs between the specified dates
    * difference in dates cannot be greater than 7 days
    * dates in the form of YYYY-MM-DD
    * both required
* /neo/fastest
    * returns an object with key `fastestNEO` for the fastest NEO object
* /neo/hazardous
    * return an object with key `"potentiallyHazardousNEOs` which is an array of objects with `isHazardous: true`

### Seeding the database

If you'd like to seed the database with some older data for development, run `npm run mg:seed`.  
This is the same data that is used for the tests.

### Environmental variables

You will need to setup a .env file in the root directory
You may set environmental variables in here. One per line.

`NASA_API_KEY=N7LkblDsc5aen05FJqBQ8wU4qSdmsftwJagVK7UD`

You may also setup an alternate port for the test server on the TEST_PORT variable

Author: Renzo Tomlinson