
import { Util } from '../../src/services/index.js'

describe('main', () => {

  const expect = chai.expect

  describe('util functions', () => {

    it('should return typeof function', () => {
      expect(typeof Util.getRandomNumberBetween).to.equal('function')
    })

    it('should return random number', () => {
      const num = Util.getRandomNumberBetween()
      expect(num).to.be.above(-1)
      expect(num).to.be.below(10)
    })

    const epoch = new Date('Wed Dec 31 1969 19:00:00')

    it('should return formatted date', () => {
      expect(Util.formatDate(epoch)).to.equal('12/31/69')
    })

    it('should return formatted time', () => {
      expect(Util.formatTime(epoch)).to.equal('7:00 PM')
    })

  })
})
