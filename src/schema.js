const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type Registry {
    href: String
    ocVersion: String
    type: String
    dependencies: [String]
  }

  type Person {
    name: String
    email: String
  }

  type Repository {
    type: String
    url: String
  }

  type Parameter {
    key: String
    type: String
    mandatory: Boolean
    example: String
    description: String
  }

  type Component {
    name: String
    description: String
    version: String
    allVersions: [String]
    author: Person
    repository: Repository
    parameters: [Parameter]
  }

  type Query {
    registry: Registry
    component(name: String): Component
    components: [Component]
  }
`);

module.exports = schema;
