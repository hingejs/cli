window.customElements.define('core-header', class extends HTMLElement {

  constructor() {
    super()
  }

  _generateTemplate() {
    const slot = this.innerHTML
    return `
      <div class="core-header-divider">
        <h1 class="core-header-title">${slot}</h1>
      </div>
    `
  }

  connectedCallback() {
    this.innerHTML = this._generateTemplate()
  }

})
