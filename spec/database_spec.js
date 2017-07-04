const NEO = require('../models').NEO;

const nasaAPIHelper = require('../helpers/nasaAPIHelper');
//This data is from 2017-06-01 to 2017-06-03 from the /rest/v1/feed endpoint
//Full URL: https://api.nasa.gov/neo/rest/v1/feed?start_date=2017-06-01&end_date=2017-06-03&detailed=true&api_key=N7LkblDsc5aen05FJqBQ8wU4qSdmsftwJagVK7UD

const near_earth_objects = {
    "2017-06-02": [{
        "links": {
            "self": "https://api.nasa.gov/neo/rest/v1/neo/3154511?api_key=N7LkblDsc5aen05FJqBQ8wU4qSdmsftwJagVK7UD"
        },
        "neo_reference_id": "3154511",
        "name": "(2003 KQ18)",
        "nasa_jpl_url": "http://ssd.jpl.nasa.gov/sbdb.cgi?sstr=3154511",
        "absolute_magnitude_h": 20.9,
        "estimated_diameter": {
            "kilometers": {
                "estimated_diameter_min": 0.1756123185,
                "estimated_diameter_max": 0.3926810818
            },
            "meters": {
                "estimated_diameter_min": 175.6123184804,
                "estimated_diameter_max": 392.6810818086
            },
            "miles": {
                "estimated_diameter_min": 0.1091204019,
                "estimated_diameter_max": 0.2440006365
            },
            "feet": {
                "estimated_diameter_min": 576.1559189633,
                "estimated_diameter_max": 1288.3238004408
            }
        },
        "is_potentially_hazardous_asteroid": false,
        "close_approach_data": [{
            "close_approach_date": "2017-06-02",
            "epoch_date_close_approach": 1496386800000,
            "relative_velocity": {
                "kilometers_per_second": "12.1197130349",
                "kilometers_per_hour": "43630.9669256846",
                "miles_per_hour": "27110.5860877955"
            },
            "miss_distance": {
                "astronomical": "0.3693462674",
                "lunar": "143.6756896973",
                "kilometers": "55253416",
                "miles": "34332880"
            },
            "orbiting_body": "Earth"
        }],
        "orbital_data": {
            "orbit_id": "15",
            "orbit_determination_date": "2017-04-06 09:14:04",
            "orbit_uncertainty": "1",
            "minimum_orbit_intersection": ".132674",
            "jupiter_tisserand_invariant": "4.550",
            "epoch_osculation": "2458000.5",
            "eccentricity": ".2230992242400648",
            "semi_major_axis": "1.448273994114161",
            "inclination": "21.47109692994731",
            "ascending_node_longitude": "72.78570584933668",
            "orbital_period": "636.6115671075125",
            "perihelion_distance": "1.125165189540232",
            "perihelion_argument": "152.1846547198185",
            "aphelion_distance": "1.771382798688091",
            "perihelion_time": "2457856.902044799273",
            "mean_anomaly": "81.20377722186646",
            "mean_motion": ".565493966180483",
            "equinox": "J2000"
        }
    }],
    "2017-06-03": [{
        "links": {
            "self": "https://api.nasa.gov/neo/rest/v1/neo/3774621?api_key=N7LkblDsc5aen05FJqBQ8wU4qSdmsftwJagVK7UD"
        },
        "neo_reference_id": "3774621",
        "name": "(2017 JL3)",
        "nasa_jpl_url": "http://ssd.jpl.nasa.gov/sbdb.cgi?sstr=3774621",
        "absolute_magnitude_h": 23.067,
        "estimated_diameter": {
            "kilometers": {
                "estimated_diameter_min": 0.0647373588,
                "estimated_diameter_max": 0.1447571349
            },
            "meters": {
                "estimated_diameter_min": 64.7373587744,
                "estimated_diameter_max": 144.7571349034
            },
            "miles": {
                "estimated_diameter_min": 0.0402259174,
                "estimated_diameter_max": 0.0899478857
            },
            "feet": {
                "estimated_diameter_min": 212.3929161615,
                "estimated_diameter_max": 474.9249984765
            }
        },
        "is_potentially_hazardous_asteroid": false,
        "close_approach_data": [{
            "close_approach_date": "2017-06-03",
            "epoch_date_close_approach": 1496473200000,
            "relative_velocity": {
                "kilometers_per_second": "9.9585719199",
                "kilometers_per_hour": "35850.8589117799",
                "miles_per_hour": "22276.3295277112"
            },
            "miss_distance": {
                "astronomical": "0.0818581883",
                "lunar": "31.8428344727",
                "kilometers": "12245811",
                "miles": "7609194"
            },
            "orbiting_body": "Earth"
        }],
        "orbital_data": {
            "orbit_id": "13",
            "orbit_determination_date": "2017-06-21 06:18:26",
            "orbit_uncertainty": "7",
            "minimum_orbit_intersection": ".081974",
            "jupiter_tisserand_invariant": "4.065",
            "epoch_osculation": "2458000.5",
            "eccentricity": ".3680660402065696",
            "semi_major_axis": "1.71115484890923",
            "inclination": "16.09987044509753",
            "ascending_node_longitude": "69.20868315295026",
            "orbital_period": "817.5840216378498",
            "perihelion_distance": "1.081336859490939",
            "perihelion_argument": "200.3991279563857",
            "aphelion_distance": "2.340972838327521",
            "perihelion_time": "2457923.839033960549",
            "mean_anomaly": "33.75548817467814",
            "mean_motion": ".4403217167561802",
            "equinox": "J2000"
        }
    }]
}

