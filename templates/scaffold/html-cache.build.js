const { readFile, readdir, stat, writeFile } = require('fs')
const { parse, resolve, dirname, join } = require('path')
const { promisify } = require('util')
const FIND_DIR = [join('src', 'features'), join('src', 'templates')]
const SAVE_DIR = join('src', 'services')

const readFileProms = promisify(readFile)
const readdirProms = promisify(readdir)
const writeFileProms = promisify(writeFile)
const statProms = promisify(stat)

function flatten(arrays) {
  return [].concat.apply([], arrays)
}

main().catch(error => {
  console.error(error)
  process.exit(error)
})

async function main() {
  const caches = await Promise.all(FIND_DIR.map(async dir => {
    const files = await getFiles(dir)
    return await Promise.all(flatten(files).map(async file => {
      const mainDirectory = dir.split('/').pop().trim()
      const directory = dirname(file).split(dir).pop().trim()
      const baseFile = parse(file).base.trim()
      const cacheKey = `${mainDirectory}${directory}/${baseFile}`.replace(/^\/|\/$/g, '').replace("\\", '')
      const contents = await readFileProms(resolve(dir, file), 'utf8')
      return `HtmlCache.set('${cacheKey}', '${escapeHTMLContent(contents)}')`
    }))
  }))
  let html = ['const HtmlCache = new Map()']
  html = html.concat(flatten(caches))
  html.push('export default HtmlCache')

  await writeFileProms(resolve(SAVE_DIR, 'html-cache.js'), html.join('\n'))

  console.log('\x1b[32m The file was saved! \x1b[0m')
  process.exit(0)
}

function escapeHTMLContent(html) {
  return html.split('\n').join('').split('\r').join('').trim().replace(/'/gi, '\\\'').replace(/(\\\d)/ig, '\\\$1')
}

async function getFiles(dir) {
  const subDirs = await readdirProms(dir)
  const files = await Promise.all(subDirs.map(async subDirs => {
    const res = resolve(dir, subDirs)
    return (await statProms(res)).isDirectory() ? getFiles(res) : res
  }))
  return files
    .reduce((a, f) => a.concat(f), [])
    .filter(file => /.*\.(htm?|html)/ig.test(file))
}
