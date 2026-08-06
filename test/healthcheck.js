'use strict'

const { test } = require('node:test')
const assert = require('node:assert/strict')

const { getStatus } = require('../src/healthcheck')

const pods = (n, status) => Array.from({ length: n }, () => ({ status }))

test('no pods is degraded', () => {
  assert.equal(getStatus([]), 'degraded')
})

test('every pod serving is healthy', () => {
  assert.equal(getStatus(pods(16, '1/1 (running)')), 'healthy')
})

test('multi container pods are serving when all containers are ready', () => {
  assert.equal(getStatus(pods(4, '3/3 (running)')), 'healthy')
  assert.equal(getStatus(pods(4, '2/3 (running)')), 'degraded')
})

test('a zombie pod does not degrade a serving fleet', () => {
  const fleet = [
    ...pods(15, '1/1 (running)'),
    { status: '0/1 (containerstatusunknown)' }
  ]
  assert.equal(getStatus(fleet), 'healthy')
})

test('a fleet of only zombies is degraded', () => {
  assert.equal(getStatus(pods(16, '0/1 (containerstatusunknown)')), 'degraded')
})

test('terminating pods are ignored, they leave by design', () => {
  const fleet = [...pods(4, '1/1 (running)'), ...pods(8, '1/1 (terminating)')]
  assert.equal(getStatus(fleet), 'healthy')
})

test('normal scale up churn stays healthy', () => {
  const fleet = [...pods(16, '1/1 (running)'), ...pods(4, '0/1 (pending)')]
  assert.equal(getStatus(fleet), 'healthy')
})

test('scheduling pressure is degraded', () => {
  const fleet = [...pods(16, '1/1 (running)'), ...pods(12, '0/1 (pending)')]
  assert.equal(getStatus(fleet), 'degraded')
})

test('real capacity loss is degraded', () => {
  const fleet = [
    ...pods(10, '1/1 (running)'),
    ...pods(6, '0/1 (crashloopbackoff)')
  ]
  assert.equal(getStatus(fleet), 'degraded')
})

test('a single zombie plus churn still reflects a serving fleet', () => {
  const fleet = [
    ...pods(14, '1/1 (running)'),
    { status: '0/1 (containerstatusunknown)' },
    { status: '0/1 (pending)' },
    { status: '1/1 (terminating)' }
  ]
  assert.equal(getStatus(fleet), 'healthy')
})
