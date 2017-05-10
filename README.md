# oc-registry-graphql-express-middleware

OpenComponent Registry GraphQL Express middleware.

## How to use it w/in your Registry

```javascript
const middleware = require('oc-registry-graphql-express-middleware'); // once available on npm

registry.app.use('/graphql', middleware({ baseUrl: 'http://localhost:3000/', graphiql: true }));
```

![query-registry](query-registry.png "query-registry")
