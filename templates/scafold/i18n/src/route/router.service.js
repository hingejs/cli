import templateCache from '../templateCache.js'

class RouterService {

  constructor() {

    if(this.instance) {
      return this.instance
    }
    this.instance = this
    this.paths = new Map()
    this._basePath = window.location.origin

    this.historyChangeBind = this.historyChange.bind(this)
    window.addEventListener('route-clicked', this.historyChangeBind)
    window.addEventListener('popstate', this.historyChangeBind)
    this.routeDisplay = document.querySelector('route-display')

    const path = this.getCurrentPath()
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', this.goto.bind(this, path))
    } else {
      this.goto(path)
    }

  }

  getCurrentPath() {
    return decodeURI(window.location.pathname)
  }

  getRoute() {
    let currentPath = this.getAdjustedPath(this.getCurrentPath())
    return [...this.paths.keys()]
      .map(this.fromBase64)
      .find(route => currentPath === route)
  }

  getAdjustedPath(path) {
    return path.split('/')
      .filter(pathName => pathName.length)
      .join('/')
  }

  historyChange() {
    const route = this.getRoute()
    let handlers = this.getPath(route) || this.getPath('/')
    let req = {load: this.load.bind(this), search: new URLSearchParams(window.location.search)}
    const run = (callbacks) => {
      if (Array.isArray(callbacks) && callbacks.length) {
        const element = callbacks.shift()
        if(typeof element === 'function') {
          element(req, () => {
            run.call(this, callbacks)
          })
        }
      }
    }
    if (handlers) {
      run(handlers.slice())
    }
  }

  get basePath() {
    return this._basePath
  }

  goto(path, title='') {
    window.history.pushState(path, title, `${this.basePath}${path}`)
    window.dispatchEvent(new CustomEvent('route-clicked', { detail: path }))
    return this
  }

  toBase64(str) {
    return window.btoa(unescape(encodeURIComponent(str)))
  }

  fromBase64(str) {
    return decodeURIComponent(escape(window.atob(str)))
  }

  setPath(path, ...callbacks) {
    path = this.getAdjustedPath(path)
    if (path.length) {
      this.paths.set(this.toBase64(path), callbacks)
    }
    return this
  }

  defaultPath(...callbacks) {
    this.paths.set(this.toBase64('/'), callbacks)
    return this
  }

  getPath(path) {
    return this.paths.get(this.toBase64(path))
  }

  load(content) {
    if (document.body.contains(this.routeDisplay)) {
      this.routeDisplay.dataset.content = templateCache.get(content)
    }
    return this
  }
}

export default new RouterService()
