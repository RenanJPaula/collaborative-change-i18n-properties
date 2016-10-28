'use strict'

const path = require('path')
const env = {}

env.server = {
  port: 3000
}

env.files = {
  inPath: path.join(__dirname, './files'),
  outPath: path.join(__dirname, './files'),
  updateRate: 5000
}

module.exports = env