describe("NASA NEO Data Helpers", function() {

    //reseed the database before each new test
    beforeEach(function(done) {
        require('../seeds/seeds')()
            .then(() => {
                done();
            });
    });

    it("returns data in a cleaned form for the database", function() {
        /* Date should be a string in YYYY-MM-DD form */
        let date = "2017-06-02";
        const testValue = near_earth_objects[date][0];

        let finalValue = {
            date: Date.parse(date),
            reference: "3154511",
            name: "(2003 KQ18)",
            speed: 43630.9669256846,
            isHazardous: false
        }

        let cleanedValue = nasaAPIHelper.cleanNEOData(date, testValue);
        //expect the cleanedValue to return an object with keys that correspond to the db schema
        expect(cleanedValue).toEqual(finalValue);
    })

    it("returns two neos from test data", function() {

        let finalValues = [{
            date: Date.parse("2017-06-02"),
            reference: "3154511",
            name: "(2003 KQ18)",
            speed: 43630.9669256846,
            isHazardous: false
        }, {
            date: Date.parse("2017-06-03"),
            reference: "3774621",
            name: "(2017 JL3)",
            speed: 35850.8589117799,
            isHazardous: false
        }];

        expect(nasaAPIHelper.cleanNEOs(near_earth_objects)).toEqual(finalValues);
    })

    it("updates the database with new values ignoring repeated entries", function(done) {

        let fetchValues = near_earth_objects_two;
        
        //we expect that the count before is 18
        //we expect that the count after is 19
        //mock out the fetch call used
        NEO.updateOrInsert(fetchValues)
            .then(() => {
                console.log("returned from helper");
                return NEO.find()
            })
            .then((neos) => {
                expect(neos.length).toEqual(19);
                done()
            })
    });
})






const near_earth_objects_two = [{
            date: Date.parse("2017-06-02"),
            reference: "3134554511",
            name: "(2003 KQ158)",
            speed: 43630.9669256846,
            isHazardous: true
        }, {
            date: Date.parse("2017-06-03"),
            reference: "3774621",
            name: "(2017 JL3)",
            speed: 35850.8589117799,
            isHazardous: false
        }, {
            date: Date.parse("2017-06-03"),
            reference: "3774621",
            name: "(2017 JL3)",
            speed: 35850.8589117799,
            isHazardous: false
        }, {
            date: Date.parse("2017-06-03"),
            reference: "3774621",
            name: "(2017 JL3)",
            speed: 35850.8589117799,
            isHazardous: false
        }];
