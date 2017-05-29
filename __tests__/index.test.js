// const fetch = require('node-fetch');
const factory = require('../src');

const options = {
  baseUrl: 'https://pink-pineapple.herokuapp.com/',
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

test('expect res setHeader and end to match snapshot', async () => {
  const req = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    url: `?query=${query}`
  };

  const res = { setHeader: jest.fn(), end: jest.fn() };

  await middleware(req, res);

  expect(res.setHeader).toHaveBeenCalled();
  expect(res.setHeader.mock.calls).toMatchSnapshot();
  expect(res.end).toHaveBeenCalled();
  expect(JSON.parse(res.end.mock.calls)).toMatchSnapshot();
});
