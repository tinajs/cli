import { Cli } from 'kunkka'
import { DevPlugin } from './commands/dev'
import { BuildPlugin } from './commands/build'

export default class extends Cli {
  static app = 'tina'
  static builtinPlugins = [
    ...Cli.builtinPlugins,
    [DevPlugin],
    [BuildPlugin],
  ]
}
