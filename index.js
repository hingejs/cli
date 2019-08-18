#!/usr/bin/env node

const copy = require('graceful-copy')
const inquirer = require('inquirer')
const path = require('path')
const program = require('commander')
const fs = require("file-system")
const { version } = require('./package.json')
const ALLOWED_TYPES = ['component', 'c', 'element', 'e', 'feature', 'f', 'service', 's']
const Logging = require('./logging')

program
  .version(version)
  .usage('<command> [options]')
  .on('--help', () => {
    console.log('')
    Logging.info('More command info:')
    console.log('')
    Logging.success('  $ hingejs generate -h')
    Logging.success('  $ hingejs new -h')
  })

program
  .command('generate <type>')
  .alias('g')
  .description('Generate a new [component|element|feature|service] template')
  .action((type) => {
    type = type.toLowerCase()
    if (ALLOWED_TYPES.includes(type)) {
      Logging.error(type, 'not yet implemented')
    } else {
      Logging.error(`Allowed types are: ${ALLOWED_TYPES.join(', ')}`)
    }
  })
  .on('--help', () => {
    console.log('')
    Logging.info('Examples:')
    console.log('')
    Logging.info('  $ hingejs generate <type>')
    Logging.success('  $ hingejs generate component')
    Logging.success('  $ hingejs generate element')
    Logging.success('  $ hingejs generate feature')
    Logging.success('  $ hingejs generate service')
  })

program
  .command("new <projectFolderName>")
  .option('-i, --i18n', 'Internationalize the new project')
  .option('-p, --port <number>', 'integer argument', myParseInt, 9000)
  .alias('n')
  .description('Generate a new folder for the project')
  .action((projectFolderName, options) => {
    //newProject()
    console.log("init", projectFolderName, options.i18n, options.port)
  })
  .on('--help', () => {
    console.log('')
    console.log('Examples:')
    console.log('')
    Logging.success('  $ hingejs new <projectFolderName>')
    Logging.success('  $ hingejs new <projectFolderName> --i18n')
    Logging.success('  $ hingejs new <projectFolderName> --port 7500')
    Logging.success('  $ hingejs new <projectFolderName> --i18n --port 7500')
  })

program.parse(process.argv)

const TEMPLATES = {
  components: {
    template: './templates/components.js',
    dest: './src/components/'
  },
  elements: {
    template: './templates/elements.js',
    dest: './src/elements/'
  },
  feature: {
    template: './templates/feature/',
    dest: './src/features/'
  },
  service: {
    template: './templates/service.js',
    folder: './src/services/'
  }
}


function myParseInt(value) {
  return parseInt(value, 10)
}

function newProject() {

  fs.mkdir(answers.name, { recursive: true }, (err) => {
    if (err) throw err
  })

  copy('./templates', `./${packgeFolderName}`)
  //fs.writeFileSync('./' + answers.name + '/package.json', JSON.stringify(package, null, 4))

}
