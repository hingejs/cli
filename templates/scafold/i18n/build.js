const { readFile, readdir, stat, writeFile } = require('fs')
const { parse, resolve } = require('path')
const { promisify } = require("util")
const DIR = 'src'

const readFileProms = promisify(readFile)
const readdirProms = promisify(readdir)
const writeFileProms = promisify(writeFile)
const statProms = promisify(stat)

main().catch(error => {
    console.error(error)
    process.exit(error)
});

async function main() {

    const files = await getFiles(DIR)
    let html = ['const templateCache = new Map()']

    const caches = await Promise.all(files.map(async (file) => {
        const contents = await readFileProms( resolve(DIR, file), 'utf8')
        return `templateCache.set('${parse(file).name}', '${escapeHTMLConent(contents)}')`
    }))

    html = html.concat(caches)
    html.push('export default templateCache')

    await writeFileProms(resolve(DIR, 'templateCache.js'),html.join('\n'))

    console.log('The file was saved!')
    process.exit(0)
}

function escapeHTMLConent(html) {
    return html.split('\n').join('').trim().replace(/'/gi, '\\\'')
}

async function getFiles(dir) {
  const subdirs = await readdirProms(dir);
  const files = await Promise.all(subdirs.map(async (subdir) => {
    const res = resolve(dir, subdir);
    return (await statProms(res)).isDirectory() ? getFiles(res) : res
  }))
  return files
            .reduce((a, f) => a.concat(f), [])
            .filter((file) => /.*\.(htm?|html)/ig.test(file))
}
