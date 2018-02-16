//clean shutdown
process.on('SIGINT', () => process.exit(0))
process.on('SIGTERM', () => process.exit(0))

// Initialize Koop
const Koop = require('koop')
const koop = new Koop()

// Install the Smart Connect Provider
const smart_connect = require('./')
koop.register(smart_connect)

// Start listening for http traffic
const config = require('config')
const port = config.port || 8080
koop.server.listen(port)

const message = `

Koop Smart-Connect is listening on ${port}

Try it out in your browswer: http://localhost:${port}/smart_connect/FeatureServer/0/query

Press control + c to exit
`
console.log(message)
