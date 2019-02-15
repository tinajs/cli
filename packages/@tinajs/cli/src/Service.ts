import * as EventEmitter from 'eventemitter3'
import * as webpack from 'webpack'
import createWebpackConfig from './webpack/config'
import WebpackChainFunction from './declarations/WebpackChainFunction'
import Command from './Command'

export default class Service {
  private command: Command
  private webpackChainFns: WebpackChainFunction[] = []

  private compiler(): webpack.Compiler {
    this.command.config.runHook('init_webpack_config', { service: this })

    if (this.command.userConfig.chainWebpack) {
      this.chainWebpack(this.command.userConfig.chainWebpack)
    }

    const webpackConfig = createWebpackConfig({
      cwd: process.cwd(),
      webpackChainFns: this.webpackChainFns,
    })
    const config = Object.assign({
      entry: './app.mina',
    }, webpackConfig.toConfig())

    return webpack(config)
  }

  constructor (command: Command) {
    this.command = command
  }

  chainWebpack(fn: WebpackChainFunction): void {
    this.webpackChainFns.push(fn)
  }

  watch(): EventEmitter {
    const bus = new EventEmitter()

    this.command.config.runHook('prewatch', { service: this })

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
    this.command.config.runHook('prebuild', { service: this })

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
