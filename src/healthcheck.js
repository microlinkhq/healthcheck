'use strict'

const got = require('got')

const { ZONE_ID, X_AUTH_EMAIL, X_AUTH_KEY } = process.env

const getStatus = healthchecks => {
  const isHealthy = healthchecks.every(({ status }) => status === 'healthy')
  return isHealthy ? 'healthy' : 'degraded'
}

module.exports = async () => {
  const { result: healthchecks } = await got(
    `https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/healthchecks`,
    {
      headers: {
        'x-auth-email': X_AUTH_EMAIL,
        'x-auth-key': X_AUTH_KEY
      }
    }
  ).json()

  return {
    status: getStatus(healthchecks)
  }
}
