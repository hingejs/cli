class Color {
  constructor() {
    const TERMINAL = {
      Blink: '\x1b[5m',
      Bright: '\x1b[1m',
      Dim: '\x1b[2m',
      Hidden: '\x1b[8m',
      Reset: '\x1b[0m',
      Reverse: '\x1b[7m',
      Underline: '\x1b[4m',
      Black: '\x1b[30m',
      Red: '\x1b[31m',
      Green: '\x1b[32m',
      Yellow: '\x1b[33m',
      Blue: '\x1b[34m',
      Magenta: '\x1b[35m',
      Cyan: '\x1b[36m',
      White: '\x1b[37m',
      Crimson: '\x1b[38m',
      BlackBG: '\x1b[40m',
      RedBG: '\x1b[41m',
      GreenBG: '\x1b[42m',
      YellowBG: '\x1b[43m',
      BlueBG: '\x1b[44m',
      MagentaBG: '\x1b[45m',
      CyanBG: '\x1b[46m',
      WhiteBG: '\x1b[47m',
      CrimsonBG: '\x1b[48m',
    }
    this.decorator = ''
    Object.entries(TERMINAL).forEach(([key, val]) => {
      Object.defineProperty(this, key, {
        get: () => { this.decorator += val; return this }
      })
    })
  }

  color(str) {
    this.decorator += str
    return this
  }

  get end() {
    const result = this.decorator
    this.decorator = ''
    return result
  }

}

module.exports = new Color()
