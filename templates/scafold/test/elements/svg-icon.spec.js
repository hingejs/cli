describe('svg-icon', () => {

  let el
  const elemTag = 'svg-icon'
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
      let elem = document.querySelector(elemTag)
      expect(elem).to.not.be.undefined
      expect(window.customElements.get(elemTag)).to.not.be.undefined
    })

    it('should be an Element node ', async () => {
      let elem = document.querySelector(elemTag)
      expect(elem.nodeType).to.equal(Node.ELEMENT_NODE)
    })

  })

  describe('component', () => {

    it('should display a svg icon', async () => {
      const component = document.querySelector(elemTag)
      expect(component).to.exist
    })

    it('should add svg icon defs', async () => {
      const defs = document.querySelector('defs')
      expect(defs).to.exist
    })

    it('should change the svg icon', async () => {
      const component = document.querySelector(elemTag)
      component.dataset.icon = 'home'
      expect(component.$svgUse.getAttribute('xlink:href')).to.equal('#home')
    })

    it('should change the svg view box', async () => {
      const component = document.querySelector(elemTag)
      component.dataset.viewbox = '0 0 100 100'
      expect(component.$svg.getAttribute('viewBox')).to.equal('0 0 100 100')
    })

    it('should change the svg width', async () => {
      const component = document.querySelector(elemTag)
      component.dataset.width = '100'
      expect(component.$svg.getAttribute('width')).to.equal('100')
    })

    it('should change the svg height', async () => {
      const component = document.querySelector(elemTag)
      component.dataset.height = '50'
      expect(component.$svg.getAttribute('height')).to.equal('50')
    })

    it('should return the svg in base64', async () => {
      const component = document.querySelector(elemTag)
      const base64 = component.getData()
      expect(base64).to.include('base64')
    })

    it('should adjust the svg view box based on the icon', async () => {
      const component = document.querySelector(elemTag)

      component.dataset.icon = 'home'
      expect(component.$svg.getAttribute('viewBox')).to.equal('0 0 50 50')

      const otherIcons = ['search', 'warning', 'mail']
      otherIcons.forEach(icon => {
        component.dataset.icon = icon
        expect(component.$svg.getAttribute('viewBox')).to.equal('0 0 32 32')
      })
    })

  })

})

