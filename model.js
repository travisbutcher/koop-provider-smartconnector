'use strict'
// Cache configured time or 1 hour
const config = require('config')
const ttl = (config.smart && config.smart.ttl) || 60 * 60
const request = require('request').defaults({gzip: true})
const types = require('./mappings/types.js')
const connectors = require('./mappings/connectors.js')
var tokenExpires = 0;
var token = null;
const basic = '<YOUR TOKEN HERE>'

module.exports = function () {
  // This is our one public function it's job its to fetch data from SMART and return as a feature collection
  this.getData = function (req, callback) {

    //Check to see if the token from SMART has expired.
    if(Date.now() > tokenExpires)
    {
      //Request a new Token from the SMART API
      getToken(req.params.server,function(returnValue) {
        requestData(req.params.id,function(geoJson){
            callback(null,geoJson);
        });
      });
    }else{
        requestData(req.params.id,req.params.server,function(geoJson){
          callback(null,geoJson);
        });
    }
  }
}

//Retrieve the data for this query from the SMART Connect Server
function requestData(type,server, callback){
    var request = require("request");
    var requestURL = `${connectors[server]}/server/api/query/${types[type]}`;
    var options = { method: 'GET',
      url: requestURL,
      qs: 
       { token: token,
         format: 'geojson',
         date_filter: 'waypointdate' },
      headers: 
       { } 
       };

    //Determine if the Request was valid
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

function getToken(server,callback){
    var request = require("request");
    var options = { method: 'POST',
    url: `${connectors[server]}/server/api/sharedlink/token/`,
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

// Map accross all elements from a SMART respsonse and translate it into a feature collection
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