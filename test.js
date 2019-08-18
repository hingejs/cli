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
  .on('--help',() => {
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
    if(ALLOWED_TYPES.includes(type)) {
      console.log("Hello", type)
    } else {
      Logging.error(`Allowed types are: ${ALLOWED_TYPES.join(', ')}`)
    }
  })
  .on('--help',() => {
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
  .command("new <projectName>")
  .option('-i, --i18n', 'Internationalize the new project')
  .option('-p, --port <number>', 'integer argument', myParseInt, 9000)
  .alias('n')
  .description('Generate a new folder for the project')
  .action((projectName, options) => {
    //newProject()
    console.log("init", projectName, options.i18n, options.port)
  })
  .on('--help',() => {
    console.log('')
    console.log('Examples:')
    console.log('')
    Logging.success('  $ hingejs new <projectName>')
    Logging.success('  $ hingejs new <projectName> --i18n')
    Logging.success('  $ hingejs new <projectName> --port 7500')
    Logging.success('  $ hingejs new <projectName> --i18n --port 7500')
  })

program.parse(process.argv)


function myParseInt(value) {
  return parseInt(value, 10)
}

function newProject() {
  inquirer.prompt([
    {
      type: "input",
      message: "Project name:",
      name: "name",
      default: "New project"
    },
    {
      type: "input",
      message: "Description:",
      name: "description",
      default: "A new IOT project"
    },
    {
      type: "input",
      message: "Version:",
      name: "version",
      default: "0.0.0"
    },
    {
      type: "input",
      message: "Entry point:",
      name: "entry",
      default: "index.js"
    },
    {
      type: "input",
      message: "repository:",
      name: "projectRepo"
    },
    {
      type: "input",
      message: "License:",
      name: "license",
      default: "UNLICENSED"
    }

  ])
    .then((answers) => {

      const package = {
        "name": answers.name,
        "version": answers.version,
        "description": answers.description,
        "main": answers.entry,
        "repository": {
          "type": "git",
          "url": answers.repository
        },
        "license": answers.license
      }

      fs.mkdir(answers.name, { recursive: true }, (err) => {
        if (err) throw err
      })
      fs.mkdir(answers.name + '/templates', { recursive: true }, (err) => {
        if (err) throw err
      })
      copy('./templates', './' + answers.name + '/templates')
      fs.writeFileSync('./' + answers.name + '/package.json', JSON.stringify(package, null, 4))
    })
}
