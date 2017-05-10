/* eslint-disable arrow-body-style */

const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const fetch = require('node-fetch');

const schema = buildSchema(`
  type Registry {
    href: String
    ocVersion: String
    type: String
  }

  type Query {
    registry: Registry
  }
`);

const root = (options) => {
  return {
    registry: () => {
      return fetch(options.baseUrl)
        .then(response => response.json())
        .then((data) => {
          return {
            href: data.href,
            ocVersion: data.ocVersion,
            type: data.type
          };
        });
    }
  };
};

const factory = (options) => {
  return graphqlHTTP({
    schema,
    rootValue: root(options),
    graphiql: options.graphiql,
  });
};

module.exports = factory;
