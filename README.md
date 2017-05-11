# oc-registry-graphql-express-middleware

OpenComponent Registry GraphQL Express middleware.

## How to install

```bash
yarn add oc-registry-graphql-express-middleware
```

## How to use it w/in your Registry

```javascript
const middleware = require('oc-registry-graphql-express-middleware');

registry.app.use('/graphql', middleware({ baseUrl: 'http://localhost:3000/', graphiql: true }));
```

![query-registry](query-registry-v2.png "query-registry")
