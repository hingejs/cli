#!/usr/bin/env node

const { appendFile, copy, ensureFile, existsSync, mkdir, pathExists, writeFile } = require('fs-extra')
const { resolve } = require('path')
const program = require('commander')
const { version } = require('./package.json')
const ALLOWED_TYPES = ['component', 'c', 'element', 'e', 'feature', 'f', 'service', 's']
const Logging = require('./logging')
const ROOT_FOLDER = require('./root-folder')

const { spawn } = require('child_process');
const os = require('os')

const TYPE_VALUES = {
  c: 'component',
  e: 'element',
  f: 'feature',
  s: 'service'
}

const VALID_CUSTOM_ELEMENT_NAME = /(?=.*[-])^[a-z]{1}[a-z0-9]*[a-z0-9-]*[a-z0-9]$/
const VALID_FOLDER_NAME = /^[a-z]{1}[a-z0-9-_\/]*[a-z0-9\/]$/
const VALID_SERVICE_NAME = /^[a-z]{1}[a-z-]*[a-z]$/

program
  .version(version)
  .usage('<command> <type/name> [options]')
  .on('--help', () => {
    console.log('')
    Logging.info('More command info:')
    console.log('')
    Logging.success('  $ hingejs generate -h')
    Logging.success('  $ hingejs new -h')
  })

