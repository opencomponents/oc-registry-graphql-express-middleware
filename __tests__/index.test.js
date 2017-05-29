const fetch = require('node-fetch');
const factory = require('../src');

const options = {
  baseUrl: 'http://mock:3000/',
  graphiql: true,
  dependencies: ['graphql', 'lodash', 'moment']
};

const middleware = factory(options);

const query = `
{
  registry {
    href
    ocVersion
    type
    dependencies
  }
  components {
    name
    description
    version
    allVersions
    author {
      name
      email
    }
    repository {
      type
      url
    }
    parameters {
      key
      type
      mandatory
      example
      description
    }
  }
  component(name: "oc-apod") {
    name
    description
    version
    allVersions
    author {
      name
      email
    }
    repository {
      type
      url
    }
    parameters {
      key
      type
      mandatory
      example
      description
    }
  }
}
`;

test('expect type of middleware to be function', () => {
  expect(typeof middleware).toBe('function');
});

test.skip('expect res setHeader and end to match snapshot', async () => {
  // todo: change mockResponse
  fetch.mockResponse(JSON.stringify({
    href: options.baseUrl,
    ocVersion: '1.2.3',
    type: 'mock-registry',
    components: [
      `${options.baseUrl}oc-a-component`
    ],
    name: 'oc-a-component',
    description: 'Awesome OpenComponent',
    version: '4.5.6',
    allVersions: ['4.5.4', '4.5.5', '4.5.6'],
    oc: {
      parameters: {
        id: {
          type: 'string',
          mandatory: true,
          example: '815',
          description: 'The Id'
        }
      }
    }
  }));

  const req = {
    method: 'GET',
    headers: {},
    url: `?query=${query}`
  };

  const res = { setHeader: jest.fn(), end: jest.fn() };

  await middleware(req, res);

  expect(res.setHeader.mock.calls).toMatchSnapshot();
  expect(res.end.mock.calls).toMatchSnapshot();
});
