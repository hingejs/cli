const { existsSync } = require('fs-extra')
const { join, resolve } = require('path')

function find() {
  let root = process.cwd()
  const IS_DIR_END = /^(\w:\\|\/)$/

  while (IS_DIR_END.test(root) === false) {
    let file = join(root, 'package.json')
    if (existsSync(file)) {
      break
    } else {
      root = resolve(root, '..')
    }
  }

  return IS_DIR_END.test(root) ? null : root
}

module.exports = find()
