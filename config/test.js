'use strict'

const config = {
  logger: {
    // Logs nothing when testing
    format: function (tokens, req, res) {
      return undefined
    }
  }
}

module.exports = config
