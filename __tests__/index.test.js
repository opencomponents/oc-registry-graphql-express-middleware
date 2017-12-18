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
}
`;

describe('index', () => {
  test('expect type of middleware to be function', () => {
    expect(typeof middleware).toBe('function');
  });

  test('expect res setHeader and end to match snapshot', async () => {
    fetch.mockResponses(
      [
        JSON.stringify({
          href: options.baseUrl,
          ocVersion: '1.2.3',
          type: 'mock-registry'
        })
      ],
      [
        JSON.stringify({
          name: 'oc-apod',
          description:
            "This component displays picture, title, description and date of the NASA's Astronomy Picture of the Day",
          version: '1.3.0',
          allVersions: ['1.0.0', '1.1.0', '1.1.1', '1.2.0', '1.3.0'],
          oc: {
            parameters: {
              apiKey: {
                type: 'string',
                mandatory: true,
                example: 'DEMO_KEY',
                description: 'The NASA Open APIs key'
              }
            }
          }
        })
      ],
      [
        JSON.stringify({
          components: [
            `${options.baseUrl}oc-a-component`,
            `${options.baseUrl}oc-client`
          ]
        })
      ],
      [
        JSON.stringify({
          name: 'oc-a-component',
          description: 'Awesome OpenComponent',
          version: '4.5.6',
          allVersions: ['4.5.4', '4.5.5', '4.5.6'],
          oc: {
            parameters: {
              id: {
                type: 'string',
                mandatory: true,
                example: '789',
                description: 'The Id'
              }
            }
          }
        })
      ],
      [
        JSON.stringify({
          name: 'oc-client',
          description: 'The OpenComponents client-side javascript client',
          version: '0.40.7',
          allVersions: [
            '0.40.7',
            '0.40.1',
            '0.39.8',
            '0.38.1',
            '0.37.11',
            '0.37.8',
            '0.37.4',
            '0.37.2',
            '0.37.0',
            '0.36.27',
            '0.36.26',
            '0.36.25',
            '0.36.21',
            '0.36.13',
            '0.36.4',
            '0.36.1'
          ]
        })
      ]
    );

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
});
