<div align="center">
  <img src="https://cdn.microlink.io/logo/banner.png" alt="microlink oss">
</div>

[![Deploy with Vercel](https://zeit.co/button)](https://vercel.com/new/project?template=https://github.com/healthcheck)

> Microservice to retrieve your CloudFlare Health Checks.

It retrieves your [CloudFlare Health Checks](https://blog.cloudflare.com/new-tools-to-monitor-your-server-and-avoid-downtime/)

![](https://i.imgur.com/bD3Vplv.png)

in unified way, being possible consume it as JSON payload from anywhere

![](https://i.imgur.com/clmyp9s.png)

# Environment Variables

### ZONE_ID

*Required*</br>
Type: `string`

The zone identifier associated with your domain.

### X_AUTH_EMAIL

*Required*</br>
Type: `string`

The email associated with your CloudFlare account.

### X_AUTH_KEY

*Required*</br>
Type: `string`

The authorization token associated with your CloudFlare account.

### REQ_TIMEOUT

Type: `number`<br>
Default: 8000

It specifies how much time after consider a request as timeout, in milliseconds.

### MAX_CACHE

Type: `number`<br>
Default: 60000 (1m)

It specifies how much time a response can be cached, in milliseconds.

## License

**oss** © [microlink.io](https://microlink.io), released under the [MIT](https://github.com/microlinkhq/oss/blob/master/LICENSE.md) License.<br>
Authored and maintained by microlink.io with help from [contributors](https://github.com/microlinkhq/oss/contributors).

> [microlink.io](https://microlink.io) · GitHub [microlink.io](https://github.com/microlinkhq) · Twitter [@microlinkhq](https://twitter.com/microlinkhq)
