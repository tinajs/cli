#!/usr/bin/env node
const yargs = require('yargs')
const argv = yargs
    .command('create', 'Create a new project with Tina.js')
    .argv;

const [ command ] = argv._

if (!command) {
  return yargs.showHelp()
}

switch (command) {
  case 'create':
    require('./commands/config')
    break
  case 'start':
    require('./commands/dice')
    break
  case 'build':
    require('./commands/dice')
    break
  case 'eject':
    require('./commands/dice')
    break
  default:
    throw new Error('unknown command')
}
