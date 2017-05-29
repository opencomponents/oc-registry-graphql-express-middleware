'use strict';

var _require = require('graphql'),
    buildSchema = _require.buildSchema;

var schema = buildSchema('\n  type Registry {\n    href: String\n    ocVersion: String\n    type: String\n    dependencies: [String]\n  }\n\n  type Person {\n    name: String\n    email: String\n  }\n\n  type Repository {\n    type: String\n    url: String\n  }\n\n  type Parameter {\n    key: String\n    type: String\n    mandatory: Boolean\n    example: String\n    description: String\n  }\n\n  type Component {\n    name: String\n    description: String\n    version: String\n    allVersions: [String]\n    author: Person\n    repository: Repository\n    parameters: [Parameter]\n  }\n\n  type Query {\n    registry: Registry\n    component(name: String): Component\n    components: [Component]\n  }\n');

module.exports = schema;