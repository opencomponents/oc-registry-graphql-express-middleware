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

  type Component {
    name: String
    description: String
    version: String
  }

  type Query {
    registry: Registry
    component(name: String): Component
    components: [Component]
  }
`);

const fetchComponent = async (url) => {
  return fetch(url)
    .then(response => response.json())
    .then((data) => {
      return data;
    });
};

const makeComponent = async (baseUrl, name) => {
  const url = `${baseUrl}${name}/~info`;
  const info = await fetchComponent(url);
  const copy = Object.assign({}, info);
  return copy;
};

const root = (options) => {
  return {
    registry: async () => {
      return fetch(options.baseUrl)
        .then(response => response.json())
        .then((data) => {
          return {
            href: data.href,
            ocVersion: data.ocVersion,
            type: data.type
          };
        });
    },
    components: async () => {
      return fetch(options.baseUrl)
        .then(response => response.json())
        .then((data) => {
          return data.components
            .map((component) => {
              const name = component.replace(options.baseUrl, '');
              return makeComponent(options.baseUrl, name);
            });
        });
    },
    component: async ({ name }) => {
      return makeComponent(options.baseUrl, name);
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
