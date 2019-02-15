import * as EventEmitter from 'eventemitter3'
import * as webpack from 'webpack'
import createWebpackConfig from './webpack/config'
import WebpackChainFunction from './declarations/WebpackChainFunction'

export default class Service {
  private webpackChainFns: WebpackChainFunction[] = []

  private compiler() {
    const webpackConfig = createWebpackConfig({
      cwd: process.cwd(),
      webpackChainFns: this.webpackChainFns,
    })
    const config = Object.assign({
      entry: './app.mina',
    }, webpackConfig.toConfig())

    return webpack(config)
  }

  chainWebpack(fn: WebpackChainFunction) {
    this.webpackChainFns.push(fn)
  }

  watch(): EventEmitter {
    const bus = new EventEmitter()
    this.compiler().watch({}, (err: Error, stats: any) => {
      if (err) {
        return bus.emit('error', err)
      }

      if (stats.hasErrors()) {
        return bus.emit('error', new Error(`Build failed with errors.`))
      }

      bus.emit('stats', stats.toString({ colors: true }))
    })
    return bus
  }

  async build(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.compiler().run((err: Error, stats: any) => {
        if (err) {
          return reject(err)
        }

        if (stats.hasErrors()) {
          return reject(new Error(`Build failed with errors.`))
        }

        resolve(stats.toString({ colors: true }))
      })
    })
  }
}
