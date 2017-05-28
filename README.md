# oc-registry-graphql-express-middleware

[![Greenkeeper badge](https://badges.greenkeeper.io/opencomponents/oc-registry-graphql-express-middleware.svg)](https://greenkeeper.io/)

OpenComponent Registry GraphQL Express middleware.

## How to install

```bash
yarn add oc-registry-graphql-express-middleware
```

## How to use it w/in your Registry

```javascript
require('babel-core/register');
require('babel-polyfill');

const graphql = require('oc-registry-graphql-express-middleware');

const options = {
  baseUrl: configuration.baseUrl,
  graphiql: configuration.discovery,
  dependencies: configuration.dependencies
};

registry.app.use('/graphql', graphql(options));
```

![query-registry](query-registry-v1.0.0.png "query-registry")
