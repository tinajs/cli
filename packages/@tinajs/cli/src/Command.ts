import Command from '@oclif/command'
import Service from './Service'
import TinaConfig from './declarations/TinaConfig'
import * as cosmiconfig from 'cosmiconfig'

const MODULE_NAME = 'tina'

export default abstract class extends Command {
  service = new Service(this)
  userConfig: TinaConfig = {}

  async init() {
    const rc = await cosmiconfig(MODULE_NAME).search()
    if (rc && rc.config) {
      this.userConfig = rc.config
    }
  }
}
