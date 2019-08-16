

const ConsoleDecor = require('./console-decorator')

const COLOR = {
  CONCLUSION: { bg: 'BlueBG', fg: 'Yellow', icon: '\u2605', text: ['Blue'] },
  ERROR: { bg: 'RedBG', fg: 'Black', icon: '\u29BB', text: ['Red'] },
  INFO: { bg: 'CyanBG', fg: 'Black', icon: '\u2148', text: ['Cyan'] },
  SUCCESS: { bg: 'GreenBG', fg: 'Black', icon: '\u2713', text: ['Green'] },
  VALIDATION: { bg: 'MagentaBG', fg: 'Black', icon: '\u22CE', text: ['Magenta'] },
  WARN: { bg: 'YellowBG', fg: 'Black', icon: '\u25B3', text: ['Yellow'] },
}

function decorateMsg(msg, d) {
  ConsoleDecor.Reset
  d.text.forEach((decor) => ConsoleDecor[decor])
  return ConsoleDecor.color(msg).Reset.end
}

function output(messages, d) {
  const adjustedMessages = messages.map((i) => typeof (i) === 'string' ? decorateMsg(i, d) : i)
  const icon = ConsoleDecor.Reset[d.bg][d.fg].color(` ${d.icon} `).Reset.end
  console.log(icon, ...adjustedMessages)
}

module.exports = {
  conclusion: (...messages) => output(messages, COLOR.CONCLUSION),
  error: (...messages) => output(messages, COLOR.ERROR),
  info: (...messages) => output(messages, COLOR.INFO),
  normal: console.log,
  success: (...messages) => output(messages, COLOR.SUCCESS),
  validation: (...messages) => output(messages, COLOR.VALIDATION),
  warn: (...messages) => output(messages, COLOR.WARN),
}
