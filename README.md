# openrpg-ui

> GUI for OpenRPG

## Build Setup

``` bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

## Environment variables

### Proxy configuration

To avoid CSRF issues, this Nuxt project uses by default a proxy so that backend
requests are sent to the Nuxt server (which is on the same origin), and the Nuxt
server proxies to the OpenRPG backend server. Use the environment variables to
change the backend:

* `BACKEND_PROTOCOL`: protocol (http or https). Default: `http`.
* `BACKEND_HOST`: host. Default: `localhost`.
* `BACKEND_PORT`: port. Default: `8000`.
* `BACKEND_PATH`: REST API root. Default: `/api`.
* `BACKEND_DISABLE`: disable this proxy. You probably don't want to do this. Default: (unset).

Example: setting `BACKEND_HOST="192.168.1.201"` on your Docker image will make
API requests be forwarded to `http://192.168.1.201:8000/api`.
