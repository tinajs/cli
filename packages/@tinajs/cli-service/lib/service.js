const webpack = require('webpack')
const base = require('./webpack/base')

function config (options) {
  return Object.assign({
    entry: './app.mina',
  }, base(options).toConfig())
}

class Service {
  constructor () {

  }

  watch () {

  }

  build () {
    return new Promise((resolve, reject) => {
      webpack(config(), (err, stats) => {
        if (err) {
          return reject(err)
        }

        if (stats.hasErrors()) {
          return reject(`Build failed with errors.`)
        }

        resolve()
      })
    })
  }
}

module.exports = Service

