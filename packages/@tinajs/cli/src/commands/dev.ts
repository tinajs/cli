import {Command} from '..'

export default class Dev extends Command {
  static description = 'developing Mini Program'

  static examples = [
    `$ tina dev`,
  ]

  async run() {
    const bus = this.service.watch()
    bus.on('stats', (stats) => this.log(stats))
    bus.on('error', (error) => this.error(error))
  }
}
