import { Command, Plugin } from 'kunkka'
import WebpackService from '../webpack/WebpackService'

export default class BuildCommand extends Command {
  static description = 'build Mini Program for use in production environment'

  static examples = [
    `$ tina build`,
  ]

  async run() {
    const service = new WebpackService(this)
    const result = await service.build()
    console.log(result)
  }
}

export const BuildPlugin: Plugin = {
  apply (api) {
    api.registerCommand('build', BuildCommand)
  },
}
