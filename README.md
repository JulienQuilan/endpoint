# endpoint

[![Build Status](https://travis-ci.org/LINKIWI/endpoint.svg?branch=master)](https://travis-ci.org/LINKIWI/endpoint)
[![Coverage Status](https://coveralls.io/repos/github/LINKIWI/endpoint/badge.svg?branch=master)](https://coveralls.io/github/LINKIWI/endpoint?branch=master)

Super simple mock API endpoints for static JSON data

```bash
$ curl -X PUT http://endpoint.example.com/api/endpoint/add -d '{"name": "my-endpoint", "data": {"hello": "world"}}'
{
  "success": true,
  "name": "my-endpoint",
  "data": {
    "hello": "world"
  },
  "statusCode": 200,
  "delay": 0
}

$ curl http://endpoint.example.com/endpoint/my-endpoint
{
  "hello": "world"
}
```

## Overview

`endpoint` is a self-hosted microservice for quickly creating configurable mock HTTP endpoints that return static JSON data. It's intended to be a super simple, zero-configuration, zero-server-overhead way of associating some JSON with a URL in order to test webhooks or client libraries during development.

`endpoint` is especially useful for testing client-side logic when a live production server is either not yet ready or unavailable in a development environment.

Endpoint JSON data is persistently stored on-disk and cached in-memory, completely eliminating the need for any database configuration.

## Features

* Associate arbitrary JSON data with any endpoint name
* Specify a custom HTTP response status code
* Specify a custom response delay (e.g. for testing behavior under slow network conditions)

## Installation

#### Locally

```bash
$ npm install
$ npm run build
$ npm run start
# A local instance is now available at http://localhost:16540
```

#### Production (Apache reverse proxy, with [`pm2`](https://github.com/Unitech/pm2)):

First, in the shell:

```bash
$ cd /path/to/endpoint
$ npm install
$ npm run build
$ pm2 start index.js
```

A minimal Apache config:

```apache
<VirtualHost *:80>
    Alias "/static" "/path/to/endpoint/src/client/static"

    ProxyPass "/static" !

    <Proxy *>
        Order deny,allow
        Allow from all
    </Proxy>

    ProxyRequests Off
    ProxyPreserveHost On
    ProxyPass / http://127.0.0.1:16540/
    ProxyPassReverse / http://127.0.0.1:16540/
</VirtualHost>
```
