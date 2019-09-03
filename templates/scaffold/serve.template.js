#!/usr/bin/env node

const express = require('express')
const helmet = require('helmet')
const app = express()

const args = process.argv.slice(2)
  .map(arg => arg.split('='))
  .reduce((acc, [key, val]) => ({ ...acc, [key.toUpperCase().replace(/-/g, '')]: val || true }), {})

const PORT = normalizePort(args.PORT) || 9000
const root = __dirname

const fallback = (...pathOptions) => (req, res, next) => {
  if ((req.method === 'GET' || req.method === 'HEAD') && req.accepts('html')) {
    res.sendFile.call(res, ...pathOptions, error => error && next())
  } else next()
}

app.use(helmet())
app.use(express.static(root))
app.use(fallback('index.html', { root }))

let httpInstance = app.listen(PORT)

process.on('SIGINT', () => {
  console.log('\x1b[42m \u2713  \x1b[0m \x1b[32m Gracefully shutting down \x1b[0m')
  httpInstance.close()
  process.exit(0)
})

function normalizePort(val) {
  const port = parseInt(val, 10)
  return isNaN(port) || port < 0 ? false : port
}
