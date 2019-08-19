window.customElements.define('svg-icon', class extends HTMLElement {

  constructor() {
    super()
  }

  _generateTemplate() {
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
        <use xlink:href="" />
        <defs></defs>
      </svg>
    `.trim()
  }

  connectedCallback() {
    this.innerHTML = this._generateTemplate()
    this.$svg = this.querySelector('svg')
    this.$defs = this.querySelector('defs')
    this.$svgUse = this.$svg.querySelector('use')
    this._render()
  }

  static get observedAttributes() {
    return ['data-icon', 'data-viewbox', 'data-width', 'data-height']
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (oldValue !== newValue) {
      this._render()
    }
  }

  _render() {
    if (this.dataset.icon && this.$svgUse) {
      this.$svgUse.setAttribute('xlink:href', `#${this.dataset.icon}`)
      this.$defs.innerHTML = this._getIconDef(this.dataset.icon)
    }
    if (this.$svg) {
      if (this.dataset.viewbox) {
        this.$svg.setAttribute('viewBox', this.dataset.viewbox)
      }
      if (this.dataset.width) {
        this.$svg.setAttribute('width', this.dataset.width)
      } else {
        this.$svg.removeAttribute('width')
      }
      if (this.dataset.height) {
        this.$svg.setAttribute('height', this.dataset.height)
      } else {
        this.$svg.removeAttribute('height')
      }
    }
  }

  getData() {
    return `data:image/svg+xml;charset=UTF-8;base64,${window.btoa(this.innerHTML)}`
  }

  _getIconDef(id) {
    let def = ''
    let viewBox = ''
    if (id === 'home') {
      viewBox = '0 0 50 50'
      def = `
        <path d="M20 40v-12h8v12h10v-16h6l-20-18-20 18h6v16z" />
      `
    }
    if (id === 'search') {
      viewBox = '0 0 32 32'
      def = `
        <path d="M19.4271164,21.4271164 C18.0372495,22.4174803 16.3366522,23 14.5,23 C9.80557939,23 6,19.1944206 6,14.5 C6,9.80557939 9.80557939,6 14.5,6 C19.1944206,6 23,9.80557939 23,14.5 C23,16.3366522 22.4174803,18.0372495 21.4271164,19.4271164 L27.0119176,25.0119176 C27.5621186,25.5621186 27.5575313,26.4424687 27.0117185,26.9882815 L26.9882815,27.0117185 C26.4438648,27.5561352 25.5576204,27.5576204 25.0119176,27.0119176 L19.4271164,21.4271164 L19.4271164,21.4271164 Z M14.5,21 C18.0898511,21 21,18.0898511 21,14.5 C21,10.9101489 18.0898511,8 14.5,8 C10.9101489,8 8,10.9101489 8,14.5 C8,18.0898511 10.9101489,21 14.5,21 L14.5,21 Z" />
      `
    }
    if (id === 'warning') {
      viewBox = '0 0 32 32'
      def = `
        <path d="M14.3077969,6.05448962 C15.177863,4.64682663 16.5905922,4.65018129 17.4585848,6.05448962 L28.2436741,23.5034768 C29.4052031,25.382692 28.5591104,26.9060969 26.3549711,26.9060969 L5.41141065,26.9060969 C3.20677982,26.9060969 2.35742742,25.388761 3.52270757,23.5034768 L14.3077969,6.05448962 L14.3077969,6.05448962 Z M15.8835643,11.9060969 C15.3312795,11.9060969 14.8835643,12.3591332 14.8835643,12.903127 L14.8835643,18.9090667 C14.8835643,19.4597113 15.3274291,19.9060969 15.8835643,19.9060969 C16.435849,19.9060969 16.8835643,19.4530606 16.8835643,18.9090667 L16.8835643,12.903127 C16.8835643,12.3524825 16.4396994,11.9060969 15.8835643,11.9060969 L15.8835643,11.9060969 Z M15.8835643,23.9060969 C16.435849,23.9060969 16.8835643,23.4583816 16.8835643,22.9060969 C16.8835643,22.3538121 16.435849,21.9060969 15.8835643,21.9060969 C15.3312795,21.9060969 14.8835643,22.3538121 14.8835643,22.9060969 C14.8835643,23.4583816 15.3312795,23.9060969 15.8835643,23.9060969 L15.8835643,23.9060969 Z" />
      `
    }
    if (id === 'mail') {
      viewBox = '0 0 32 32'
      def = `
        <path d="M25.9230769,21.0769231 L20,16 L25.9230769,10.9230769 L25.9230769,10.9230769 L25.1153846,10.1153846 L16.5,17.5 L7.88461538,10.1153846 L7.07692308,10.9230769 L7.07692308,10.9230769 L13,16 L7.07692308,21.0769231 L7.07692308,21.0769231 L7.88461538,21.8846154 L13.875,16.75 L16.5,19 L19.125,16.75 L25.1153846,21.8846154 L25.9230769,21.0769231 L25.9230769,21.0769231 Z M6.00359486,8 C4.89703997,8 4,8.89451376 4,9.99406028 L4,22.0059397 C4,23.1072288 4.88976324,24 6.00359486,24 L26.9964051,24 C28.10296,24 29,23.1054862 29,22.0059397 L29,9.99406028 C29,8.8927712 28.1102368,8 26.9964051,8 L6.00359486,8 L6.00359486,8 Z" />
      `
    }

    if (!this.getAttribute('data-viewbox') && viewBox.length) {
      this.$svg.setAttribute('viewBox', viewBox)
    }
    if(def.length) {
      def = `<g id="${id}">${def.trim()}</g>`
    }
    return def.trim()
  }

})
