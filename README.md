# oc-registry-graphql-express-middleware

OpenComponent Registry GraphQL Express middleware.

## How to install

```bash
yarn add oc-registry-graphql-express-middleware
```

## How to use it w/in your Registry

```javascript
const graphql = require('oc-registry-graphql-express-middleware');

registry.app.use('/graphql', graphql({ baseUrl: configuration.baseUrl, graphiql: configuration.discovery }));
```

![query-registry](query-registry-v1.0.0.png "query-registry")
