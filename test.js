#!/usr/bin/env node

const copy = require('graceful-copy')
const inquirer = require('inquirer')
const path = require('path')
const program = require('commander')
const fs = require("file-system");

program
    .command('hello')
    .description('testing')
    .action(function () {
        console.log("Hello World!")
    })

program
    .command("init")
    .description('Make a new folder for the project.')
    .action(function() {
        newProject();
    })


const newProject = function () {
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
            "name" : answers.name,
            "version" : answers.version,
            "description" : answers.description,
            "main" : answers.entry,
            "repository" : {
                "type" : "git",
                "url" : answers.repository
            },
            "license" : answers.license
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


program.parse(process.argv);