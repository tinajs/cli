import {Command} from '..'

export default class Build extends Command {
  static description = 'build Mini Program for use in production environment'

  static examples = [
    `$ tina build`,
  ]

  async run() {
    const result = await this.service.build()
    this.log(result)
  }
}
