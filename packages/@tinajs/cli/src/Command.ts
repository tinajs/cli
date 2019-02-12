import Command from '@oclif/command'
import Service from './Service'

export default abstract class extends Command {
  service = new Service()
}
