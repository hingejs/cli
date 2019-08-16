const path = require('path')
const appDir = path.dirname(require.main.filename)
const moduleDir = path.dirname(process.mainModule.filename);
const Logging = require('../../logging')

//TODO: delete this file once the root folder can be located.

Logging.validation('appDir', appDir, path)
Logging.validation('moduleDir', moduleDir)
Logging.validation(__dirname.replace(/^(.*\/mymodule)(.*)$/, '$1'))


Logging.conclusion(process.mainModule.paths[0].split('node_modules')[0].slice(0, -1))
