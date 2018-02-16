# Koop Provider for the UN SDG Project
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

## Test it out
Run server:
- `npm install`
- `npm start`

Example API Query:
- `curl localhost:8080/sample/FeatureServer/0/query?returnCountOnly=true`

Tests:
- `npm test`

## With Docker

- `docker build -t koop-provider-sample .`
- `docker run -it -p 8080:8080 koop-provider-sample`

## Publish to npm
- run `npm init` and update the fields
  - Choose a name like `koop-provider-foo`
- run `npm publish`
