describe('core-header', () => {

  let el
  const elemTag = 'core-header'
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
