'use strict'

const Properties = require('../models/properties-model')
const env = require('../env')
let _io = null
let _processIntervalId

function changePropertie (data) {
  Properties.documents[data.groupName][data.propertieName][data.fileName] = data.value
  _io.emit('changePropertie', data)
  if (_processIntervalId) {
    clearTimeout(_processIntervalId)
  }
  _processIntervalId = setTimeout(Properties.writeFiles, env.files.updateRate)
}

module.exports = (io) => {
  _io = io

  return (socket) => {
    socket.on('changePropertie', changePropertie)
  }
}
