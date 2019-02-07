const webpack = require('webpack')
const jsx = require('import-jsx')
const {render} = require('ink')

const Ui = jsx('./build-ui.jsx')

const base = require('../webpack/base')

function config (options) {
  return Object.assign({
    entry: './app.mina',
  }, base(options).toConfig())
}

module.exports = function build (service) {
  return new Promise((resolve, reject) => {
    webpack(config({ cwd: service.cwd })).watch({}, (err, stats) => {
      if (err) {
        return reject(err)
      }

      if (stats.hasErrors()) {
        return reject(`Build failed with errors.`)
      }

      render(Ui({ stats: stats.toString() }))
    })
  })
}
