const COMMANDS = {
  build: require('./commands/build'),
  watch: require('./commands/watch'),
}

class Service {
  constructor (cwd) {
    this.cwd = cwd
  }

  run (command, options) {
    if (!command in COMMANDS) {
      return Promise.reject(new Error('Invalid command.'))
    }
    return COMMANDS[command](this)
  }
}

module.exports = Service
