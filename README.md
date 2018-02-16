# Koop Provider for SMART Connect
This Koop (https://github.com/koopjs/koop) provider is designed for use with the WCS Smart Connect Platform to leverage the data from the system to be displayed in Geoservices (http://geoservices.github.io/) web specifactions.

This app relies on a connection to the Smart Connection server for more information see (https://app.assembla.com/spaces/smart-cs/wiki/SMART_Connect)

## Files

| File | | Description |
| --- | --- | --- |
| `index.js` | Mandatory | Configures provider for usage by Koop |
| `model.js` | Mandatory | Translates remote API to GeoJSON |
| `routes.js` | Optional | Specifies additional routes to be handled by this provider |
| `controller.js` | Optional | Handles additional routes specified in `routes.js` |
| `server.js` | Optional | Reference implementation for the provider |
| `test/model-test.js` | Optional | tests the `getData` function on the model |
| `test/fixtures/input.json` | Optional | a sample of the raw input from the 3rd party API |
| `config/default.json` | Optional | used for advanced configuration, usually API keys. |

## Linking SMART Connect Queries with Service endpoints
The queries created in SMART connect can be used to create REST endpoints to query the data.

| Service Name | UUID | Feature Service |
| --- | --- | --- |
|  carnivore | 'd1eb8f59-6135-4d45-9b69-1945cabf4af2' | http://localhost:8080/carnivore/FeatureServer/0 |

## Generate a Token for SMART Connect
To work with your services in SMART you will need to provide a token to the system for authentication.  For information on generating the token see:  https://app.assembla.com/spaces/smart-cs/wiki/SMART_Connect_API_Documentation
This token is added to the model.js file as the basic variable.

## Using the ArcGIS Online System
The system relies on the GeoJSON services to be served up from the SMART Connect it does not currently work with Raster (Image) Data from SMART or Tabluar only outputs.


## Test it out
Run server:
- `npm install`
- `npm start`

Example API Query:
- `curl localhost:8080/sample/FeatureServer/0/query?returnCountOnly=true`

Tests:
- `npm test`

## With Docker

- `docker build -t koop-provider-smartconnect .`
- `docker run -it -p 8080:8080 koop-provider-smartconnect`

## Publish to npm
- run `npm init` and update the fields
  - Choose a name like `koop-provider-smartconnect`
- run `npm publish`
