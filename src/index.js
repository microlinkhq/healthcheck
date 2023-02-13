'use strict'

const debug = require('debug-logfmt')('healthcheck')
const pReflect = require('p-reflect')
const pTimeout = require('p-timeout')
const send = require('send-http')

const { MAX_CACHE = 60000, REQ_TIMEOUT = 8000 } = process.env
const healthcheck = require('./healthcheck')

let CACHE = Object.create(null)

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('content-type', 'application/json; charset=utf-8')
  res.setHeader(
    'cache-control',
    `public, must-revalidate, max-age=${MAX_CACHE}, s-maxage=${MAX_CACHE}, stale-while-revalidate=60`
  )
  const { isFulfilled, value, reason } = await pReflect(
    pTimeout(healthcheck(), REQ_TIMEOUT)
  )

  if (isFulfilled) CACHE = value
  else debug.error(reason.message || reason)

  return send(res, 200, CACHE)
}
