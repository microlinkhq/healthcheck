'use strict'

const got = require('got')

const ENDPOINT = 'https://k8s.microlink.io/?json'
const SERVICE = 'microlink-api'
const HEALTHY_POD = /^(\d+)\/\1 \(running\)$/
const PENDING_POD = /\(pending\)$/
const TERMINATING_POD = /\(terminating\)$/

const getStatus = pods => {
  const live = pods.filter(({ status }) => !TERMINATING_POD.test(status))
  const pending = live.filter(({ status }) => PENDING_POD.test(status))
  const active = live.filter(({ status }) => !PENDING_POD.test(status))
  // one entering pod is normal; a large pending share usually means scheduling pressure
  const maxPending = Math.max(1, Math.floor(live.length / 4))

  return pending.length <= maxPending &&
    active.length > 0 &&
    active.every(({ status }) => HEALTHY_POD.test(status))
    ? 'healthy'
    : 'degraded'
}

module.exports = async () => {
  const services = await got(ENDPOINT).json()
  const { pods = [] } =
    services.find(({ service }) => service === SERVICE) || {}

  return {
    status: getStatus(pods)
  }
}
