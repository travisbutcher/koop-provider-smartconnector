'use strict'
// Cache configured time or 1 hour
const config = require('config')
const ttl = (config.craigslist && config.craigslist.ttl) || 60 * 60
const request = require('request').defaults({gzip: true})
const types = require('./mappings/types.js')
var tokenExpires = 0;
var token = null;
const basic = 'dGJ1dGNoZXJAZXNyaS5jb206dGJ1dGNoZXJAZXNyaS5jb20='

module.exports = function () {
  // This is our one public function it's job its to fetch data from craigslist and return as a feature collection
  this.getData = function (req, callback) {
    if(Date.now() > tokenExpires)
    {
      console.log('getting token')
      getToken(function(returnValue) {
        requestData(req.params.id,function(geoJson){
            callback(null,geoJson);
        });
      });
    }else{
        requestData(req.params.id,function(geoJson){
          callback(null,geoJson);
        });
    }
  }
}

function requestData(type, callback){
    //console.log(req.params.id);
    //const type = req.params.id;
    var request = require("request");
    var requestURL = `https://connecttest.smartconservationtools.org:8443/server/api/query/${types[type]}`;
    var options = { method: 'GET',
      url: requestURL,
      qs: 
       { token: token,
         format: 'geojson',
         date_filter: 'waypointdate' },
      headers: 
       { } 
       };
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    request(options, function (error, response, body) {
      if (error) {
        console.log(eror);
        throw new Error(error);
      }

      //Format the Feature for the response
      callback(translate(body));
    });
}

function getToken(callback){
    var request = require("request");
    var options = { method: 'POST',
    url: 'https://connecttest.smartconservationtools.org:8443/server/api/sharedlink/token/',
    headers: 
    {
      'content-type': 'application/json',
      authorization: 'Basic ' + basic },
      body: { expiresAfter: 3600 },
      json: true
    };

    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    request(options, function (error, response, body) {
    if (error) 
      throw new Error(error);

      token = body.uuid;
      tokenExpires = body.expiresAt;
      callback(null,token);
    });
}

// Map accross all elements from a Craigslist respsonse and translate it into a feature collection
function translate (data) {
  // translate the API response into geojson
  const json = JSON.parse(data)
  if(json.features)
  {
    // create the shell that will hold all the properties
    return {
      type: 'FeatureCollection',
      features: json.features
    }
  } else {
    return {
      type: 'FeatureCollection',
      features: []
    }
  }
}