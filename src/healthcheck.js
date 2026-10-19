'use strict'

const got = require('@kikobeats/got')

const ENDPOINT = 'https://k8s.microlink.io/?json'
const SERVICE = 'microlink-api'
const SERVING_POD = /^(\d+)\/\1 \(running\)$/
const TERMINATING_POD = /\(terminating\)$/
const MIN_SERVING_RATIO = 0.75

const getStatus = pods => {
  const expected = pods.filter(({ status }) => !TERMINATING_POD.test(status))
  const serving = expected.filter(({ status }) => SERVING_POD.test(status))
  const quorum = Math.ceil(expected.length * MIN_SERVING_RATIO)

  return serving.length > 0 && serving.length >= quorum ? 'healthy' : 'degraded'
}

module.exports = async () => {
  const services = await got(ENDPOINT).json()
  const { pods = [] } =
    services.find(({ service }) => service === SERVICE) || {}

  return {
    status: getStatus(pods)
  }
}

module.exports.getStatus = getStatus
