Technical Stack
* NodeJS v7.10.0
* Express v4.15.3
* MongoDB v3.4.2
* Linux - Ubuntu 14.04.5 LTS

NodeJS was selected for familiarity and availability of Express
MongoDB was selected as per assignment

You will require mongoDB to use this setup.
If you do not have mongoDB, please visit their installation page at [https://docs.mongodb.com/manual/installation/]

*Note - MongoDB will default to listen on port 27017

Run npm i in the root directory in install all dependencies

To start the local development server use the npm run start:dev, this will utilize nodemon to refresh the server when changes are made
If you'd like you only start the server once, use npm start.
The server will default to port 8080. Navigate to localhost:8080.

Since this is only the backend, you will need to manually go to each endpoint.

Test are run on port 8082.
To run the tests type npm run test to run the tests once and npm run test:watch to run the tests whenever changes are made



/endpoints
* /neo?startDate=[String]&endDate=[String] (in the form of YYYY-MM-DD) both required
* 

To start the development server run npm run start:dev in the mcmakler directory
To run tests run npm test
To seed the database in developent run npm run mg:seed

You will need to setup a .env file in the root directory
You may set environmental variables in here. One per line.

NASA_API_KEY=N7LkblDsc5aen05FJqBQ8wU4qSdmsftwJagVK7UD

You may also setup an alternate port for the test server on the TEST_PORT variable

