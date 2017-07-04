/**
 * 
 * 
 * 
 * Single NEO from Nasa is expected to look like so:

{
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
        "close_approach_data": [
          {
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
          }
        ],
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
      }
*/
const moment = require('moment');
require('isomorphic-fetch');
const nasaAPIHelper = {};

nasaAPIHelper.cleanNEOData = function(date, asteroidData) {
  let NEOData = {};
  //create date obj and add to object
  NEOData.date = Date.parse(date);
  //neo_reference_id as reference
  NEOData.reference = asteroidData.neo_reference_id;
  NEOData.name = asteroidData.name;
  NEOData.speed = +asteroidData.close_approach_data[0].relative_velocity.kilometers_per_hour;
  NEOData.isHazardous = asteroidData.is_potentially_hazardous_asteroid;
  return NEOData;
};

nasaAPIHelper.cleanNEOs = function(near_earth_objects) {
  //get dates for neos
  const dates = Object.keys(near_earth_objects);
  const neos = [];
  dates.forEach((date) => {
    //array of corresponding neos for that date
    const neosForDay = near_earth_objects[date];
    //loop through each neo passing to cleanNEOData helper and add to neos
    neosForDay.forEach((neo) => {
      neos.push(nasaAPIHelper.cleanNEOData(date, neo));
    });
  });
  return neos;
};

nasaAPIHelper.fetchData = function(url, fn = fetch) {
  return fn(url)
    .then((response) => {
      if (!response.ok) {
        throw response;
      }
      return response;
    })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};


nasaAPIHelper.fetchNEOs = function(startDate, endDate, fetchData = nasaAPIHelper.fetchData) {
  if (!(endDate && startDate)) {
    throw new Error("Dates missing");
  }

  endDate = moment(endDate);
  startDate = moment(startDate);

  if (!(endDate.isValid() && startDate.isValid())) {
    throw new Error("Invalid Dates");
  }

  endDate = endDate.format('YYYY-MM-DD');
  startDate = startDate.format('YYYY-MM-DD');
  let nasaUrl = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&detailed=true&api_key=${process.env.NASA_API_KEY}`;
  return fetchData(nasaUrl)
    .then((neos) => {
      return neos = nasaAPIHelper.cleanNEOs(neos.near_earth_objects);
    }).
    catch((error) => {
      console.log("error", error);
    });
};

module.exports = nasaAPIHelper;
