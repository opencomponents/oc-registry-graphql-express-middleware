const schema = require('../src/schema');

describe('schema', () => {
  test('expect schema to match snapshot', () => {
    expect(schema).toMatchSnapshot();
  });
});
