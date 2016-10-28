'use strict'

const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const env = require('./env')
const Properties = require('./models/properties-model')

app.use('/', express.static('public'))

app.get('/properties', (req, res) => {
  res.send(Properties.documents)
})

http.listen(env.server.port, function () {
  console.log(`Server on port: ${env.server.port}`)
})

io.on('connection', require('./controllers/real-time-actions-controller')(io))
