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
  case 'config':
    require('./commands/config')
    break
  case 'dice':
    require('./commands/dice')
    break
  default:
    throw new Error('unknown command')
}
