const dotenv = require('dotenv')

dotenv.config()
const config = require('./dist/app/config/database')

module.exports = config.connectionOptions