program
  .command('generate <type> <name>')
  .alias('g')
  .option('-s, --shadow', 'Shadow dom for element')
  .description('Generate a new [component|element|feature|service] template')
  .action(async (type, name, options) => {
    type = type.toLowerCase().trim()
    name = name.trim()
    let validName = false
    let isDuplicate = false
    if (ALLOWED_TYPES.includes(type)) {
      type = TYPE_VALUES[type] || type
      if (['component', 'element'].includes(type)) {
        validName = VALID_CUSTOM_ELEMENT_NAME.test(name)
        isDuplicate = await checkIfCustomElementExist(name)
      }
      if (['feature'].includes(type)) {
        name = adjustFolderPath(name)
        validName = VALID_FOLDER_NAME.test(name)
      }
      if (['service'].includes(type)) {
        validName = VALID_SERVICE_NAME.test(name)
      }
      if (!validName) {
        Logging.error(name, 'is not valid to generate a type of', type)
      } else if (isDuplicate) {
        Logging.error(name, 'already exist and cannot be duplicated',)
      } else {
        generateType(type, name, options)
      }
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
    projectFolderName = projectFolderName.toLowerCase().trim()
    if (VALID_FOLDER_NAME.test(projectFolderName)) {
      newProject(projectFolderName, options)
    } else {
      Logging.error(projectFolderName, 'is not valid name')
    }
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


function myParseInt(value) {
  return parseInt(value, 10)
}

function titleCase(string) {
  const words = string.split('-');
  let output =  '';
  words.forEach( word => {
    output += word.charAt(0).toUpperCase() + word.slice(1)
  })
  return output;
}

function adjustFolderPath(path) {
  return path ? path.trim().split('/')
      .filter(pathName => pathName.length)
      .map(pathName => pathName.toLowerCase())
      .join('/') : ''
}

function checkIfCustomElementExist(name) {
  return new Promise(function(resolve, reject) {
    const hasComponent = existsSync(`${ROOT_FOLDER}/src/components/${name}.js`)
    const hasElement = existsSync(`${ROOT_FOLDER}/src/elements/${name}.js`)
    resolve(!!(hasComponent || hasElement))
  })
}

async function newProject(projectFolderName, options) {
  const SCAFFOLD = './templates/scaffold/'
  const gitIgnoreText = `
# IDE
._*
.cache
.DS_Store
.env
.envrc
.idea
.npmrc
.project
.settings
.tmproj
*.esproj
*.sublime-project
*.sublime-workspace
nbproject/
Thumbs.db
.vscode/*
.vs/*
!.vscode/settings.json
!.vscode/tasks.json
!.vscode/launch.json
!.vscode/extensions.json

# extensions
*.diff
*.err
*.log
*.orig
*.rej
*.swo
*.swp
*.tgz
*.vi
*.zip
*~

# Folders
node_modules/
coverage/
dist/*
jsdoc/
`
  try {
    await mkdir(projectFolderName, { recursive: true })
    await copy(resolve(__dirname, SCAFFOLD), projectFolderName)
    await writeFile(`${projectFolderName}/.env`, `UI_APP_PORT=${options.port}`)
    await writeFile(`${projectFolderName}/.gitignore`, gitIgnoreText)
    await mkdir(`${projectFolderName}/src/templates`, { recursive: true })

    if(options.i18n) {
      await mkdir(`${projectFolderName}/assets/locales`, { recursive: true })
      const enJSON = {
          "global:header": "This is the home page"
      }
      await writeFile(`${projectFolderName}/assets/locales/en.json`, JSON.stringify(enJSON, undefined, 2))
      const homeHTML = `
<template>
  <h1 data-i18n="global:header"></h1>
</template>

<style>
  h1 {
    color: red;
  }
</style>
`.trimStart()
      await writeFile(`${projectFolderName}/src/features/home/home.html`, homeHTML)
      const mainJS = `
import { I18n } from '@hingejs/services'
I18n.enableDocumentObserver()
`.trimStart()
      await appendFile(`${projectFolderName}/src/main.js`, mainJS, 'utf8')
      const componentHTML = `import { I18n } from '@hingejs/services'

window.customElements.define('translate-locale', class extends HTMLElement {

  constructor() {
    super()
  }

  async generateTemplate() {
    const translate = await I18n.init()
    return translate(this.innerText)
  }

  async connectedCallback() {
    this.innerHTML = await this.generateTemplate()
  }

})
`.trimStart()
      await writeFile(`${projectFolderName}/src/components/translate-locale.js`, componentHTML)
      await appendFile(`${projectFolderName}/src/components/index.js`, `import './translate-locale.js'\n`, 'utf8')
    }

    // npm binary based on OS
    const npmCmd = os.platform().startsWith('win') ? 'npm.cmd' : 'npm'
    // install folder
    const installSpawn = spawn(npmCmd, ['i'], { env: process.env, cwd: projectFolderName, stdio: 'inherit' })

    installSpawn.on('close', () => {
      Logging.info('Next Steps:')
      console.log('')
      Logging.success('$ cd ', projectFolderName)
      Logging.success('$ npm install ')
    })

    Logging.success('Files have been copied to', projectFolderName)
    Logging.info('Running npm install in', projectFolderName)
  } catch (err) {
    Logging.error(err)
  }

}

async function generateType(type, name, options) {

  const path = `${ROOT_FOLDER}/src/${type}s`
  const exists = await pathExists(path)

  if(exists) {
    switch(type) {
      case 'component':
      await createComponent(name)
      Logging.success(`Generated ${type} File named ${name}`)
      break
      case 'element':
      if(options.shadow) {
        await createElement_Shadow(name)
      } else {
        await createElement_NonShadow(name)
      }
      Logging.success(`Generated ${type} File named ${name}`)
      break
      case 'service':
      await createService(name)
      name = titleCase(name) + 'Service'
      Logging.success(`Generated ${type} File named ${name}`)
      break
      case 'feature':
      await createFeature(name)
      Logging.success(`Generated ${type} Structure named ${name}`)
      break
      default:
      Logging.error(type, 'not yet implemented')
    }

  } else {
    Logging.error(`Command must be in project directory. Could not find /src/${type}s.`)
  }
}


async function createComponent(name) {
  const FileJS = `
import { HtmlCache } from 'services'
import { ModelMixin } from '@hingejs/services'
const Base = ModelMixin(HTMLElement)

if (!window.customElements.get('${name}')) {
  window.customElements.define('${name}', class extends Base {

    constructor() {
      super()
    }

    _generateTemplate() {
      return HtmlCache.get('templates/${name}.html')
    }

    async connectedCallback() {
      await this.htmlMarker.render(this, this._generateTemplate())
    }

    get defaultModel() {
      return Object.assign(super.defaultModel, {
        test: 'This is a value'
      })
    }

    async onModelUpdate() {
      await this.htmlMarker.updateModel(this.model)
    }

  })
}
`.trimStart()

  const FileHTML = '<p>${test}</p>'
  const FileSpec = `
describe('${name}', () => {

  let el
  const elemTag = '${name}'
  const expect = chai.expect

  beforeEach(() => {
    el = document.createElement(elemTag)
    document.body.appendChild(el)
  })

  afterEach(() => {
    document.body.removeChild(el)
    el = null
  })

  describe('interface', () => {

    it('should be defined', async () => {
      const elem = document.querySelector(elemTag)
      expect(elem).to.not.be.undefined
      expect(window.customElements.get(elemTag)).to.not.be.undefined
    })

    it('should be an Element node ', async () => {
      const elem = document.querySelector(elemTag)
      expect(elem.nodeType).to.equal(Node.ELEMENT_NODE)
    })

  })


})
`.trimStart()

  await writeFile(`${ROOT_FOLDER}/src/components/${name}.js`, FileJS)
  await appendFile(`${ROOT_FOLDER}/src/components/index.js`, `import './${name}.js'\n`, 'utf8')
  await writeFile(`${ROOT_FOLDER}/src/templates/${name}.html`, FileHTML)
  await writeFile(`${ROOT_FOLDER}/test/components/${name}.spec.js`, FileSpec)
  await appendFile(`${ROOT_FOLDER}/test/components/index.spec.js`, `import './${name}.spec.js'\n`, 'utf8')
  return Promise.resolve()
}


async function createElement_NonShadow(name) {
  const FileJS = `
if (!window.customElements.get('${name}')) {
  window.customElements.define('${name}', class extends HTMLElement {

    constructor() {
      super()
    }

    _generateTemplate() {
      return \`
        <p>My new element</p>
      \`.trim()
    }

    _insertStyle() {
      const style = \`
      <style type="text/css" id="${name}-style">
        ${name} p {
          border: 1px solid var(--${name}-border-color, #111);
          border-radius: 2px;
          display: flex;
          justify-content: space-between;
        }
      </style>\`
      const elem = document.head || this.parentElement || this
      if (!elem.querySelector('#${name}-style')) {
        elem.insertAdjacentHTML('afterbegin', style)
      }
    }

    connectedCallback() {
      this._insertStyle()
      this.innerHTML = this._generateTemplate()
      this.$p = this.querySelector('p')
      this._render()
    }

    static get observedAttributes() {
      return ['data-msg']
    }

    attributeChangedCallback(attr, oldValue, newValue) {
      if (oldValue !== newValue) {
        this._render()
      }
    }

    _render() {
      const message = this.getAttribute('data-msg')
      if (message && message.length) {
        this.$p.innerHTML = message
      }
    }

  })
}
`.trimStart()

  const FileSpec = `
describe('${name}', () => {

  let el
  const elemTag = '${name}'
  const expect = chai.expect

  beforeEach(() => {
    el = document.createElement(elemTag)
    document.body.appendChild(el)
  })

  afterEach(() => {
    document.body.removeChild(el)
    el = null
  })

  describe('interface', () => {

    it('should be defined', async () => {
      const elem = document.querySelector(elemTag)
      expect(elem).to.not.be.undefined
      expect(window.customElements.get(elemTag)).to.not.be.undefined
    })

    it('should be an Element node ', async () => {
      const elem = document.querySelector(elemTag)
      expect(elem.nodeType).to.equal(Node.ELEMENT_NODE)
    })

  })

  describe('element', () => {

    it('should display a paragraph with text', async () => {
      expect(el.$p.innerHTML).to.not.be.empty
    })

    it('should update a paragraph based on the data-msg attribute', async () => {
      el.dataset.msg = 'updated message'
      expect(el.$p).to.not.equal('updated message')
    })

  })

})
`.trimStart()

  await writeFile(`${ROOT_FOLDER}/src/elements/${name}.js`, FileJS)
  await appendFile(`${ROOT_FOLDER}/src/elements/index.js`, `import './${name}.js'\n`, 'utf8')

  await writeFile(`${ROOT_FOLDER}/test/elements/${name}.spec.js`, FileSpec)
  await appendFile(`${ROOT_FOLDER}/test/elements/index.spec.js`, `import './${name}.spec.js'\n`, 'utf8')
  return Promise.resolve()
}


async function createElement_Shadow(name) {
  const FileJS = `
if (!window.customElements.get('${name}')) {
  window.customElements.define('${name}', class extends HTMLElement {

    constructor() {
      super()
      const shadowRoot = this.attachShadow({ mode: 'open' })
      shadowRoot.appendChild(this._generateTemplate().content.cloneNode(true))
      this.$content = this.shadowRoot.querySelector('div.content')
      this.$slot = this.shadowRoot.querySelector('slot')
      this.$slotContent

      this.$slot.addEventListener('slotchange', () => {
        this.$slotContent = this.$slot.assignedNodes({ flatten: true })
      })
    }

    _generateTemplate() {
      const template = document.createElement('template')
      template.innerHTML = \`
        <style>
          .content {
            background-color: var(--background, transparent);
          }
        </style>
        <div class="content">
          <slot></slot>
        </div>
      \`
      return template
    }

    connectedCallback() {
      this._render()
    }

    static get observedAttributes() {
      return ['data-active']
    }

    attributeChangedCallback(attr, oldValue, newValue) {
      if (oldValue !== newValue) {
        this._render()
      }
    }

    _render() {
      const isActive = this.getAttribute('data-active') === 'true'
      this.$content.classList.toggle('active', isActive)
    }

  })
}
`.trimStart()

  const FileSpec = `
describe('${name}', () => {

  let el
  const elemTag = '${name}'
  const expect = chai.expect

  beforeEach(() => {
    el = document.createElement(elemTag)
    document.body.appendChild(el)
  })

  afterEach(() => {
    document.body.removeChild(el)
    el = null
  })

  describe('interface', () => {

    it('should be defined', async () => {
      const elem = document.querySelector(elemTag)
      expect(elem).to.not.be.undefined
      expect(window.customElements.get(elemTag)).to.not.be.undefined
    })

    it('should be an Element node ', async () => {
      const elem = document.querySelector(elemTag)
      expect(elem.nodeType).to.equal(Node.ELEMENT_NODE)
    })

  })

  describe('element', () => {

    it('should display a slot with html', async () => {
      el.innerHTML = '<p>Adding to slot</p>'
      expect(el.$content.innerHTML).to.not.be.empty
    })

    it('should add a class name based on the data-active attribute', async () => {
      el.dataset.active = true
      expect(el.$content.classList.contains('active')).to.be.true
    })

  })

})
`.trimStart()

  await writeFile(`${ROOT_FOLDER}/src/elements/${name}.js`, FileJS)
  await appendFile(`${ROOT_FOLDER}/src/elements/index.js`, `import './${name}.js'\n`, 'utf8')

  await writeFile(`${ROOT_FOLDER}/test/elements/${name}.spec.js`, FileSpec)
  await appendFile(`${ROOT_FOLDER}/test/elements/index.spec.js`, `import './${name}.spec.js'\n`, 'utf8')
  return Promise.resolve()
}

async function createService(name) {
  name = name.toLowerCase()
  const nameCapitalized = titleCase(name) + 'Service'
  const FileJS = `
import { BaseService, HttpFetch } from '@hingejs/services'
import { EndPoints } from 'services'
class ${nameCapitalized} extends BaseService {

  constructor() {
    super()
  }

  getAll() {
    const URL = EndPoints.Test // Must be a valid URL
    new HttpFetch().get(URL).subscribe({
      error: this.notifyError.bind(this),
      next: async payload => {
        if (this._isNewPayload(payload)) {
          this._payload = payload
          this._mutatedPayload = await this._modelPayload(payload)
          this.announcePayload()
        }
      },
    })
  }

  /* async can be used for a promise.all etc. */
  async _modelPayload(payload) {
    return payload
  }

}

export default new ${nameCapitalized}()
`.trimStart()

  await writeFile(`${ROOT_FOLDER}/src/services/${name}.js`, FileJS)
  const importService = `import ${nameCapitalized} from './${name}.js'\nexport { ${nameCapitalized} }`
  await appendFile(`${ROOT_FOLDER}/src/services/index.js`, importService, 'utf8')

  const FileSpec = `
import { ${nameCapitalized} } from '../../src/services/index.js'

describe('${nameCapitalized}', () => {

  const expect = chai.expect

  afterEach(() => {
    sinon.restore()
  })

  describe('functions', () => {

  })

})
`.trimStart()

  await writeFile(`${ROOT_FOLDER}/test/services/${name}.spec.js`, FileSpec)
  await appendFile(`${ROOT_FOLDER}/test/services/index.spec.js`, `import './${name}.spec.js'\n`, 'utf8')
}

async function createFeature(name) {
  name = adjustFolderPath(name)
  if(name.trim().split('/').length === 1) {
    name = `${name}/${name}`
  }
  const FileJS = `
import { HtmlCache } from 'services'
import { Router } from '@hingejs/services'

const RouteCtrl = async (req, next) => {
  const $routeDisplay = document.querySelector('h-route-display')
  await $routeDisplay.insertContent(HtmlCache.get('features/${name}.html'))
  req.exit(async () => {
    // remove if not needed
  })
  next()
}

Router
  .setPath('${name}', RouteCtrl)
`.trimStart()

const FileHTML = `
<template>
  <h1>This is the ${name} page</h1>
</template>

<style>
  h1 {
    color: red;
  }
</style>
`.trimStart()

  await ensureFile(`${ROOT_FOLDER}/src/features/${name}.js`)
  await writeFile(`${ROOT_FOLDER}/src/features/${name}.js`, FileJS)
  await ensureFile(`${ROOT_FOLDER}/src/features/${name}.html`)
  await writeFile(`${ROOT_FOLDER}/src/features/${name}.html`, FileHTML)
  await appendFile(`${ROOT_FOLDER}/src/features/index.js`, `import './${name}.js'\n`, 'utf8')
}
