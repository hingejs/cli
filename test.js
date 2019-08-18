#!/usr/bin/env node

const copy = require('graceful-copy')
const inquirer = require('inquirer')
const path = require('path')
const program = require('commander')
const fs = require("file-system");
const { version } = require('./package.json')
const ALLOWED_TYPES = ['component', 'c', 'element', 'e', 'feature', 'f', 'service', 's']
program.version(version)

program
  .command('generate <type>')
  .alias('g')
  .description('Generate a new [component|element|feature|service] template')
  .action((type) => {
    type = type.toLowerCase()
    if(ALLOWED_TYPES.includes(type)) {
      console.log("Hello", type)
    } else {
      console.error(`Allowed types are: ${ALLOWED_TYPES.join(', ')}`)
    }
  })
  .on('--help',() => {
    console.log('')
    console.log('Examples:')
    console.log('')
    console.log('  $ hingejs generate <type>')
    console.log('  $ hingejs generate component')
    console.log('  $ hingejs generate element')
    console.log('  $ hingejs generate feature')
    console.log('  $ hingejs generate service')
  })

program
  .command("new <projectName>")
  .option('-i, --i18n', 'Internationalize the new project')
  .alias('n')
  .description('Generate a new folder for the project')
  .action((projectName, options) => {
    //newProject();
    console.log("init", projectName, options.i18n)
  })
  .on('--help',() => {
    console.log('');
    console.log('Examples:');
    console.log('');
    console.log('  $ hingejs new <projectName>');
    console.log('  $ hingejs new <projectName> --i18n');
  })

program.parse(process.argv)


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
        if (err) throw err;
      });
      fs.mkdir(answers.name + '/templates', { recursive: true }, (err) => {
        if (err) throw err;
      });
      copy('./templates', './' + answers.name + '/templates');
      fs.writeFileSync('./' + answers.name + '/package.json', JSON.stringify(package, null, 4));
    })
}
