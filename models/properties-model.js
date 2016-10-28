'use strict'

const fs = require('fs')
const path = require('path')
const env = require('../env')
const fileNames = fs.readdirSync(env.files.inPath)
const documents = {}

fileNames.forEach((fileName) => {
  fs.readFile(path.join(env.files.inPath, fileName), 'utf8', (err, data) => {
    if (err) return console.log(err)
    var _domain = 'unknow'

    data.split('\n').forEach((lineText) => {
      if (lineText.startsWith('#')) {
        _domain = lineText.replace('#', '').trim()
        if (!documents[_domain]) {
          documents[_domain] = {}
        }
      } else if (lineText && lineText.trim()) {
        const _lineData = lineText.split('=')
        const _propertKey = _lineData[0]
        const _propertValue = _lineData[1]

        let _propert = documents[_domain][_propertKey]
        if (!_propert) {
          _propert = documents[_domain][_propertKey] = {}
        }
        _propert[fileName] = _propertValue
      }
    })
  })
})

module.exports.writeFiles = () => {
  const _out = {}

  var _domain = {}
  for (let domain in documents) {
    const _properties = documents[domain]

    for (let propertName in _properties) {
      const _files = _properties[propertName]

      for (let fileName in _files) {
        const _value = _files[fileName]
        let _textToConcat = ''

        if (!_out[fileName]) {
          _out[fileName] = ''
        }

        if (_domain[fileName] !== domain) {
          _domain[fileName] = domain
          _textToConcat += `# ${domain}\n`
        }
        _textToConcat += `${propertName}=${_value}\n`

        _out[fileName] += _textToConcat
      }
    }
  }

  for (let outFileName in _out) {
    fs.writeFile(path.join(env.files.outPath, outFileName), _out[outFileName], function (err) {
      if (err) {
        return console.log(err)
      }
      let date = new Date()
      console.log(`File ${outFileName} updated in ${date.getDate()}/${date.getMonth()}/${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}`)
    })
  }
}

module.exports.documents = documents
