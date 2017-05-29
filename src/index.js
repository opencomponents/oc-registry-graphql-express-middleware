/* eslint-disable arrow-body-style */

const graphqlHTTP = require('express-graphql');
const fetch = require('node-fetch');
const schema = require('./schema');

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

  let parameters = [];
  if (info.oc && info.oc.parameters) {
    parameters = Object.keys(info.oc.parameters)
      .map(key => ({ key, ...info.oc.parameters[key] }));
  }

  const copy = Object.assign({}, info, { parameters });
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
            type: data.type,
            dependencies: options.dependencies
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
