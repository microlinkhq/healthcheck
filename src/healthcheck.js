'use strict'

const got = require('got')

const ENDPOINT = 'https://k8s.microlink.io/?json'
const SERVICE = 'microlink-api'
const HEALTHY_POD = /^(\d+)\/\1 \(running\)$/

const getStatus = pods =>
  pods.length > 0 && pods.every(({ status }) => HEALTHY_POD.test(status))
    ? 'healthy'
    : 'degraded'

module.exports = async () => {
  const services = await got(ENDPOINT).json()
  const { pods = [] } =
    services.find(({ service }) => service === SERVICE) || {}

  return {
    status: getStatus(pods)
  }
}
