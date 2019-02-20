import { Command, Plugin } from 'kunkka'
import WebpackService from '../webpack/WebpackService'

export class DevCommand extends Command {
  static description = 'developing Mini Program'

  static examples = [
    `$ tina dev`,
  ]

  async run() {
    const service = new WebpackService(this)
    const bus = service.watch()
    bus.on('stats', (stats) => console.log(stats))
    bus.on('error', (error) => console.error(error))
  }
}

export const DevPlugin: Plugin = {
  apply (api) {
    api.registerCommand('dev', DevCommand)
  },
}
