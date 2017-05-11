const fetch = require('node-fetch');
const factory = require('../src/index');

const options = {
  baseUrl: 'http://mock:3000/',
  graphiql: true
};

const middleware = factory(options);

test('expect type of middleware to be function', () => {
  expect(typeof middleware).toBe('function');
});

test('expect res setHeader and end to match snapshot', async () => {
  fetch.mockResponse(JSON.stringify({
    href: options.baseUrl,
    ocVersion: '1.2.3',
    type: 'mock-registry',
    components: [
      `${options.baseUrl}oc-a-component`
    ],
    name: 'oc-a-component',
    description: 'Awesome OpenComponent',
    version: '4.5.6'
  }));

  const req = {
    method: 'GET',
    headers: {},
    url: `?query=
    {
      registry {
        href
        ocVersion
        type
      }
      components {
        name
        description
        version
      }
      component(name: "oc-a-component") {
        name
        description
        version
      }
    }
    `
  };

  const res = { setHeader: jest.fn(), end: jest.fn() };

  await middleware(req, res);

  expect(res.setHeader.mock.calls).toMatchSnapshot();
  expect(res.end.mock.calls).toMatchSnapshot();
});
