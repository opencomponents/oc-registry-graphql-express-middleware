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
    ocVersion: '8.1.5',
    type: 'mock-registry'
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
    }
    `
  };

  const res = { setHeader: jest.fn(), end: jest.fn() };

  await middleware(req, res);

  expect(res.setHeader.mock.calls).toMatchSnapshot();
  expect(res.end.mock.calls).toMatchSnapshot();
});
