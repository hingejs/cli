const express = require('express')
const helmet = require('helmet')
const app = express()
const port = process.env.UI_APP_PORT || 9000
const root = __dirname

const fallback = (...pathOptions) => (req, res, next) => {
  if ((req.method === 'GET' || req.method === 'HEAD') && req.accepts('html')) {
    res.sendFile.call(res, ...pathOptions, error => error && next())
  } else next()
}

app.use(helmet())
app.use(express.static(root))
app.use(fallback('index.html', { root }))

let httpInstance = app.listen(port)

process.on('SIGINT', () => {
  console.log('\x1b[42m \u2713  \x1b[0m \x1b[32m Gracefully shutting down \x1b[0m')
  httpInstance.close()
  process.exit(0)
})
