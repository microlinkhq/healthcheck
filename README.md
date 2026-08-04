<div align="center">
  <img src="https://github.com/microlinkhq/cdn/raw/master/dist/logo/banner.png#gh-light-mode-only" alt="microlink logo">
  <img src="https://github.com/microlinkhq/cdn/raw/master/dist/logo/banner-dark.png#gh-dark-mode-only" alt="microlink logo">
</div>

[![Deploy with Vercel](https://zeit.co/button)](https://vercel.com/new/project?template=https://github.com/microlinkhq/healthcheck)

> Microservice to retrieve Microlink API health status.

It derives status from the [k8s.microlink.io](https://k8s.microlink.io/) cluster dashboard (`?json`) and exposes it as a small JSON payload:

```json
{ "status": "healthy" }
```

`status` is `healthy` when every active `microlink-api` pod is ready and running, terminating pods are ignored, and pending pods stay within a small share of the fleet (normal scale-up). Otherwise `degraded`.

# Environment Variables

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
Authored and maintained by [Kiko Beats](https://kikobeats.com) with help from [contributors](https://github.com/microlinkhq/oss/contributors).

> [microlink.io](https://microlink.io) · GitHub [microlink.io](https://github.com/microlinkhq) · X [@microlinkhq](https://x.com/microlinkhq)
